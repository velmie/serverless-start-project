/**
 * @interface LambdaRequestPayloadInterface
 */
export interface LambdaRequestPayloadInterface {
  body: string;
  statusCode: number;
  errorMessage?: string;
}
