## Clone Project
- git clone <repo-link>
- cd irctc_backend

## Setup Virtual Environment
- python -m venv .venv
- source .venv/bin/activate

## Install dependencies
- pip install 0r requirements.txt

## Create .env
- cp .env.example .env

## Run migrations
- python manage.py makemigrations
- pyton manage.py migrate

## Start server
- python manage.py runserver

## Mongodb logs sample
-   [
{
    _id: ObjectId('699dbccafdff619c58ca6400'),
    endpoint: '/api/trains/search/',
    user_id: 'cd44298e-4847-493b-a06a-335059a63ae3',
    params: { source: 'Pune', destination: 'Mumbai' },
    execution_time_ms: 0.4818439483642578
  },
  {
    _id: ObjectId('699dbcf5fdff619c58ca6401'),
    endpoint: '/api/trains/search/',
    user_id: 'cd44298e-4847-493b-a06a-335059a63ae3',
    params: { source: 'Pune', destination: 'Mumbai', date: '26-03-01' },
    execution_time_ms: 0.3001689910888672
  },
  {
    _id: ObjectId('699dbd01fdff619c58ca6402'),
    endpoint: '/api/trains/search/',
    user_id: 'cd44298e-4847-493b-a06a-335059a63ae3',
    params: { source: 'Pune', destination: 'Mumbai', journey_date: '26-03-01' },
    execution_time_ms: 0.3979206085205078
  }
]
