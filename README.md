# Clone Project
- git clone <repo-link>
- cd irctc_backend

# Setup Virtual Environment
- python -m venv .venv
- source .venv/bin/activate

# Install dependencies
- pip install 0r requirements.txt

# Create .env
- cp .env.example .env

# Run migrations
- python manage.py makemigrations
- pyton manage.py migrate

# Start server
- python manage.py runserver