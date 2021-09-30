import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customers';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

class ListCustomersService {
  public async execute(): Promise<Customers[]> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = customersRepository.find();

    return customers;
  }
}
export default ListCustomersService;
