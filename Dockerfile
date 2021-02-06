#docker run -p 8000:80 -p 8001:443
FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
ENV ASPNETCORE_ENVIRONMENT="Docker"
ENV ASPNETCORE_URLS="https://+:443;http://+:80"

# installs NodeJS and NPM
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_14.x | bash \
    && apt-get install nodejs -yq

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build

# installs NodeJS and NPM
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_14.x | bash \
    && apt-get install nodejs -yq
    
WORKDIR /src
COPY . .
RUN dotnet restore "src/MoneyTale.Web/MoneyTale.Web.csproj"
RUN dotnet build "src/MoneyTale.Web/MoneyTale.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "src/MoneyTale.Web/MoneyTale.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "MoneyTale.Web.dll"]
