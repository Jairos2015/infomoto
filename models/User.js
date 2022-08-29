import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var User = {};
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  inscriptionDate: { // Fecha en que se inscribe a la DB
    type: Date,
    default: Date.now,
    required: true
  },
  payDate: { // Fecha hasta donde está pago
    type: Date,
    default: Date.now,
    required: true
  },
  trialType: { // Dias de prueba gratis
    type: Number,
    default: 30,
    required: true
  },
  status: { // { 0: trial, 1: pago } 
    // Si status=0 && fechaActual > inscriptionDate + trial entonces NO HAY SERVICIO
    // Si status=1 && fechaActual > payDate entonces no hay servicio
    type: Boolean
  },
});

if(!modelAlreadyDeclared()) {
  // try {
    User = mongoose.model('User', userSchema);
  // } catch (error) {
    // console.log("error:" + error);
 // }
}
function modelAlreadyDeclared() {
  try {
    mongoose.model('User')
    return true
  } catch (error) {
    // console.log(error);
    return false
  }
}

// export default mongoose.model("User", userSchema);
export default User;