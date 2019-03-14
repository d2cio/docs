# Introduction

In this page, we describe how to generate credentials of cloud providers and use them in D2C.

## Supported cloud providers

- **Amazon Web Services**
- **DigitalOcean**
- **Vultr**
- **UpCloud**
- **Google Cloud Platform**

## Amazon Web Services

### Video tutorial

<iframe width="640" height="360" src="https://www.youtube.com/embed/LT866IxJ5Qo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
<br>

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

## Google Cloud Platform

### Video tutorial

<iframe width="640" height="360" src="https://www.youtube.com/embed/WhbvLZLGUiE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
<br>

### GCP QuickStart integration

!!! note

    Make sure that you have enabled API for Compute Engine and have a billing account in GCP

1. Sign in into your [D2C account](https://panel.d2c.io/account/login)
2. Click **+ Create host**
3. Click **Add provider** and choose **Google Cloud**
5. Upload your JSON file of your [Service account](https://console.cloud.google.com/iam-admin/serviceaccounts) with credentials

### Generate GCP JSON file

If you do not have GCP JSON file, you can create one with the GCP console

1. Create a new project in [GCP](https://console.cloud.google.com) if it needs
2. From the GCP [APIs & Services](https://console.cloud.google.com/apis/dashboard) click **ENABLE APIS AND SERVICES**, find **Compute Engine API** and click **Enable**
3. Then go to [Credentials](https://console.cloud.google.com/apis/api/compute.googleapis.com/credentials) and choose a created Service Account (it should redirect you to [IAM & admin/Service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts))
4. At the Service accounts page create a new key for a created service account (Actions → ⋮ → Create key) in JSON format
5. Then follow the GCP quickstart integration

## DigitalOcean

If you don't have a DigitalOcean account you can [register with this link](https://m.do.co/c/3e6774908846) and get free credit - **$100**.

### Video tutorial

<iframe width="640" height="360" src="https://www.youtube.com/embed/bCzGLQ6op0U" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
<br>

### DigitalOcean QuickStart integration

1. Sign in into your [D2C account](https://panel.d2c.io/account/login)
2. Click **+ Create host**
3. Click **Add provider** and choose **DigitalOcean**
4. Click connect and sign in into your DigitalOcean account

## Vultr

If you don't have a Vultr account you can [register with this link](https://www.vultr.com/?ref=7772421-4F) and get free credit - **$50**.

### Video tutorial

<iframe width="640" height="360" src="https://www.youtube.com/embed/5pQzCXkhNKM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
<br>

### Vultr QuickStart integration

!!! note

    To allow D2C manage Vultr hosts, you should add 52.58.244.78/32 and 52.57.161.208/32 IP at the Access Control block

1. Sign in into your [D2C account](https://panel.d2c.io/account/login)
2. Click **+ Create host**
3. Click **Add provider** and choose **Vultr**
4. Paste your Vultr API key

### Authorize D2C to your Vultr

If you do not have Vultr API key, you can create one with the Vultr account

1. Open the Vultr [API](https://my.vultr.com/settings/#settingsapi) page
2. Click **Enable API** and copy API key
3. Add 52.58.244.78/32 and 52.57.161.208/32 IP at the Access Control block
4. Then follow the **Vultr QuickStart integration**

## UpCloud

If you don't have an Upcloud account you can [register with this link](https://upcloud.com/signup/?promo=8YR3X6) and get free credit - **$25**.

### Video tutorial

<iframe width="640" height="360" src="https://www.youtube.com/embed/adxjApELOu8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### UpCloud QuickStart integration

1. Sign in into your [D2C account](https://panel.d2c.io/account/login)
2. Click **+ Create host**
3. Click **Add provider** and choose **UpCloud**
4. Paste your API username and API password

### Create API user

1. Open the UpCloud [User Accounts](https://my.upcloud.com/account#t2) page
2. Click **Add user**
3. Fill in account details as username, password, phone etc.
4. Disable access to Control Panel
4. Allow **API connections** from *All addresses*
5. Then follow the **UpCloud QuickStart integration**
