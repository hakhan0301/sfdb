import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  if (event?.queryStringParameters?.key !== 'sussykey')
    return unauthorized();




  return {
    body: "Success",
    statusCode: 200
  }
}

function unauthorized(): APIGatewayProxyResult {
  return {
    body: 'Invalid "key" query string.',
    statusCode: 400
  }
}