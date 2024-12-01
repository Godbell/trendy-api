import express from 'express';
import asyncify from 'express-asyncify';
import * as dotenv from 'dotenv';
import mongoPool from './mongo.js';

dotenv.configDotenv();

const app = asyncify(express());

const throwError = (message, status) => {
  throw { message, status };
};

app.use(express.json());

app.get('/test/ddb', async (req, res) => {
  const connection = mongoPool.useDb(process.env.DDB_NAME);
  const result = await connection.model('scores').find();
  res.json(result);
});

app.get('/description', (req, res) => {
  if (!req.query.word) {
    throwError('no word given', 400);
  }

  res.json({
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Nunc molestie ultrices urna in convallis. Proin vel pharetra sem. Nulla blandit, mauris ut aliquam maximus, 
    neque purus sagittis est, eget tempor dui elit ac augue. Mauris dictum lectus nec ante congue, et convallis
    metus dictum. Curabitur vitae lacus magna. Aliquam facilisis purus sit amet libero sagittis cursus. 
    
    Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate nisl odio. 
    Integer imperdiet, quam ut posuere vestibulum, metus ligula congue tellus, ac aliquam nunc risus feugiat quam. 
    Sed consectetur, justo eu vehicula auctor, magna tortor sodales est, id egestas neque felis vitae erat.
    Maecenas ipsum felis, rhoncus ut pellentesque vitae, pulvinar vitae eros.`,
  });
});

app.get('/keywords', (req, res) => {
  res.json({
    단어1: 100.0,
    단어2: 95,
    단어3: 90,
    단어4: 80,
    단어5: 70,
    단어6: 60,
    단어7: 50,
    단어8: 40,
    단어9: 30,
    단어10: 20,
    단어11: 10,
    단어12: 5,
  });
});

app.get('/news', (req, res) => {
  res.json({
    단어1: 100.0,
    단어2: 95,
    단어3: 90,
    단어4: 80,
    단어5: 70,
    단어6: 60,
    단어7: 50,
    단어8: 40,
    단어9: 30,
    단어10: 20,
    단어11: 10,
    단어12: 5,
  });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
