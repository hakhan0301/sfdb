import { CfnOutput, CfnResource, Stack, StackProps } from 'aws-cdk-lib';

import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs';

import * as path from 'path';

const FUNCTIONS_SOURCE_PATH = path.join(__dirname, '..', 'src');

export class FunctionsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.createFunction('WarnUsers');
  }

  createFunction(functionName: string) {
    const fn = new lambda.NodejsFunction(this, functionName, {
      functionName: `sfdb-${functionName}`,
      entry: path.join(FUNCTIONS_SOURCE_PATH, functionName, 'index.ts'),
      handler: 'handler',
      bundling: { minify: false }
    });

    const functionUrl = new CfnResource(this, `${functionName}-URL`, {
      type: 'AWS::Lambda::Url',
      properties: {
        TargetFunctionArn: fn.functionArn,
        AuthType: 'NONE',
        Cors: { AllowOrigins: ['*'] },
      }
    });

    new CfnResource(this, `${functionName}-URL-ExecutePermissions`, {
      type: 'AWS::Lambda::Permission',
      properties: {
        FunctionName: fn.functionName,
        Principal: '*',
        Action: 'lambda:InvokeFunctionUrl',
        FunctionUrlAuthType: 'NONE',
      }
    });

    new CfnOutput(this, `${functionName}-ExecuteUrl`, {
      value: functionUrl.getAtt('FunctionUrl').toString(),
      exportName: `${functionName}-ExecuteUrl`,
    });
  }
}
