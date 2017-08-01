# Introduction

This article describes the process of creating services in D2C.
All definitions from creating (and editing) service page describes here.
There are some  definitions which should be explained.

## What you need to know before creating


### All services

- Service names should be unique across your account

- Directories, which should not be deleted after rebuild or redeploy (user generated content, plugins, logs, etc.) should be specified as Volumes in Persistent Data volumes block. Check sync if you want to synchronise files between all containers of service. Do not use it for database files.

- All services in a project are visible for each other inside. Access from the internet is disabled by default (except NGINX and HAProxy). You may open access from the Internet in "Ports" block.

### Application services

- If you use private repository, you should add an SSH key to your account ([GitHub](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/) and  [BitBucket](https://confluence.atlassian.com/bitbucket/add-an-ssh-key-to-an-account-302811853.html) manuals)

- Application should listen on 0.0.0.0:3000 (not 127.0.0.1:3000)

### Other services

- NGINX, NGINX-Static, HAProxy has enabled access from the Internet by default on port 80.

## Parameters and definitions

### Service settings

![Creating services - Service settings](../img/creating_services_settings.png)

| Parameter     | Required     | Default     | Comments |
| :------------- | :------------- | :------------- |:------------- |
| Name                | Yes      |           | The name should be unique across your account. If you use a name which is already in use, you may change it during importing your stack via interface     |
| Configuration       | Yes      | StandAlone | Check [available configurations](/getting-started/services/#data-services)       |
| Version             | Yes      |           | You may specify any of [supported versions](/getting-started/services/#data-services) here. Usually, it is the most stable one by default       |
| Password            | No       |           | Password for Redis or Memcached   |
| Root password       | No       |           | Root password. Required for some configurations, e.g. MongoDB Replica Set        |
| Username            | No       |           | Create a database during deploying service. Database will be created with the same name    |
| UserPassword        | No       |           | Password for the created database     |
| Preinstall          | No       |           |     |
| extensions          | No       |           | Option for PHP-FPM and PHP-Apache services. `mysqli` and `opcache` selects by default  |
| pecl                | No       |           | Option for PHP-FPM and PHP-Apache services |
| Install commands    | No       |           | Commands for installing global dependencies of your service.<br>Examples: **pip install**, **bundle install**, **apt-get install**, **npm install -g**   |

### Application source

Only for [Application](/getting-started/services/#application-services) and Docker services

![Creating services - Application source](../img/creating_services_source.png)

| Parameter               | Required     | Default     | Comments |
| :------------- | :------------- | :------------- |:------------- |
| Git/Repository URL      | No |               | Example: [https://github.com/d2cio/nodejs-hello-world](https://github.com/d2cio/nodejs-hello-world) |
| Git/Repository branch   | No |               | Example: master  |
| Git/Auth method         | No |               | Choices: **SSH** (recommended), **Login/Password**.<br>If you specify private repository and SSH, you should add an SSH key to your account ([GitHub](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/) and [BitBucket](https://confluence.atlassian.com/bitbucket/add-an-ssh-key-to-an-account-302811853.html) manuals) |
| Git/Repository login    | No |               |   |
| Git/Repository password | No |               |   |
| Download/URL            | No |               | Protocols: http, https, ftp.<br> File formats: **.tar.bz2**, **.tar.gz**, **.tar**, **.zip**<br>Example: [https://wordpress.org/latest.tar.gz](https://wordpress.org/latest.tar.gz)  |
| Download/Login          | No |               | Login of FTP server  |
| Download/Password       | No |               | Password of FTP server  |
| Upload                  | No |               | You may upload an archive from your computer.<br>Protocols: **http**, **https**, **ftp**.<br> File formats: **.tar.bz2**, **.tar.gz**, **.tar**, **.zip**<br>Maximum size: **50MB** |

### Application settings

![Creating services - volumes](../img/creating_services_settings.png)

| Parameter      | Required      | Default        | Comments |
| :------------- | :------------- | :------------- |:------------- |
| Deploy commands       | No  |            | Commands for installing local dependencies and making your code ready to work.<br>Examples: **npm install**, **composer install**, **bower install**, etc. or do some for preparation:<br> Examples: **gulp build**, **grunt build**, etc. |
| Start command         | No |            | [Start commands](/getting-started/deployment/#running) of your application |
| Environment variables | No |            |  |

### Ports

![Creating services - Ports](../img/creating_services_ports.png)

| Parameter               | Required     | Default     | Comments |
| :------------- | :------------- | :------------- |:------------- |
| Access from the Internet      | Yes |  | All services in a project are [visible](/platform/private-network/) for each other inside.<br> If you want your service to be visible from the Internet, you should enable this option and define ports.<br>Disabled by default for all services except **NGINX** and **HAProxy** |
| Main port                     | Yes |                 | Choices: UDP or TCP. Should be integer |
| Extra ports                   | No  |                 | Choices: UDP or TCP. Should be integer |

### Persistent data volumes

![Creating services - volumes](../img/creating_services_volumes.png)

| Parameter      | Required      | Default        | Comments |
| :------------- | :------------- | :------------- |:------------- |
| Add volume                    | No  |            | [Persistent data volumes](/getting-started/containers/#persistent-data) - directories, which should not be deleted after rebuild or redeploy (user generated content, plugins, logs, etc.) |
| Sync                          | Yes |            | When you have more than one container you may need to sync data between volumes. Simply check the volumes which you want to sync |

### Configs

![Creating services - configs](../img/creating_services_configs2.png)

| Parameter      | Required      | Default        | Comments |
| :------------- | :------------- | :------------- |:------------- |
| Add custom config  | No  |            | Some services have default config files (e.g. PHP-FPM, PHP-Apache, MongoDB). You may add your additional config files or edit/replace defaults. |

### Select hosts

![Creating services - select hosts](../img/creating_services_select_hosts.png)

Select a host(s) you want an application to deploy to. If you create a service with MasterSlave or Replica Set configuration first - click choose a Master and other(s) a Slave. Repeated click cancel your choice.



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
