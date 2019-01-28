# Json Web Token playground API

## Overview

API for educational purposes to see how the different libraries around the world of JWT work together.

## How to use it

- Set required environment variables or use the default values.
- Install the dependencies by ejecuting `yarn` in the root directory.
- Run the app either with `yarn start` or `yarn dev`.
- Hit the `/token` endpoint to generate a token.
- Copy the token.
- Hit the `/verify/:token` endpoint with the copied token.
- Try out the other endpoints to see what they generate.

## Available end points

```
GET /.well-known/jwks[.json]
GET /keys
GET /token
GET /tokens
GET /verify/:token
```

## Environment Variables

### Required

- None

### Optional

- PORT

  Port for Express to run the API. Default: 3003.

  e.g. PORT=3003

- KID

  Key ID to associate the Public key with. Default: random UUID v4.

  e.g. KID=a70e5543-679e-4ad4-88c7-b9e8e8c20f27

- DYNAMIC_KEYS

  If present (any value), it generates Public and Private keys dynamically. Default: undefined.

  e.g. DYNAMIC_KEYS=1
