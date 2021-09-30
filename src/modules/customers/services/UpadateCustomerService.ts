import { CustomersRepository } from './../typeorm/repositories/CustomersRepository';
import Customers from '../typeorm/entities/Customers';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customers> {
    const custumersRepository = getCustomRepository(CustomersRepository);

    const customers = await custumersRepository.findById(id);

    if (!customers) {
      throw new AppError('Customers not found');
    }

    const customerEmailExists = await custumersRepository.findByEmail(email);

    if (customerEmailExists && customerEmailExists.id != customers.id) {
      throw new AppError('There is already a customer with this email');
    }

    customers.name = name;
    customers.email = email;
    await custumersRepository.save(customers);
    return customers;
  }
}

export default UpdateCustomerService;
