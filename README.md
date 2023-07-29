# Retro Stack

As the name suggests, the `retro-stack` is composed of a combination of modern and past tools that integrate together to build full-stack applications.

- **Documentation**: Docusaurus
- **Database**: PostgreSQL + Liquibase
- **Infra**: Docker + Docker Compose
- **Frontend**: Next.js + Plasmo.js
- **Design**: Storybook + ChakraUI
- **Backend**: Laravel + GraphQL

To build the static content and boot up the docker containers simply run `npm run start:docker`

To just boot up the docker containers run `docker compose --env-file ./packages/api/.env up`
