### SPA on SAM

A simple demo project for getting an Angular SPA hosted on AWS SAM.

The directory 'sam' holds the AWS SAM project, and the 'spa' directory holds the Angular SPA.

## Development

Run:

```
cd sam && npm start
cd spa && npm start
```

## Build & deploy

Before building and deploying, create a .env file in the root directory with the following content:

```
// todo:
```

```
cd sam && npx run-s build package deploy:dev
cd spa && npx run-s build deploy:dev
```
