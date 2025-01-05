# Capital Gains

[![Technology][node-image]][node-url]
[![Technology][typescript-image]][typescript-url]
[![Technology][Docker-image]][Docker-url]

[node-url]: https://nodejs.org/
[node-image]: https://img.shields.io/badge/NodeJS-green?style=for-the-badge&logo=Node.js&logoColor=black

[typescript-url]: https://www.typescriptlang.org
[typescript-image]: https://img.shields.io/badge/Typescript-blue?style=for-the-badge&logo=TypeScript&logoColor=white

[Docker-url]: https://www.docker.com/
[Docker-image]: https://img.shields.io/badge/Docker-blue?style=for-the-badge&logo=Docker&logoColor=white


## Requirements
 - [Docker](https://www.docker.com/) *(optional)*
 - [Docker Compose](https://docs.docker.com/compose) *(optional)*
 - [Node v22.12](https://nodejs.org/en/)

## Setup

Caso esteja usando docker existe um script facilitador que já roda o docker compose e abre terminal do container.

```bash
./scripts/shell.sh

# or manually configure with docker
docker-compose up -d

# Access container
docker exec -it capital-gains-app bash

# install dependencies
npm install
# building the app
npm run build

# adding permissions to execute as binary
chmod +x dist/app.js

# create to allow capital-gains execute as binary
npm link
```

Caso queira fazer o processo todo manual, é necessario primeiramente instalar o [NodeJS 22.12](https://nodejs.org/en/) manualmente ou caso tenha nvm instalado, basta executar o `nvm install`. Na raíz do projeto. Logo em sequencia, siga esses passos:


```bash
# install dependencies
npm install

# building the app
npm run build

# adding permissions to execute as binary
chmod +x dist/app.js

# create to allow capital-gains execute as binary
npm link
```

## Tests

```bash
# without coverage
npm run test

# without coverage
npm run test:coverage
```
O relatório decobertura de código é apresentado no terminal e também uma diretório dist será criado com diversos formatos


## Running the App

Principais comandos:

```bash

# help
capital-gains -h

# version
capital-gains -v

# processing capital gains
capital-gains '[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":20.00, "quantity": 5000}]'
```
