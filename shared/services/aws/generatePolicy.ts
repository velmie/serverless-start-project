import { AuthPolicy } from '@services/aws/authPolicy';

const generatePolicy = (principalId: string, context: object, methodArn: string, effect : string = 'allow') => {
  // build apiOptions for the AuthPolicy
  const apiOptions: any = {};
  const tmp = methodArn.split(':');
  /*tslint:disable: no-magic-numbers*/
  const apiGatewayArnTmp = tmp[5].split('/');
  const awsAccountId = tmp[4];
  apiOptions.region = tmp[3];
  apiOptions.restApiId = apiGatewayArnTmp[0];
  apiOptions.stage = apiGatewayArnTmp[1];

  const policy = new AuthPolicy(principalId, context, awsAccountId, apiOptions);

  if (effect === 'deny') {
    policy.denyAllMethods();
  } else if (effect === 'allow') {
    policy.allowAllMethods();
  }
  return policy.build();
};

export {
  generatePolicy
};
