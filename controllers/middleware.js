var me = require('../models/me');

module.exports = {


  addHeaders: function(req, res, next) {
    res.status(200).set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'X-XSS-Protection': '1; mode=block',
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': "default-src 'self' devmountain.github.io"
    });

    next();
  },

  generateId: function(req, res, next) {
    req.body.id = me.skillz.length;
    next();

  },

  verifyUser: function(req, res, next) {
    console.log(req.params);
    if (req.params.username === "batman" && req.params.pin === '4949') {
      next();
    } else {
      next("Invalid login!")
    }
  }
}
