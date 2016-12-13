/**
 * Created by Sergio on 10/12/2016.
 */
var jwt = require('express-jwt');

function setup(router, handlers) {

    // ROUTES FOR Common API
    // =============================================================================
    router.post('/login', handlers.login.authenticate);

    router.get('/departamentos', jwt({secret: process.env.TOKEN_SECRET}), handlers.departamento.getDepartamentos);
    router.get('/propietarios', jwt({secret: process.env.TOKEN_SECRET}), handlers.propietario.getPropietarios);
}

exports.setup = setup;