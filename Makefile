
.PHONY: dev

dev:
	docker compose --env-file .env.dev up --build -d