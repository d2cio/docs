# Introduction

Services can not run without a server on the Internet. D2C can automatically provide servers for you. Just provide an access token for your preferred cloud provider, and D2C will create/destroy/resize servers as you need them. Keep in mind that the cloud provider will charge you for resource usage based on your payment plan. D2C does not provide its own computing resources – it automates the provisioning process at cloud providers.

If you want to deploy services on your own in-house servers or at cloud providers that D2C does not currently support, you can do so. We provide a script that checks whether your host complies with the requirements to be added to the D2C dashboard and be a part of your project.

Each host can be used for any [project](/getting-started/projects/) multiple times.

## Supported operation systems and requirements

When you create a host, we install **Ubuntu 18.04** on it.

When you **connect** your own host it should have:

- Ubuntu 16.04/18.04 or Debian 8/9.
- Kernel version >= 4.2. We do not recommend 4.12 and 4.13 because of their poor performance in VXLAN tunneling: 60x decrease
- Free disk space: 5 Gb
- Opened incoming SSH port
- For the Weave network to work, you must open ports 6783, 6784 (TCP/UDP)
- hostname should be unique and cannot be named as "localhost"
- For better performance, we recommend ensuring that VXLAN tunneling is allowed

!!! note

    D2C does not support hosts with installed Docker to prevent any configuration conflicts.

## How to connect own host

### Video tutorial

<iframe width="640" height="360" src="https://www.youtube.com/embed/CfX8kkZny2Y" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
<br>

### Step by step tutorial

1. Sign in into your [D2C account](https://panel.d2c.io/account/signup).
2. Click **Connect host**
3. Copy the command
![Hosts](../img/hosts_connect_own.png)
4. Connect to your host via **SSH**
5. Run the command you copied before

## Supported hosting providers

- Amazon Web Services ([how to link AWS](/getting-started/cloud-providers/#amazon-web-services))
- Google Cloud Platform ([how to link GCP](/getting-started/cloud-providers/#google-cloud-platform))
- DigitalOcean ([how to link DigitalOcean](/getting-started/cloud-providers/#digital-ocean))
- Vultr ([how to link Vultr](/getting-started/cloud-providers/#vultr))
- UpCloud ([how to link Upcloud](/getting-started/cloud-providers/#upcloud))

## What software will be installed on hosts?

- Docker
- Weave Network
- Telegraf
- D2C HealthCheck Daemon

## Actions

- Terminal
- Restart
- Stop/Start
- Update system services (Docker, Weave, Telegraf, Lsync). You can do it one by one or separately
- Destroy (+force destroy)
- [Instance Resize](/platform/scaling/#vertical-scaling) (only for cloud hosts)
- Volume Resize (for AWS hosts)

## AWS EBS

Amazon EC2 provides additional storage for instances which calls [Amazon Elastic Block Storage](https://aws.amazon.com/ebs/?nc1=h_ls) (EBS). You can add additional EBS without stops of hosts using D2C interface.

![EBS](../img/scaling_ebs.png)

## GCP Zonal Persistent SSD disks

Google Compute Engine provides additional storage for instances which calls [Zonal Persistent SSD disks](https://cloud.google.com/compute/docs/disks/#pdspecs). You can add additional storage for your hosts using D2C interface.

![EBS](../img/gcp_volumes_resize.png)

## DigitalOcean Block Storage

DigitalOcean provides additional storage for droplets which calls [Block Storage volumes](https://www.digitalocean.com/docs/volumes/). You can add additional storage for your hosts using D2C interface.

![EBS](../img/do_block_storage.png)

## Demo hosts

You can create demo hosts for testing the platform.
The configuration of demo hosts is (2GB RAM, 1vCPU, 50GB SSD).
N. Amsterdam, Netherlands

Demo host creates for three hours and will be destroyed (with all services and containers) after this time expired. You can create another ones after that.

You can find a **+ Free demo host** on the dashboard.

## Logs

Each host has logs (server logs).

The line which has ellipsis marks, in the end, can be opened with a mouse click.

![Hosts](../img/host_logs.png)

## Connecting via SSH and SFTP

[Check the special article about SSH and SFTP access](/platform/ssh-sftp/).

!!! note

    One public key should be used only once regardless of its type (SSH or SFTP). If you need to change a method of connection, you need to create another public key or replace the old one.


## Services data

All data of services are stored in:
`/ebs/containers/serviceName`

For example, you can find sources in:
`/ebs/containers/serviceName/sources`

Backups:
`/ebs/containers/serviceName/backup`

### How the host page looks like

![Hosts](../img/host_page.png)
![Hosts](../img/host_page2.png)
![Hosts](../img/host_page3.png)
