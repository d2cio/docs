# Вступление

На этой странице мы расскажем как подключить аккаунты облачных провайдеров к D2C.

## Поддерживаемые облачные провайдеры

- **Amazon Web Services**
- **Digital Ocean**
- **Vultr**

Скоро будут доступны:

- Microsoft Azure

## Amazon Web Services

### Быстрый старт с AWS

1. Войдите в ваш [D2C аккаунт](https://panel.d2c.io/account/login)
2. Нажмите **+ Создать сервер**
3. Нажмите **Добавить провайдера** and choose **Amazon Web Services**
5. Вставьте ваши ключи доступа AWS (Access Key ID and Secret Access Key)

### Сгенерировать ключи доступа (AWS credentials)

Если у вас нет ключей доступа AWS, вы можете создать их через консоль AWS (AWS Management console)

1. Войдите в аккаунт AWS, раздел [IAM Users](https://console.aws.amazon.com/iam/home?#/users), кликните Add user
2. Вставьте имя пользователя (например d2c). Выберите “Programmatic access” и кликните **Next: Permissions**
3. Нажмите кнопку "Attach existing policies directly". Найдите AdministratorAccess policy, отметьте её, затем нажмите **Next: Review**
4. Кликните Create user
5. Скопируйте ключи доступа (Access Key ID and Secret Access Key) или сохраните в .csv файл с помощью кнопки download
6. Затем следуйте инструкции **Быстрый старт с AWS**

### Создать индивидуальную policy

1. Откройте раздел AWS [policies](https://console.aws.amazon.com/iam/home?#/policies)
2. Кликните **Create policy**
3. Выберите **Create Your Own Policy**
4. Введите имя (например, d2c-policy)
5. Вы можете сгенерировать индивидуальную policy [здесь](https://awspolicygen.s3.amazonaws.com). Ниже приведен простой пример с ограничением по регионам (замените "eu-west-1" на регионы, которые вы хотите использовать):

        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Action": [
                        "ec2:*"
                    ],
                    "Effect": "Allow",
                    "Resource": "*",
                    "Condition": {
                        "StringEquals": {
                            "ec2:Region": "eu-west-1"
                        }
                    }
                }
            ]
        }

6. Кликните **Create policy**
7. Теперь вы можете [сгенерировать ключи доступа AWS](/getting-started/cloud-providers/#generate-aws-credentials) с вашей собственной policy

## Digital Ocean

### Быстрый старт с Digital Ocean

1. Войдите в ваш [D2C аккаунт](https://panel.d2c.io/account/login)
2. Кликните **+ Создать сервер**
3. Нажмите **Добавить провайдера** и выберите **Digital Ocean**
4. Вставьте ваш Digital Ocean токен

### Авторизовать D2C в Digital Ocean (создать новый токен)

Если у вас нет токена Digital Ocean, вы можете создать его в аккаунте Digital Ocean

1. Войдите в аккаунт Digital Ocean, раздел [API](https://cloud.digitalocean.com/settings/api/tokens)
2. Нажмите **Generate New Token**
3. Назовите токен и нажмите **Generate Token**. Скопируйте его
4. Далее следуйте инструкции **Быстрый старт с Digital Ocean**

## Vultr

!!! note

    Для того, чтобы разрешить D2C управлять серверами Vultr необходимо добавить IP-адрес 52.58.244.78/32 в разделе Access Control

### Быстрый старт с Vultr

1. Войдите в ваш [D2C аккаунт](https://panel.d2c.io/account/login)
2. Кликните **+ Создать сервер**
3. Нажмите **Добавить провайдера** и выберите **Vultr**
4. Вставьте ваш Vultr API key

### Авторизовать D2C в Vultr

Если у вас нет Vultr API key, вы можете создать его в аккаунте Vultr

1. Войдите в аккаунт Vultr, раздел [API](https://my.vultr.com/settings/#settingsapi)
2. Нажмите **Enable API** и скопируйте API key
3. Добавьте 52.58.244.78/32 IP в разделе Access Control
4. Далее следуйте инструкции **Быстрый старт с Vultr**
