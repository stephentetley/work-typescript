import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();
app.use(express.json());

const flocs: string[] = [];


app.get('/show', (req: Request, res: Response) => {
  for (let floc of flocs) {
    console.log(floc);
  }
  res.send(flocs);
});


app.post('/floc', (req, res, next) => {
  let postBody = req.body;
  if (Array.isArray(postBody)) {
    for (let floc of postBody) {
      flocs.push(floc);
    }
    res.send("Okay");
  } else {
    res.send("Bad - not an array");
  }
});

app.listen(3000);