import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProdutService';

export default class ProductsController {
  //Controller responsável por listar todos os produtos//
  public async index(request: Request, response: Response): Promise<Response> {
    //Instância do Service ListProduct
    const listProducts = new ListProductService();
    //product recebe uma lista de produtos
    const products = await listProducts.execute();
    //Retorna em formato JSON a lista de produtos
    return response.json(products);
  }
  //Controller responsável por listar um produto quando recebe o id como parametro.
  public async show(request: Request, response: Response): Promise<Response> {
    //Desestruturação que recebe apenas o ID como parametro vindo do params.
    const { id } = request.params;
    //showProduct instancia a classe ShowProductServicec
    const showProducts = new ShowProductService();
    //product recebe o produto.
    const products = await showProducts.execute({ id });
    //retorna o produto no formato JSON.
    return response.json(products);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProducts = new CreateProductService();

    const products = await createProducts.execute({
      name,
      price,
      quantity,
    });

    return response.json(products);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProducts = new UpdateProductService();

    const products = await updateProducts.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(products);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({ id });

    return response.json([]);
  }
}
