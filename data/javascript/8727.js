var express = require('express');
var router  = express.Router();
var config  = require('../config');
var F       = require('../controllers/Functions');
var Refund  = require('../controllers/RefundsController');
var MySQL   = require('../controllers/MySQLController');
var TPL     = "rrhh-accidentes";
var route   = __dirname;
var obj     = {
  title: config['localhost'].title,
  url: config['localhost'].url
};
route = route.replace("routes", "");

//routers

router.get('/', F.isAuthenticated, function(req, res) {
  var Language = require('../language/'+req.user.language);
  var response = "",
  state    = "";
  if ( F.verifyAccessRoles( TPL, req ) ) {
    response = F.infoPage(obj,TPL,Language,req);
    state    = typeof(req.session.message) !== "undefined" ? req.session.message : "" ;
    delete req.session.message;
    response.title = "";
    F.getNotify(req.user.username, function (data) {
      response.notify = data;
      res.render(TPL, response );
    });
  }else{
    res.redirect('/');
  }
});
module.exports = router;
