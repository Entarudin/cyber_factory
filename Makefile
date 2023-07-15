ENV=dev
BACKEND_CONTAINER = cyber_factory_backend

include ./environments/$(ENV)/.env

use_secrets: 
	cp ./environments/$(ENV)/.env ./.
	cp ./environments/$(ENV)/.env ./backend
	cp ./environments/$(ENV)/.env ./frontend

down:
	docker-compose down

build: use_secrets
	docker-compose down
	docker-compose build

up: build
	docker-compose up -d

logs:
	docker-compose logs -f

backend-stop:
	docker-compose stop $(BACKEND_CONTAINER)

backend-up:
	docker-compose up $(BACKEND_CONTAINER)

backend-logs:
	docker-compose logs $(BACKEND_CONTAINER)

migration-gen:
	docker-compose run --rm $(BACKEND_CONTAINER) npm run migration:generate ./src/$(m)/dao/migrations/$(n) && sudo chown -R ${USER}:${USER} src/$(m)

migration-run:
	docker-compose run --rm $(BACKEND_CONTAINER) npm run migration:run

migration-revert:
	docker-compose run --rm $(BACKEND_CONTAINER) npm run migration:revert
