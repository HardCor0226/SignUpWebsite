Part 1:
1. Open your terminal and connect to your MongoDB and leave running in the background (mongod)
	1.1 if MongoDB is not installed on your machine, do this FIRST
2. In your code editor terminal, install necessary modules if needed (npm install express ejs express-ejs-layouts http-status-codes --save)
	2.1 Make sure other packages like Mongoose are installed on your machine (npm i mongoose -S)
3. Navigate to wherever you stored the main project folder
	3a. change directory into the subfolder "API_Endpoint"
4. Initiate the endpoint server by using command "npm start"
5. In your web browser, navigate to localhost:3000
6. Click on the "User List" tab (or "Add a User" if this is your first time accessing the database and you need to add a user)
	6a. Working CRUD functions are listed under designated columns next to users you have input

Part 2:
1. Open a second command terminal window and navigate to the API_Endpoint folder that you accessed in Part 1
2. Install necessary modules (i.e. npm install request) if needed
3. Run command "node consume_API.js"
4. The simple client should now display the database data you input into the server in Part 1

Part 3:
1. Using a terminal separate from the one running API_Endpoint, navigate to the API_Client folder
2. Install necessary modules if needed (I have them permanently saved to my project folder but I don't know if this transfers)
3. Initiate the client server by using command "npm start"
4. In a new browser tab, navigate to "localhost:4200/users"
	4a. This page should display an error
5. Navigate to "localhost:4200/api/users"
	5a. This page should display the user database information in JSON format