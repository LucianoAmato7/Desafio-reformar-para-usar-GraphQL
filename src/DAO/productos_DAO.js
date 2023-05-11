import { prods_Model } from "../models/productos/productos_model.js";
import { faker } from "@faker-js/faker";
import { logger } from "../../config/winston_config.js";
faker.locale = "es";

class ProductsDaoMongoDB {
  constructor() {
    this.model = prods_Model;
  }

  //PRODS
  //Lista todos los productos.
  async GetProds() {
    try {
      let data = await this.model.find({}).sort({_id: -1})
      return data;
    } catch (error) {
      logger.error(`Error en la API de productos: ${error}`);
    }
  }

  //crea un producto. Recibe title, brand, price, thumbnail y stock.
  async CreateProd(prodtoAdd) {
    try {
      const existingProduct = await this.model.findOne({ title: prodtoAdd.title });

      if (existingProduct) {
        logger.info(`Ya existe un producto con el título ${prodtoAdd.title}`);
        return { code: 409, message: `Ya existe un producto con el título ${prodtoAdd.title}` };
      }

      const newProd = new this.model(prodtoAdd);
      await newProd.save();
      logger.info("Producto creado con exito");
      const savedProd = await this.model.findOne({ title: prodtoAdd.title });
      return savedProd;
    } catch (error) {
      logger.error(`Error en la API de productos: ${error}`);
    }
  }

  async DeleteProd(id){
    try{
      const prodToDelete = await this.model.findById(id)
      if(!prodToDelete){
        logger.error(`El producto con ID: "${id}" no se encuentra en la Base de datos`)
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      await this.model.deleteOne({ _id: id });
      logger.info(`Objeto con id: ${id}, ha sido eliminado con exito`)
      return prodToDelete
    }catch(error){
      logger.error(`Error en la API de productos: ${error}`);
    }
  }
}

export default ProductsDaoMongoDB;