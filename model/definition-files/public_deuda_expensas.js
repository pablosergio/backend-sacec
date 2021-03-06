/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this model:
1. Create 'deuda_expensas.js' file in 'definition-files-custom' directory located in this file's parent directory.
2. Copy the code below and paste it into 'deuda_expensas.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('model\index.js'),
    model   = require('./deuda_expensas.js'),
    util    = require('../utils.js')(model),
    Seq     = orm.Sequelize();

module.exports = model;

// Some utility methods:

util.getAttribute("deudaId").comment = 'This is the comment'; 

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "public.deudaExpensas",
    options: {
        tableName: "deuda_expensas",
        schema: "public",
        timestamps: false
    },
    attributes: {
        "deudaId": {
            type: Seq.INTEGER,
            field: "deuda_id",
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: "deuda_expensas_pk"
        },
        "mes": {
            type: Seq.STRING(15),
            field: "mes"
        },
        "departamentoId": {
            type: Seq.INTEGER,
            field: "departamento_id"
        },
        "tarifaId": {
            type: Seq.INTEGER,
            field: "tarifa_id"
        },
        "estado": {
            type: Seq.STRING(25),
            field: "estado",
            allowNull: false
        },
        "pagoId": {
            type: Seq.INTEGER,
            field: "pago_id"
        }
    },
    relations: []
};