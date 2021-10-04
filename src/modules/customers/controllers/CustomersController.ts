import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import ListCustomersService from '../services/ListCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpadateCustomerService';

class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomers = new ListCustomersService();

    const customers = await listCustomers.execute();

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const customerShow = new ShowCustomerService();

    const customers = await customerShow.execute({ id });

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const customersUpdate = new UpdateCustomerService();

    const customers = await customersUpdate.execute({
      id,
      name,
      email,
    });
    return response.json(customers);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteCustomer = new DeleteCustomerService();
    await deleteCustomer.execute({ id });
    return response.json([]);
  }
}

export default CustomersController;
