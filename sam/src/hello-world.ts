import {
    APIGatewayProxyEvent,
    APIGatewayProxyHandler,
    APIGatewayProxyResult
} from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (
    _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    return {
        body: JSON.stringify({ message: "Hello, world" }),
        statusCode: 200
    };
};
