include .env

install:
	@echo "--------------------------------------"
	@echo "Building the docker image of the app  "
	@echo "--------------------------------------"
	@docker build -t ecommerce -f ./src/infra/Dockerfile .
	@echo "set an admin user/pwd "
	@htpasswd -b -c ./src/infra/.htpasswd ${ADMIN_LOGIN} ${ADMIN_PWD}

install-ssl:
	@echo "--------------------------------------"
	@echo "Installing the first SSL certificates "
	@echo "--------------------------------------"
	@echo "Firstly, make sure that there is no http server listening to TCP 80"
	@echo "(if any, remove it with sudo systemctl disable apache2 && sudo systemctl stop apache2)"
	@echo "Starting all the services : nginx and certbot have to be running"
	@docker-compose up -d
	@echo "We'll using nginx to serve http://ecommerce.camilab.co/.well-known/acme-challenge/"
	@echo "(that's the place certbot will write the challenge)"
	@docker exec -it ecommerce-certbot certbot certonly --webroot -w /var/www/certbot
	@echo "Allowing nginx to read the certificate"
	@docker exec -it ecommerce-proxy sh -c "chown -R nginx:nginx /etc/letsencrypt/*"
	@echo "----------------------------------------------------------------"

start:
	@echo "--------------------------------------"
	@echo "Starting ecommerce  "
	@echo "--------------------------------------"
	@docker-compose up -d
	@docker exec -i ecommerce-remix sh -c "yarn migrate"

stop:
	@echo "--------------------------------------"
	@echo "Stopping ecommerce  "
	@echo "--------------------------------------"
	@docker-compose down

all:
	@git pull
	@make install
	@make start

