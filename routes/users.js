var express = require('express');
var router = express.Router();
var pg_conn = require('../models/pg_config');


router.get('/', function(req, res, next) {
  
  var product_query = 'SELECT * FROM product';
  
      pg_conn.query(product_query, function(err, data){
        res.render('users', {title: "Userpage",
                                h1_title: "Welcome to ATN shop page",
                                h2_title: "Updated database sucessfully",
                                userData: data});
      });
});


router.get('/edit/:name', function(req, res) {
  var prod_name = req.params.name;
  const edit_query = {
    text: `SELECT * FROM product WHERE product_name=$1`,
    values: [prod_name]
  };
  pg_conn.query(edit_query, function(err, data){
    if (err) throw err;
    res.render('edit_form', {title: "Edit page", edit_data: data.rows[0]}); 
  });
});

router.post('/edit/:name', function(req, res){
  var prod_name = req.params.name;
  const update_query = {
    text: "UPDATE product SET product_name=$1, price=$2, amount=$3, shop_name=$4,url = $5 WHERE product_name=$6",
    values: [req.body.product_name, req.body.price, req.body.amount, req.body.shop_name,req.body.url, prod_name]
  };
  pg_conn.query(update_query, function(err, data){
    if (err) {
      throw err;
      res.render('error', {message: "Update got an error", error: err});
    
    } else {
      var product_query = 'SELECT * FROM product';
      pg_conn.query(product_query, function(err, data){
        // res.render('users', {title: "Userpage",
        //                         h1_title: "Welcome to ATN shop page",
        //                         h2_title: "Updated database sucessfully",
        //                         userData: data});
        // res.redirect('/users',{title: "Userpage",
        //                        h1_title: "Welcome to ATN shop page",
        //                        h2_title: "Updated database sucessfully",
        //                         userData: data});
        res.redirect("/users");
      });
    };
  });
});

router.get('/insert', function(req, res) {
  res.render('insert_form', { title: "please Insert Data base " });
});
router.post('/insert', function(req, res) {
  const insert_query = {
      text: `INSERT INTO product(product_name,price,amount,shop_name,url) VALUES ($1,$2,$3,$4,$5)`,
      values: [req.body.product_name, req.body.price, req.body.amount, req.body.shop_name,req.body.url]
  };
  pg_conn.query(insert_query, function(err, data) {
      if (err) {
          throw err;
          res.render('error', { message: "Insert got error", error: err })
      } else {
          var product_query = 'SELECT * FROM product';
          pg_conn.query(product_query, function(err, data) {
              /*    res.render('users_fe', {
                      title: "Welcome to ATN shop Page",
                      h1_title: "Welcome to DPCB shop Page",
                      h2_title: "Insert query database successfully",
                      userData: data
                  }); */
              res.redirect('/users');
          });
      };
  });
});


router.get('/delete/:name', function(req, res) {
  var prod_name = req.params.name;
  const del_query = {
      text: `DELETE FROM product WHERE product_id =$1`,
      values: [prod_name]
  };
  pg_conn.query(del_query, function(err, data) {
      if (err) {
          throw err;
          res.render('error', { message: "DELETE got error", error: err })
      } else {
          var product_query = 'SELECT * FROM product';
          pg_conn.query(product_query, function(err, data) {
              /*  res.render('users_fe', {
                    title: "Welcome to ATN shop Page",
                    h1_title: "Welcome to DPCB shop Page",
                    h2_title: "DELETE query database successfully",
                    userData: data
                });*/
              res.redirect('/users')
          });
      };
  });
});
module.exports = router;
