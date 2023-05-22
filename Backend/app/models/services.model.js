const sql = require("./db.js");

const services = function(service){
    console.log("i am a service",service)
    this.service_name = service.service_name;
    this.charges = service.charges;
    this.description = service.description;
}
services.create = (newService, result) => {
    sql.query("INSERT INTO services SET ?", newService, (err, res) => {
      if (err) {
        console.log("error:", err);
        result(err, null);
        return;
      }
      console.log(res,"response")
      console.log("created newService: ", { id: res.insertId, ...newService });
      result(null, { id: res.insertId, ...newService });
    
    });
  };

  services.getAll = (results) =>{
    let query = "SELECT * FROM services";

    sql.query(query,(err,res)=>{
        if(err){
            console.log(err);
            results(null,err);
            return;
        }
        console.log("service",res);
        results(null,res)
    })
  }
 
  services.findById = (id,result) =>{
    sql.query(`SELECT * FROM services WHERE id = ${id}`,(err,res)=>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("service",res[0]);
            result(null,res[0]);
            return;
        }
        result({kind:'not_found'},null);
    });

  }
  services.remove = (id,result) =>{
    sql.query("DELETE  FROM services WHERE id = ?", id,(err,res)=>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        if (res.affectedRows == 0) {
            // not found service with the id
            result({ kind: "not_found" }, null);
            return;
          }
          console.log("deleted service with id: ", id);
          result(null, res);
    });

  }
 
  services.updateById = (id, service, result) => {
    sql.query(
      "UPDATE services SET service_name = ?, charges = ? , description = ?  WHERE id = ?",
      [service.service_name,service.charges,id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated service: ", { id: id, ...service});
        result(null, { id: id, ...service });
      }
    );
  };
  services.removeAll = result => {
    sql.query("DELETE FROM services", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} services`);
      result(null, res);
    });
  };
module.exports = services