import {
    APIGatewayProxyEvent,
    APIGatewayProxyHandler,
    APIGatewayProxyResult
} from 'aws-lambda';
import { S3 } from 'aws-sdk/clients/all';
import { config } from './config';

const s3 = new S3({ region: config.region });

export const handler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    if (!event.body || !event.pathParameters) {
        return {
            body: JSON.stringify({ message: 'Invalid request' }),
            statusCode: 400
        };
    }
    try {
        const body = event.body;
        const listId = event.pathParameters.listId;
        const itemId = event.pathParameters.itemId;
        const key = `lists/${listId}/${itemId}.json`;
        await s3
            .putObject({
                Body: body,
                Bucket: config.bucketName,
                Key: key
            })
            .promise();
    } catch (err) {
        console.error(err);
        return {
            body: JSON.stringify({ message: 'Unexpected error' }),
            statusCode: 500
        };
    }
    return {
        body: JSON.stringify({ message: 'All good' }),
        statusCode: 200
    };
};
