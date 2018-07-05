# Introduction

There is a lot of revealing information about Docker containers. Here is a link to an [article](https://www.docker.com/what-container) about it from the Docker website.

## Persistent data

Containerized applications should be lightweight, disposable, and easily replaceable. For this reason, D2C separates the application itself from its data. Docker volumes are used to store persistent data. Data is stored locally on the hosts. If you provision your hosts with D2C at Amazon EC2, it creates a separate EBS partition for containers' data, which can later be enlarged or replaced from your dashboard.

### Synchronizing

We recommend to store _user generated content_ in cloud storage like [Amazon S3](https://aws.amazon.com/s3/) or CDN. Sometimes there is a need to support old technologies when data stores at hosts. For such cases we made a synchronizing volumes between all containers. Simply check the volumes which you want to sync when creating or editing service.

![Persistent data](../img/persistent_data.png)

If there is a need to move your service/app to another host, you can do so with our container [migration feature](/platform/migration/) – it will move all your persistent data to the other host as well.

## Actions

- Terminal
- Execute - like [service execution](/getting-started/services/#actions), but with one container
- [Migrate](/platform/migration/)
- Start/Stop

## Logs

<!--нужно больше инфы (спросить у Паши)-->

Each container has logs. You can check them from the interface. [Read more](https://docs.docker.com/engine/admin/logging/view_container_logs/) about Docker logs.

## Connect to a container from outside the private network

This is how to create an SSH tunnel to a certain container:

1. First, ensure that you have SSH and you have generated private and public RSA keys.
2. Next, you should add your public key to `/home/deploy/.ssh/authorized_keys` (NB: don't erase D2C public key) at host where located target container.
3. Now you can connect to that host with your favourite  terminal and create SSH tunnels
4. This command helps you to know IP of a container in docker network:

        docker inspect -f '{{.NetworkSettings.Networks.bridge.IPAddress}}' $CONTAINER_NAME
for example for service `Database`:

        docker inspect -f '{{.NetworkSettings.Networks.bridge.IPAddress}}' database-master

5. Great, now we know container IP and can create SSH tunnel via the next command on your PC:

        ssh -L $LOCAL_PORT:$CONTAINER_IP:$CONTAINER_PORT deploy@$HOST_IP
for example:

        ssh -L 5432:172.17.0.6:5432 deploy@104.131.30.212

6. Now you can connect to your container via localhost:$LOCAL_PORT

        localhost:5432 in our example

### How the containers page looks like

![Containers page](../img/containers.png)
![Containers page](../img/containers_logs.png)
