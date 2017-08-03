# Introduction

D2C uses Ansible playbooks to deploy applications. Settings from service configuration pages are used as parameters to execute playbooks. We have a set of playbooks for environment configuration and different application types. You choose the application type, provide some essential parameters, supply the source code and/or deployment scripts, and start the deployment process. The process is logged task-by-task, and you can review it in your dashboard.

D2C uses three deployment phases: building, deploying and running. D2C can execute all three of them one after another, or just the necessary one. For example, you can want to rebuild a base container with an upgraded Node release and run it with the same source code and data. Alternatively, you can want to update the source code and reload your application to pick up these changes.

### Building

It is a process of building the container image for your application. It includes downloading base docker OS images for the application, installing, and configuring necessary packages. *There is no access to application sources* in this step. All modifications done in this step are stored **inside** the container image; no data is saved to external volume. Treat this step like preparing a server for running your application. You use **Global dependencies** to run commands in this step.

### Deploying

It is a process of preparing your application to be ready to run. During this step, you have access to application source codes and data volume, but *no changes will be saved to the container image*. You should use this step, for example, to compile CSS, minify JS, install local code dependencies, make the initial database population, etc.

The deployment process runs in temporary containers with its *own source code copy but the same data volume*. The source code volume from this temporary container is placed into the main container afterwards. This allows you to achieve near zero downtime deployment by preparing a new version of code while the previous one is still running online; at the same time, if you need to migrate the current database to a new version, you have access to the live data volume. Depending on your preferred deployment process, you can wish to stop the current application first (in a case of DB migration), or to keep it running and just swap the source code after the preparation process in the temporary container is completed. You use **Local dependencies and code's preparation** to run commands in this step.

After the deployment process is completed, the temporary container is removed. So in this step, you can change only the source code or data volume. Any changes that are made in other locations (e.g., installing npm-packages globally) will be lost. Remember to use the build step to create container-wide changes.

### Running

In this step, the app container is started with source code and data volumes mounted. All networking is being properly configured, ports published, and DNS set up. The container image created during the build step is used to spin up the container. You use **startCommand** to start your application.

You should usually modify **startCommand** only for custom applications like Node, Python, etc. Standard applications like database engines and web servers provided by D2C use predefined commands.
