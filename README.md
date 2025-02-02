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
Caso precise, conceda permissão de execução.

```bash
chmod +x ./scripts/shell.sh
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

# Allowing capital-gains execute as binary
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
O relatório de cobertura de código é apresentado no terminal e também um diretório `dist` será criado com diversos formatos


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

**Importante**: Ao executar `capital-gains` passando como argumento a linha a ser processada, informe o json entre aspas simples. Exemplo: `capital-gains 'json content here'`. A execução via input redirect não precisa das aspas.

## Tech Decisions

1. A linguagem escolhida para o projeto é Javascript com superset typescript rodando na runtime NodeJS. Vale ressaltar que typescript nesse caso foi escolhido para melhorar a dev experience com a proposta de fornecer uma experiência de linguagem estaticamente tipada.
2. Paradigma funcional com objetivo de ter proposta mais simples em relação aos demais paradigmas.
3. Apesar de ser domínio simples, o app foi pensado para ter um domínio específico do capital gains e não ser acomplado a CLI ou qualquer outro meio de entrada. Aqui foi pensado em adapters que permite suportar evoluções para http por exemplo apenas escrevendo um adapter com input do domínio do capital gains.
4. As únicas depências e/ou libs de terceiros usadas foram o Jest (ferramenta de testes) e o TypeScript. Ambas soluções são dependências de desenvolvimento e não afetam o core da aplicação e também podem ser facilmente desconsideradas em pipeline de build para produção (não implementado nesta versão).
5. O objetivo não foi conseguir 100% de cobertura e sim priorizar os testes de [domínio](./src/core.ts) que garantem as regras de negócios
6. Nesta versão não foi comtemplado containerização para produção com princípios de segurança e permissões (non-root user), imagens otimizadas entre outras práticas.

**Estrutura do Projeto:**
```
Capital Gains
├── data            // Artefatos de exemplo
├── infrastructure  // Infraestrutura do projeto (container)
├── scripts         // Scritps para auxiliar builds ou utilitários
├── src             // Código fonte do app
    ├── app.ts      // Entrypoint do app
```

## Troubleshooting

##### 1. Ao rodar o app o programa não é reconhecido.

Há mais uma solução para esse caso, mas esta pode ser a ordem:

```bash
# 1 - Excutar o npm link
npm link
capital-gains 'json here'

# 2 - Executar o binário com o gerenciador de dependencia do node
npx capital-gains 'json here'

# 3 - Executar diretamente com node
node dist/app.js 'json here'
```

