FROM microsoft/dotnet:2.1-aspnetcore-runtime as base
WORKDIR /app
COPY . .

CMD ASPNETCORE_URLS=http://*:$PORT dotnet wDashboard.dll