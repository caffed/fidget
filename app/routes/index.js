module.exports = function(router){
  var fs = require("fs");
  fs.readdirSync(__dirname).forEach(function(file){
    if(file !== "index.js" && (/^([a-zA-z0-9\_\-]+)(\.js)$/i).test(file)){
      require('./' + file)(router);
    }
  });

  return router;
};
