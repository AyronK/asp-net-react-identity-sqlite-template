# Money Tale
______
![NPM CI](https://github.com/AyronK/money-tale/workflows/NPM%20CI/badge.svg?branch=main)  
![.NET CI](https://github.com/AyronK/money-tale/workflows/.NET%20CI/badge.svg?branch=main)  
![EF Migrations](https://github.com/AyronK/money-tale/workflows/EF%20Migrations/badge.svg?branch=main)

## Template
This repository can be used as a template for **ASP.NET** 5 application with **React + TypeScript** SPA frontent. The solution and project files contain **Money Tale** as application name reference, but it can be easily changed by renaming all the projects and directories (remember about proejct references in .sln and .csproj files) as well as all string literals across the aplication.

### Template Content

#### Backend  
_Powered by ASP.NET 5_
   - **SQLite integration**  
     SQLite is used due to being more lightweight for smaller applications and easier to deploy to production without funds.
   - **ASP.NET Identity**  
     Integrated use of ASP.NET Identity library
        - SQLite integration as it was chosen as primary database for the template. It can be switched to other DB easily.
        - Generated Identity views in a separate project `MoneyTale.Web.Identity` for easy control over those views.
   - **Entity Framework**  
     An entry point for full usage in the application. Required to work with ASP.NET Identity. Set up to use SQLite as it was chosen as primary database for the template.
   - **Swagger**  
     Integrated Swagger usage. See "Important endpoint" section to get started.
   - **Docker**
     Enabled Docker support for running application with SPA altogheter.
   - **Analyzers**
     Included Roslynator code analysys with subjective set of rules that can be easily adjusted by modifying `/src/_shared.ruleset` file.
   - **NUnit**
     This template contains one NUnit project and a shared targets file for future projects. Feel free to use other testing library as well, just keep it all together in `/tests/_tests.targets` file to avoid duplicating references and using the same code analysis ruleset.
   - **.Net repository directories structure**  
     This repository follows .Net recommended repository structure. See more at [gist](https://gist.github.com/davidfowl/ed7564297c61fe9ab814).
   - **Shared targets for src and test projects**
     Use a predifiened templates for new src projects adding `<Import Project="../_shared.targets" />` to your `.csproj`.
     Use a predifiened templates for new test projects adding `<Import Project="../_tests.targets" />` to your `.csproj` of NUnit project.
     
   
### Frontend
_Powered by React_     
   - **Enabled TypeScript**
     Enabled TypeScript and reworked most of Identity components to follow it's rules.
   - **Integrated ASP.Net Identity support**  
     Client app uses components provided by ASP.NET Identity template. Enables authorized routing, login handling and API authorization.
   - **ESLint and Prettier**
     Enabled ESLint and Prettier analysis. Rules set is subjective but is mostly inherited from airbnb pattern.
   - **Jest**
     Support for Jest tests.
   - **SCSS**
     The app compiles and includes SCSS files on build and run.
   - **Hooks**
     The app uses [husky](https://github.com/typicode/husky#readme) to format code on commit.
     
#### CICD
_Powered by GitHub actions_
    - **.NET Build and Test**  
      `dotnet-ci.yml` runs dotnet build and tests.
    - **NPM Build and Test*
      `node.js.yml` runs npm build and tests.
    - **Entity Framework migrations**
      `ef-migrations.yml` runs all migrations from scratch on an empty SQLite database placed in `/data` directory.

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
