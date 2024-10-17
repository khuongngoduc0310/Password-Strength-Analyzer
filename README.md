# Project Setup

This guide will help you set up your development environment for the project.

## Prerequisites

- [Python](https://www.python.org/downloads/) (Make sure Python is installed on your system)
- [pip](https://pip.pypa.io/en/stable/installation/)

## Setting Up a Virtual Environment

1. **Navigate to Your Project Directory**:
   ```sh
   cd /path/to/your/project
2. **Create a Virtual Environment**:

On Windows command line:
   ```sh
   python -m venv env
  ```
3. **Create a Virtual Environment**:

On Windows command line:
  ```sh 
  .\env\Scripts\activate
  ```
## Installing Dependencies
1. **Make sure you are in your virtual environment:**

Your command prompt should show (env) before your current directory path.

2. **Install Dependencies from `requirements.txt`:**
  ```sh
  pip install -r requirements.txt
  ```
## Create a .env to connect database
1. **Create a `.env` file on to your project**

2. **Edit your `.env` file to your database information:**
  ```
  DATABASE_NAME=[your_database_name]
  DATABASE_USER=[your_user_name]
  DATABASE_PASSWORD=[your_password]
  DATABASE_HOST=localhost
  DATABASE_PORT=5432
  ```
## Make migrations and run
1. **Make migration in Django**
```
  python manage.py migrate
```
2. **Run the server**
```
  python manage.py runserver
```
