var me = require('../models/me.js');

module.exports = {
  getName: function(req, res, next) {
    res.json(me.name);
  },

  getLocation: function(req, res, next) {
    res.json(me.location);
  },

  getOccupations: function(req, res, next) {

    ans = me.occupations.map(function(item) { return item; });


    if (req.query.order === 'descending') {
      ans.sort(function(a, b) {
        if (a > b) return -1;
        if (a < b) return 1;
        if (a === b) return 0;
      })
    }

    if (req.query.order === 'ascending') {
      ans.sort();
    }
    res.json(ans);
  },

  getLatestOccupation: function(req, res, next) {
    res.json(me.occupations[me.occupations.length - 1]);
  },

  searchOccupations: function(req, res, next) {
    var ans = me.occupations, search = req.params.search, first = req.query.first;

    console.log(ans)
    if (first) {
      ans = ans.filter(function(item) {
        return item[0] === first;
      })
    }

    ans = ans.filter(function(item) {
      return item.toLowerCase() === search;
    })


    res.json(ans);
  },

  getHobbies: function(req, res, next) {
    res.json(me.hobbies);
  },

  getHobbiesByType: function(req, res, next) {
    var t = req.params.type, first = req.query.first,
        ans = me.hobbies;



    if (first) {
      var ans = ans.filter(function(item) {
        var letters = item.name.slice(0, 2);

        return letters.toLowerCase() === first;
      })
    }

    var ans = ans.map(function(item) {
      if (item["type"] = t) return item;
    })

    res.json(ans);
  },

  getSkillz: function(req, res, next) {
    ans = me.skillz;

    if (req.query.experience) {
      ans = ans.filter(function(item) {
        return item["experience"] === req.query.experience;
      })
    }


    res.json(ans);
  },

  getSecrets: function(req, res, next) {
    res.json(me.secrets)
  },


  putName: function(req, res, next) {
    me.name = req.body.name;
    res.json(me.name);
  },

  putLocation: function(req, res, next) {
    me.location = req.body.location;
    res.json(me.location);
  },

  postHobbies: function(req, res, next) {
    me.hobbies.push(req.body.hobby);
    res.json(me.hobbies);
  },

  postOccupations: function(req, res, next) {
    me.occupations.push(req.body.occupation);
    res.json(me.occupations);
  },

  postSkillz: function(req, res, next) {
    me.skillz.push(req.body);
    res.json(me.skillz);
  }
}
