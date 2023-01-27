import { Request, Response, Router } from "express";
import {
  productsRepository,
  ProductType,
} from "../repositories/products-db-repository";
export const productsRouter = Router({});


productsRouter.get("/", async (req: Request, res: Response) => {
  const foundProductsPromise: Promise<ProductType[]> =
    productsRepository.findProducts(req.query.title?.toString());
  const foundProducts: ProductType[] = await foundProductsPromise;
  res.send(foundProducts);
});

//ВООООООООООООООТ ТУУУУУУУТТТ
productsRouter.get("/:id", async (req: Request, res: Response) => {
  let product = await productsRepository.findProductById(+req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

productsRouter.delete("/:id", async (req: Request, res: Response) => {
  const isDeleted = await productsRepository.deleteProduct(+req.params.id);
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});

productsRouter.post(
  "/",
  async (req: Request, res: Response) => {
    const newProduct:ProductType =await productsRepository.createProduct(req.body.title);
    res.status(201).send(newProduct);
  }
);

productsRouter.put(
  "/:id",
  async (req: Request, res: Response) => {
    const isUpdated = await productsRepository.updateProduct(
      +req.params.id,
      req.body.title
    );
    if (isUpdated) {
      const product = await productsRepository.findProductById(+req.params.id);
      res.send(product);
    } else {
      res.send(404);
    }
  }
);
