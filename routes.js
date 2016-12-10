/**
 * Created by Sergio on 10/12/2016.
 */
function setup(router, handlers) {

    // ROUTES FOR Common API
    // =============================================================================
    router.get('/departamentos', handlers.departamento.getDepartamentos);
    router.get('/propietarios', handlers.propietario.getPropietarios);
}

exports.setup = setup;