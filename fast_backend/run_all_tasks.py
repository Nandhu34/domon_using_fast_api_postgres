import subprocess
from pathlib import Path
import datetime

import subprocess
from pathlib import Path

def main():
    base_dir = Path(__file__).resolve().parent
    subprocess.run(["python", str(base_dir / "domain_script" / "domain_imperation_process.py")])
    subprocess.run(["python", str(base_dir / "domain_expiry_script" / "domain_expiration_check.py")])

if __name__ == "__main__":
    main()
