# TuduApplicationServerless

A to do list with Serverless Backend Application using `AWS Lambda`, `Cloudformation`, `AWS SSM Parameter Store`, `DynamoDB`, `API Gateway`, simple `JWT authentication`, and `Serverless Framework`. Frontend using `ReactJS`, `Typescript`, `EmotionJS`, `ReduxTypescript`, & `ReactRouter`.

## Deploy Backend

1. Go to `/tudu-serverless-backend`, run: `yarn install` to collect dependencies
2. Update fields in the `serverless.yml` to your liking:
    1. set `provider.profile` to your aws cli profile name
    2. set `provider.environment.TUDUAPPREGION` to your preferred region. All resources will be located there.
    3. set `resources.Resources.TuduAppJwtSecret.Properties.Value` to your preferred JWT secret

3. Deploy by running: `serverless deploy`

## Run Frontend

1. Go to `/tudu-react-fe`, run: `yarn install` to collect all dependencies
2. Go to `/tudu-react-fe/src/api/apiConfig` and set `baseUrl` to your deployed endpoints.
3. Run the react application. Execute `yarn start`