# Supported versions

_**0.12, 4, 6, 7, 8**_

## How to deploy

### What you need to know before deploying an application

1. Service names should be unique across your account
2. If you use private repository you should add a SSH key to your account
3. Directories, which should not be deleted after rebuild or redeploy (user generated content, plugins, logs, etc.) should be specifying as Volumes in Persistant Data volumes block. Check sync if you want to synchronize files between all containers. Do not use it for database files.
4. All services in a project are visible for each other inside. Access from the internet is disabled for most of applications (except NGINX and HAProxy) by default. You can open access from the Internet in "Ports" block.
5. Application should listen on 0.0.0.0:3000 (not 127.0.0.1:3000)

### Simple deployment

1. [Sign in](https://panel.d2c.io/account/login) into your D2C account
2. Create or open a project
3. Click "**Create service**"
4. Choose Node.js
5. Pick a name
6. Choose the way to provision sources:
    - GitHub/BitBucket repository (if you use private repository you should add a SSH key to your account)
    - External link to an archive file
    - Upload an archive file from your computer
7. Select a host or several hosts
8. Click "**Create service**"

### Advanced deployment

1. [Sign in](https://panel.d2c.io/account/login) into your D2C account
2. Create or open a project
3. Click "Create service"
4. Choose Node.js
5. Pick a name
6. Specify [install commands](/getting-started/deployment/#building)
7. Choose the way to provision sources:
    - GitHub/BitBucket repository (if you use private repository you should add a SSH key to your account)
    - External link to an archive file
    - Upload an archive file from your computer
8. Ports:
    - Disable or enable access from the Internet
    - Specify a port
    - Add extra ports
9. Specify [deploy commands](/getting-started/deployment/#deploying)
10. Specify [start commands](/getting-started/deployment/#running)
11. Add environment variables
12. Add custom configs
13. Select a host or several hosts
14. Click "**Create service**"

<!--<button onclick="plusDivs(-1)">Previous image</button>
<button onclick="plusDivs(+1)">Next image</button>

<img class="mySlides" src="/../../img/projects.png">
<img class="mySlides" src="/../../img/stdout.png">-->
