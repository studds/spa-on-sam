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
    if (!event.pathParameters) {
        return {
            body: JSON.stringify({ message: 'Invalid request' }),
            statusCode: 400
        };
    }
    try {
        const listId = event.pathParameters.listId;
        const prefix = `lists/${listId}/`;
        const response = await s3
            .listObjectsV2({
                Bucket: config.bucketName,
                Prefix: prefix
            })
            .promise();
        const s3Objects = response.Contents || [];

        s3Objects.sort((a, b) => {
            if (!a.LastModified) {
                return 1;
            }
            if (!b.LastModified) {
                return -1;
            }
            return a.LastModified.getTime() - b.LastModified.getTime();
        });

        const items: any[] = [];
        for (const s3Object of s3Objects) {
            const object = await getObjectBody(s3Object);
            if (object) {
                items.push(object);
            }
        }
        return {
            body: JSON.stringify({ items }),
            statusCode: 200
        };
    } catch (err) {
        console.error(err);
        return {
            body: JSON.stringify({ message: 'Unexpected error' }),
            statusCode: 500
        };
    }
};
async function getObjectBody(s3Object: S3.Object) {
    if (s3Object.Key) {
        const obj = await s3
            .getObject({ Bucket: config.bucketName, Key: s3Object.Key })
            .promise();
        if (obj.Body) {
            return JSON.parse(obj.Body.toString());
        }
    }
}
