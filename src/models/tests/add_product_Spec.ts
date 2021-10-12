import { AddOrder } from '../add_product_helper';

const order = new AddOrder();

describe('Add Product Helper', () => {
  it('should add a product to the orders table', async () => {
    const res = await order.ProductOrdered({
      quantity: 2,
      product_id: 1,
      order_id: 1,
    });
    expect(res).toBeDefined();
  });
});
