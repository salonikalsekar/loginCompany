
README File:

Please follow the instructions to run the app. 


First start the mongodb server by the following commands
"mongod" and "mongo"

After starting the server, switch to the database "logindata"


Then after downloading all the folders, install the packages on the node command prompt. 
For this use "npm install"

After installing all the packages, run the app by "npm start"

Then go the browser and type "http://localhost:3000" and do the further functionalities as you wish. 


Registeration is to be done which will allow only the authenticated users and admin to access. 

After the registeration, one needs to login. 

First let the admin register and login and add few company details so that the database gets filled. 
The admin can also delete and update the company and the company details. 

After this you can register and login as a user to get the imformation of a particular user of the rankings of the n companies of the idea category. 

API DOCUMENTATION
1.	
URL
/
Method:
GET

Function:

The first page is the registration page. 

Here we register for the page. If the registration is successful, then the data is recorded in the database, and then the login page is displayed. 
If there is an error, the error is displayed on the page. 


2.	
URL
/login
Method:
POST

Function:

Authentication is done on this page and then directed to the dashboard. 
There two dashboards, one for the admin and one for the user. 
If there are any errors, the user is redirected to the login page again.

3.	
URL	
/logout
Method:
GET

Function:

After the authentication, if the user wants to logout, he clicks on the logout. It is redirected to the login page with a success message “logged out!”


4.
URL	
/index
Method:
POST

Function:

After the authentication is done, it checks for the type of the client, if it is a user then it redirects to dashboardUser else if it is an admin then it redirects to dashboardAdmin. 


5.

URL

/dashboardAdmin

Method

POST

Function

Here the admin gets to make the changes he wishes to make. 


6. 
URL

/removeData

Method

POST

Function

Here the admin gets to delete the company and the changed list is displayed.

7. 
URL

/updated

Method

POST

Function

Here the admin gets to make the changes he wishes to make and the updated data is displayed.


8. 

URL

/dashboardUser

Method

POST

Function

Here the user gets to perform to actions which he wishes to. 

9. 

URL

/userdata

Method

POST

Function

The user gets to view the company he wishes to view.

10. 

URL

/userRank

Method

POST

Function

The user gets to view the companies having the highest rank in the category. 












Thank you. 

