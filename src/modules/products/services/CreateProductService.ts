import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Products';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

//Interce referente a entidade Procuct
interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

//Classe que será respnsável pela criação do produto
class CreateProductService {
  //metódo resposavel por receber interface criada acima, e passar na promise que espera o retorno.
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    //instancia do getRepositories que recebe o proprio repository
    const productsRepository = getCustomRepository(ProductRepository);

    //productsExiste recebe valor retornado pelo findbyname.
    const productExists = await productsRepository.findbyName(name);

    //Verifica se o nome já existe.
    if (productExists) {
      //Throw para disparar um erro usanso a classe criada para capturar erros.
      throw new AppError('Thre is already one procuct with this name');
    }

    //Cria uma instancia para criação do produto, recebendo os valores.
    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    //Salva o instãncia do create() no banco de dados.
    await productsRepository.save(product);

    //Retorna o produto criado.
    return product;
  }
}

export default CreateProductService;
