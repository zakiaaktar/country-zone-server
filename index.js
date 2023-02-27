const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 4000;


// middle wares
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xwlx9fx.mongodb.net/?retryWrites=true&w=majority`;
//console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
  try {
    const countryCollection = client.db('restCountry').collection('countries');



    app.get('/countries', async (req, res) => {

      // const search = req.query.search;
      // console.log(search);

      const query = {};
      // let query = {};
      // if(search.length){

      // }
      const order = req.query.order === 'asc' ? 1 : -1;
      const cursor = countryCollection.find(query).sort({ name: order });
      const countries = await cursor.toArray();
      res.send(countries);



    });



    app.get('/SmallerLithuania', async (req, res) => {
      const query = { area: { $lt: 65300 } }
      const order = req.query.order === 'asc' ? 1 : -1;
      const cursor = countryCollection.find(query).sort({ name: order });
      const countries = await cursor.toArray();
      // const countries = await cursor.limit(10).toArray();
      res.send(countries);
    });


  }
  finally {

  }
}

run().catch(err => console.error(err));



app.get('/', (req, res) => {
  res.send('countries server is running');
});

app.listen(port, () => {
  console.log(`countries server running on ${port}`);
})