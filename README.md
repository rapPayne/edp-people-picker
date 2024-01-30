# edp-people-picker

Demo for Travelers

## Running this project locally

### Dependencies

- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [Vite](https://vitejs.dev/)
- [MongoDB](https://www.mongodb.com/)

### How to run locally

1. Clone this repository

2. Change into the `edp-people-picker` directory

```bash
$ cd edp-people-picker
```

3. Install node module dependencies

```bash
$ npm install
```

4. Change into the `edp-people-picker/react-app` directory and install node
   module dependencies for the React app

```bash
$ cd react-app
$ npm install
```
5. Build `dist` files

```bash
$ npm run build
```

6. Change back into root `edp-people-picker` directory

```bash
$ cd ..
```

7. In a seperate terminal, start your mongo server

```bash
$ mongod
```

8. In the first terminal, import data from `db.json`

```bash
$ mongoimport --db edp --collection people --file db.json --jsonArray
```