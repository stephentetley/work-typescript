import * as fs from 'fs';
import * as https from 'https'
import express, { type Express, type Request, type Response } from 'express';
import { InvalidOSGB36Error, toEastingNorthing } from './osgb36.ts';
import { InvalidEastingNorthingError, toOSGB36 } from './eastnorth.ts';

const app: Express = express();

app.get('/ping', (req: Request, res: Response) => {
  res.send("Hello\n");
});

app.get('/eastnorth/:gridref', (req: Request, res: Response) => {
  let osgb36 = String(req.params.gridref);
  console.log(osgb36);
  try {
    let ans = toEastingNorthing(osgb36);
    res.json(ans);
  } catch (e) {
    if (e instanceof InvalidOSGB36Error) {
      res.send({'err': e.message})
    } else {
      res.send({'err': -1})
    }
  }
});


app.get('/osgb36/:east/:north', (req: Request, res: Response) => {
  try {
    let easting = Number(req.params.east);
    let northing = Number(req.params.north);
    let ans = toOSGB36(easting, northing);
    res.json(ans);
  } catch (e) {
    if (e instanceof InvalidEastingNorthingError) {
      res.send({'err': e.message})
    } else {
      res.send({'err': -1})
    }
  }
});

const options: https.ServerOptions = {
  key: fs.readFileSync('../certs/two/server.key'),
  cert: fs.readFileSync('../certs/two/server.cert')
};

https.createServer(options, app).listen(3000, () => {
  console.log('HTTPS server running on port 3000');
});


