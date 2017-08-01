# Private network

D2C allows you to span your project infrastructure across multiple hosts and even different cloud providers. We use a secure, private overlay network for this purpose. Currently, we use WeaveWorks solution for Docker but are considering moving to the new Docker Swarm mode as soon as it matures enough. The network is decentralized and doesn't require any dedicated hosts or configuration storage to operate. WeaveWorks is installed as a docker plugin (it creates several of its own containers) and forms an encrypted mesh network between your hosts. For robust operation, it needs TCP/UDP ports 6783,6784 to be accessible in both directions.

By default, application containers are started inside this private network and have dynamically assigned local IP addresses. Apps can reference each other by service name. It does not matter on which host the app is running – all private network intercommunication is transparent for applications.

For applications that need access from the Internet, port publishing through the host server is enabled. D2C creates public domain names for such services automatically. For example, if you publish a my-node app on port 3000, you can access it at **http://my-node.my-id.at.d2c.io:3000**.
Advanced users can configure containers in the host network context to gain more flexibility.

![Private network](../img/private_inf.png)
