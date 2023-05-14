# Use multi-stage builds
# https://docs.docker.com/develop/develop-images/multistage-build/

# Base stage for SDK and runtime
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
# This allows Docker to cache the restored project files if no changes were made to the project files
COPY SafeSender.StorageAPI/*.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY ./SafeSender.StorageAPI ./
RUN dotnet publish -c Release -o out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app

# Use an unprivileged user for running the application
RUN adduser --disabled-password --gecos '' dotnetuser && chown -R dotnetuser /app
USER dotnetuser

# Copy compiled binaries from build-env
COPY --from=build-env /app/out .

# Make sure the app listens on the correct port
ENV ASPNETCORE_URLS=http://+:80

# Start the app
ENTRYPOINT ["dotnet", "SafeSender.StorageAPI.dll"]
