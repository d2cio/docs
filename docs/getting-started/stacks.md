# Introduction

Stack is a set of services and hosts needed for your application to run.
It is a very easy way to deploy your application in different environments (development, testing, staging, production).

All services and services' settings which D2C supports through the interface can be described with `Stack file`.

<!-- ## Ready to deploy stacks

| Stack name         | Link                       | Services                      | Minimal configuration |
| :-------------     | :-------------             | :-------------                |:------------- |
| MEAN               | [GitHub]()                 | MongoDB, Mongo-express (Node.js), Node.js, NGINX                                                    | 2 hosts, 4 containers  |  
| Sentry             | [GitHub]()                 | Redis, PostgreSQL, Docker (web), Docker (Worker), Docker (Cron), NGINX                              | 1 host, 6 containers |
| Scalable Wordpress | [GitHub]()                 | MySQL (MasterSlave), Redis, PHP-FPM, NGINX-Cluster, HAProxy, Varnish, PHPMyAdmin (PHP-FPM), NGINX   | 3 hosts, 11 containers |

### How to deploy a stack file -->

## Creating a stack file

### What you need to know before creating a stack file

For matching variables from other services you can use next templates:

| Template       | Comments    |
| :------------- | :------------- |
| `{{=service('serviceName').get('fieldName')}}`        | Returns a variable of a service |
| `{{=service('serviceName').getMainPort()}}`           | Returns the main port   |
| `{{=service(serviceName).getAppAlias()}}`             | Returns a container alias of an [application service](getting-started/services/#application-services))      |
| `{{=service('serviceName').getMasterAlias()}}`        | Returns an alias of Master-container (for [data services](getting-started/services/#data-services))      |
| `{{=service(serviceName).getSlaveAlias()}}`           | Returns an alias of Slave-container (for [data services](getting-started/services/#data-services))      |
| `{{=service('serviceName').getContainerName(num)}}`   | Returns a container name of a service with number `num`  |

!!! note

    You can use `null` as a value for parameters. It means that you fill in these parameters via interface during importing a stack

## Data services

| Parameter      | Required     | Default     | Comments |
| :------------- | :------------- | :------------- |:------------- |
| name          |   Yes    |           | The name should be unique across your account. If you use a name which is already in use, you can change it during importing your stack via interface     |  
| type          | Yes      |           | A service you want to deploy       |
| version       | No       |           | You can specify any of [supported versions](getting-started/services/#data-services) here. Usually, it is the most stable one by default       |
| configuration | No       | StandAlone | Check [available configurations](getting-started/services/#data-services)       |
| password      | No       |           | Root password. Required for some configurations, e.g. MongoDB Replica Set.        |
| username      | No       |           | Create a user after deploying. Database will be created with the same name        |
| userPassword  | No       |           | Password for the created database        |
| ports         | No       | Default port | Specify ports for your service.<br>Examples: 8080 - port 8080 (TCP), 7709\udp - port 7709 (UDP)     |
| env | No |  | Environment variables for your application. Check the way of adding environments at the [example](getting-started/stacks/#examples)  |
| remoteAccess  | No       | Disabled  | All services in a project are visible for each other inside.<br> If you want your service to be visible from the Internet, you should enable this option and define ports |
| configFiles.dest  | No |      | Name (for default configs) or path to a config file in the container (for custom configs) |
| configFiles.src  | No |  | A path to a config file in your stack folder |
| volumes.directory | No   |           | A path to [Persistent data volume](getting-started/containers/#persistent-data)  |
| volumes.sync  | No       | False     | `True` if you need to sync files between containers |
| deployTo      | No       |           | A list of hosts for deploying a service     |

### Examples

```yml
name: db
type: mysql
version: 8.0
configuration: MasterSlave
username: wordpress
userPassword: null
ports:
  - 3306
remoteAccess: false
configFiles:
  - dest: my.cnf
    src: ./configs/my.cnf
deployTo:
  - main-1
  - main-2
```

```yaml
name: mongo
type: mongodb
version: 3.4
configuration: StandAlone
password: null
ports:
  - 27017
remoteAccess: false
configFiles:
  - dest: my.cnf
    src: ./configs/my.cnf
deployTo:
  - db
```

## Application services

| Parameter       | Required     | Default     | Comments |
| :------------- | :------------- | :------------- |:------------- |
| name              | Yes |  |The name should be unique across your account. If you use a name which is already in use, you can change it during importing your stack via interface |
| type              | Yes | No | A service you want to deploy |
| version           | No       |  | You can specify any of [supported versions](getting-started/services/#app-services) here. Usually, it is the most stable one by default |
| source.type       | Yes |  | choices: git, download(url) <br> <br>  |
| source.url        | Yes |  | If you use private repository, you should add an SSH key to your account ([GitHub](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/) and  [BitBucket](https://confluence.atlassian.com/bitbucket/add-an-ssh-key-to-an-account-302811853.html) manuals)  |
| extensions        | No  |  | Option for PHP-FPM and PHP-Apache services. `mysqli` and `opcache` selects by default  |
| pecl              | No  |  |Option for PHP-FPM and PHP-Apache services |
| ports             | No  | Default port | Specify ports for your service.<br>Examples: 8080 - port 8080 (TCP), 7709\udp - port 7709 (UDP)   |
| env               | No  |  | Environment variables for your application. Check the way of adding environments at the example  |
| volumes.directory | No  |  | A path to [Persistent data volume](getting-started/containers/#persistent-data)  |
| volumes.sync      | No  | False  | `True` if you need to sync files between containers |
| globalDeps        | No  |  | Commands for installing global dependencies of your service.<br>Examples: **pip install**, **bundle install**, **apt-get install**, **npm install -g** |
| localDeps         | No  |  | Commands for installing local dependencies and making your code ready to work.<br>Examples: **npm install**, **composer install**, **bower install**, etc. or do some for preparation:<br> Examples: **gulp build**, **grunt build**, etc. |
| startCommand      | No  |  | [Start commands](getting-started/deployment/#running) of your application. Required for **PHP-FPM** and **PHP-Apache** |
| configFiles.dest  | No |      | Name (for default configs) or path to a config file in the container (for custom configs) |
| configFiles.src   | No  |  | A path to a config file in your stack folder |
| deployTo          | No  |  | A list of hosts for deploying a service  |

### Examples

```yaml
name: mongo-express
type: nodejs
version: 8
ports:
  - 8081
source:
  type: git
  url: https://github.com/mongo-express/mongo-express
localDeps: "npm install\nnpm run build"
env:
  ME_CONFIG_MONGODB_SERVER: "{{=service('mongo').getMasterAlias()}}"
  ME_CONFIG_MONGODB_AUTH_USERNAME: root
  ME_CONFIG_MONGODB_AUTH_PASSWORD: "{{=service('mongo').get('password')}}"
  ME_CONFIG_MONGODB_PORT: "{{=service('mongo').getMainPort()}}"
  ME_CONFIG_MONGODB_ENABLE_ADMIN: true
  ME_CONFIG_BASICAUTH_USERNAME: admin
  ME_CONFIG_BASICAUTH_PASSWORD: null
  VCAP_APP_HOST: 0.0.0.0
  VCAP_APP_PORT: 8081
deployTo:
  - app
```
```yaml
name: blog
type: php
version: 7.1
source:
  type: download
  url: https://wordpress.org/latest.tar.gz
extensions:
  - mysqli
  - opcache
pecl:
  - redis
env:
  DEBUG: true
volumes:
  - directory: $MAIN_PATH/wp-content/uploads
    sync: true
  - directory: $MAIN_PATH/wp-content/plugins
    sync: true
configFiles:
  - dest: php-fpm.conf
    src: ./configs/php.conf
  - dest: $MAIN_PATH/wp-config.php
    src: ./configs/wp-config.php
  - dest: $MAIN_PATH/db-config.php
    src: ./configs/db-config.php
  - dest: $MAIN_PATH/wp-content/db.php
    src: ./configs/db.php
deployTo:
  - main-1
  - main-2  
```

## Other services

| Parameter       | Required     | Default     | Comments |
| :------------- | :------------- | :------------- |:------------- |
| name               | Yes      |   | The name should be unique across your account. If you use a name which is already in use, you can change it during importing your stack via interface     |  
| type               | Yes      |  | A service you want to deploy       |
| version            | No       | | You can specify any of [supported versions](getting-started/services/#data-services) here. Usually it is the most stable one by default       |
| ports              | No       | Default port | Specify ports for your service.<br>Examples: 8080 - port 8080 (TCP), 7709\udp - port 7709 (UDP)     |
| remoteAccess       | No       | Disabled | All services in a project are visible for each other inside.<br> If you want your service to be visible from the Internet, you should enable this option and define ports       |
| env                | No  |     | Environment variables for your application. Check the way of adding environments at the [example](getting-started/stacks/#examples)  |
| volumes.directory  | No  |     | A path to [Persistent data volume](getting-started/containers/#persistent-data)  |
| volumes.sync       | Yes | False    | `True` if you need to sync files between containers |
| globalDeps         | No  |     | Commands for installing global dependencies of your service.<br>Examples: **pip install**, **bundle install**, **apt-get install**, **npm install -g** |
| serviceFiles.name  | No  |     | A name of service which NGINX or HAProxy should serve  |
| serviceFiles.src   | No  |     | A path to a config file in your stack folder |
| configFiles.dest  | No |      | Name (for default configs) or path to a config file in the container (for custom configs) |
| configFiles.src    | No  |     | A path to a config file in your stack folder |
| deployTo           | No  |     | A list of hosts for deploying a service        |

### Examples

```yaml
name: proxy
type: nginx
version: 1.13
ports:
  - 80
  - 443
remoteAccess: true
serviceFiles:
  - name: blog
    src: ./configs/blog.conf
  - name: mongo-express
    src: ./configs/mongo-express.conf
deployTo:
  - edge
```
```yaml
name: balancer
type: haproxy
version: 1.7
ports:
  - 80
  - 443
remoteAccess: false
serviceFiles:
  - name: cluster
    src: ./configs/cluster.conf
deployTo:
  - edge
```

## Docker services

| Parameter       | Required     | Default     | Comments |
| :------------- | :------------- | :------------- |:------------- |
| name              | Yes |     | The name should be unique across your account. If you use a name which is already in use, you can change it during importing your stack via interface |
| type              | Yes       |  | A service you want to deploy       |
| image             | Yes | No  | Docker image of an app from [DockerHub](https://hub.docker.com/).<br>Examples: openjdk, million12/varnish, quay.io/letsencrypt/dnsmasq |
| version           | No |      | Set a version of an application |
| source.type       | No |      | choices: git, download(url) <br> <br>  |
| source.url        | No |      | If you use private repository, you should add an SSH key to your account ([GitHub](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/) and  [BitBucket](https://confluence.atlassian.com/bitbucket/add-an-ssh-key-to-an-account-302811853.html) manuals)  |
| extensions        | No |      | Option for PHP-FPM and PHP-Apache services. `mysqli` and `opcache` selects by default  |
| pecl              | No |      |Option for PHP-FPM and PHP-Apache services |
| ports             | No | Default port | Specify ports for your service.<br>Examples: 8080 - port 8080 (TCP), 7709\udp - port 7709 (UDP) |
| env               | No |      | Environment variables for your application. Check the way of adding environments at the [example](getting-started/stacks/#examples)  |
| volumes.directory | No |      | A path to [Persistant data volume](getting-started/containers/#persistent-data)  |
| volumes.sync      | No | False | `True` if you need to sync files between containers |
| globalDeps        | No |      | Commands for installing global dependencies of your service.<br>Examples: **pip install**, **bundle install**, **apt-get install**, **npm install -g** |
| localDeps         | No |      | Commands for installing local dependencies and making your code ready to work.<br>Examples: **npm install**, **composer install**, **bower install**, etc. or do some for preparation:<br> Examples: **gulp build**, **grunt build**, etc. |
| startCommand      | No |      | [Start commands](getting-started/deployment/#running) of your application |
| configFiles.dest  | No |      | Name (for default configs) or path to a config file in the container (for custom configs) |
| configFiles.src   | No |      | A path to a config file in your stack folder |
| deployTo          | No |      | A list of hosts for deploying a service  |

### Example

```yaml
name: varnish
type: docker
image: debian
version: jessie
ports:
  - 80
remoteAccess: false
configFiles:
  - dest: /etc/varnish/default.vcl
    src: ./configs/default.vcl
globalDeps: |
  apt-get install wget
  wget -qO- https://packagecloud.io/install/repositories/varnishcache/varnish51/script.deb.sh | bash
  apt-get install varnish
startCommand:  : varnishd -j unix,user=vcache -F -f /etc/varnish/default.vcl -s malloc,100m -a 0.0.0.0:80
deployTo:
  - edge
```

## Hosts

| Parameter       | Requiered     | Default     | Comments |
| :------------- | :------------- | :------------- |:------------- |
| name        | yes |    | The name should be unique across your account. If you use a name which is already in use, you can change it during importing your stack via interface |
| instance    | Yes |    | A type of instance. Examples for AWS: t2.small, t2.2xlarge. For DO: 1 gb, 16gb   |
| storageSize | yes |    | Recommended storage size for a host |
| storageType | No  |    | Recommended type of storage. Check types of [AWS volumes](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSVolumeTypes.html) |

### Example

```yaml
hosts:
  - name: main-1
    instance:
      AWS: t2.small
      DO: 2gb
    storageSize: 20
    storageType: gp2

  - name: main-2
    instance:
      AWS: t2.small
      DO: 2gb
    storageSize: 20
    storageType: gp2

  - name: edge
    instance:
      AWS: t2.micro
      DO: 1gb
```
