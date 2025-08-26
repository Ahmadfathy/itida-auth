FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ../../src/Api/Api.csproj src/Api/Api.csproj
COPY ../../src/Application/Application.csproj src/Application/Application.csproj
COPY ../../src/Infrastructure/Infrastructure.csproj src/Infrastructure/Infrastructure.csproj
COPY ../../src/Domain/Domain.csproj src/Domain/Domain.csproj
RUN dotnet restore src/Api/Api.csproj
COPY ../../src/ ./src/
WORKDIR /src/src/Api
RUN dotnet publish -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "Api.dll"]
