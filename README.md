# MERN CS103 CP Portal
#### Author: Prathik Rao

This is a project using the following technologies:
- [React](https://facebook.github.io/react/) and [React Router](https://reacttraining.com/react-router/) for the frontend
- [Express](http://expressjs.com/) and [Mongoose](http://mongoosejs.com/) for the backend
- [Sass](http://sass-lang.com/) for styles (using the SCSS syntax)
- [Webpack](https://webpack.github.io/) for compilation


## Requirements

- [Node.js](https://nodejs.org/en/) 6+

```shell
npm install
```


## Running

Make sure to add a `config.js` file in the `config` folder. Add the following code:

module.exports = {
  db: 'mongodb://username:password@url:port/db',
  db_dev: 'mongodb://hostname:port/db',
};

Production mode:

```shell
npm start
```

Development (Webpack dev server) mode:

```shell
npm run start:dev
```
