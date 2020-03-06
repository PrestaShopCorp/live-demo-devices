du: docker-up

docker-up:
	docker-compose up -d --build

dd: docker-down
docker-down:
	docker-compose down

di: docker-install
docker-install:
	docker-compose run --rm node sh -c "npm install"

db: docker-build
docker-build:
	docker-compose run --rm node sh -c "npm run build"

ds: docker-serve
docker-serve:
	docker-compose run -p 8080:8080 --rm node sh -c "npm run serve" 