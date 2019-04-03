# SPA on SAM

A simple demo project for getting an Angular SPA hosted on AWS SAM.

The directory 'sam' holds the AWS SAM project, and the 'spa' directory holds the Angular SPA.

## Environment

Before running locally, you'll need to set up a couple of .env files:

### sam/.env

Before building and deploying, create sam/.env with the environment variables required for deploying the frontend:

```
# your AWS security creds (if not otherwise provided in the environment)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=ap-southeast-2

# a bucket where CloudFormation deployment artefacts can be stored
BUILD_BUCKET=
ENVIRONMENT=dev

# the name of the data bucket to use when running locally
BUCKET_NAME=

```

### spa/.env

```
# your AWS security creds (if not otherwise provided in the environment)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=ap-southeast-2

# the s3 bucket to deploy the frontend to
BUCKET_NAME=
# the cloudfront distribution id from the backend deploy
DISTRIBUTION_ID=
ENVIRONMENT=dev
```

## Development

Run:

```
cd sam && npm start
cd spa && npm start
```

## Build & deploy

Run:

```
cd sam && npx run-s build package deploy:dev
cd spa && npx run-s build deploy:dev
```
