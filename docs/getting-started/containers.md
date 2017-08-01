# Introduction

There is a lot of revealing information about Docker containers. Here is a link to an [article](https://www.docker.com/what-container) about it from the Docker website.

## Persistent data

Containerized applications should be lightweight, disposable, and easily replaceable. For this reason, D2C separates the application itself from its data. Docker volumes are used to store persistent data. Data is stored locally on the hosts. If you provision your hosts with D2C at Amazon EC2, it creates a separate EBS partition for containers' data, which can later be enlarged or replaced from your dashboard.

When you have more than one container, you may need to sync data between volumes. Simply check the volumes which you want to sync when creating or editing service.

![Persistent data](../img/persistent_data.png)

If there is a need to move your service/app to another host, you can do so with our container migration feature – it will move all your persistent data to the other host as well.

## Actions

- Terminal
- Execute
- Migrate
- Start (stop)

## Logs

<!--нужно больше инфы (спросить у Паши)-->

Each container has logs. You may check them from the interface. [Read more](https://docs.docker.com/engine/admin/logging/view_container_logs/) about Docker logs.

### How the containers page looks like

![Containers page](../img/containers.png)
![Containers page](../img/containers_logs.png)
