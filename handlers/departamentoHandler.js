/**
 * Created by Sergio on 10/12/2016.
 */
var departamentoService = require('../services/departamentoService.js');
var tokenService = require('../services/tokenService');
var jwt         = require('jsonwebtoken');

var departamentoHandler = function() {
    //this.createStudent = handleCreateStudentRequest;
    this.getDepartamentos = handleGetDepartamentosRequest;
    /*this.getStudents = handleGetStudentsRequest;
     this.updateStudent = handleUpdateStudentRequest;
     this.deleteStudent = handleDeleteStudentRequest;
     this.getStudentsByAge = handleGetStudentsByAgeRequest;*/
};

function handleGetDepartamentosRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var filter = {};
    var paging = {
        limit: req.query.limit || 1000,
        start: req.query.start || 0
    }

    var service = departamentoService({username: payload.username, password: payload.password});
    service.getAllDepartamentos(filter, paging).then(function(result){
        res.status(201).send({
            success: true,
            rows: result.rows,
            total: result.count
        })
    }, function(err){
        res.status(500);
        res.send(err);
        return next(new Error(err));
    })
}
module.exports = departamentoHandler;