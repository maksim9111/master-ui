up:
	docker compose up --build

down:
	docker compose down

restart:
	docker compose down && docker compose up --build

logs:
	docker compose logs -f

ps:
	docker compose ps

client:
	docker compose exec client sh

backend:
	docker compose exec backend sh

db:
	docker compose exec postgres sh

clean:
	docker compose down -v
	rm -rf ./data/strapi/uploads