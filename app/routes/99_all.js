module.exports = function(router){
  router.use('/*', function(req, res, next) {
    res.render('index');
  });

  return router;
};
