import motoService from '../services/Moto.service.js'; 
export const getAllMotos = async (req, res) => {
  try {
    const motos = await motoService.getAllMotos();
    res.json({ data: motos, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
export const createMoto = async (req, res) => {
  try {
    const moto = await motoService.createMoto(req.body);
    res.json({ data: moto, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
export const getMotoById = async (req, res) => {
  try {
    const moto = await motoService.getMotoById(req.params.id);
    res.json({ data: moto, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
export const updateMoto = async (req, res) => {
  try {
    const moto = await motoService.updateMoto(req.params.id, req.body);
    res.json({ data: moto, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
export const deleteMoto = async (req, res) => {
  try {
    const moto = await motoService.deleteMoto(req.params.id);
    res.json({ data: moto, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listarMarcasMotos = async (req, res) => {
  console.log("Dentro de listar")
  try {
    const marcas= await motoService.listarMarcasMotos();
    if(marcas) {
      res.json(marcas);
    }
  } catch (error) {
    console.log("EXISTE ERROR EN LISTAR BRANDS.");
    console.log(error);
    res.json({"error": "sin data"});
  } 
}

export const getByBrandAll = async (req, res) => {
  console.log("Dentro de listar")
  try {
    // var brands = await Brand.find()
    // console.log(req)
    // const moto = new Moto();
    // const marcas=await Moto.distinct("marca")
    const marcas= await motoService.getAllMotosByBrand();
    if(marcas) {
      console.log("Listado de motos:" + marcas);
      res.json(marcas);
    }
    // res.json({"data": "sin data"});
  } catch (error) {
    console.log("EXISTE ERROR EN LISTAR BRANDS.");
    console.log(error);
    res.json({"error": "sin data"});
  } 
}

