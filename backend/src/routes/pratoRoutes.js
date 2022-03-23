module.exports = app => {
    const pratos = require("../controllers/pratoController.js");
    var router = require("express").Router();
    
    router.post("/", pratos.create);
    
    router.get("/", pratos.findAll);
    
    router.get("/disponivel", pratos.findAllDisponiveis);
    
    router.get("/:id", pratos.findOne);
    
    router.put("/:id", pratos.update);
    
    router.delete("/:id", pratos.delete);
    
    router.delete("/", pratos.deleteAll);

    app.use('/api/pratos', router);
  };