# Introduction

In this page, we describe how to generate credentials of cloud providers and use them in D2C.

## Supported cloud providers

- **Amazon Web Services**
- **DigitalOcean**
- **Vultr**

Will be available soon:

- UpCloud
- Google Cloud Platform

## Amazon Web Services

### AWS QuickStart integration

1. Sign in into your [D2C account](https://panel.d2c.io/account/login)
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
5. You can generate your own policy [here](https://awspolicygen.s3.amazonaws.com). Here is a simple example of the region's limit (replace "eu-west-1" with regions you want to use):

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

## DigitalOcean

### DigitalOcean QuickStart integration

1. Sign in into your [D2C account](https://panel.d2c.io/account/login)
2. Click **+ Create host**
3. Click **Add provider** and choose **Digital Ocean**
4. Click connect and sign in into your Digital Ocean account

## Vultr

!!! note

    To allow D2C manage Vultr hosts, you should add 52.58.244.78/32 and 52.57.161.208/32 IP at the Access Control block

### Vultr QuickStart integration

1. Sign in into your [D2C account](https://panel.d2c.io/account/login)
2. Click **+ Create host**
3. Click **Add provider** and choose **Vultr**
4. Paste your Vultr API key

### Authorize D2C to your Vultr

If you do not have Vultr API key, you can create one with the Vultr account

1. Open the Vultr [API](https://my.vultr.com/settings/#settingsapi) page
2. Click **Enable API** and copy API key
3. Add 52.58.244.78/32 and 52.57.161.208/32 IP at the Access Control block
4. Then follow the Vultr QuickStart integration
