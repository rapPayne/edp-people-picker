// https://docs.aws.amazon.com/cdk/v2/guide/ecs_example.html

const { Stack, Duration } = require('aws-cdk-lib');
const ecr = require('aws-cdk-lib/aws-ecr');
const ec2 = require("aws-cdk-lib/aws-ec2");
const ecs = require("aws-cdk-lib/aws-ecs");
const ecs_patterns = require("aws-cdk-lib/aws-ecs-patterns");

class EcsSetupStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "project-vpc", {
      maxAzs: 3 // Default is all AZs in region
    });

    const cluster = new ecs.Cluster(this, "edp-cluster", {
      vpc: vpc
    });

    const repo = ecr.Repository.fromRepositoryArn(
      this,
      'Servic1Repo',
      'arn:aws:ecr:us-east-2:397188165174:repository/edp-ecr-repo'
    );
    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "edp-fargate-svc", {
      cluster: cluster, // Required
      cpu: 512, // Default is 256
      desiredCount: 2, // Default is 1
      taskImageOptions: { 
        image: ecs.ContainerImage.fromEcrRepository(repo, '716b21d56d6e5419c24520706c4ad2e5b6756351'),
        containerPort: 3500
      },
      memoryLimitMiB: 1024, // Default is 512
      publicLoadBalancer: true // Default is true
    });
  }
}

module.exports = { EcsSetupStack }

// cdk bootstrap
// cdk synth
// cdk deploy

// cdk destroy
