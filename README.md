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

O setup pode ser ser feito com uma dessas alternativas:

#### 1 - Docker/docker compose com script facilitador

```bash
./scripts/shell.sh
```
#### 2 - Docker/docker compose sem o script facilitador

```bash
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

#### 3 - Manual

Instalar o [NodeJS 22.12](https://nodejs.org/en/) ou caso tenha [nvm](https://github.com/nvm-sh/nvm) instalado, basta executar o `nvm install` na raíz do projeto, em sequencia, siga esses passos:


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

# processing capital gains using string parameter
capital-gains '[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":20.00, "quantity": 5000}]'

# processing capital gains using file redirect
capital-gains < ./data/case7.json
```
