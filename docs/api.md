# D2C API documentation

D2C API uses Swagger. The documentation is available under this link [https://api-docs.d2c.io/](https://api-docs.d2c.io/).
Before you start, you need to authorize.

## Authorization

You need a token to use API . How to get token:

```
POST https://api.d2c.io/login
Body:
{"email": "test@d2c.io", "password": "123456"}
Headers:
Content-Type: application/json
```

Example for CURL:

```
curl -X POST -H "Content-Type: application/json" -d '{"email": "test@d2c.io", "password": "123456"}' https://api.d2c.io/login
```

As a result, you will receive a JSON object with a necessary for API usage token.
Token works for 30 days.

Paste a token in the *Authorize* form:

!!! note

    `Bearer your_token`

![Authorization](/img/new_interface/api_authorization.png)

![Authorization form](/img/new_interface/api_authorization_form.png)

## Example

After authorization open a method. Let it be [https://api-docs.d2c.io/#/User/get_user_me](https://api-docs.d2c.io/#/User/get_user_me).

Click **Try it out**

![Example user/me](/img/new_interface/api_example_user_me.png)

Click **Execute** and you'll get an example with CURL:

![Example user/me response](/img/new_interface/api_example_user_me_response.png)
