module.exports = function(router){

  // Generic callback flow for routes
  // Routes are actually route definitions and controllers combined
  //
  // router.param('MODEL', function(req, res, next, id){
  //   // need closure based getter to minimize memory usage
  //   var MODEL = models.get(MODEL);
  //
  //   // pattern:
  //   //
  //   // MODEL.METHOD(PARAM(S))
  //   //  .then(function(resp){
  //   //    })
  //   //  .catch(function(error){
  //   //    return next(error))
  //   //  .finally(function(){
  //   //    next()});
  //
  //   MODEL.find(id).then(function(MODEL){
  //     req.MODEL = MODEL;
  //   }).catch(function(error){
  //     return next(error);
  //     // return next(new Error('failed to load MODEL'));
  //   }).finally(function(){
  //     next();
  //   });
  // });

  // convert to a route > verb chain
  // add API specific logging in all()
  //
  // router.route('/api/v1/:MODEL/:ID')
  //   .all(function(req, res, next){
  //    console.log();
  //   })
  //   .get(function(req, res, next){
  //   })
  //   .post(function(req, res, next){
  //   })
  //   .put(function(req, res, next){
  //   })
  //   .delete(function(req, res, next){
  //   })


  router.use('/api/*', function(req, res, next) {

    res.json({status: res.statusCode});
    // next();
  });

  return router;
};
