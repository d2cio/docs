# Introduction

In this page, we describe how to generate credentials of cloud providers and use them in D2C.

## Supported cloud providers

- **Amazon Web Services**
- **Digital Ocean**

Will be available soon:

- Vultr
- Microsoft Azure

## Amazon Web Services

### AWS QuickStart integration

1. Sign in into your [D2C account](https://panel.d2c.io/account/signup)
2. Click **+ Create host**
3. Click **Add provider** and choose **Amazon Web Services**
5. Paste your AWS credentials (Access Key ID and Secret Access Key)

### Generate AWS credentials

If you do not have AWS credentials, you can create one with the AWS Management console

1. From the AWS [IAM Users dashboard](https://console.aws.amazon.com/iam/home?#/users), select Add user
2. Enter a username (e.g. d2c). Select the “Programmatic access” checkbox and click **Next: Permissions**
3. Select the "Attach existing policies directly" button at the top. Search for the AdministratorAccess policy, select it, then click **Next: Review**
4. Click Create user
5. Copy Access Key ID and Secret Access Key or save a .csv file with the download button
6. Then follow the AWS quickstart integration

### Create an additional policy

1. Open the AWS [policies](https://console.aws.amazon.com/iam/home?#/policies) page
2. Click **Create policy**
3. Select **Create Your Own Policy**
4. Enter a name (e.g. d2c-policy)
5. You can generate your own policy [here](https://awspolicygen.s3.amazonaws.com). Here is a simple example with the regions limit (replace "eu-west-1" with regions you want to use):

        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Action": [
                        "ec2:*"
                    ],
                    "Effect": "Allow",
                    "Resource": "*",
                    "Condition": {
                        "StringEquals": {
                            "ec2:Region": "eu-west-1"
                        }
                    }
                }
            ]
        }

6. Click **Create policy**
7. Now you can [Generate AWS credentials](/getting-started/cloud-providers/#generate-aws-credentials) with your own policy

## Digital Ocean

### Digital Ocean QuickStart integration

1. Now go into your [D2C account](https://panel.d2c.io/account/signup)
2. Click **+ Create host**
3. Click **Add provider** and choose **Digital Ocean**
4. Paste your Digital Ocean token

### Authorize D2C to your Digital Ocean

If you do not have Digital Ocean token, you can create one with the Digital Ocean account

1. Open the Digital Ocean [API](https://cloud.digitalocean.com/settings/api/tokens) page
2. Click **Generate New Token**
3. Give the token a name and click **Generate Token**. Copy it
4. Then follow the Digital Ocean QuickStart integration

<!-- ## Vultr

### Authorize D2C to your Vultr
-->
