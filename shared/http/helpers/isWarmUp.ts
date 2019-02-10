import {APIGatewayEvent} from 'aws-lambda';

export function isWarmUp(event: APIGatewayEvent): boolean {
  return event.source === 'serverless-plugin-warmup';
}