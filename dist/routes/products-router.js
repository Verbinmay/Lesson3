"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const products_db_repository_1 = require("../repositories/products-db-repository");
exports.productsRouter = (0, express_1.Router)({});
exports.productsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const foundProductsPromise = products_db_repository_1.productsRepository.findProducts((_a = req.query.title) === null || _a === void 0 ? void 0 : _a.toString());
    const foundProducts = yield foundProductsPromise;
    res.send(foundProducts);
}));
//ВООООООООООООООТ ТУУУУУУУТТТ
exports.productsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let product = yield products_db_repository_1.productsRepository.findProductById(+req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
}));
exports.productsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield products_db_repository_1.productsRepository.deleteProduct(+req.params.id);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.productsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield products_db_repository_1.productsRepository.createProduct(req.body.title);
    res.status(201).send(newProduct);
}));
exports.productsRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield products_db_repository_1.productsRepository.updateProduct(+req.params.id, req.body.title);
    if (isUpdated) {
        const product = yield products_db_repository_1.productsRepository.findProductById(+req.params.id);
        res.send(product);
    }
    else {
        res.send(404);
    }
}));
