import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Products';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

//Interce referente a entidade Procuct
interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

//Classe que será respnsável listar os produto
class UpdateProdutService {
  //metódo resposavel por listar os produtos, o mesmo recebe um produtos na Promise ou undefined
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    //instancia do getRepositories que recebe o proprio repository
    const productsRepository = getCustomRepository(ProductRepository);

    //Cria uma instancia para listagem do produto.
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Produt not found');
    }

    const productExists = await productsRepository.findbyName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    //Retorna lista de produto.
    return product;
  }
}

export default UpdateProdutService;
