# EDUKADO

An education enterprise application created to easily manage school functions such as staffing, student management, courses management, material procurement, tuition payments, and many more.

## Running a clone

This repository is dockerized. In order to run this application, you need to have the following prerequisites:

- [x] Install Docker Desktop (makes it easier to run exec commands) [`optional`]
- [x] Docker is installed in your machine
- [x] Docker is up and running
- [x] You have the correct `.env` files placed where `docker-compose.yml` is also located

### Steps to run

Assuming that you have already cloned this repository and you have the correct `.env` file.

The `.env` file has the following environment variables:
```sh
POSTGRES_USER="POSTGRES_USER"
POSTGRES_PASSWORD="POSTGRES_PASSWORD"
DATABASE_URL="DATABASE_URL"
NEXTAUTH_SECRET="NEXTAUTH_SECRET"

# The port for NEXTAUTH_URL should be 3001, the same as the external port mapped in the docker-compose.yml
NEXTAUTH_URL="NEXTAUTH_URL"

# The port for NEXT_PUBLIC_URL should be 3001, the same as the external port mapped in the docker-compose.yml
NEXT_PUBLIC_URL="NEXT_PUBLIC_URL"
```

1. Open your machine's terminal (or your preferred terminal).
2. Go to the project directory (you can `cd` to the `school-enterprise` folder).
3. Type the following command in the terminal window: 
```sh
  docker compose up
```
4. If there are no errors, the container must be up and running.
5. Copy the container id of `school-enterprise-manage-1` by running the following command on another terminal, and copying it.
```sh
  docker ps
```
6. In the same terminal (where you run the `docker ps` command), run another command:
```sh
  # replace CONTAINER with the container id that you have copied
  
  docker exec -it CONTAINER npx prisma migrate dev
```
7. You can now access it via [http://localhost:3001](http://localhost:3001)