/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this model:
1. Create 'pago_expensas.js' file in 'definition-files-custom' directory located in this file's parent directory.
2. Copy the code below and paste it into 'pago_expensas.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('model\index.js'),
    model   = require('./pago_expensas.js'),
    util    = require('../utils.js')(model),
    Seq     = orm.Sequelize();

module.exports = model;

// Some utility methods:

util.getAttribute("pagoExpensaId").comment = 'This is the comment'; 

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "public.pagoExpensas",
    options: {
        tableName: "pago_expensas",
        schema: "public",
        timestamps: false
    },
    attributes: {
        "pagoExpensaId": {
            type: Seq.INTEGER,
            field: "pago_expensa_id",
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: "pago_expensas_pk"
        },
        "duedaExpensaId": {
            type: Seq.INTEGER,
            field: "dueda_expensa_id",
            allowNull: false
        },
        "fechaPago": {
            type: Seq.DATE,
            field: "fecha_pago"
        },
        "nombre": {
            type: Seq.STRING(50),
            field: "nombre"
        },
        "observacion": {
            type: Seq.STRING(250),
            field: "observacion"
        }
    },
    relations: []
};