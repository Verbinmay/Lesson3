import { Request, Response, Router } from "express";
import { productsService } from "../domain/products-service";
import {ProductType} from "../repositories/products-db-repository";

export const productsRouter = Router({});

productsRouter.get("/", async (req: Request, res: Response) => {
  const foundProductsPromise: Promise<ProductType[]> =
  productsService.findProducts(req.query.title?.toString());
  const foundProducts: ProductType[] = await foundProductsPromise;
  res.send(foundProducts);
});

productsRouter.get("/:id", async (req: Request, res: Response) => {
  let product = await productsService.findProductById(+req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

productsRouter.delete("/:id", async (req: Request, res: Response) => {
  const isDeleted = await productsService.deleteProduct(+req.params.id);
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});

productsRouter.post("/", async (req: Request, res: Response) => {
  const newProduct: ProductType = await productsService.createProduct(
    req.body.title
  );
  res.status(201).send(newProduct);
});

productsRouter.put("/:id", async (req: Request, res: Response) => {
  const isUpdated = await productsService.updateProduct(
    +req.params.id,
    req.body.title
  );
  if (isUpdated) {
    const product = await productsService.findProductById(+req.params.id);
    res.send(product);
  } else {
    res.send(404);
  }
});
