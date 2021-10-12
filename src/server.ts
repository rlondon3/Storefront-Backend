import express, { Request, Response } from 'express';
import legendary_book_route from './handlers/legendary_books';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

legendary_book_route(app);

app.listen(3000, function () {
  console.log(`starting app on: localhost: ${address}`);
});
