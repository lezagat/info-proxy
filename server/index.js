require('newrelic');
const express = require('express');
const path = require('path');
const app = express();
const request = require('request');
const PORT = 1111;

app.use(express.static(path.join(__dirname, '../public')))

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/restaurants/:id/info', (req, res) => {
  // res.redirect(`http://127.0.0.1:3002/api/restaurants/${req.params.id}/info`);
  // axios.get(`http://127.0.0.1:3002/api/restaurants/${req.params.id}/info`)
  //   .then((response) => {
  //     res.send(response.data).status(200);
  //   })
  //   .catch((error) => {
  //     res.sendStatus(500);
  //   });
  request
    .get('http://3.18.108.169:3002/api/restaurants/'+ req.params.id+ '/info')
    .on('data', (data) => {
      res.send(data).status(200);
    })
    .on('error', (err) => {
      res.sendStatus(500);
    })
});

// app.get('/restaurants/:id/reviews', (req, res) => {
//   res.redirect(`http://127.0.0.1:3001/api/restaurants/${req.params.id}/reviews`);
// });

// app.get('/restaurants/:id/photos', (req, res) => {
//   res.redirect(`http://127.0.0.1:3000/api/restaurants/${req.params.id}/photos`);
// });

// app.get('/restaurants/:id/googlereviews', (req, res) => {
//   res.redirect(`http://127.0.0.1:3003/api/restaurants/${req.params.id}/googlereviews`);
// });
app.listen(PORT, () => console.log(`Proxy server listening on port ${PORT}!`));
