#Pastebook -  a facebook clone

To run this application, enter these commands in the terminal.

//client
cd pastebook-client
npm i
npm start

//server
cd PastebookServer

dotnet add package System.Data.SqlClient // sql dependency
dotnet add package BCrypt.Net-Next  // BCrypt dependency

SET DB_CONNECTION_STRING=Server=tcp:pointwest-training-server.database.windows.net,1433;Initial Catalog=pastebookdb;Persist Security Info=False;User ID=pwtrainee;Password=ilovetraining!2022;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=120;

dotnet run
