var express = require('express');
var router = express.Router();

const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {

  const url = "http://api.giphy.com/v1/gifs/random?api_key=2WB8cSUOM8QthgCICKWxzyMwTiVjaUi1";
  request.get(url, (err, response, body) => {
    if(err) { console.error(err)}
    body = JSON.parse(body);
    const imgUrl = body.data.image_original_url
    res.render('index', { title: 'Make School Giphy', imgUrl: imgUrl });
  });
});
router.get('/search', (req, res, next) => {
  res.render('search');
});
router.post('/search', (req, res, next) => {
  const query = req.body['giphy-query'];
  const url = `http://api.giphy.com/v1/gifs/search?api_key=2WB8cSUOM8QthgCICKWxzyMwTiVjaUi1&q=${query}`;
  request.get(url, (err, response, body) =>{
    if (err) {console.error(err)}

    body = JSON.parse(body);
    const randomResult = body.data[Math.floor(Math.random() * body.data.length)];
    if ( randomResult === undefined ) {return;}
    const searchResultUrl = randomResult.images.fixed_height.url;

    res.render('search', {searchResultUrl: searchResultUrl});
  });
});
module.exports = router;
