import { productsCollections, ProductType } from "./db";

export const productsRepository = {
  async findProducts(title: string | null | undefined): Promise<ProductType[]> {
    const filter: any = {};
    if (title) {
      filter.title = { $regex: title };
    }
    return productsCollections.find(filter).toArray();
  },
  async findProductById(id: number): Promise<ProductType | null> {
    let product: ProductType | null = await productsCollections.findOne({
      id: id,
    });
    return product;
  },
  async createProduct(newProduct: ProductType): Promise<ProductType> {
    const result = await productsCollections.insertOne(newProduct);
    return newProduct;
  },
  async updateProduct(id: number, title: string): Promise<boolean> {
    const result = await productsCollections.updateOne(
      { id: id },
      { $set: { title: title } }
    );
    return result.matchedCount === 1;
  },
  async deleteProduct(id: number): Promise<boolean> {
    const result = await productsCollections.deleteOne({ id: id });
    return result.deletedCount === 1;
  },
};
export { ProductType };
