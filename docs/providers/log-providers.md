# Introduction

At this page, we describe how to generate credentials of log providers and use them in D2C.

## Supported log drivers

- GrayLog Extendend Log Format ([GELF](https://www.graylog.org/))

## Requirements

- Logstash with an [access to the Internet](/services/other-services/docker-service/#network-settings) or public IP-address

## How to add a log provider

1. Sign in into your [D2C account](https://panel.d2c.io/user/login)
2. Move to [providers page](https://panel.d2c.io/account/providers) or use Manage → Providers in the top menu
3. Click **Add provider** and choose **GrayLog**
5. Specify your IP address of a host with deployed Logstash
6. Set Compression Type and Compression level (default: `none`)
7. Click **Confirm**

!!! Note

    You can find a ready to use [Elastic](https://d2c.io/stackhub/elastic-stack) and [Logstash-InfluxDB-Grafana](https://d2c.io/stackhub/logstash-influxdb-grafana-stack) stacks in our Stackhub.
