appContainer = backend

backend-stop:
	docker-compose stop $(appContainer)

backend-up:
	docker-compose up $(appContainer)

backend-wait-db:
	sleep 5

app-migration:
	docker-compose run --rm $(appContainer) npx typeorm migration:run

migration-gen:
	docker-compose run --rm $(appContainer) npx typeorm migration:generate -n $(n) -d ./src/$(m)/dao/migrations && sudo chown -R ${USER}:${USER} src/$(m)

migration-run:
	docker-compose run --rm $(appContainer) npx typeorm migration:run

migration-revert:
	docker-compose run --rm $(appContainer) npx typeorm migration:revert