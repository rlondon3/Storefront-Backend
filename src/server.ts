import express, { Request, Response } from 'express';
import order_route from './handlers/orders';
import products_route from './handlers/products';
import users_route from './handlers/users';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', function (req: Request, res: Response) {
  res.send("Hello World, I'm a Postgres Database of Legendary_fighting_books!");
});

order_route(app);
products_route(app);
users_route(app);

app.listen(3000, function () {
  console.log(`starting app on: localhost: ${address}`);
});

export default app;
