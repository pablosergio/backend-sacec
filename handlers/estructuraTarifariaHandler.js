/**
 * Created by Sergio on 10/12/2016.
 */
var estructuraTarifariaService = require('../services/estructuraTarifariaService.js');
var tokenService       = require('../services/tokenService');
var jwt                = require('jsonwebtoken');
var cfg                = require('config');
var _                  = require('lodash');
var filterService      = require('../services/filterService');      

var estructuraTarifariaHandler = function() {
    this.getEstructuraTarifaria = handleGetEstructuraTarifariaRequest;
    this.createEstructuraTarifaria = handleCreateEstructuraTarifariaRequest;
    this.updateEstructuraTarifaria = handleUpdateEstructuraTarifariaRequest;
    this.deleteEstructuraTarifaria = handleDeleteEstructuraTarifariaRequest;
}

function handleGetEstructuraTarifariaRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var estructura = filterService.removeKeysNull(req.query);
    var paging = {
        limit: req.query.limit || 1000,
        start: req.query.start || 0
    };

    var order = '"' + req.query.sort + '"' + ' ' +  req.query.dir;

    var service = estructuraTarifariaService({username: payload.username, password: payload.password});
    service.getAllEstructuraTarifaria(estructura, paging, order).then(function(result){
        res.status(200).send({
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

function handleCreateEstructuraTarifariaRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = estructuraTarifariaService({username: payload.username, password: payload.password});
    service.createEstructuraTarifaria(req.body).then(function(result){
        res.status(201).send({
            success: true,
            data: result,
            msg: cfg.get("COMMON.success") 
        })
    }, function(err){
        res.status(500);
        res.send(err);
        return next(new Error(err));
    })
}

function handleUpdateEstructuraTarifariaRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = estructuraTarifariaService({username: payload.username, password: payload.password});
    service.updateEstructuraTarifaria(req.body).then(function(result){
        res.status(200).send({
            success: true,
            data:result,
            msg: cfg.get("COMMON.success")
        })
    }, function(err){
        res.status(500);
        res.send(err);
        return next(new Error(err));
    })
}

function handleDeleteEstructuraTarifariaRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = estructuraTarifariaService({username: payload.username, password: payload.password});
    service.deleteEstructuraTarifaria(req.body).then(function(result){
        res.status(200).send({
            success: true,
            data:result,
            msg:  cfg.get("COMMON.success")
        })
    }, function(err){
        res.status(500);
        res.send("ha ocurrido un eerror grave");
        return next(new Error(err));
    })
}

module.exports = estructuraTarifariaHandler;