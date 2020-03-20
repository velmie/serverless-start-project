import { Statement } from 'aws-lambda';

/**
 * AuthPolicy receives a set of allowed and denied methods and generates a valid
 * AWS policy for the API Gateway authorizer. The constructor receives the calling
 * user principal, the AWS account ID of the API owner, and an apiOptions object.
 * The apiOptions can contain an API Gateway RestApi Id, a region for the RestApi, and a
 * stage that calls should be allowed/denied for. For example
 * {
 *   restApiId: 'xxxxxxxxxx',
 *   region: 'us-east-1',
 *   stage: 'dev'
 * }
 *
 * var testPolicy = new AuthPolicy('[principal user identifier]', context, '[AWS account id]', apiOptions);
 * testPolicy.allowMethod(AuthPolicy.HttpVerb.GET, '/users/username');
 * testPolicy.denyMethod(AuthPolicy.HttpVerb.POST, '/pets');
 * context.succeed(testPolicy.build());
 *
 * @class AuthPolicy
 * @constructor
 */
/* tslint:disable */
export class AuthPolicy {
  /**
   * The AWS account id the policy will be generated for. This is used to create
   * the method ARNs.
   *
   * @property awsAccountId
   * @type {String}
   */
  private awsAccountId: string;

  /**
   * The principal used for the policy, this should be a unique identifier for
   * the end user.
   *
   * @property principalId
   * @type {String}
   */
  private principalId: string;

  /**
   * The stringified value of the specified key-value pair of the context map
   * returned from an API Gateway custom authorizer Lambda function. Example:
   * "context" : {
   *  "key": "value",
   *  "numKey": 1,
   *  "boolKey": true
   * }
   *
   * @property context
   * @type {String}
   */
  private context: object;

  /**
   * The policy version used for the evaluation. This should always be '2012-10-17'
   *
   * @property version
   * @type {String}
   * @default '2012-10-17'
   */
  private version: string = '2012-10-17';

  /**
   * The regular expression used to validate resource paths for the policy
   *
   * @property pathRegex
   * @type {RegExp}
   * @default '^\/[/.a-zA-Z0-9-\*]+$'
   */
  private pathRegex = new RegExp(/^[/.a-zA-Z0-9-*]+$/);

  // these are the internal lists of allowed and denied methods. These are lists
  // of objects and each object has 2 properties: A resource ARN and a nullable
  // conditions statement.
  // the build method processes these lists and generates the approriate
  // statements for the final policy
  private allowMethods: any[] = [];
  private denyMethods: any[] = [];

  private restApiId: string;
  private region: string;
  private stage: string;

  private HttpVerb: object = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    HEAD: 'HEAD',
    DELETE: 'DELETE',
    OPTIONS: 'OPTIONS',
    ALL: '*',
  };

  public constructor(principal: string, context: object, awsAccountId: string, apiOptions: any) {
    this.awsAccountId = awsAccountId;
    this.principalId = principal;
    this.context = context;

    if (!apiOptions || !apiOptions.restApiId) {
      this.restApiId = '*';
    } else {
      this.restApiId = apiOptions.restApiId;
    }
    if (!apiOptions || !apiOptions.region) {
      this.region = '*';
    } else {
      this.region = apiOptions.region;
    }
    if (!apiOptions || !apiOptions.stage) {
      this.stage = '*';
    } else {
      this.stage = apiOptions.stage;
    }
  }

  /**
   * Adds a method to the internal lists of allowed or denied methods. Each object in
   * the internal list contains a resource ARN and a condition statement. The condition
   * statement can be null.
   *
   * @method addMethod
   * @param {String} effect - The effect for the policy. This can only be 'Allow' or 'Deny'.
   * @param {String} verb - he HTTP verb for the method, this should ideally come from the
   *                 AuthPolicy.HttpVerb object to avoid spelling mistakes
   * @param {String} resource - The resource path. For example '/pets'
   * @param {Object} conditions - The conditions object in the format specified by the AWS docs.
   * @return {void}
   */
  private addMethod(effect: string, verb: string, resource: string, conditions: object) {
    if (verb !== '*' && !{}.hasOwnProperty.call(this.HttpVerb.hasOwnProperty, verb)) {
      throw new Error(`Invalid HTTP verb ${verb}. Allowed verbs in AuthPolicy.HttpVerb`);
    }

    if (!this.pathRegex.test(resource)) {
      throw new Error(`Invalid resource path: ${resource}. Path should match ${this.pathRegex}`);
    }

    let cleanedResource = resource;
    if (resource.substring(0, 1) === '/') {
      cleanedResource = resource.substring(1, resource.length);
    }
    const resourceArn = `arn:aws:execute-api:${this.region}:${this.awsAccountId}:${this.restApiId}/${this.stage}/` +
      `${verb}/${cleanedResource}`;

    if (effect.toLowerCase() === 'allow') {
      this.allowMethods.push({
        resourceArn,
        conditions,
      });
    } else if (effect.toLowerCase() === 'deny') {
      this.denyMethods.push({
        resourceArn,
        conditions,
      });
    }
  }

  /**
   * Returns an empty statement object prepopulated with the correct action and the
   * desired effect.
   *
   * @method getEmptyStatement
   * @param {String} effect - The effect of the statement, this can be 'Allow' or 'Deny'
   * @return {Statement} An empty statement object with the Action, Effect, and Resource
   *                  properties prepopulated.
   */
  private getEmptyStatement = (effect: string): Statement => {
    const statementEffect = effect.substring(0, 1).toUpperCase() + effect.substring(1, effect.length).toLowerCase();
    return <Statement>{
      Action: 'execute-api:Invoke',
      Effect: statementEffect,
      Resource: []
    };
  };

  /**
   * This function loops over an array of objects containing a resourceArn and
   * conditions statement and generates the array of statements for the policy.
   *
   * @method getStatementsForEffect
   * @param {String} effect - The desired effect. This can be 'Allow' or 'Deny'
   * @param {Array} methods - An array of method objects containing the ARN of the resource
   *                and the conditions for the policy
   * @return {Array} an array of formatted statements for the policy.
   */
  private getStatementsForEffect = (effect: string, methods: any[]): Statement[] => {
    const statements: Statement[] = [];

    if (methods.length > 0) {
      const statement: Statement = this.getEmptyStatement(effect);

      for (let i = 0; i < methods.length; i++) {
        const curMethod = methods[i];
        if (curMethod.conditions === null || curMethod.conditions.length === 0) {
          (<{ Resource: string[] }>statement).Resource.push(curMethod.resourceArn);
        } else {
          const conditionalStatement = this.getEmptyStatement(effect);
          (<{ Resource: string[] }>statement).Resource.push(curMethod.resourceArn);
          conditionalStatement.Condition = curMethod.conditions;
          statements.push(conditionalStatement);
        }
      }

      if ((<{ Resource: string[] | null }>statement).Resource !== null && (<{ Resource: string[] }>statement).Resource.length > 0) {
        statements.push(statement);
      }
    }

    return statements;
  };

  /**
   * Adds an allow '*' statement to the policy.
   *
   * @method allowAllMethods
   */
  public allowAllMethods() {
    this.addMethod.call(this, 'allow', '*', '*', null);
  };

  /**
   * Adds a deny '*' statement to the policy.
   *
   * @method denyAllMethods
   */
  public denyAllMethods() {
    this.addMethod.call(this, 'deny', '*', '*', null);
  };

  /**
   * Generates the policy document based on the internal lists of allowed and denied
   * conditions. This will generate a policy with two main statements for the effect:
   * one statement for Allow and one statement for Deny.
   * Methods that includes conditions will have their own statement in the policy.
   *
   * @method build
   * @return {Object} The policy object that can be serialized to JSON.
   */
  public build() {
    if ((!this.allowMethods || this.allowMethods.length === 0) &&
      (!this.denyMethods || this.denyMethods.length === 0)) {
      throw new Error('No statements defined for the policy');
    }

    let policy = {} as any;
    policy.principalId = this.principalId;
    policy.context = this.context;
    let doc = {} as any;
    doc.Version = this.version;
    doc.Statement = [];

    doc.Statement = doc.Statement.concat(this.getStatementsForEffect.call(this, 'Allow', this.allowMethods));
    doc.Statement = doc.Statement.concat(this.getStatementsForEffect.call(this, 'Deny', this.denyMethods));

    policy.policyDocument = doc;

    return policy;
  };
}
