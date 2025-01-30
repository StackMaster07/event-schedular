# CEL

## Description

**Events management system**

## Features

- User Managments
- Event Managements  
- Conflicts Handling


### Technologies Used

| Python | Django | Rest Framework | SQLite | React |
|--------|--------|----------------|--------|--------|
| <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" width="50"> | <img src="https://upload.wikimedia.org/wikipedia/commons/7/75/Django_logo.svg" width="50"> | <img src="https://www.django-rest-framework.org/img/logo.png" width="100"> | <img src="https://www.sqlite.org/images/sqlite370_banner.gif" width="100"> | <img src="https://www.svgrepo.com/show/327388/logo-react.svg" width="50"> |



## Setup
- **First clone repo locally**  
  **Run below command in terminal**  
  `git clone git@github.com:StackMaster07/event-schedular.git`  

## Setup Manually
### Backend Server
-  **Navigate to backend directory**  
  `cd backend`  

-  **ADD SECRET_KEY TO ENV**  
  Rename `.env-example` to `env` and fill accordingly  

- **Install Dependencies**  
  First make sure virtual environment is activated  
  `pip install -r requirements.txt`

- **Run Migrations in app directory**   
  `python manage.py migrate`


- **Run Server**  
  `python manage.py runserver`

### Frontend App
-  **Navigate to frontend directory**  
  `cd frontend`  

-  **Install Dependencies**  
  `npm install`  

-  **Run App**  
  `npm start`  


## Setup with Docker
- **Make sure you have docker and docker-compose installed on your system then run this command in root directory of project**  
  `docker-compose up --build`
