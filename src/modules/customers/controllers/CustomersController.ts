import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import ListCustomersService from '../services/ListCustomerService';

class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomers = new ListCustomersService();

    const customers = await listCustomers.execute();

    return response.json(customers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomers = new CreateCustomerService();

    const customers = await createCustomers.execute({
      name,
      email,
    });
    return response.json(customers);
  }
}

export default CustomersController;
