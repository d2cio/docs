# Introduction

At this page, we describe how to generate credentials of storage providers and use them in D2C.

## Supported storage providers

- [**Amazon S3**](/providers/storage-providers/#amazon-s3)
- [**Backblaze**](/providers/storage-providers/#backblaze)
- [**Dropbox**](/providers/storage-providers/#dropbox-onedrive-hubic)
- [**DigitalOcean Spaces**](/providers/storage-providers/#digitalocean-spaces)
- [**Microsoft OneDrive**](/providers/storage-providers/#dropbox-onedrive-hubic)
- [**Hubic**](/providers/storage-providers/#dropbox-onedrive-hubic)
- [**FTP/SFTP**](/providers/storage-providers/#ftpsftp)

## Dropbox, OneDrive, Hubic

These providers connect using oAuth, and it's the simplest method.

1. Sign in into your [D2C account](https://panel.d2c.io/user/login)
2. Move to [providers page](https://panel.d2c.io/account/providers)
3. Click **+Add provider**
4. Choose Dropbox, OneDrive or Hubic
5. Click **Connect with OAuth**, sign in into your account and click **Confirm**

## Amazon S3

1. Sign in into your [D2C account](https://panel.d2c.io/user/login)
2. Move to [providers page](https://panel.d2c.io/account/providers)
3. Click **+Add provider**
4. Choose S3
5. Paste your AWS credentials (Access Key ID and Secret Access Key) and click **Confirm**

### Generate AWS credentials

If you do not have AWS credentials, you can create one with the AWS Management console

1. From the AWS [IAM Users dashboard](https://console.aws.amazon.com/iam/home?#/users), select Add user
2. Enter a username (e.g. d2c). Select the “Programmatic access” checkbox and click **Next: Permissions**
3. Select the "Attach existing policies directly" button at the top. Search for the AdministratorAccess policy, select it, then click **Next: Review**
4. Click Create user
5. Copy Access Key ID and Secret Access Key or save a .csv file with the download button
6. Then follow the AWS S3 quickstart integration

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
7. Now you can [Generate AWS credentials](/providers/storage-providers/#generate-aws-credentials) with your own policy

## DigitalOcean Spaces

### DigitalOcean Spaces QuickStart integration

1. Sign in into your [D2C account](https://panel.d2c.io/user/login)
2. Move to [providers page](https://panel.d2c.io/account/providers)
3. Click **+Add provider**
4. Choose Digital Ocean Spaces
5. Paste your Digital Ocean Spaces credentials (Key and Secret) and click **Confirm**

### Authorize D2C to your DigitalOcean Spaces

If you do not have Digital Ocean Spaces credentials, you can create it with the Digital Ocean account

1. Open the [DigitalOcean Spaces](https://cloud.digitalocean.com/spaces) page
2. Click **Manage Keys** and then **Generate New Key**
3. Give the key a name and apply it. Copy your Key and Secret
4. Then follow the Digital Ocean Spaces QuickStart integration

## Backblaze

### Backblaze QuickStart integration

1. Sign in into your [D2C account](https://panel.d2c.io/user/login)
2. Move to [providers page](https://panel.d2c.io/account/providers)
3. Click **+Add provider**
4. Choose Backblaze
5. Paste your Backblaze credentials (Account ID and Application Key) and click **Confirm**

### Create Backbaze credentials

If you do not have Backblaze credentials, you can create it with the Backblaze account

1. Open the Backblaze [Buckets](https://secure.backblaze.com/b2_buckets.htm) page
2. Click **Show Account ID and Application Key**
3. Click **Create Application Key**. Copy Account ID and Application Key
4. Then follow the Backblaze QuickStart integration

## FTP/SFTP

1. Sign in into your [D2C account](https://panel.d2c.io/user/login)
2. Move to [providers page](https://panel.d2c.io/account/providers)
3. Click **+Add provider**
4. Choose FTP or SFTP
5. Paste your endpoint, port, login and password and click **Confirm**
