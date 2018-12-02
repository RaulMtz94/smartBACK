var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var sorteoxusuarioSchema = new Schema({
    usuario: { type: Schema.ObjectId, ref: 'Usuario', required: [true, 'El usuario es necesario'] },
    sorteo: { type: Schema.ObjectId, ref: 'Sorteo', required: [true, 'El sorteo es necesario']  },
    estatus: { type: String, required: false ,default:"1"},
    gano: { type: Boolean, required: false ,default:false}
   
});


module.exports = mongoose.model('Sorteoxusuario', sorteoxusuarioSchema);