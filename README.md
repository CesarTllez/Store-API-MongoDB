# STORE API

Simple Rest API of a product store using MongoDB as database. The services are tested with Vitest and Supertest.

## Set Up

### Step 1

Download dependencies with:

```
npm install
```

### Step 2

Inside the main project path, create a file for the `.env` environment variables and assign the following values:

```
PORT=3000

MONGO_URI=mongodb+srv://your_user:your_password@cluster0.yllarsu.mongodb.net/store_db?retryWrites=true&w=majority
```

**If you want to connect to a local database, change the url to** `mongodb://localhost:27017/store_db`

### Step 3

#### Run local server:

```
npm run dev
```

#### Run tests:

```
npm run test
```

```
npm run coverage
```