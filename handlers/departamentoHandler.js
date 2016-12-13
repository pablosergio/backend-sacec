/**
 * Created by Sergio on 10/12/2016.
 */
var departamentoService = require('../services/departamentoService.js');
var departamentoHandler = function() {
    //this.createStudent = handleCreateStudentRequest;
    this.getDepartamentos = handleGetDepartamentosRequest;
    /*this.getStudents = handleGetStudentsRequest;
     this.updateStudent = handleUpdateStudentRequest;
     this.deleteStudent = handleDeleteStudentRequest;
     this.getStudentsByAge = handleGetStudentsByAgeRequest;*/
};

function handleGetDepartamentosRequest(req, res, next) {
    var service = departamentoService({user: req.user.username, password: req.user.password});
    service.getAllDepartamentos().then(function(result){
        res.status(201).send({
            success: true,
            data:result
        })
    }, function(err){
        res.status(500);
        res.send(err);
        return next(new Error(err));
    })
}
module.exports = departamentoHandler;