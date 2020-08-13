# Makefile for docker-compose

deploy:
	docker-compose build
	docker-compose push

dev-run:
	docker-compose -f docker-compose-dev up
