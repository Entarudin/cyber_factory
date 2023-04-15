ENV=dev
include ./environments/$(ENV)/.env

use_secrets: 
	cp ./environments/$(ENV)/.env ./.
	cp ./environments/$(ENV)/.env ./backend

down:
	docker-compose down

build: use_secrets
	docker-compose down
	docker-compose build

up: build
	docker-compose up -d
