import {
  GetProds_controller,
  CreateProd_controller,
  DeleteProd_controller,
  schema
} from "../controllers/productos_controller.js";
import { Router } from "express";
import { graphqlHTTP } from 'express-graphql';

const router = Router();

router.post("/", graphqlHTTP({
    schema,
    rootValue: {
      GetProds_controller
    },
    graphiql: true,
  }));

router.post("/save", graphqlHTTP({
    schema,
    rootValue: {
      CreateProd_controller
    },
    graphiql: true,
  }));

router.post("/delete", graphqlHTTP({
    schema,
    rootValue: {
      DeleteProd_controller
    },
    graphiql: true,
  }));

router.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: {
      GetProds_controller,
      CreateProd_controller,
      DeleteProd_controller,
    },
    graphiql: true,
  })
);

export default router;
