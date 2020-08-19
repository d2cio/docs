# Introduction

At this page we provide ready to use stacks.

## How to deploy a stack

1. [Sign in](https://panel.d2c.io/user/login) or [create an account](https://panel.d2c.io/user/register)
2. Click **New stack** from the dashboard
3. Choose a stack template you want to deploy
4. Choose or create a new project
5. Choose a [host](/getting-started/hosts/)
6. Fill in necessary fields (if they are)
7. Click **Confirm**

## Stacks

!!! note

    Actual list of stacks you can [find in the Stackhub](https://d2c.io/stackhub)

Stack name          | Services                                                                                            | Configuration          | Sources and deploy
:------------------ | :-------------------------------------------------------------------------------------------------- | :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
MEAN light          | MongoDB, Mongo-express (Node.js), Node.js, NGINX                                                    | 1 hosts, 4 containers  | [GitHub](https://github.com/d2cio/mean-light-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/mean-light-stack/archive/master.zip)
MEAN                | MongoDB, Mongo-express (Node.js), Node.js, NGINX                                                    | 2 hosts, 4 containers  | [GitHub](https://github.com/d2cio/mean-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/mean-stack/archive/master.zip)
WordPress with Varnish | MariaDB (MasterSlave), Redis, WordPress(D2C Docker image based on NGINX+PHP-FPM), NGINX-Cluster, HAProxy, Varnish, PHPMyAdmin, NGINX | 3 hosts, 11 containers | [GitHub](https://github.com/d2cio/wordpress-scalable-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/wordpress-scalable-stack/archive/master.zip)
WordPress Apache    | MariaDB (MasterSlave), Redis, PHP-Apache, Varnish, HAProxy, PHPMyAdmin (PHP-Apache)                 | 3 hosts, 8 containers  | [GitHub](https://github.com/d2cio/wordpress-scalable-apache-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/wordpress-scalable-apache-stack/archive/master.zip)
WordPress light     | MariaDB (StandAlone), PHP-Apache, PHPMyAdmin (PHP-Apache), HAProxy                                  | 1 host, 4 containers   | [GitHub](https://github.com/d2cio/wordpress-scalable-light-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/wordpress-scalable-light-stack/archive/master.zip)
Sentry              | Redis, PostgreSQL, Docker (web), Docker (Worker), Docker (Cron), NGINX                              | 1 host, 6 containers   | [GitHub](https://github.com/d2cio/sentry-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/sentry-stack/archive/master.zip)
Odoo                | PostgreSQL, Docker, NGINX                                                                           | 1 host, 3 containers   | [GitHub](https://github.com/d2cio/odoo-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/odoo-stack/archive/master.zip)
Redmine             | PostgreSQL, Docker, NGINX                                                                           | 1 host, 3 containers   | [GitHub](https://github.com/d2cio/redmine-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/redmine-stack/archive/master.zip)
RocketChat          | MongoDB, Docker, NGINX                                                                              | 1 host, 3 containers   | [GitHub](https://github.com/d2cio/rocketchat-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/rocketchat-stack/archive/master.zip)
Ghost               | MariaDB, Docker, NGINX                                                                              | 1 host, 3 containers   | [GitHub](https://github.com/d2cio/ghost-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/ghost-stack/archive/master.zip)
PyroCMS             | PostgreSQL, PHP-FPM, NGINX                                                                          | 1 host, 3 containers   | [GitHub](https://github.com/d2cio/pyrocms-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/pyrocms-stack/archive/master.zip)
Cachethq            | PostgreSQL, Docker, NGINX                                                                           | 1 host, 3 containers   | [GitHub](https://github.com/d2cio/cachethq-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/cachethq-stack/archive/master.zip)
MongoDB             | MongoDB, Mongo-express(Node.js), NGINX                                                              | 1 host, 3 containers   | [GitHub](https://github.com/d2cio/mongodb-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/mongodb-stack/archive/master.zip)
MongoDB ReplicaSet  | MongoDB, Mongo-express(Node.js), NGINX                                                              | 3 hosts, 5 containers  | [GitHub](https://github.com/d2cio/mongodb-replicaset-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/mongodb-replicaset-stack/archive/master.zip)
MariaDB             | MariaDB, PHPMyAdmin (PHP-FPM), NGINX                                                                | 1 host, 3 containers   | [GitHub](https://github.com/d2cio/mariadb-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/mariadb-stack/archive/master.zip)
MariaDB MasterSlave | MariaDB, PHPMyAdmin (PHP-FPM), NGINX                                                                | 2 hosts, 4 containers  | [GitHub](https://github.com/d2cio/mariadb-masterslave-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/mariadb-masterslave-stack/archive/master.zip)
Percona             | Percona, PHPMyAdmin (PHP-FPM), NGINX                                                                | 1 host, 3 containers   | [GitHub](https://github.com/d2cio/percona-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/percona-stack/archive/master.zip)
Percona MasterSlave | Percona, PHPMyAdmin (PHP-FPM), NGINX                                                                | 2 hosts, 4 containers  | [GitHub](https://github.com/d2cio/percona-masterslave-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/percona-masterslave-stack/archive/master.zip)
MySQL               | MySQL, PHPMyAdmin (PHP-FPM), NGINX                                                                  | 1 host, 3 containers   | [GitHub](https://github.com/d2cio/mysql-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/mysql-stack/archive/master.zip)
MySQL MasterSlave   | MySQL, PHPMyAdmin (PHP-FPM), NGINX                                                                  | 2 host, 4 containers   | [GitHub](https://github.com/d2cio/mysql-masterslave-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/mysql-masterslave-stack/archive/master.zip)
Adminer             | PHP+Apache                                                                                          | 1 host, 1 container    | [GitHub](https://github.com/d2cio/adminer-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/adminer-stack/archive/master.zip)
Adminer+NGINX       | PHP-FPM, NGINX                                                                                      | 1 host, 2 containers   | [GitHub](https://github.com/d2cio/adminer-nginx-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/adminer-nginx-stack/archive/master.zip)
pgAdmin4            | Python                                                                                              | 1 host, 1 container    | [GitHub](https://github.com/d2cio/pgAdmin-stack) or [Deploy](https://panel.d2c.io/new-stack?url=https://github.com/d2cio/pgAdmin-stack/archive/master.zip)
