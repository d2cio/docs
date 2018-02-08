# Introduction

Stack is a set of services and hosts needed for your application to run.
It is a very easy way to deploy your application in different environments (development, testing, staging, production).

All services and services' settings which D2C supports through the interface can be described with **Stack file** in YAML format.

## Creating a stack file

### What you need to know before creating a stack file

!!! note

    Stackfile should be named as **stackFile.yml**

For matching variables from other services you can use next templates:

| Template       | Comments    |
| :------------- | :------------- |
| `{{=service('serviceName').get('fieldName')}}`           | Returns a variable of a service |
| `{{=service('serviceName').getMainPort()}}`              | Returns the main port   |
| `{{=service(serviceName).getAppAlias()}}`                | Returns a container alias of an [application service](/getting-started/services/#application-services)) and non-replicable services (Redis, NGINX, etc.) |
| `{{=service('serviceName').getMasterAlias()}}`           | Returns an alias of Master-container (for [data services](/getting-started/services/#data-services))       |
| `{{=service(serviceName).getSlaveAlias()}}`              | Returns an alias of Slave-container (for [data services](/getting-started/services/#data-services))       |
| `{{=service('serviceName').getContainerName(num)}}`      | Returns a container name of a service with number `num`  |
| `{{=service('serviceName').getEnv('environmentfield')}}` | Returns an environment field of a service  |
| `{{=service('serviceName').getNginxDomain()}}`           | Returns default domain which is going to use in NGINX |
| `{{=service('serviceName').getBalancerDomain()}}`        | Returns default domain which is going to use in HAProxy |
| `{{=randomString(num)}}`                                 | Generates a random string with a defined length |


You can use `null` as a value for parameters. It means that you fill in these parameters via interface during importing a stack

## Data services

| Parameter     | Required | Comments |
| :------------- | :------------- | :------------- |
| name          | Yes      | The name should be unique across your account. If you use a name which is already in use, it changes to an automatically generated |  
| type          | Yes      | A service you want to deploy |
| version       | No       | You can specify any of [supported versions](/getting-started/services/#data-services) here. |
| configuration | No       | Check [available configurations](/getting-started/services/#data-services)  |
| password      | No       | Root password. Required for some configurations, e.g. MongoDB Replica Set   |
| username      | No       | Create a user after deploying. Database will be created with the same name  |
| userPassword  | No       | Password for the created database  |
| remoteAccess  | No       | All services in a project are visible for each other inside.<br> If you want your service to be visible from the Internet use `true` |
| ports         | No       | Ports of a service.<br>Examples: 8080 - port 8080 (TCP), 7709\udp - port 7709 (UDP)     |
| env           | No       | Environment variables for your application. Check the way of adding environments at the [example](/getting-started/stacks/#examples)  |
| configFiles            |     | A list of config files |
| configFiles[i].dest    | No  | Name (for default configs) or path to a config file in the container (for custom configs) |
| configFiles[i].src     | No  | A path to a config file in your stack folder |
| volumes             |     | A list of [Persistent data volumes](/getting-started/containers/#persistent-data)  |
| volumes[i].directory   | No  | A path to persistent data volume  |
| volumes[i].sync        | Yes | `true` if you need to sync files between containers |
| deployTo      | No       | A list of hosts for deploying a service  |

### Examples

```yml
name: db
type: mysql
version: 10.3
configuration: MasterSlave
username: wordpress
userPassword: null
password: null
ports:
  - 3306
remoteAccess: false
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

| Parameter         | Required     |  Comments |
| :------------- | :------------- | :------------- |
| name              | Yes | The name should be unique across your account. If you use a name which is already in use, it changes to an automatically generated  |
| type              | Yes | A service you want to deploy |
| version           | Yes | You can specify any of [supported versions](/getting-started/services/#app-services) here. Usually, it is the most stable one by default |
| source.type        | Yes | Examples: `git`, `download`. If you use private repository, you should add an SSH key to your account ([GitHub](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/) and  [BitBucket](https://confluence.atlassian.com/bitbucket/add-an-ssh-key-to-an-account-302811853.html) manuals) |
| source.url        | Yes | Protocols: http, https, ftp. <br> File formats: .tar.bz2, .tar.gz, .tar, .zip<br>Example: https://wordpress.org/latest.tar.gz  |
| source.version    | No  | Only for git. By default - `master`. Can be used for specifying branch, number of commit, tag. |
| extensions        | No  | Option for PHP-FPM and PHP-Apache services. |
| pecl              | No  | Option for PHP-FPM and PHP-Apache services  |
| remoteAccess      | No  | All services in a project are visible for each other inside.<br> If you want your service to be visible from the Internet use `true` |
| ports             | No  | Ports of a service.<br>Examples: 8080 - port 8080 (TCP), 7709\udp - port 7709 (UDP) |
| env               | No  | Environment variables for your application. Check the way of adding environments at the [example](/getting-started/stacks/#examples)  |
| volumes             |     | A list of [Persistent data volumes](/getting-started/containers/#persistent-data)  |
| volumes[i].directory   | No  | A path to persistent data volume  |
| volumes[i].sync        | Yes | `true` if you need to sync files between containers |
| globalDeps        | No  | Commands for installing global dependencies of your service.<br>Examples: **pip install**, **bundle install**, **apt-get install**, **npm install -g** |
| localDeps         | No  | Commands for installing local dependencies and making your code ready to work.<br>Examples: **npm install**, **composer install**, **bower install**, etc. or do some for preparation:<br> Examples: **gulp build**, **grunt build**, etc. |
| startCommand      | No  | [Start command](/getting-started/deployment/#running) of your application |
| configFiles            |     | A list of config files |
| configFiles[i].dest    | No  | Name (for default configs) or path to a config file in the container (for custom configs) |
| configFiles[i].src     | No  | A path to a config file in your stack folder |
| deployTo          | Yes | A list of hosts for deploying a service  |

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

| Parameter           | Required     | Comments |
| :------------- | :------------- | :------------- |
| name                | Yes | The name should be unique across your account. If you use a name which is already in use, it changes to an automatically generated      |  
| type                | Yes | A service you want to deploy       |
| version             | Yes | You can specify any of [supported versions](/getting-started/services/#data-services) here |
| ports               | No  | Ports of a service.<br>Examples: 8080 - port 8080 (TCP), 7709\udp - port 7709 (UDP) |
| remoteAccess      | No  | All services in a project are visible for each other inside.<br> If you want your service to be visible from the Internet use `true` |
| env                 | No  | Environment variables for your application. Check the way of adding environments at the [example](/getting-started/stacks/#examples)  |
| volumes             |     | A list of [Persistent data volumes](/getting-started/containers/#persistent-data)  |
| volumes[i].directory   | No  | A path to persistent data volume  |
| volumes[i].sync        | Yes | `true` if you need to sync files between containers |
| globalDeps          | No  | Commands for installing global dependencies of your service.<br>Examples: **pip install**, **bundle install**, **apt-get install**, **npm install -g** |
| serviceFiles         |     | A list of services which NGINX or HAProxy serve |
| serviceFiles[i].name   | No  | A name of service which NGINX or HAProxy should serve  |
| serviceFiles[i].static | No  | Enable or disable serving static. `True` if you need to serve static. **Be careful**: NGINX can serve static only on the same host |
| serviceFiles[i].src    | No  | A path to a config file in your stack folder. Do not specify it if you need a default config  |
| serviceFiles[i].domains | No  | Array which contains a list of domains associated with this service |
| serviceFiles[i].https  | No  | Default value is `none` (HTTP mode). Use `letsencrypt` if you want to generate a TLS certificate for defined list of domains.  DNS-record for domains should be accessible at the moment of creating a stack |
| configFiles            |     | A list of config files |
| configFiles[i].dest    | No  | Name (for default configs) or path to a config file in the container (for custom configs) |
| configFiles[i].src     | No  | A path to a config file in your stack folder |
| deployTo               | Yes | A list of hosts for deploying a service |

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
    domains: [example.com, www.example.com]
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
    domains:
      - example.com
      - www.example.com
    https: letsencrypt
deployTo:
  - edge
```

## Docker service

| Parameter       | Required     | Comments |
| :------------- | :------------- | :------------- |
| name              | Yes | The name should be unique across your account. If you use a name which is already in use, it changes to an automatically generated  |
| type              | Yes | A service you want to deploy       |
| image             | Yes | Docker image of an app from [DockerHub](https://hub.docker.com/).<br>Examples: openjdk, million12/varnish, quay.io/letsencrypt/dnsmasq |
| version           | No  | Set a version of an application |
| source.type        | Yes | Examples: `git`, `download`. If you use private repository, you should add an SSH key to your account ([GitHub](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/) and  [BitBucket](https://confluence.atlassian.com/bitbucket/add-an-ssh-key-to-an-account-302811853.html) manuals) |
| source.url        | Yes | Protocols: http, https, ftp. <br> File formats: .tar.bz2, .tar.gz, .tar, .zip<br>Example: https://wordpress.org/latest.tar.gz  |
| source.version    | No  | Only for git. By default - `master`. Can be used for specifying branch, number of commit, tag. |
| remoteAccess      | No  | All services in a project are visible for each other inside.<br> If you want your service to be visible from the Internet use `true` |
| ports             | No  | Ports of a service.<br>Examples: 8080 - port 8080 (TCP), 7709\udp - port 7709 (UDP) |
| env               | No  | Environment variables for your application. Check the way of adding environments at the [example](/getting-started/stacks/#examples)  |
| volumes             |     | A list of [Persistent data volumes](/getting-started/containers/#persistent-data)  |
| volumes[i].directory   | No  | A path to persistent data volume  |
| volumes[i].sync        | Yes | `true` if you need to sync files between containers |
| globalDeps        | No  | Commands for installing global dependencies of your service.<br>Examples: **pip install**, **bundle install**, **apt-get install**, **npm install -g** |
| localDeps         | No  | Commands for installing local dependencies and making your code ready to work.<br>Examples: **npm install**, **composer install**, **bower install**, etc. or do some for preparation:<br> Examples: **gulp build**, **grunt build**, etc. |
| startCommand      | No  | [Start command](/getting-started/deployment/#running) of your application |
| configFiles            |     | A list of config files |
| configFiles[i].dest    | No  | Name (for default configs) or path to a config file in the container (for custom configs) |
| configFiles[i].src     | No  | A path to a config file in your stack folder |
| volumesUID        | No  | User ID of service volumes |
| deployTo          | No  | A list of hosts for deploying a service  |

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

| Parameter   | Required     |  Comments |
| :------------- | :------------- | :------------- |
| name                | Yes | The name should be unique across your account. If you use a name which is already in use (e.g. "host"), the name changes to "host1", "host2", etc. |
| requirements.cores  | Yes | An amount of cores for the new host  |
| requirements.memory | Yes | An amount of GB memory for the new host |

### Example

```yaml
hosts:
  - name: main-1
    requirements:
      cores: 1
      memory: 1

  - name: main-2
    requirements:
      cores: 2
      memory: 4

  - name: edge
    requirements:
      cores: 1
      memory: 0.5
```

## How to deploy a stack

### In existing project

1. Sign in into your [D2C account](https://panel.d2c.io/account/login)
2. Create or open a project
3. Click **Import stack**
4. Paste a link to the stack or upload an archive (or a `.yml` file) with a stack from your computer
5. Choose a provider and a region if you want to create new hosts or click **Select existing hosts** and choose hosts which are already created
6. Fill in necessary fields (if they are)
7. Click **Create hosts and services**

### In new project

1. [Choose a stack](/getting-started/stack-hub) you want to deploy <br> or enter your link to a stack. Example: **https://panel.d2c.io/?import=yourlink**
2. Choose a provider and a region if you want to create new hosts or click **Select existing hosts** and choose hosts which are already created
3. Fill in necessary fields (if they are)
4. Click **Create hosts and services**

A new project will be created. Change a name if it needs.
