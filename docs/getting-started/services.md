# Introduction

Service is an application deployed in D2C.

D2C executes your services/applications inside containers. We use Docker as our containerization platform. Each app is a separate container: web-app, database, load-balancer, etc. Docker is installed and configured on the hosts that are managed by D2C automatically. When you deploy your service, all the necessary files are delivered to the host, and container images are built locally on the host and then run by Docker daemon. D2C configures the environment automatically, so we do not recommend to add your current development boxes as managed hosts, to prevent any configuration conflicts.

Once you can deploy up to 50 containers (except services, which have their limitations).

## Naming

Each service has its **unique** name. Services can communicate with each other by container names (e.g. `servicename-1` or alias-names (e.g. `servicename` or `servicename-master`). It doesn't matter on which host a service is running – all [private network](/platform/private-network/) intercommunication is transparent for services. Moreover, we use them to create public domains like: **[servicename]-[www].[accountID].[at].d2c.io** for your services which are served by NGINX or HAProxy.

The name should start with a letter and contain up to 16 characters (Latin letters, numbers, hyphen).

## Native support

### Data services

Name              | Configuration             | Scalable | Supported versions
:---------------- | :------------------------ | :------- | ------------------------------------
**MongoDB**       | StandAlone or ReplicaSet  | Yes      | 3.0, 3.2, 3.4, 3.6, 4.0, 4.2
**MySQL**         | StandAlone or MasterSlave | Yes      | 5.5, 5.6, 5.7, 8.0
**MariaDB**       | StandAlone or MasterSlave | Yes      | 5.5, 10.0, 10.1, 10.2, 10.3, 10.4
**Percona**       | StandAlone or MasterSlave | Yes      | 5.5, 5.6, 5.7
**PostgreSQL**    | StandAlone or MasterSlave | Yes      | 9.6, 10.0, 10.1, 10.2, 10.3, 10,4, 10.5, 11.0, 11.1, 11.5, 12.0
**Crate**         | StandAlone                | No       | 2.3, 3.1
**Redis**         |                           | Yes      | 2.8, 3.0, 3.2, 4.0, 5.0
**Memcached**     |                           | Yes      | 1.4, 1.5
**ElasticSearch** | StandAlone                | No       | 2.4, 5.6

### Application services

Name           | Scalable | Supported versions
:------------- | :------- | :--------------------------------
**Node.js**    | Yes      | 6, 8, 10, 12, latest(13)
**Python**     | Yes      | 2.7, 3.5, 3.6, 3.7
**Go**         | Yes      | 1.7, 1.8, 1.9, 1.10, 1.11, 1.13
**Ruby**       | Yes      | 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6
**PHP-FPM**    | Yes      | 5.6, 7.0, 7.1, 7.2, 7.3
**APACHE+PHP** | Yes      | 5.6, 7.0, 7.1, 7.2, 7.3

### Other services

Name                                         | Scalable | Supported versions          | Comments
:------------------------------------------- | :------- | :-------------------------- | :-----------------------------------------------------------------------------------------------------------------------------------------------------
**NGINX**                                    | No       | 1.13, 1.14, 1.15, 1.17 | NGINX is an edge service for serving on top of stack. It can generate free [TSL certificates](/platform/domains-and-certificates/) (by Let's Encrypt).
**NGINX-Cluster**                            | Yes      | 1.13, 1.14, 1.15, 1.17 | NGINX-Cluster for cases when your service does not return static files or you need to serve more than one PHP-FPM container.
**NGINX-Static**                             | Yes      | 1.13, 1.14, 1.15, 1.17 | NGINX-Static returns static files (HTML, JS, CSS, images, etc.). It cannot serve other services.
**HAProxy**                                  | No       | latest | HAProxy is a [load balancer](/platform/balancing/). May be used as edge service. It can generate free [TSL certificates](/platform/domains-and-certificates/) (by Let's Encrypt).
**Docker** (Services based on Docker Images) | Yes

## Actions

Actions which have all services:

- Update version
- Restart
- Stop/Start
- Move (between projects)
- [Clone](/platform/cloning-apps/)
- Destroy (+force destroy)
- Destroy and redeploy. For cases when you want to start deploying service from scratch
- Edit settings
- [Scale](/platform/scaling/) (except some services e.g. NGINX)
- Add [load-balancer](/platform/balancing/)
- Execute - executing a command inside all running service containers

![Standard service actions](../img/standart_actions.png)

Additional action with MongoDB, MySQL, MariaDB, Percona, PostgreSQL services:

- Reset superuser password

All [**application services**](/getting-started/services/#application-services) have smart update feature which you can choose separately or combine with each other:

- Update version (data and other services have only this one)
- Update global dependencies
- Update local dependencies
- Update sources
- Include .git folder

![Application actions](../img/app_actions.png)

## Services data

All data of services are stored in: `/ebs/containers/serviceName`

For example, you can find sources in: `/ebs/containers/serviceName/sources`

Backups: `/ebs/containers/serviceName/backup`

## System Logs

Each service has system logs (deploy logs).

The line which has ellipsis marks, in the end, can be opened with a mouse click.

![Build log](../img/build_log.png)

Messages of building images consist stdout, and it also can be shown.

![Stdout log](../img/stdout.png)

### How the service page look like

![Service page](../img/servicepage.jpg)

![Service page](../img/servicepage2.jpg)
