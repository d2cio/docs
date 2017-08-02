# Introduction

**Domains** and **certificates** in D2C are issued when NGINX or HAProxy serve any of [application services](/getting-started/services/#application-services). By default an application gets a domain like: *servicename-www.accountID.at.d2c.io*. You may add your domains and TLS certificates.

Ensure that DNS-record for additional domains has the same IP-address as a host of NGINX or HAProxy.

## How to add additional domains and certificates

The process is almost the same for NGINX and HAProxy. The difference is that using NGINX you may add domains and certificates while creating or editing and HAProxy only during editing. To add domain or  TLS certificate, you should have:

- Host with free 80 and 443 ports
- [Application](/getting-started/services/#application-services) or Docker service
- NGINX or HAProxy

Let's review a variant with NGINX. Editing HAProxy described [here](/platform/balancing/#edit-load-balancer). The "Configure services" block is the same for these services.

1. Start create NGINX or click **Edit settings** at NGINX service page if it is already exist
2. Click **Add service config** at the "Configure services" block
3. Choose a service NGINX will serves
4. Choose a protocol (HTTP or HTTPS) and click **Generate config**
5. Specify domains at domains field
6. Click **Own certificate** if you want to add it
7. Choose a Security level and upload your HTTPS certificate and HTTPS key
8. Choose a host and click **Create service** or **Update service** if you edit a service

![Domains - first step](../img/domains.png)

![Domains - choose a mode](../img/domains_choose_mode.png)

![Domains - add domains](../img/domains_add_domains.png)

![Domains - add certificates](../img/domains_add_certificate.png)

![Domains - choose host(s)](../img/domains_select_hosts.png)
