/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this model:
1. Create 'estructura_tarifaria.js' file in 'definition-files-custom' directory located in this file's parent directory.
2. Copy the code below and paste it into 'estructura_tarifaria.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('model\index.js'),
    model   = require('./estructura_tarifaria.js'),
    util    = require('../utils.js')(model),
    Seq     = orm.Sequelize();

module.exports = model;

// Some utility methods:
util.getRelation("deudasEstructuraTarifariaIdFkeys").onDelete = 'CASCADE'; 
util.getAttribute("estructuraTarifariaId").comment = 'This is the comment'; 

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "public.estructuraTarifaria",
    options: {
        tableName: "estructura_tarifaria",
        schema: "public",
        timestamps: false
    },
    attributes: {
        "estructuraTarifariaId": {
            type: Seq.INTEGER,
            field: "estructura_tarifaria_id",
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: "estructura_tarifaria_pk"
        },
        "tipoTarifa": {
            type: Seq.STRING(250),
            field: "tipo_tarifa",
            allowNull: false
        },
        "gestion": {
            type: Seq.STRING(50),
            field: "gestion",
            allowNull: false
        },
        "modeloDepartamentoId": {
            type: Seq.INTEGER,
            field: "modelo_departamento_id",
            references: {
                model: "public.modeloDepartamento",
                key: "modelo_departamento_id"
            }
        },
        "precio": {
            type: Seq.DECIMAL(5, 2),
            field: "precio",
            allowNull: false
        },
        "descripcion": {
            type: Seq.STRING(250),
            field: "descripcion"
        },
        "fechaRegistro": {
            type: Seq.DATE,
            field: "fecha_registro"
        },
        "estado": {
            type: Seq.STRING(30),
            field: "estado"
        }
    },
    relations: [{
        type: "hasMany",
        model: "public.deudas",
        schema: "public",
        table: "deudas",
        source: "generator",
        details: {
            as: "deudasEstructuraTarifariaIdFkeys",
            foreignKey: "estructura_tarifaria_id",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }, {
        type: "belongsTo",
        model: "public.modeloDepartamento",
        schema: "public",
        table: "modelo_departamento",
        source: "generator",
        details: {
            as: "modeloDepartamento",
            foreignKey: "modelo_departamento_id",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }, {
        type: "belongsToMany",
        model: "public.departamentos",
        schema: "public",
        table: "departamentos",
        source: "generator",
        details: {
            as: "deudasEstructuraTarifariaIdFkeyDepartamentos",
            foreignKey: "estructura_tarifaria_id",
            otherKey: "departamento_id",
            through: "deudas",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }]
};