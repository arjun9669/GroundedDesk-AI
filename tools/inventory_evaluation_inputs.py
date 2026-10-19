#!/usr/bin/env python3
"""Verify original available evaluation inputs; never run answers or rewrite packs."""

import argparse
import datetime
import hashlib
import json
from pathlib import Path
import subprocess


ROOT = Path(__file__).resolve().parent.parent
# Pack names/order come from the preserved v38 ALL_SCORECARDS, not inferred answers.
PACKS = [
    ("Cobalt16", "docs/evidence/r29/cobalt16", "fixed-answer-key.json", "historical_manual"),
    ("RetrievalQuality28", "eval/retrieval-quality", "fixed-cases.json", "exact_sentence"),
    ("ExternalSQuAD24", "eval/answer-completeness-v2/external24", "fixed-answer-key.json", "gold_span"),
    ("FreshMixed32", "eval/answer-completeness-v3/fresh32", "fixed-answer-key.json", "gold_groups"),
    ("FreshConfirmation32", "eval/answer-completeness-v7/fresh32", "fixed-answer-key.json", "gold_groups"),
    ("V9Exposed32", "eval/answer-completeness-v9/fresh32", "fixed-answer-key.json", "gold_groups"),
    ("Actor40", "eval/answer-completeness-v13/actor40", "fixed-answer-key.json", "gold_groups"),
    ("Scope48", "eval/answer-completeness-v15/scope48", "fixed-answer-key.json", "gold_groups"),
    ("Confirmation48", "eval/answer-completeness-v17/confirmation48", "fixed-answer-key.json", "gold_groups"),
    ("Precision48", "eval/answer-completeness-v18/precision48", "fixed-answer-key.json", "gold_groups"),
    ("Binding64", "eval/v20-confirmation/binding64", "fixed-answer-key.json", "binding_groups"),
    ("Cedar32", "eval/v24-fresh-confirmation", "fixed-answer-key.json", "literal_context_groups"),
    ("Bracken32", "eval/v25-fresh-confirmation", "fixed-answer-key.json", "literal_context_groups"),
    ("Flint32", "eval/v28-fresh-confirmation", "fixed-answer-key.json", "literal_context_groups"),
    ("Morrow32", "eval/v30-fresh-confirmation", "fixed-answer-key.json", "literal_context_groups"),
    ("Hearth32", "eval/v32-fresh-confirmation", "fixed-answer-key.json", "literal_context_groups"),
    ("Lumen32", "eval/v35-fresh-confirmation", "fixed-answer-key.json", "literal_context_groups"),
    ("Prism32", "eval/v36-fresh-confirmation", "fixed-answer-key.json", "literal_context_groups"),
    ("Vela32", "eval/v38-fresh-confirmation", "fixed-answer-key.json", "literal_context_groups"),
]


def read(path):
    return json.loads(path.read_bytes())


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def resolve_spec(base, name):
    # Original manifests use either repository-relative or pack-relative paths.
    if "\\" in name or Path(name).is_absolute():
        raise ValueError(f"Unexpected nonportable manifest entry: {name}")
    target = ROOT / name if name.startswith(("eval/", "docs/", "tests/")) else base / name
    target = target.resolve()
    if not target.is_relative_to(ROOT):
        raise ValueError(f"Manifest entry escapes repository: {name}")
    return target


def inventory():
    history_path = "docs/evidence/coverage-v38-r44/ALL_SCORECARDS.json"
    histories = {card["name"]: card for card in read(ROOT / history_path)}
    vela_path = "docs/evidence/vela32-v38/automated-scorecard.json"
    histories["Vela32"] = read(ROOT / vela_path)["variants"]
    rows = []
    for name, folder, key_name, family in PACKS:
        base = ROOT / folder
        freeze_path = base / "freeze-manifest.json"
        freeze = read(freeze_path)
        checked = []
        for spec in freeze["files"]:
            file_name = spec["path"]
            # Input identity only: do not mistake changed old candidate/scorer/docs
            # for input corruption or claim that every historical code file matches.
            if not ("source_docs/" in file_name or Path(file_name).name in
                    {key_name, "PROTOCOL.md", "FROZEN_RUBRIC.md", "ATTRIBUTION.md"}):
                continue
            target = resolve_spec(base, file_name)
            actual = digest(target)
            if actual != spec["sha256"]:
                raise ValueError(f"Frozen input hash mismatch: {target.relative_to(ROOT)}; expected {spec['sha256']}; actual {actual}")
            checked.append({"path": target.relative_to(ROOT).as_posix(), "sha256": actual})
        sources = [f for f in checked if "/source_docs/" in f["path"]]
        if not sources or not any(f["path"] == folder + "/" + key_name for f in checked):
            raise ValueError(f"Missing original source/key freeze entries: {name}")
        cases = read(base / key_name)
        if not isinstance(cases, list):
            raise ValueError(f"Unsupported original key schema: {name}")
        previous = histories[name]["fixed"]
        if [(c["id"], c["question"]) for c in cases] != [(c["id"], c["question"]) for c in previous]:
            raise ValueError(f"Original key/history question alignment mismatch: {name}")
        workflows = [c.get("workflow", "hybrid").lower() for c in cases]
        if set(workflows) - {"hybrid", "comparison"}:
            raise ValueError(f"Unknown workflow: {name}")
        native = {
            "historical_manual": ["eval/answer-completeness-v38/score.mjs"],
            "exact_sentence": ["eval/retrieval-quality/grade.mjs", "eval/retrieval-quality/PROTOCOL.md"],
            "gold_span": ["eval/answer-completeness-v38/score.mjs"],
            "gold_groups": ["eval/answer-completeness-v38/score.mjs"],
            "binding_groups": ["eval/answer-completeness-v38/score-binding64.mjs"],
            "literal_context_groups": [folder + "/score.mjs", folder + "/PROTOCOL.md"],
        }[family]
        for relative in native:
            if not (ROOT / relative).is_file():
                raise ValueError(f"Native scoring reference missing: {relative}")
        rows.append({
            "name": name, "questions": len(cases), "hybrid": workflows.count("hybrid"),
            "lexical_comparison": workflows.count("comparison"),
            "source_documents": len(sources), "key": folder + "/" + key_name,
            "original_freeze": {"path": freeze_path.relative_to(ROOT).as_posix(), "sha256": digest(freeze_path)},
            "verified_original_input_files": checked, "scoring_family": family,
            "native_scoring_references": [{"path": p, "sha256": digest(ROOT / p)} for p in native],
            "historical_alignment": "Exact case IDs/order/question strings match preserved fixed scorecard",
            "v39_model_status": "Vela32 first partial gate PASS" if name == "Vela32" else "NOT RUN",
            "qualification": "Input identity verified; native runner/scorer and preservation-gate porting still required" if name != "Vela32" else "Completed partial exposed regression; full gate remains blocked",
        })
    covered = {row["name"] for row in rows}
    unavailable = [{"name": name, "questions": len(card["fixed"]),
                    "status": "Original complete source/key/manifest pack not located; archived outputs are not substitutes"}
                   for name, card in histories.items() if name not in covered]
    total = sum(row["questions"] for row in rows)
    missing = sum(row["questions"] for row in unavailable)
    if len(histories) != 23 or total + missing != 771:
        raise ValueError("Historical 771-input accounting mismatch")
    return {
        "classification": "Input identity inventory only; no new answers or model-quality result",
        "observed_utc": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "repository_head": subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=ROOT, text=True).strip(),
        "history_references": [{"path": p, "sha256": digest(ROOT / p)} for p in [history_path, vela_path]],
        "summary": {"verified_packs": len(rows), "verified_input_cases": total,
                    "already_v39_model_tested": 32, "additional_input_cases_not_v39_model_tested": total - 32,
                    "unavailable_packs": len(unavailable), "unavailable_input_cases": missing,
                    "original_combined_739_config": "UNAVAILABLE; this inventory is not its reconstruction",
                    "full_771_gate": "NOT RUN", "adoption": "HOLD"},
        "available": rows, "unavailable": unavailable,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, required=True, help="New JSON output path; never overwrite")
    args = parser.parse_args()
    result = inventory()  # Verify everything before writing an output.
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("x", encoding="utf-8", newline="\n") as handle:
        json.dump(result, handle, indent=2)
        handle.write("\n")
    print(json.dumps(result["summary"], indent=2))


if __name__ == "__main__":
    main()
