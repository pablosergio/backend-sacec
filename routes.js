/**
 * Created by Sergio on 10/12/2016.
 */
var jwt = require('express-jwt');

function setup(router, handlers) {

    // ROUTES FOR Common API
    // =============================================================================
    router.post('/login', handlers.login.authenticate);
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
    
    router.get('/departamentos', jwt({secret: process.env.TOKEN_SECRET}), handlers.departamento.getDepartamentos);

}

exports.setup = setup;