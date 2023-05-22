module.exports = app =>{
    const services = require("../controllers/services.controller.js");

  var router = require("express").Router();

  router.post('/',services.create);
  router.get('/', services.getAll);
  router.get('/:id',services.findOne);
  router.put('/:id',services.update);
  router.delete('/:id',services.delete);
  router.delete('/:id',services.deleteAll);

  app.use('/api/services',router)
};

