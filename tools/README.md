# Frozen benchmark capture

`run_frozen_chrome_capture.py` is the supplied r25 Python/Playwright runner with its question-wait callback corrected to accept `q`. It targets exact commit `20e1954f8f6da0ccbd19d55a0dc2cec469c6a381`, not arbitrary later main. Install Python Playwright separately and provide an owner-held frozen ZIP. No keys or source packs are included here.

```sh
python run_frozen_chrome_capture.py --benchmark /path/to/frozen.zip --check-pack-only
python run_frozen_chrome_capture.py --benchmark /path/to/frozen.zip --output capture.json --evidence-dir screenshots
```

This captures real MiniLM Hybrid and lexical Comparison outputs; grade only after capture. Aster H01's initial infrastructure retry remains documented in the historical results, even though this runner fixes that wait bug. Do not use a rerun to replace a recorded negative result.
