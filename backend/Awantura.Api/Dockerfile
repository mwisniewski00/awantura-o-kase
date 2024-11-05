# Description: This file contains the Dockerfile for the backend project.

# Use the official Microsoft .NET Core runtime as a parent image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_ENVIRONMENT=Development

# Install the libgssapi_krb5 library
RUN apt-get update && \
    apt-get install -y libgssapi-krb5-2 && \
    rm -rf /var/lib/apt/lists/*

# Use the official Microsoft .NET Core SDK image to build the project files
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project files and restore dependencies
COPY . .
RUN dotnet restore "Awantura.Api/Awantura.Api.csproj"

# Build the application
RUN dotnet build "Awantura.Api/Awantura.Api.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "Awantura.Api/Awantura.Api.csproj" -c Release -o /app/publish

# Build the final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Set the entrypoint to the correct path of the DLL
ENTRYPOINT ["dotnet", "Awantura.Api.dll"]