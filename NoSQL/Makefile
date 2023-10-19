.PHONY: install run clean

# Bulid the Docker image
build:
	docker build -t nosql-python .

# Run the Docker container
run:
	docker run -d -t --name python-container --link mongo-container:mongo nosql-python

# Run the MongoDB container
run_mongo:
	docker run -d -t --name mongo-container -p 27017:27017 mongo:4.2

start_mongo:
	docker start mongo-container

# Run docker container in background
start:
	docker start python-container

pull:
	docker pull mongo:4.2

# Stop the Docker container
stop:
	docker stop python-container

stop_mongo:
	docker stop mongo-container

# Stop all running docker containers
stopall:
	docker stop $$(docker ps -a -q)

# Remove the Docker image
remove:
	docker rmi nosql-python

# Logs container
logs:
	docker logs python-container

# Shell container mongo
shell:
	docker exec -it python-container /bin/bash

# Shell container mongo
shell_mongo:
	docker exec -it mongo-container /bin/bash

# Remove the Docker container
clean:
	docker rm python-container

# Connect to MongoDB inside the container
connect:
	docker exec -it python-container python3 run_task.sh
