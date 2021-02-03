# Wine

Wine is a web application for rating wines during the tasting competitions.
Consist of client side and server side and use MongoDb as database.

## Instalation proces

### Client
Build client

1. Environment variables
Create .env file in root directory in client.

Content of file:
```env
REACT_APP_BACKEND_URL=http(s)://own_backend_url
REACT_APP_SOCKET_SERVER=ws(s)://own_backend_url
INLINE_RUNTIME_CHUNK=false(optional)
```

2. Install packages
```packages
npm install
```

3. Build react app
```packages
npm run build
```

### Server

Install server: 

1. Environment variables
Create .env file in root directory in server.  

Content of file:
```env
NODE_ENV=production
MONGO_DB_URI=own_mongodb_uri_connection_string
PORT=own_port
DEFAULT_ADMIN_NAME=own_admin_name
DEFAULT_ADMIN_PASSWORD=own_admin_password
ADMIN_JWT_SECRET=own_secret
DEGUSTATOR_JWT_SECRET=own_secret
HOST=onw_host
SSL=true/false
```

2. Install packages
```packages
npm install
```
If you have problems with npm install in particular installing Chromium browser please install it manually, then run again npm install. 

3. Create public folder in root directory

4. Copy all files from "client/build" to "server/public".

5. run server (use for example [pm2](https://pm2.keymetrics.io/)). 