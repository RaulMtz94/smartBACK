var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var SorteoxUsuario = require('../models/sorteoxusuario');

// ==========================================
// Obtener todos los usuarios participantes de un Sorteo
// ==========================================
app.get('/:id', (req, res, next) => {
    var id = req.params.id;

    SorteoxUsuario.find({sorteo: id}, )
    .populate({path: 'usuario'})
    .populate({path: 'sorteo'})
   
     .exec(
         (err, participantes) => {

             if (err) {
                 return res.status(500).json({
                     ok: false,
                     mensaje: 'Error cargando participantes',
                     errors: err 
                 });
             }
             
             SorteoxUsuario.count({sorteo: id}, (err, conteo) => {
                 res.status(200).json({
                     ok: true,
                     participantes: participantes,
                     total: conteo
                 });

             })

         });
});

// ==========================================
//  Actualizar e indicar participante ganador
// ==========================================
app.put('/:id', /*mdAutenticacion.verificaToken,*/ (req, res) => {

    var id = req.params.id;
    var body = req.body;

    SorteoxUsuario.findById(id, (err, sorteo) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar participantes',
                errors: err
            });
        }

        if (!sorteo) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El participante con el id ' + id + ' no existe',
                errors: { message: 'No existe un participante con ese ID' }
            });
        }

        sorteo.sorteo = body.sorteo;
        sorteo.usuario= body.usuario;
        sorteo.gano = true;

        sorteo.save((err, sorteoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar participante',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                sorteo: sorteoGuardado
            });

        });

    });

});

module.exports = app;