# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Running application using Docker
- Docker and Docker Compose installation required.
- To run containerized application please use command below:

```
docker-compose up
```
## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

## Platform performance tables

### Express

|                    |         |
| ------------------ | ------- |
| http.codes.200:    | 525     |
| http.codes.201:    | 175     |
| http.codes.400:    | 175     |
| http.request_rate: | 104/sec |
| http.requests:     | 875    |
| http.response_time:
| min: | 0
| max: | 138
| median: | 3
| p95: | 76
| p99: | 133
| http.responses: | 875
| vusers.completed: | 175
| vusers.created: | 175
| vusers.created_by_name.test /users: | 175
| vusers.session_length:
| min: | 79
| max: | 152
| median: | 92.8
| p95: | 144
| p99: | 149.9

### Fastify

|                    |        |
| ------------------ | ------ |
| http.codes.200:    | 510    |
| http.codes.201:    | 170    |
| http.codes.400:    | 170    |
| http.request_rate: | 99/sec |
| http.requests:     | 850   |
| http.response_time:
| min: | 0
| max: | 145
| median: | 4
| p95: | 77.5
| p99: | 133
| http.responses: | 850
| vusers.completed: | 170
| vusers.created: | 170
| vusers.created_by_name.test /boards: | 170
| vusers.session_length:
| min: | 81.7
| max: | 157.6
| median: | 100.5
| p95: | 144
| p99: | 156
