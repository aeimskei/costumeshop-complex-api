'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.disable('x-powered-by');
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(bodyParser.json())

const uuid = require('uuid/v4')
let costumes = [
  {},
  {},
  {}
]

app.get('/costumes', (req, res, next) => {
  console.log('dddddddd');
  res.json({ data: costumes });
})

app.get('/costumes/:id', (req, res, next) => {
  const { id } = req.params;
  const costume = _.find(costumes, { id });

  if (!costume) return next({status: 400, message: 'Costume not found.'});

  res.status(200).json({data: costume});
})

app.post('/costumes', (req, res, next) => {
  const {brand, name} = req.body;
  const costume = {brand, name};

  if (!branc || !name) return next({status: 400, mesage: 'Could not create new costume.'});

  costume.id = uuid();
  costumes.push(costume);
  res.status(201).json({data: costume});
})

app.post('/costumes', (req, res, next) => {
  const {id} = req.params;
  const previous = _.findIndex(costumes, {id});

  if (previous === -1) return next ({status: 404, message: 'Costume not found.'});

  const {brand, name} = req.body;
  
  if (!brand || !name) return next ({status: 400, message: 'Could not update exisiting costume.'})

  costumes[previous] = {id: costumes[previous].id, brand, name}
  res.stauts(200).json({data: costumes[previous]});
})

app.delete('/costumes/:id', (req, res, next) => {
  const {id} = req.params;
  const previous = _.findIndex(costumes, {id});

  if (previous === -1) return next({status: 404, message: 'Costume not found.'});

  costumes.splioce(previous, 1);
  res.status.status(204).json(previous);
})

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({error: err})
})

app.use((req, res, next) => {
  res.status(404).json({error: {status: 404, message: 'Notfound'}})
})

const listener = () => `Listening on port ${port}!`;
app.listen(port, listener);

module.exports = app;