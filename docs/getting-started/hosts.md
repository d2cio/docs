# Introduction

Services can not run without a server on the Internet. D2C can automatically provide servers for you. Just provide an access token for your preferred cloud provider, and D2C will create/destroy/resize servers as you need them. Keep in mind that the cloud provider will charge you for resource usage based on your payment plan. D2C does not provide its own computing resources – it automates the provisioning process at cloud providers.

If you want to deploy services on your own in-house servers or at cloud providers that D2C does not currently support, you can do so. We provide a script that checks whether your host complies with the requirements to be added to the D2C dashboard and be a part of your project.

Each host can be used for any [project](/getting-started/projects/) multiple times.

## Supported operation systems and requirements

When you create a host, we install **Ubuntu 16.04** on it.

When you **connect** your own host it should have:

- Ubuntu 14.04/16.04 or Debian 8/9.
- Kernel version >= 4.0 for better Docker performance using OverlayFS, otherwise, the storage driver will be "devicemapper"
- Free disk space: 5 Gb
- Opened incoming SSH port
- For the Weave network to work, you must open ports 6783, 6784 (TCP/UDP)

!!! note

    D2C does not support hosts with installed Docker to prevent any configuration conflicts.

## How to connect own host

1. Sign in into your [D2C account](https://panel.d2c.io/account/signup).
2. Click **Connect host**
3. Copy the command
![Hosts](../img/hosts_connect_own.png)
4. Connect to your host via **SSH**
5. Run the command you copied before

## Supported cloud providers

- Amazon Web Services ([how to link AWS](/getting-started/cloud-providers/#amazon-web-services))
- Digital Ocean ([how to link DigitalOcean](/getting-started/cloud-providers/#digital-ocean))

Will be available soon:

- Microsoft Azure
- Vultr

## What software will be installed on hosts?

- Docker
- Weave Network
- Telegraf
- D2C HealthCheck Daemon

## Actions

- Terminal
- Restart
- Stop (Start)
- Update system services (Docker, Weave, Telegraf)
- Destroy (+force destroy)
- [Instance Resize](/platform/scaling/#vertical-scaling) (only for cloud hosts)
- Volume Resize (for AWS hosts)

## AWS EBS

Amazon EC2 provides additional storage which calls [Amazon Elastic Block Storage](https://aws.amazon.com/ebs/?nc1=h_ls) (EBS). You can add additional EBS without stops of hosts.

![EBS](../img/scaling_ebs.png)

## Logs

Each host has logs (server logs).

The line which has ellipsis marks, in the end, can be opened with a mouse click.

![Hosts](../img/host_logs.png)

## Connecting via SSH and SFTP

!!! note

    One public key should be used only once regardless of its type (SSH or SFTP). If you need to change a method of connection, you need to create another public key or replace the old one.

Open a terminal of a host and execute following commands using your keys.

[How to create SSH keys (BitBucket manual)](https://confluence.atlassian.com/bitbucketserver/creating-ssh-keys-776639788.html)

### For SSH


```bash
SSH_KEY="your public key"
echo $SSH_KEY >> ~/.ssh/authorized_keys
```

### For SFTP

```bash
SSH_KEY="your public key"
echo "restrict,command=\"sudo /usr/lib/openssh/sftp-server -d /ebs/containers\" $SSH_KEY" >> ~/.ssh/authorized_keys
```

### How the host page looks like

![Hosts](../img/host_page.png)
![Hosts](../img/host_page2.png)
![Hosts](../img/host_page3.png)
