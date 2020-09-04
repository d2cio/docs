# Welcome to the D2C.io docs!

## What is D2C.io?

D2C is a platform which automates routines in building the infrastructure for applications. It is designed to facilitate DevOps' tasks for developers through the simple interface. You can use it to manage servers' infrastructure and lifecycle of an application from developing to production using own hosts or cloud providers of your choice.

## Installation

D2C is a web service, and you do not need to install anything. [Sign Up](https://panel.d2c.io/user/register) and start creating hosts and services which your application needs.

## What can you do with D2C.io?

- [Manage hardware infrastructure](/hosts/hosts/) using cloud (hosting) providers and/or own hosts
- [**Deploy**](/platform/deployment/):
    - [databases](/services/services/#data-services) in StandAlone or MasterSlave/ReplicaSet configurations
    - [application services(runtimes)](/services/services/#application-services-runtimes) from git or any archive
    - [web-servers and Docker images](/services/services/#other-services)
- Containerize applications (it happens automatically after creating any service)
- [**Scale**](/platform/scaling/) services and hosts in a single click
- [**Balance**](/platform/balancing/) applications using a pre-configured HAProxy service
- [**Create database backups**](/platform/backups) directly to your [storage provider](/providers/storage-providers/) and restore when it needs
- [**Migrate**](/platform/migration/) containers to any of your hosts
- Check [**logs**](/platform/logs/) and [**metrics**](/platform/metrics/) of containers and hosts
- [Redirect logs](/platform/logs-redirection/) to external storages like [Elastic stack](https://d2c.io/stackhub/elastic-stack) or [Logstash with InfluxDB and Grafana](https://d2c.io/stackhub/logstash-influxdb-grafana-stack)
- Get a pre-configured [**private network**](/platform/private-network/) by Weave for all hosts and services
- [Create own stacks](/stacks/stacks/) to simplify your deployments
- Use [**WebHooks**](/platform/webhooks/) to automate your deployments
- Use pre-configured [NGINX](/services/other-services/nginx/) configs
- Get [**free TLS**](/platform/domains-and-certificates/) certificates for your domains by Let's Encrypt (works with [NGINX](/services/other-services/nginx/) and [HAProxy](/services/other-services/haproxy/))
- [Invite your teammates](/account/team-management/#members) and set [individual](/account/team-management/#local-rules) or [global access](/account/team-management/#global-roles) almost to any object in your D2C account

## How to get started?

- [Create an account](https://panel.d2c.io/user/register)
- [**Link to a cloud provider**](/providers/cloud-providers/) or [connect own hosts](/hosts/connect-own-host/#supported-operation-systems-and-requirements)
- Create a project
- [Choose services](/services/services/) you want to deploy or use [ready to deploy stacks from the StackHub](https://d2c.io/stackhub)
- Configure in a simple way, without any files
- Select hosts and deploy
- Work on your code and use the interface for [updating your app](/services/services/#actions-with-application-services), creating backups, checking metrics and logs
