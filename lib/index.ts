import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { buildTables } from './persistence';
import { buildFunctions } from './functions';

export class MonitorStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const { lastProcessedTable } = buildTables(this);
    const { fetchLambda } = buildFunctions(this, lastProcessedTable);
  }
}
