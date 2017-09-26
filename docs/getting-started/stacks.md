# Вступление

Стэки это набор сервисов и серверов, которые требуются для запуска вашего приложения. Это очень простой способ разворачивания приложения в разных окружениях (разработка, тестирование, staging, production).

Все сервисы и настройки сервисов, которые поддерживаются в D2C через интерфейс могут быть описаны в одном **Стэк** файле.


<!-- ## Ready to deploy stacks

| Stack name         | Link                       | Services                      | Minimal configuration |
| :-------------     | :-------------             | :-------------                |:------------- |
| MEAN               | [GitHub]()                 | MongoDB, Mongo-express (Node.js), Node.js, NGINX                                                    | 2 hosts, 4 containers  |  
| Sentry             | [GitHub]()                 | Redis, PostgreSQL, Docker (web), Docker (Worker), Docker (Cron), NGINX                              | 1 host, 6 containers |
| Scalable Wordpress | [GitHub]()                 | MySQL (MasterSlave), Redis, PHP-FPM, NGINX-Cluster, HAProxy, Varnish, PHPMyAdmin (PHP-FPM), NGINX   | 3 hosts, 11 containers |

### How to deploy a stack file -->

## Создание стэк файла

### Что требуется знать

Для сопоставления переменных из других сервисов вы можете использовать следующие шаблоны:

| Шаблон       | Комментарии    |
| :------------- | :------------- |
| `{{=service('serviceName').get('fieldName')}}`        | Возвращает переменную сервиса |
| `{{=service('serviceName').getMainPort()}}`           | Возвращает основной порт |
| `{{=service(serviceName).getAppAlias()}}`             | Возвращает alias контейнера [сервиса приложений](/getting-started/services/#_5))      |
| `{{=service('serviceName').getMasterAlias()}}`        | Возвращает alias мастер-контейнера (для [сервисов хранения данных](/getting-started/services/#data-services))      |
| `{{=service(serviceName).getSlaveAlias()}}`           | Возвращает alias of слейв-контейнера (для [сервисов хранения](/getting-started/services/#_4))      |
| `{{=service('serviceName').getContainerName(num)}}`   | Возвращает имя контейнера сервиса с номером `num`  |

!!! note

    Вы можете использовать `null` как значение для параметров. Это будет означать, что вы добавите эти параметры через интерфейс во время импорта стэка.

## Сервисы хранения данных

| Параметр      | Обязательный     |  Комментарии |
| :------------- | :------------- | :------------- |
| name              | Да    | Имя должно быть уникальным внутри всего аккаунта. Если имя уже используется - оно будет заменено автоматически сгенерируемым   |  
| type              | Да    | Сервис, который вы хотите развернуть       |
| version           | Да    | Вы можете указать любую из [поддерживаемых версий](/getting-started/services/#_4)    |
| configuration     | Да    | [Поддерживаемые конфигурации](/getting-started/services/#_4)       |
| password          | Нет   | Пароль или пароль пользователя root. Обязательный для некоторых конфигураций, например MongoDB ReplicaSet  |
| username          | Нет   | Создание пользователя в течении разворачивания. База данных будет создана с таким же именем       |
| userPassword      | Нет   | Пароль для пользователя базы данных |
| ports             | Нет   | Порты сервиса.<br>Примеры: 8080 - порт 8080 (TCP), 7709\udp - порт 7709 (UDP)     |
| remoteAccess      | Нет   | Все сервисы внутри проекта видны друг для друга изнутри. Если вы хотите, чтобы сервис был доступ из Интернета - используйте `true` |
| env               | Нет   | Переменные окружения для вашего приложения. [Примеры](/getting-started/stacks/#_5)  |
| configFiles.dest  | Нет   | Имя (для стандартных конфигов) или путь к файлу конфига в контейнере (для [пользовательских конфигов](/getting-started/creating-services/#_12)) |
| configFiles.src   | Нет   | Путь к файлу конфига в вашей директории стэка |
| volumes.directory | Нет   | Путь к директории [постоянного хранилища](/getting-started/containers/#_2)  |
| volumes.sync      | Нет   | В случаях, когда у вас более одного контейнера в сервисе вам может потребоваться синхронизация данных между директориями постоянного хранилища. Чтобы включить - используйте `true` |
| deployTo          | Да   | Имена серверов на которых нужно развернуть сервисы |

### Примеры

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

## Сервисы приложений

| Параметр          | Обязательный     |  Комментарии |
| :-------------    | :------------- | :------------- |
| name              | Да   | Имя должно быть уникальным внутри всего аккаунта. Если имя уже используется - оно будет заменено автоматически сгенерируемым |
| type              | Да   | Сервис, который вы хотите развернуть |
| version           | Да   | Вы можете указать любую из [поддерживаемых версий](/getting-started/services/#_5) |
| source.type       | Да   | Варианты: git, download(url)  |
| source.git        | Да   | Если вы используете приватный репозиторий, вы должны добавить SSH ключ в ваш аккаунт (инструкции  к [GitHub](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/) и  [BitBucket](https://confluence.atlassian.com/bitbucket/add-an-ssh-key-to-an-account-302811853.html) )  |
| source.url        | Да   | Протоколы: http, https, ftp. <br> Форматы файлов: .tar.bz2, .tar.gz, .tar, .zip <br> Пример: https://wordpress.org/latest.tar.gz  |
| extensions        | Нет  | Дополнительные модули для сервисов PHP-FPM и PHP-Apache  |
| pecl              | Нет  | Дополнительные модули для сервисов PHP-FPM и PHP-Apache |
| ports             | Да   | Порты сервиса<br>Примеры: 8080 - порт 8080 (TCP), 7709\udp - порт 7709 (UDP)   |
| remoteAccess      | Нет  | Все сервисы внутри проекта видны друг для друга изнутри. Если вы хотите, чтобы сервис был доступ из Интернета - используйте `true` |
| env               | Нет  | Переменные окружения для вашего приложения. [Примеры](/getting-started/stacks/#_5)  |
| volumes.directory | Нет  | Путь к директории [постоянного хранилища](/getting-started/containers/#_2)  |
| volumes.sync      | Нет  | В случаях, когда у вас более одного контейнера в сервисе вам может потребоваться синхронизация данных между директориями постоянного хранилища. Чтобы включить - используйте `true` |
| globalDeps        | Нет  | Команды для установки глобальных зависимостей вашего сервиса. <br> Примеры: pip install, bundle install, apt-get install, npm install -g |
| localDeps         | Нет  | Команды для установки локальных зависимостей и подготовке кода к работе. <br> Примеры: npm install, composer install, bower install, и т.д. или для подготовки: <br> Примеры: gulp build, grunt build, и т.д. |
| startCommand      | Нет  | [Команда запуска](//platform/deployment/#_4) приложения |
| configFiles.dest  | Нет  | Имя (для стандартных конфигов) или путь к файлу конфига в контейнере (для [пользовательских конфигов](/getting-started/creating-services/#_12)) |
| configFiles.src   | Нет  | Путь к файлу конфига в вашей директории стэка |
| deployTo          | Да   | Имена серверов на которых нужно развернуть сервисы |

### Примеры

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

| Параметр       | Обязательный     |  Комментарии |
| :------------- | :------------- | :------------- |
| name               | Да   | Имя должно быть уникальным внутри всего аккаунта. Если имя уже используется - оно будет заменено автоматически сгенерируемым |
| type               | Да   | Сервис, который вы хотите развернуть |
| version            | Да   | Вы можете указать любую из [поддерживаемых версий](/getting-started/services/#_6) |
| ports              | Да   | Порты сервиса<br>Примеры: 8080 - порт 8080 (TCP), 7709\udp - порт 7709 (UDP)   |
| remoteAccess       | Нет  | Все сервисы внутри проекта видны друг для друга изнутри. Если вы хотите, чтобы сервис был доступ из Интернета - используйте `true` |
| env                | Нет  | Переменные окружения для вашего приложения. [Примеры](/getting-started/stacks/#_5)  |
| volumes.directory  | Нет  | Путь к директории [постоянного хранилища](/getting-started/containers/#_2)  |
| volumes.sync       | Нет  | В случаях, когда у вас более одного контейнера в сервисе вам может потребоваться синхронизация данных между директориями постоянного хранилища. Чтобы включить - используйте `true` |
| globalDeps         | Нет  | Команды для установки глобальных зависимостей вашего сервиса. <br> Примеры: pip install, bundle install, apt-get install, npm install -g |
| serviceFiles.name  | Нет  | Имя сервиса, который будет обслуживать NGINX или HAProxy |
| serviceFiles.static | No  | `true` если вам нужно обслуживать статику. **Будьте внимательны**: NGINX может обслуживать статику только на этом же сервере |
| serviceFiles.src   | Нет  | Путь к конфигу обслуживаемого сервиса. Если требуется стандартный конфиг - не заполняйте этот параметр |
| configFiles.dest   | Нет  | Имя (для стандартных конфигов) или путь к файлу конфига в контейнере (для [пользовательских конфигов](/getting-started/creating-services/#_12)) |
| configFiles.src    | Нет  | Путь к файлу конфига в вашей директории стэка |
| deployTo           | Да   | Имена серверов на которых нужно развернуть сервисы |

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

| Параметр          | Обязательный     |  Комментарии |
| :-------------    | :------------- | :------------- |
| name              | Да   | Имя должно быть уникальным внутри всего аккаунта. Если имя уже используется - оно будет заменено автоматически сгенерируемым |
| type              | Да   | Сервис, который вы хотите развернуть |
| image             | Да   | Docker образ приложения из [DockerHub](https://hub.docker.com/).<br>Примеры: openjdk, million12/varnish, quay.io/letsencrypt/dnsmasq |
| version           | Да   | Версия приложения |
| source.type       | Да   | Варианты: git, download(url)  |
| source.git        | Да   | Если вы используете приватный репозиторий, вы должны добавить SSH ключ в ваш аккаунт (инструкции  к [GitHub](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/) и  [BitBucket](https://confluence.atlassian.com/bitbucket/add-an-ssh-key-to-an-account-302811853.html) )  |
| source.url        | Да   | Протоколы: http, https, ftp. <br> Форматы файлов: .tar.bz2, .tar.gz, .tar, .zip <br> Пример: https://wordpress.org/latest.tar.gz  |
| ports             | Да   | Порты сервиса<br>Примеры: 8080 - порт 8080 (TCP), 7709\udp - порт 7709 (UDP)   |
| remoteAccess      | Нет  | Все сервисы внутри проекта видны друг для друга изнутри. Если вы хотите, чтобы сервис был доступ из Интернета - используйте `true` |
| env               | Нет  | Переменные окружения для вашего приложения. [Примеры](/getting-started/stacks/#_5)  |
| volumes.directory | Нет  | Путь к директории [постоянного хранилища](/getting-started/containers/#_2)  |
| volumes.sync      | Нет  | В случаях, когда у вас более одного контейнера в сервисе вам может потребоваться синхронизация данных между директориями постоянного хранилища. Чтобы включить - используйте `true` |
| globalDeps        | Нет  | Команды для установки глобальных зависимостей вашего сервиса. <br> Примеры: pip install, bundle install, apt-get install, npm install -g |
| localDeps         | Нет  | Команды для установки локальных зависимостей и подготовке кода к работе. <br> Примеры: npm install, composer install, bower install, и т.д. или для подготовки: <br> Примеры: gulp build, grunt build, и т.д. |
| startCommand      | Нет  | [Команда запуска](//platform/deployment/#_4) приложения |
| configFiles.dest  | Нет  | Имя (для стандартных конфигов) или путь к файлу конфига в контейнере (для [пользовательских конфигов](/getting-started/creating-services/#_12)) |
| configFiles.src   | Нет  | Путь к файлу конфига в вашей директории стэка |
| deployTo          | Да   | Имена серверов на которых нужно развернуть сервисы |

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

| Параметр              | Обязательный     |  Комментарии |
| :-------------        | :------------- | :------------- |
| name                  | Да  | Имя сервера, который будет создан |
| requirements.cores    | Да  | Количество ядер сервера   |
| requirements.memory   | Да  | Количество оперативной памяти сервера |

### Example

```yaml
hosts:
  - name: main-1
    requirements:
      cores: 2
      memory: 4

  - name: main-2
    requirements:
      cores: 2
      memory: 4

  - name: edge
    requirements:
      cores: 1
      memory: 0.5
```
