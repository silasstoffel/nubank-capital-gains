FROM node:22.12.0

WORKDIR /usr/app

COPY package.json package-lock.json ./
COPY jest.config.js tsconfig.json .nvmrc ./
COPY src/ ./src
COPY data/ ./data

RUN npm install

RUN npm run build

RUN chmod +x dist/app.js

# Linking the package to global node_modules
# This allows the app to be used globally from anywhere in the system
RUN npm link

# Keeping container up to allow user access and run:
# node dist/app.js args
CMD ["tail", "-f", "/dev/null"]
