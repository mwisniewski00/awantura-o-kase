# Awantura o kasę

## Running development env

1. Run `make dev`(Linus) `.\dev.bat`(Windows) -- alternatively - `docker compose --env-file .env.dev up --build -d`
2. App should be available on `http://localhost:3000/`

## Performin dotnet migration

```
cd backend
dotnet ef migrations add <MIGRATION_NAME> --project Awantura.Infrastructure --startup-project Awantura.Api
```
