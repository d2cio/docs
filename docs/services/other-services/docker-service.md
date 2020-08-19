# Introduction

There are different ways to deploy Docker services:

- Using an official Docker image
- Using a public (unofficial) Docker image
- Building an image using any other Docker image. You can find an example in the article about [creating a Varnish using a debian image](https://d2c.io/post/deploy-varnish)
- Building your own Docker image on DockerHub/other Docker Registry. Will be in a separate post.

## Creating Docker service

At first, you need to open or create any project and click **New service**. You can also use **Create** button in the menu and choose **Service**. You will see a list of services which can be deployed with D2C:

![Create service](../../img/new_interface/create_service.png)

Choose Docker

## General settings

![Create docker service - general settings](../../img/new_interface/creating_service_docker_general_settings.png)

### Docker image

- For **official** repositories specify just its name.

Examples: `wordpress`, `sentry`, `ghost` etc.

- For **public (unofficial)** repositories published in DockerHub specify accountname/repositoryname.

Examples: `d2cio/varnish`, `million12/varnish` etc.

- For **public (unofficial)** repositories published anywhere on the Internet specify a link to a Docker image.

Examples: `quay.io/coreos/etcd`, `quay.io/prometheus/prometheus` etc.

### Image version

Specify a version of a Docker image using tag names.

Examples: `6.0`, `latest`

## Name

The name should start with a letter and contain up to 16 characters (Latin letters, numbers, hyphen).

Each service has its unique name. Services can communicate with each other by service names (or alias-names, e.g. `servicename-1` or `servicename`). Moreover, we use them to create public domains like: **[servicename]-[www].[accountID].[at].d2c.io** for your services which are served by [NGINX](/services/other-services/nginx) or [HAProxy](/services/other-services/haproxy).

## Network settings

![Create docker service - network settings](../../img/new_interface/creating_service_network_settings.png)

By default, application containers are started inside a private network and have dynamically assigned local IP addresses. Apps can reference each other by service name. It does not matter on which host the app is running – all private network intercommunication is transparent for all services in your account.

Access from the Internet is disabled by default (except edge services). You can enable access from the Internet while creating or editing service. For example, if you publish your application on port 3000, you can access it at **ip_address_of_a_host:3000**.

## Docker settings

![Create docker service - docker settings](../../img/new_interface/creating_service_docker_settings.png)

### Listen interface

You can set an interface your container should listen.

Examples: `all`, `default_ipv4`, `lo`, `docker0`, `eth0`

### Network

By default all the containers are running in [Weave network](https://github.com/weaveworks/weave). You can also set `Host` network for standalone containers. It removes network isolation between the container and the Docker host, and use the host's networking directly. You can find [more info](https://docs.docker.com/network/host/) in Docker documentation.

### Extra capabilities

By default, Docker containers are "unprivileged" and cannot, for example, run a Docker daemon inside a Docker container. This is because by default a container is not allowed to access any devices, but a "privileged" container is given access to all devices.

Capability      | Description
--------------- | ---------------------------------------------------------------------------------------------------------------
SYS_MODULE      | Load and unload kernel modules.
SYS_RAWIO       | Perform I/O port operations (iopl(2) and ioperm(2)).
SYS_PACCT       | Use acct(2), switch process accounting on or off.
SYS_ADMIN       | Perform a range of system administration operations.
SYS_NICE        | Raise process nice value (nice(2), setpriority(2)) and change the nice value for arbitrary processes.
SYS_RESOURCE    | Override resource Limits.
SYS_TIME        | Set system clock (settimeofday(2), stime(2), adjtimex(2)); set real-time (hardware) clock.
SYS_TTY_CONFIG  | Use vhangup(2); employ various privileged ioctl(2) operations on virtual terminals.
AUDIT_CONTROL   | Enable and disable kernel auditing; change auditing filter rules; retrieve auditing status and filtering rules.
MAC_ADMIN       | Allow MAC configuration or state changes. Implemented for the Smack LSM.
MAC_OVERRIDE    | Override Mandatory Access Control (MAC). Implemented for the Smack Linux Security Module (LSM).
NET_ADMIN       | Perform various network-related operations.
SYSLOG          | Perform privileged syslog(2) operations.
DAC_READ_SEARCH | Bypass file read permission checks and directory read and execute permission checks.
LINUX_IMMUTABLE | Set the FS_APPEND_FL and FS_IMMUTABLE_FL i-node flags.
NET_BROADCAST   | Make socket broadcasts, and listen to multicasts.
IPC_LOCK        | Lock memory (mlock(2), mlockall(2), mmap(2), shmctl(2)).
IPC_OWNER       | Bypass permission checks for operations on System V IPC objects.
SYS_PTRACE      | Trace arbitrary processes using ptrace(2).
SYS_BOOT        | Use reboot(2) and kexec_load(2), reboot and load a new kernel for later execution.
LEASE           | Establish leases on arbitrary files (see fcntl(2)).
WAKE_ALARM      | Trigger something that will wake up the system.
BLOCK_SUSPEND   | Employ features that can block system suspend.

### Devices

Devices which should be mount in a container.

Example: `/dev/net/tun`

## Application settings

![Create docker service - application settings](../../img/new_interface/creating_service_docker_application_settings.png)

You can choose what to use for getting application sources.

!!! note

```
Make sure that your application is listening on 0.0.0.0 (not 127.0.0.1) when deploying an application service
```

### Git

The most recommended method. Specify an URL to your repository and a branch you want to use.

If you use a private repository you should add an SSH key to your account. Here are manuals about adding SSH keys into your [GitHub](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/), [BitBucket](https://confluence.atlassian.com/bitbucket/add-an-ssh-key-to-an-account-302811853.html), [GitLab](https://docs.gitlab.com/ee/ssh/#adding-a-ssh-key-to-your-gitlab-account) accounts. Another way is to use Login/Password, but the best practice is to use SSH keys.

### Download (URL to your archive)

Another method is to specify a link to sources.

Protocols: `http`, `https`, `ftp` (for closed ftp you should specify login/password).

File formats: `.tar.bz2`, `.tar.gz`, `.tar`, `.zip`

### Upload archive

Moreover, you can upload from your machine.

File formats: `.tar.bz2`, `.tar.gz`, `.tar`, `.zip`

Maximum size: 50MB

## Extra settings

![Create docker service - extra settings](../../img/new_interface/creating_service_extra_settings.png)

### Initial commands

Commands which are executed only once on the first container after the first deploying a service. You can use it for populate a database or migration, run an install of WordPress, etc.

### Commands for installing global dependencies

Commands for installing global dependencies and modifying Docker image of your service. For modifying source code use Local dependencies.

Examples: `pip install`, `bundle install`, `apt-get install`, `npm install -g`

### Local dependencies and code's preparation

Commands for installing local dependencies and making your code ready to work.

Examples: `npm install`, `composer install`, `bower install`, etc. or do some for preparation: `gulp build`, `grunt build`, etc.

### Command to start

Start command for your application

!!! note

```
If your container is stuck in restarting phase after deploying you can set start command to `sleep 1d`. After that, you can connect to a container via the terminal and check what went wrong.
```

## Environment variables

![Create docker service - environment variables](../../img/new_interface/creating_service_env.png)

You can specify environment variables for your application. They can be edited after creating a service.

## Persistent data volumes

![Create docker service - persistent data volumes](../../img/new_interface/creating_service_volumes.png)

D2C separates the application itself from its data. Docker volumes are used to store persistent data. Data is stored locally on the hosts. Any data which is generated by an application should be added to Persistent data volumes. **All modifications outside of these directories will be deleted after restart/rebuild/redeploy of a container/service (Docker restores the original state of a container)**.

You can create new volumes using **Add volume** button. The host path by default is created automatically. You can change it but be careful. **It can break the whole host**.

UID for volumes can be added in this block.

### Synchronizing

We recommend storing _user generated content_ in cloud storage like [Amazon S3](https://aws.amazon.com/s3/) or CDN. Sometimes there is a need to support old technologies when data stores at hosts. For such cases you can use synchronization volumes between all containers. Simply check the volumes which you want to sync when creating or editing service. D2C uses Lsync for synchronization.

## Configs

![Create docker service - docker configs](../../img/new_interface/creating_service_docker_configs.png)

You can add your additional config files. These files **do not change after restart/rebuild/redeploy** of your applications.

Specify a full path where a config should be stored and press Enter.

![Create docker service - create configs](../../img/new_interface/creating_service_create_configs.png)

## Hosts

![Create service - hosts](../../img/new_interface/creating_service_hosts.png)

You can choose one or several hosts where the similar containers will be deployed. It's not necessary at the start, and you can scale your services after deployment. Also, at this step you can create new hosts and choose them even they are not online yet (creating status). The containers will be deployed when they are ready.
