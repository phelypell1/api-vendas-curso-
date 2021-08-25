import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

//Interce referente a entidade Procuct
interface IRequest {
  id: string;
}

//Classe que será respnsável deletar produto
class DeleteProductService {
  //metódo resposavel por listar os produtos, o mesmo recebe um produtos na Promise ou undefined
  public async execute({ id }: IRequest): Promise<void | undefined> {
    //instancia do getRepositories que recebe o proprio repository
    const productsRepository = getCustomRepository(ProductRepository);

    //Cria uma instancia para listagem do produto.
    const product = await productsRepository.findOne(id);

    //Verifica se o produto existe
    if (!product) {
      throw new AppError('Produt not found');
    }

    //Se existir ele deleta o produto
    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
