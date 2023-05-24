STACK_NAME=safe-sender
CONTAINER_PREFIX=$(STACK_NAME)_

# Start the Docker Compose stack
start:
	docker-compose --project-name $(STACK_NAME) up -d

# Stop the Docker Compose stack
stop:
	docker-compose --project-name $(STACK_NAME) down

# Remove the Docker Compose stack
remove:
	docker-compose --project-name $(STACK_NAME) down -v

# Rebuild the Docker Compose stack
build:
	docker-compose --project-name $(STACK_NAME) build --no-cache

# Show the logs for the Docker Compose stack
logs:
	docker-compose --project-name $(STACK_NAME) logs -f

# Show the status of the Docker Compose stack
status:
	docker-compose --project-name $(STACK_NAME) ps

# Remove all containers and images associated with the Docker Compose stack
remove-all:
	docker-compose --project-name $(STACK_NAME) down -v --rmi all

# Show the IP address of the Docker Compose stack
ip:
	docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(CONTAINER_PREFIX)safe-sender-storage-api_1
