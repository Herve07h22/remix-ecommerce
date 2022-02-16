install:
	@echo "--------------------------------------"
	@echo "Building the docker image of the app  "
	@echo "--------------------------------------"
	@docker build -t sugggest -f ./src/infra/Dockerfile .

install-ssl:
	@echo "--------------------------------------"
	@echo "Installing the first SSL certificates "
	@echo "--------------------------------------"
	@echo "Starting all the services : nginx and certbot have to be running"
	@docker-compose up -d
	@echo "We'll using nginx to serve http://sugggest.camilab.co/.well-known/acme-challenge/"
	@echo "(that's the place certbot will write the challenge)"
	@docker exec -it sugggest-certbot certbot certonly --webroot -w /var/www/certbot
	@echo "Allowing nginx to read the certificate"
	@docker exec -it sugggest-proxy sh -c "chown -R nginx:nginx /etc/letsencrypt/*"
	@echo "----------------------------------------------------------------"

start:
	@echo "--------------------------------------"
	@echo "Starting sugggest  "
	@echo "--------------------------------------"
	@docker-compose up -d
	@docker exec -it sugggest-remix sh -c "yarn migrate"

stop:
	@echo "--------------------------------------"
	@echo "Stopping sugggest  "
	@echo "--------------------------------------"
	@docker-compose down