FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY api-dotnet/Api/*.csproj ./
RUN dotnet restore

COPY api-dotnet/Api/ ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/out .

ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

ENTRYPOINT ["dotnet", "Api.dll"]