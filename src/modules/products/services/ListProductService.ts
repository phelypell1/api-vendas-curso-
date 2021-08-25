import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Products';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

//Classe que será respnsável listar os produto
class ListProductService {
  //metódo resposavel por listar os produtos, o mesmo recebe um array de produtos na Promise
  public async execute(): Promise<Product[]> {
    //instancia do getRepositories que recebe o proprio repository
    const productsRepository = getCustomRepository(ProductRepository);

    //Cria uma instancia para listagem do produto.
    const products = productsRepository.find();

    //Retorna lista de produto.
    return products;
  }
}

export default ListProductService;
