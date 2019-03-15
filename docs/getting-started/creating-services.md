# Introduction

This article describes the process of creating services in D2C.
All definitions from creating (and editing) service page are described here.
There are some  definitions which should be explained.

!!! note

    You may also find helpful [one-by-one instructions](https://d2c.io/blog/deploying-tips) on creating different services in D2C.

## What you need to know before creating


### All services

- Service names should be unique across your account

- Directories, which should not be deleted after rebuild or redeploy (user generated content, plugins, logs, etc.) should be specified as Volumes in Persistent Data volumes block. Check sync if you want to [synchronize](/getting-started/containers/#synchronizing) files between all containers of service. Do not use it for database files

- All services in a project are visible for each other inside. Access from the internet is disabled by default (except NGINX and HAProxy). You can open access from the Internet in "Ports" block

### Application services

- If you use private repository, you should add an SSH key to your account ([GitHub](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/) and  [BitBucket](https://confluence.atlassian.com/bitbucket/add-an-ssh-key-to-an-account-302811853.html) manuals)

- Application should listen on 0.0.0.0:3000 (not 127.0.0.1:3000)

### Other services

- NGINX, NGINX-Static, HAProxy has enabled access from the Internet by default on port 80

## Parameters and definitions

### Service settings

![Creating services - Service settings](../img/creating_services_settings.png)

| Parameter     | Required     |  Comments |
| :------------- | :------------- |:------------- |
| Name                | Yes      |  The name should be unique across your account. More about [Naming](/getting-started/services/#naming) |
| Configuration       | Yes      |  Check [available configurations](/getting-started/services/#data-services). Default is **StandAlone**   |
| Version             | Yes      |  You can specify any of [supported versions](/getting-started/services/#data-services) here. Usually, it is the most stable one by default       |
| Password/Root password | No    |  Root password. Required for some configurations, e.g. MongoDB ReplicaSet |
| Username            | No       |  Create a user during deploying service (database). Database will be created with the same name    |
| UserPassword        | No       |  Password for a user of database  |
| Preinstall          | No       |  Additional software which you can want to install with your app    |
| Extensions and Pecl packages   | No | Additional modules for PHP-FPM and PHP-Apache services. |
| Global dependencies | No       |    Commands for installing global dependencies of your service.<br>Examples: **pip install**, **bundle install**, **apt-get install**, **npm install -g**   |
| Initial commands   | No        |  Commands which are executed only once after deploying a service  |

### Application source

Only for [Application services](/getting-started/services/#application-services) and services based on Docker

![Creating services - Application source](../img/creating_services_source.png)

| Parameter               | Required         | Comments |
| :------------- | :------------- | :------------- |
| Git/Repository URL      | No | Example: [https://github.com/d2cio/nodejs-hello-world](https://github.com/d2cio/nodejs-hello-world) |
| Git \| branch\tag\commit  | No | You can specify branch, tag or commit. Examples:<br>branch `master`, tag `v1.4`, commit `62d2272bbf7f1c6841c70dd09657df78836fda9c`  |
| Git/Auth method         | No | Choices: **SSH** (recommended), **Login/Password**.<br>If you specify private repository and SSH, you should add an SSH key to your account ([GitHub](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/) and [BitBucket](https://confluence.atlassian.com/bitbucket/add-an-ssh-key-to-an-account-302811853.html) manuals) |
| Git/Repository login    | No | Login for base auth or for FTP server  |
| Git/Repository password | No | Password for base auth or for FTP server  |
| Download/URL            | No | Protocols: http, https, ftp.<br> File formats: **.tar.bz2**, **.tar.gz**, **.tar**, **.zip**<br>Example: [https://wordpress.org/latest.tar.gz](https://wordpress.org/latest.tar.gz)  |
| Download/Login          | No | Login of FTP server  |
| Download/Password       | No | Password of FTP server  |
| Upload                  | No | You can upload an archive from your computer.<br>Protocols: **http**, **https**, **ftp**.<br> File formats: **.tar.bz2**, **.tar.gz**, **.tar**, **.zip**<br>Maximum size: **50MB** |

### Application settings

![Creating services - volumes](../img/creating_services_app_settings.png)

| Parameter  | Required       | Comments |
| :------------- | :------------- | :------------- |
| Local dependencies and code's preparation | No     |  Commands for installing local dependencies and making your code ready to work.<br>Examples: **npm install**, **composer install**, **bower install**, etc. or do some for preparation:<br> Examples: **gulp build**, **grunt build**, etc. |
| Start command                             | Yes    |  [Start command](/platform/deployment/#running) is executing your application. The application should be in the foreground without daemonizing |
| Environment variables                     | No     |   |

### Ports

![Creating services - Ports](../img/creating_services_ports.png)

| Parameter | Required | Comments |
| :------------- | :------------- | :------------- |
| Access from the Internet      | Yes | All services in a project are [visible](/platform/private-network/) for each other inside.<br> If you want your service to be visible from the Internet, you should enable this option and define ports.<br>Disabled by default for all services except **NGINX** and **HAProxy** |
| Ports\Protocol               | Yes  | Choices: UDP or TCP |
| Ports\Port                   | Yes  | Should be integer |

### Persistent data volumes

![Creating services - volumes](../img/creating_services_volumes.png)

| Parameter                     | Required      | Comments |
| :------------- | :------------- | :------------- |
| Add volume                    | No  |  [Persistent data volumes](/getting-started/containers/#persistent-data) - directories, which should not be deleted after rebuild or redeploy (user generated content, plugins, logs, etc.) |
| Sync                          | No  | When you have more than one container you can need to sync data between volumes. Simply check the volumes which you want to sync |

### Configs

![Creating services - configs](../img/creating_services_configs2.png)

| Parameter      | Required      | Comments |
| :------------- | :------------- | :------------- |
| Add custom config  | No  | Some services have default config files (e.g. PHP-FPM, PHP-Apache, MongoDB). You can add your additional config files or edit/replace defaults. |

### Configure services

Only for NGINX, NGINX-Cluster and HAProxy. You can use automatically generated configs, edit them or use owns. [Domains and certificates](/platform/domains-and-certificates/) should be specified in this block.

![Creating services - configure services](../img/creating_services_configure_services.png)

| Parameter      | Required      | Default | Comments |
| :------------- | :------------- | :------------- | :------------- |
| Protocol            | Yes  | HTTP    | Choices: HTTP, HTTPS   |
| Mode                | Yes  | Proxy   | Choices: Proxy, uWSGI  |
| Domains             | No   |     | Domains and subdomains for a service |
| Serve static        | No   | Off |  |

### Select hosts

![Creating services - select hosts](../img/creating_services_select_hosts.png)

Select a host(s) you want an application to deploy to.



<!--
## How to create

### Data services


| [MongoDB]()     |   [MySQL/MariaDB/Percona]()   | [PostgreSQL]() | [Redis]()     |   [Crate]()   | [Memcached]() |   [ElasticSearch]()   |
| :------------- | :------------- | | :------------- | :------------- | | :------------- |



</div>



### Aplication services

| [Node.js]()     |   [Python]()   | [Go]() | [Ruby]()     |   [PHP-FPM]()   | [PHP-Apache]() |  
| :------------- | :------------- | | :------------- | :------------- | |


### Other services

| [NGINX]()     |   [NGINX-Cluster]()   | [NGINX-Static]() | [Docker]()     |   
| :------------- | :------------- | | :------------- |
-->
