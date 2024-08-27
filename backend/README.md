# Backend


## Installation

**Python environment manager of your choice** (e.g. `python-m venv`, `pipenv`, `conda`, etc.)**

Using `conda`:

```bash
conda create --name play-position
conda activate play-position
conda install --file requirements.txt
```

## Usage

```bash
cd backend


python -m api.v1.app # for debug mode
# or with fastapi cli
fastapi dev api/v1/app.py # dev mode
fastapi run api/v1/app.py # production mode
```
