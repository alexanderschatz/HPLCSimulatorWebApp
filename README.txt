Datenbank - Alexander Schatz - 2019
--------------------------------------------

using:
	MySQL  Server version: 5.7.27-0ubuntu0.18.04.1 (Ubuntu)
	Nodejs v8.10.0
	React  v16.7.0

- Nodejs is running in backend as connection to database
- React is the webapp running in frontend

--------------------------------------------

running the webapp:

1. extract all files from zip-archive

2. import the "db_export.sql" into mysql
3. make sure the mysql service is running and the port is 3306
  3.1 check if the user 'simulator'@'localhost' in table user has all rights
  3.2 else: 
	GRANT ALL PRIVILEGES
	ON hplcsimulator
	TO 'simulator'@'localhost'
	IDENTIFIED BY 'this_password'


4. open a terminal in folders UI and API each
  4.1 check if node and npm are installed
  	  $ npm -v
	  $ nodejs -v
  4.2 else:
	  $ sudo apt-get update
	  $ sudo apt-get install nodejs
	  $ sudo apt-get install npm

5. to install neccessary dependencies, run in both folders:
	$ npm install

6. run in both folders:
	$ npm start
  6.1 first start the backend server (API)
  6.2 then start the frontend (UI)

-> the webapp is rendered at localhost:3000

---------------------------------------------
