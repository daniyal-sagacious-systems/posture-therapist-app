const services = require('../models/services.model');

exports.create = async(req,res) =>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
       const service = new services({
        service_name : req.body.service_name,
        charges :req.body.charges,
        description:req.body.description
       })
        services.create(service,(err,data)=>{
        if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Service."
        });
        else res.send(data);
       })
   
}

exports.getAll = async(req,res) =>{
    services.getAll((err,data)=>{
      if(err){
        res.status(500).send({
            message:err.message || "some error occur while getting data"
        });
        
      }
      else res.send(data);
    })
}

exports.findOne = (req,res) =>{
    services.findById(req.params.id,(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Service not found with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving Services with id " + req.params.id
              });
            }
          } else res.send(data); 
    })
}



exports.update = (req,res) =>{
    if(!req.body){
        res.status(400).send({
            message:"Content can not be empty!"
        });

    }
    console.log(req.body);
    services.updateById(req.params.id, new services(req.body),(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found service with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating service with id " + req.params.id
              });
            }
          } else res.send(data);
    })
}

exports.delete =(req,res) =>{
    services.remove(req.params.id,(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Service with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Could not delete Service with id " + req.params.id
              });
            }
          } else res.send({ message: `Service was deleted successfully!` }); 
    })
}

exports.deleteAll = (req, res) => {
    services.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all services."
        });
      else res.send({ message: `All Services were deleted successfully!` });
    });
  };
  