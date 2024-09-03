# Backend


## Installation

**Python environment manager of your choice** (e.g. `python-m venv`, `pipenv`, `conda`, etc.)**

Using `conda`:

```bash
conda create --name play-position python=3.11
conda activate play-position

conda install poetry
poetry install
```

## Usage

```bash
cd backend


uvicorn api.v1.app:app --reload --host 0.0.0.0 --port 5000
```
