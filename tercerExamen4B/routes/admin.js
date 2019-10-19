var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var models= require('./../models');
  models.sequelize.sync().then(()=> {
      console.log("SE HA SINCORNIZADO LA BD");
      res.send("SE HA SINCORNIZADO LA BD");
  }).catch(err =>{
      console.log(err,"Hubo un error");
      res.send("NO se ha sincronizado la BD");
  }); 
});

module.exports = router;
