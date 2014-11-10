module.exports = function(router){
  router.use(function(req, res, next) {
    console.log(res.statusCode, req.query || req.params, req.method, req.url);
    next();
  });

  return router;
};
