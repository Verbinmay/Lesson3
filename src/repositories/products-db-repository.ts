import {productsCollections, ProductType } from "./db";

export const productsRepository = {
  async findProducts(title: string | null | undefined): Promise<ProductType[]> {
    const filter: any = {};
    if (title) {
      filter.title = { $regex: title };
    }
    return productsCollections.find(filter).toArray();
  },
  async findProductById(id: number): Promise<ProductType | null> {
    let product = await productsCollections.findOne({ id: id });
    if (product) {
      return product;
    } else {
      return null;
    }
  },
  async createProduct(title: string): Promise<ProductType> {
    const newProduct = { id: +new Date(), title: title };
    const result = await productsCollections.insertOne(newProduct);
    return newProduct;
  },
  async updateProduct(id: number, title: string): Promise<boolean> {
    const result = await productsCollections
      .updateOne({ id: id }, { $set: { title: title } });
    return result.matchedCount === 1;
  },
  async deleteProduct(id: number): Promise<boolean> {
    const result = await productsCollections.deleteOne({ id: id });
    return result.deletedCount === 1;
  },
};
