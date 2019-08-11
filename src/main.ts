// @flow
'use strict';

import * as express from 'express';
import * as request from 'request';
import config from './config';

const PORT = config.PORT;
const routes = config.ROUTES;

const app = express();

routes.forEach((configuredRoute:any) => {
  const route = configuredRoute.route;
  const targetUrl = configuredRoute.forwardTo;
  app.use(route, (req,res) => {
    const newUrl = targetUrl+req.originalUrl;
    request({url: newUrl, method:req.method,headers: req.headers, body:req.body}, (error, response, body) => {
      const errorOccurred = error !== null;
      if (errorOccurred) {
        res.status(500).send();
        return;
      }
      res.status(response.statusCode).send(body);
    });
  });
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

// tslint:disable-next-line: no-empty
app.listen(PORT, () => {
});
