This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, initialize the database if you haven't already:

```bash
npx prisma migrate reset
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Dependencies

To work with this project, you will need the following tools setup:

### Prisma

To enable the Prisma ORM, create a `.env` file in the project root directory with the following content:

```
POSTGRES_USER={your username here}
POSTGRES_PASSWORD={your password here}
POSTGRES_DB=event-scheduler-db
DATABASE_URL="postgresql://{your username here}:{your password here}@localhost:5432/event-scheduler-db?schema=public"
```

Replace `{your username here}` and `{your password here}` with a username and password you are comfortable with using for your postgres DB hosted in a Docker instance.

### Docker
```
sudo apt install docker.io
```

To use docker compose to easily start the container using the docker-compose.yml, you can install docker-compose:

```bash
sudo apt install docker-compose # install
docker-compose up -d # start the container
```

This package won't work on some devices. In that case, you may need to install the Docker Compose CLI plugin v2 instead:

```bash
mkdir -p ~/.docker/cli-plugins # create directory
curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o ~/.docker/cli-plugins/docker-compose # download the latest binary
chmod +x ~/.docker/cli-plugins/docker-compose # make the binary executable
docker compose version  # verify installation
sudo usermod -aG docker $USER # (optional) give current user permission to access Docker daemon socket
newgrp docker # (optional) apply permissions whithout having to logout and log back in
groups # (optional) check user permissions, confirm docker is listed
docker compose up -d # start the container
```

#### Additional Docker Commands

```bash
docker compose up -d # start the container, can also use docker-compose up -d
docker container ls # list containers
docker stop $CONTAINER_NAME # stop a running container
docker rm $CONTAINER_NAME # remove a container
docker volume ls # list container volumes
docker volume rm $VOLUME_NAME # remove a container volume
```

Docker volumes are created to persist local database information between container sessions. Removing them can help if there are credential issues where the $POSTGRES_USER is not recognized. Updates to the schema.prisma or docker-compose.yml files can cause these errors.

#### Additional Database Commands
```bash
npx prisma migrate dev --name init # generates new schema migrations, only run if making changes to schema.prisma
npx prisma migrate reset # drop any existing database, recreate the schema and database, reapply all prior migrations in prisma/migrations folder
docker exec -it local-postgres psql -U $POSTGRES_USER -d postgres # connect to the database
```

Once connected to the database, you can run:

```bash
\c $POSTGRES_DB # connect to the new database
CREATE DATABASE $POSTGRES_USER # create a new database if necessary
\dt # list all tables in current schema
\l # list all databases
\? # help with postgres commands
\h # help with SQL commands
```

### VS Code Extensions

These are optional, but will improve the development experience:

1. Prisma - https://marketplace.visualstudio.com/items?itemName=Prisma.prisma
2. Container Tools - https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-containers
3. Vitest - https://marketplace.visualstudio.com/items?itemName=vitest.explorer

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
