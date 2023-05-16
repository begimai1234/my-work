var express = require('express');
var router = express.Router();
var fs = require('fs');

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017/';
const mongoClient = new MongoClient(url);

router.get('/userInfo', function (req, res) {
  async function run() {
    try {
      await mongoClient.connect();
      const db = mongoClient.db('users');
      const collection = db.collection('userInfo');
      const user = {
        name: req.query.name,
        lastName: req.query.fam,
        age: req.query.age,
        passport: req.query.iin,
        data: req.query.date,
      };
      const result = await collection.insertOne(user);
      console.log(result);
      console.log(user);
    } catch (err) {
      console.log(err);
    } finally {
      await mongoClient.close();
    }
  }
  run().catch(console.error);

  res.render('userAdd', {});
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getAllUser', function (req, res) {
  async function run() {
    try {
      await mongoClient.connect();
      const db = mongoClient.db('users');
      const collection = db.collection('userInfo');
      const users = await collection.find().toArray();
      console.log(users);
      res.render('getAllUser', { users: users });
    } catch (err) {
      console.log(err);
    } finally {
      await mongoClient.close();
    }
  }
  run().catch(console.error);
});

module.exports = router;
