# sit725-skipy

deakin unit sit725 team project

# How to run this project

1. install nodejs;
2. install package;

```
npm i
```

3. install mongodb;
   3.1. if you install on your local machine, replace the url in `config/env.config.js`;
   3.2. if you use the atlas mongodb service, update the `.env.development`, replace the uri with your username and password;
4. start

```
npm run dev
```

# project structure

```sh
.
|-- server.js           // project entry
|-- package.json        // dependency management
|-- .env.example        // example for env
|-- config              // configuration
|   |-- env.config.js
|   |-- swagger.config.js
|-- controllers         // control logic business
|   |-- **.js
|-- db
|   |-- index.js        // db client
|-- middlewares         // auth relevant logic
|   |-- jwt.js
|   |-- permissions.js
|   |-- session.js
|-- models              // data model
|   |-- mapping
|       |-- **.js
|   |-- index.js        // combine data model with db client
|-- public              // static resources
|   |-- css
|   |-- image
|   |-- js
|   |-- xxx
|       |-- xxx.html
|-- routes
|   |-- api
|       |-- xxx.js
|-- utils
|   |-- xxx.xxx.js
```

# branch management

The base branch is main. All developers should create their development branches based on main. After completing their development, developers should raise a merge request to merge their updates into the main branch. Do not forget to update local branch before push your commits.

## commit msg

follow the format
[initial] title: description or [i] title: description
for example:

```
[i] README update: add commit msg format
```

[develop] title: content

```
[d] add register: finish the register functionality
```

# reference

- Mongodb: https://www.mongodb.com/docs/drivers/node/current/
- swagger: https://editor.swagger.io/
