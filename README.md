# MoneyTale
______
![NPM CI](https://github.com/AyronK/money-tale/workflows/NPM%20CI/badge.svg?branch=main)  
![.NET CI](https://github.com/AyronK/money-tale/workflows/.NET%20CI/badge.svg?branch=main)  

## Important endpoints
- `/` root of React App
- `/swagger` Swagger UI
- `/swagger/v1/swagger.json` OpenAPI3.0 file

## Running docker
- run `docker build -t money-tale .` in root directory
- run `docker run -p 8000:80 -p 8001:443 money-tale` in root directory
- open a browser and go to `https://localhost:8001/` or `http://localhost:8000/`

## Setting up SQLite
- Install GUI from https://sqlitebrowser.org/dl/
- Generate database file `/data/SQLite.dev.db`
  - If you decide to choose a different name you need to update connection string in `appsettings.json`
- Run migrations using `dotnet ef database update`