![Banner image](./ClientApp/public/ReadmeBanner.png)
# GreetUp
This was the final project in the course Applikationsutveckling för Internet (Application Development for the Internet) and Teknik för Sociala  Medier (Technology for Social Media) at Umeå University.

This project was made in collaboration with marketing students from Edith Cowan University in Perth, Australia.

The task was to develop a social media platform for isolated elderly people in Australia. The result was GreetUp, a platform where disabled elderly can view, attend and organize events in their neighborhoods.

# Build/Run instructions

### Prerequisites:
* dotnet core SDK (at least v.7.0.0 preview 3)
* nodeJS
* MySQL Server

### Instructions:
1. Create copy of file 'ExampleConfig.cs' and rename to 'Config.cs'
2. Replace ConnectionString in 'Config.cs' with your connection string
3. run `dotnet restore` (this may take a while)
4. run `dotnet ef database update`
5. run `dotnet run`
6. App is now running on https://localhost:7259

