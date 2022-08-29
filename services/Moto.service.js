import MotoModel from "../models/Moto.js";
const motoService = {}; 
motoService.getAllMotos = async () => {
  
  return await MotoModel.find();
};
motoService.getAllMotosByBrand = async (marca) => {
  // await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();
  return await MotoModel.find({marca: marca }).exec();
};
motoService.createMoto = async (moto) => {
  return await MotoModel.create(moto);
};
motoService.getMotoById = async (id) => {
  // console.log("getMotoById: ")
  return await MotoModel.findById(id);
};
 
motoService.updateMoto = async (id, moto) => {
  return await MotoModel.findByIdAndUpdate(id, moto);
};
 
motoService.deleteMoto = async (id) => {
  return await MotoModel.findByIdAndDelete(id);
};
motoService.deleteMany = async () => {
  return await MotoModel.deleteMany({});
}
motoService.listarMarcasMotos = async () => {
  // console.log("listarMarcasMotos");
  return await MotoModel.distinct("MARCA")
};
export default motoService;
