import React from 'react';
const mongodb = require("mongodb")

class MongoConnection {
  conn = () => {
    const client = mongodb.MongoClient;
    const url = "mongodb://127.0.0.1:27017/";
    client.connect(url, function (err, client) {

      var db = client.db("knimbus");
      var collection = db.collection("m_publisher");

      var query = {};

      var cursor = collection.find(query);

      cursor.forEach(
        function(doc) {
            console.log(doc);
        },
        function(err) {
            client.close();
        }
      );
    });
  }
}


export default MongoConnection;
