import express, { type Express, type Request, type Response } from 'express';
import { toEastingNorthing } from './osgb36.ts';

const app: Express = express();

app.get('/ping', (req: Request, res: Response) => {
  res.send("Hello\n");
});

app.get('/eastnorth/:gridref', (req: Request, res: Response) => {
  let osgb36 = String(req.params.gridref);
  console.log(osgb36);
  let ans = toEastingNorthing(osgb36);
  res.json(ans);
});

app.listen(3000);