FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY Api/*.csproj ./Api/
RUN dotnet restore ./Api/Api.csproj

COPY Api/ ./Api/
RUN dotnet publish ./Api/Api.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/out .

ENTRYPOINT ["dotnet", "Api.dll"]