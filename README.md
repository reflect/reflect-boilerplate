# Getting Started with Reflect 

The tools in this repository will help you get started with Reflect. Ideally,
someone from Reflect will walk through this process with you.

### Prerequisites

* A Reflect account.
* A [Reflect API token](https://app.reflect.io/tokens)
* An idea of what you'd like to build (dashboard, report, etc.).
* Node and NPM.

## Getting Started

### 0. Clone this Repo

You'll also need to setup Gulp and all the dependencies for running some of
these tools.

```bash
$ git clone git@github.com:reflect/reflect-boilerplate.git
# ... snip
$ npm install
$ npm install -g gulp-cli
```

### 1. Create a Reflect Account

You should get an invitation from someone at Reflect to create a Reflect
account.

### 2. Create an API token

Navigate to the [API tokens](https://app.reflect.io/tokens) page to provision a
new API token for this process.

#### Update `gulpfile.js`

Edit `gulpfile.js` and fill in `REFLECT_API_TOKEN`. 

```javascript
//
// Replace this with the API token that you want to use when authenticating
// with Reflect services.
//
const REFLECT_API_TOKEN = '<Your API Token>',
      REFLECT_PROJECT_NAME = '';
```

### 3. Create a new Project

Copy `project.json.example` to `project.json`.

```bash
$ cp ./project.json.example ./project.json
```

Edit `project.json` and set the values to whatever you'd like. Note that `slug`
is how you'll refer to this project everywhere else. Once you've edited the
file, you can upload it to Reflect.

```bash
$ curl -u ':<Your API Token>' --data-binary @./project.json 'https://api.reflect.io/v1/projects'
```

#### Update `gulpfile.js`

Edit `gulpfile.js` and fill in `REFLECT_PROJECT_SLUG` with the slug for the
project you just created.

```javascript
//
// Replace this with the API token that you want to use when authenticating
// with Reflect services.
//
const REFLECT_API_TOKEN = '<Your API Token>',
      REFLECT_PROJECT_NAME = 'my-project-123';
```

### 4. Add a Database Credential to the Reflect Agent

Copy `credential.json.example` to `credential.json`.

```bash
$ cp ./credential.json.example ./credential.json
```

Edit `credential.json` and set the values to whatever you'd like. After you've
edited the file, we can upload the credential to Reflect which will forward it
to the Reflect Agent.

**Note:** In this example we're using a hosted Reflect Agent.

```bash
$ curl -u ':<Your API Token>' --data-binary @./credential.json 'https://api.reflect.io/v1/agents/2/credentials'
```

### 5. Create and Upload Your Data Model

Data models are [extensively
documented](https://docs.reflect.io/reflect-api/#data-models). Start by copying
the example data model.

```bash
$ cp ./data_model.json.example ./data_model.json
```

Now fill out the data model according to your database. Once it's ready to go
you can upload it to the Reflect API.

```bash
$ curl -XPUT -u ':<Your API Token>' \
  --data-binary @./data_model.json \
  'https://api.reflect.io/v1/projects/<Your Project Slug>/data-model'
```

### 6. Create a View Configuration

View configurations are likewise documented in the Reflect API documentation.
Start by copying the example configuration.

```bash
$ cp ./view_configuration.json.example ./view_configuration.json
```

Now fill out the configuration according to the view that you'd like to create.

## View the Results

Run `gulp` to compile all the assets and start a webserver that will let you
view the results. Open your browser to
[http://localhost:8000](http://localhost:8000) to see the view you just
created!
