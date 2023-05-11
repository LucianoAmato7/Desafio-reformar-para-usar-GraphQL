import productos_repository from "../repository/productos_repository.js"
import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Producto {
    _id: ID!
    title: String!
    price: String!
    thumbnail: String!
    timestamp: String!
    code: String!
    stock: String!
    brand: String!
  }

  type Query {
    GetProds_controller: [Producto]
  }

  input ProductoInput {
    title: String!
    brand: String!
    price: Int
    stock: Int
    thumbnail: String!
  }

  type Mutation {
    CreateProd_controller(data: ProductoInput): Producto
    DeleteProd_controller(id: ID!): Producto
  }
`);

export const GetProds_controller = async () => {
  const productos = await productos_repository.find();
  return productos;
}

export const CreateProd_controller = async ({ data }) => {
  try{
    const result = await productos_repository.save(data)
    if (result.code === 409) {
      throw res.status(409).json(result)
    }
    return result
  }catch(err){
    console.log(err);
  }
}

export const DeleteProd_controller = async ({ id }) => {
  try{
    const result = await productos_repository.delete(id)
    return result
  }catch(err){
    console.log(err);
  }
}

//QUERYS EN GRAPHQL:

// {
  // GetProds_controller{
 	//   _id		
  //   title
  //   price
  //   thumbnail
  //   timestamp
  //   code
  //   stock
  //   brand
  // }
// }

// mutation{
//   CreateProd_controller(data: {
//       title: "testGraphQL",
//       brand: "GraphQL",
//       price: 99,
//       stock: 10,
//       thumbnail: "no hay"}){
//     _id
//     title
//     price
//     thumbnail
//     timestamp
//     code
//     stock
//     brand
//   }
// }

// mutation{
//   DeleteProd_controller(id: "645c56db6025b12a3c413ac8"){
//  	   _id		
//       title
//       price
//       thumbnail
//       timestamp
//       code
//       stock
//       brand
//   }
// }
