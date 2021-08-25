import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Products';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

//Interce referente a entidade Procuct
interface IRequest {
  id: string;
}

//Classe que será respnsável listar os produto
class ShowProductService {
  //metódo resposavel por listar os produtos, o mesmo recebe um produtos na Promise ou undefined
  public async execute({ id }: IRequest): Promise<Product> {
    //instancia do getRepositories que recebe o proprio repository
    const productsRepository = getCustomRepository(ProductRepository);

    //Cria uma instancia para listagem do produto.
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Produt not found');
    }

    //Retorna lista de produto.
    return product;
  }
}

export default ShowProductService;
