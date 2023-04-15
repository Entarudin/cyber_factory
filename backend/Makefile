appContainer = backend

backend-stop:
	docker-compose stop $(appContainer)

backend-up:
	docker-compose up $(appContainer)

backend-wait-db:
	sleep 5

app-migration:
	docker-compose run --rm $(appContainer) npm run migration:run

migration-gen:
	docker-compose run --rm $(appContainer) npm run migration:generate $(n)

migration-run:
	docker-compose run --rm $(appContainer) npm run migration:run

migration-revert:
	docker-compose run --rm $(appContainer) npm run migration:down