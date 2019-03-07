export function isWarmUp(event: any): boolean {
  return event.source === 'serverless-plugin-warmup';
}
