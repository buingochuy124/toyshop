var express = require('express');
var router = express.Router();
var pg_conn = require('../models/pg_config');
var display_table = require('../models/product_display');


async function authen(user, pass)
{   
    var authenticated = false;
    const acc_query = 
    {
        text: 'SELECT * FROM account WHERE account_name = $1 AND account_pass=$2',
        values: [user, pass]
    };
    var query_data = await pg_conn.query(acc_query);
    if (query_data.rows.length==1)
    {
        authenticated = true;
    }
    console.log(authenticated);
    return authenticated;
}

router.get('/', function(req, res, next) {
  res.render('login',  {message: "Please input your credential!"});
});

router.post('/', async function(req, res){

  var auth = await authen(req.body.username, req.body.password);
  console.log("Check " + auth);
  if (auth==true)
  {
    var user_shop = req.body.username; 
    if(user_shop != 'guess'){
      var product_query = {
      text:  'SELECT * FROM product WHERE shop_name = $1',
      values: [user_shop]
      
      };
      var pg_conn = require('../models/pg_config');
      var data = await pg_conn.query(product_query);
      console.log(data);
    
      res.render('users',  {title: "Userpage",
                             h1_title: "Welcome to ATN shop page",
                             h2_title: "Fetch data table by EJS",
                             userData: data});
    }
    else{
      var product_query = `SELECT * FROM product`;
      var pg_conn = require('../models/pg_config');
      var data = await pg_conn.query(product_query);
      console.log(data);
    
      res.render('guess',  {title: "Userpage",
                             h1_title: "Welcome to ATN shop page",
                             h2_title: "Fetch data table by EJS",
                             userData: data});
    }
  }
  else
  {
    res.render('login',  {message: "Wrong username or password. Please input your credential again!"});
 
  };  
});

module.exports = router;
