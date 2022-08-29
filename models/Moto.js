import mongoose from 'mongoose';
// const uniqueValidator = require("mongoose-unique-validator");
import uniqueValidator from 'mongoose-unique-validator';
const Schema = mongoose.Schema;
var Moto = {};

    const motoSchema = new Schema({
      marca: {
        type: String,required: [true]
      },
      modelo: {
        type: String,required: [true]
      },
      anno: {
        type: String,required: [true]
      },
      bujia: [{
        type: String,
      }],
      cadenas: [{
        type: String,
      }],
      baterias: [{
        type: String,
      }],
      rad_delantero: {
        type: String,
      },
      rad_trasero: {
        type: String,
      },
      lla_delantera: {
        type: String,
      },
      lla_trasera: {
        type: String,
      },
      rin_delantero: {
        type: String,
      },
      rin_trasero: {
        type: String,
      },
      bom_farola: {
        type: String,
      },
      bom_direccional: {
        type: String,
      },
      bom_stop: {
        type: String,
      },
      bom_tablero: {
        type: String,
      },
      ret_cig_izquierdo: {
        type: String,
      },
      reg_cig_derecho: {
        type: String,
      },
      ret_cambios: {
        type: String,
      },
      ret_crank: {
        type: String,
      },
      ret_salida: {
        type: String,
      },
      ret_vicluth: {
        type: String,
      },
      ret_telescopio: {
        type: String,
      },
      bal_cig_izquierdo: {
        type: String,
      },
      bal_cig_derecho: {
        type: String,
      },
      bal_cam_del_izquierda: {
        type: String,
      },
      bal_cam_del_derecha: {
        type: String,
      },
      bal_cam_tra_izquierda: {
        type: String,
      },
      bal_cam_tra_derecha: {
        type: String,
      },
      bal_cam_tra_sprocket: {
        type: String,
      },
      bal_caj_izquierda: {
        type: String,
      },
      bal_caj_derecha: {
        type: String,
      },
      bal_clutch: {
        type: String,
      },
      bal_arbol: {
        type: String,
      },
      status: {
        type: Boolean,
        default: false
      }
  })

  if(!modelAlreadyDeclared()) {
    // try {
      Moto = mongoose.model('Moto', motoSchema);
    // } catch (error) {
      // console.log("error:" + error);
   // }
  }
  function modelAlreadyDeclared() {
    try {
      mongoose.model('Moto')
      return true
    } catch (error) {
      // console.log(error);
      return false
    }
  }
export default Moto;