/**
 * Created by Sergio on 10/12/2016.
 */
var pagoService = require('../services/pagoService.js');
var tokenService       = require('../services/tokenService');
var jwt                = require('jsonwebtoken');
var cfg                = require('config');
var _                  = require('lodash');
var filterService      = require('../services/filterService');      

var pagoHandler = function() {
    this.getPagos = handleGetPagosRequest;
    this.createPago = handleCreatePagoRequest;
    this.updatePago = handleUpdatePagoRequest;
    this.deletePago = handleDeletePagoRequest;
}

function handleGetPagosRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var pago = filterService.removeKeysNull(req.query);
    var paging = {
        limit: req.query.limit || 1000,
        start: req.query.start || 0
    };

    var order = '"' + req.query.sort + '"' + ' ' +  req.query.dir;

    var service = pagoService({username: payload.username, password: payload.password});
    service.getAllPagos(pago, paging, order).then(function(result){
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


function handleCreatePagoRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = pagoService({username: payload.username, password: payload.password});
    service.createPago(req.body).then(function(result){
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

function handleUpdatePagoRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = pagoService({username: payload.username, password: payload.password});
    service.updatePago(req.body).then(function(result){
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

function handleDeletePagoRequest(req, res, next) {
    var token = tokenService.getToken(req);
    var payload = jwt.decode(token, {complete: true}).payload;
    var service = pagoService({username: payload.username, password: payload.password});
    service.deletePago(req.body).then(function(result){
        res.status(200).send({
            success: true,
            data:result,
            msg:  cfg.get("COMMON.success")
        })
    }, function(err){
        res.status(500);
        res.send("ha ocurrido un error grave");
        return next(new Error(err));
    })
}

module.exports = pagoHandler;