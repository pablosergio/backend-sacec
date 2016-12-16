/**
 * Created by Sergio on 10/12/2016.
 */
var jwt = require('express-jwt');

function setup(router, handlers) {

    // ROUTES FOR Common API
    // =============================================================================
    router.post('/login', handlers.login.authenticate);
    /* Routes for Listas */
    router.get('/listas', jwt({secret: process.env.TOKEN_SECRET}), handlers.lista.getListas);
    router.post('/listas', jwt({secret: process.env.TOKEN_SECRET}), handlers.lista.createLista);
    router.put('/listas', jwt({secret: process.env.TOKEN_SECRET}), handlers.lista.updateLista);
    router.delete('/listas', jwt({secret: process.env.TOKEN_SECRET}), handlers.lista.deleteLista);
    router.get('/listabytipo', jwt({secret: process.env.TOKEN_SECRET}), handlers.lista.getListaByTipo);
    
    /* Routes for Propietarios */
    router.get('/propietarios', jwt({secret: process.env.TOKEN_SECRET}), handlers.propietario.getPropietarios);
    router.post('/propietarios', jwt({secret: process.env.TOKEN_SECRET}), handlers.propietario.createPropietario);
    router.put('/propietarios', jwt({secret: process.env.TOKEN_SECRET}), handlers.propietario.updatePropietario);
    router.delete('/propietarios', jwt({secret: process.env.TOKEN_SECRET}), handlers.propietario.deletePropietario);
    /* Routes for Modelo Departamentos */
    router.get('/modelodepartamentos', jwt({secret: process.env.TOKEN_SECRET}), handlers.modeloDepartamento.getModeloDepartamentos);
    router.post('/modelodepartamentos', jwt({secret: process.env.TOKEN_SECRET}), handlers.modeloDepartamento.createModeloDepartamento);
    router.put('/modelodepartamentos', jwt({secret: process.env.TOKEN_SECRET}), handlers.modeloDepartamento.updateModeloDepartamento);
    router.delete('/modelodepartamentos', jwt({secret: process.env.TOKEN_SECRET}), handlers.modeloDepartamento.deleteModeloDepartamento);
    /* Routes for  Departamentos */
    router.get('/departamentos', jwt({secret: process.env.TOKEN_SECRET}), handlers.departamento.getDepartamentos);
    router.post('/departamentos', jwt({secret: process.env.TOKEN_SECRET}), handlers.departamento.createDepartamento);
    router.put('/departamentos', jwt({secret: process.env.TOKEN_SECRET}), handlers.departamento.updateDepartamento);
    router.delete('/departamentos', jwt({secret: process.env.TOKEN_SECRET}), handlers.departamento.deleteDepartamento);
    /* Routes for  Estructura Tarifaria */
    router.get('/estructuratarifaria', jwt({secret: process.env.TOKEN_SECRET}), handlers.estructuraTarifaria.getEstructuraTarifaria);
    router.post('/estructuratarifaria', jwt({secret: process.env.TOKEN_SECRET}), handlers.estructuraTarifaria.createEstructuraTarifaria);
    router.put('/estructuratarifaria', jwt({secret: process.env.TOKEN_SECRET}), handlers.estructuraTarifaria.updateEstructuraTarifaria);
    router.delete('/estructuratarifaria', jwt({secret: process.env.TOKEN_SECRET}), handlers.estructuraTarifaria.deleteEstructuraTarifaria);
    /* Routes for  Deudas */
    router.get('/deudas', jwt({secret: process.env.TOKEN_SECRET}), handlers.deuda.getDeudas);
    router.get('/deudabytipotarifa', jwt({secret: process.env.TOKEN_SECRET}), handlers.deuda.getDeudaByTipoTarifa);
    /* Routes for  Pagos */
    router.get('/pagos', jwt({secret: process.env.TOKEN_SECRET}), handlers.pago.getPagos);
    router.post('/pagos', jwt({secret: process.env.TOKEN_SECRET}), handlers.pago.createPago);
    router.put('/pagos', jwt({secret: process.env.TOKEN_SECRET}), handlers.pago.updatePago);
    /* Routes for  Egresos */
    router.get('/egresos', jwt({secret: process.env.TOKEN_SECRET}), handlers.egreso.getEgresos);
    router.post('/egresos', jwt({secret: process.env.TOKEN_SECRET}), handlers.egreso.createEgreso);
    router.put('/egresos', jwt({secret: process.env.TOKEN_SECRET}), handlers.egreso.updateEgreso);
    router.delete('/egresos', jwt({secret: process.env.TOKEN_SECRET}), handlers.egreso.deleteEgreso);
       
}

exports.setup = setup;