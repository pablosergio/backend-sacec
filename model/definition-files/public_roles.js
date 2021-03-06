/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this model:
1. Create 'roles.js' file in 'definition-files-custom' directory located in this file's parent directory.
2. Copy the code below and paste it into 'roles.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('model\index.js'),
    model   = require('./roles.js'),
    util    = require('../utils.js')(model),
    Seq     = orm.Sequelize();

module.exports = model;

// Some utility methods:

util.getAttribute("rolId").comment = 'This is the comment'; 

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "public.roles",
    options: {
        tableName: "roles",
        schema: "public",
        timestamps: false
    },
    attributes: {
        "rolId": {
            type: Seq.INTEGER,
            field: "rol_id",
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: "roles_pk"
        },
        "nombre": {
            type: Seq.STRING(50),
            field: "nombre"
        },
        "descripcion": {
            type: Seq.STRING(250),
            field: "descripcion"
        },
        "estado": {
            type: Seq.STRING(20),
            field: "estado"
        },
        "fechaCreacion": {
            type: Seq.DATE,
            field: "fecha_creacion"
        }
    },
    relations: []
};