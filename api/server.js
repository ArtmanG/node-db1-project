const express = require('express');

const db = require('../data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/accounts', (req, res) => {
    db.select('*')
    .from('accounts')
    .then((accounts) => {
      res.json(accounts);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Server Error, cannot retrieve accounts', error });
    });
});

server.get('/accounts/:id', (req, res) => {
    db('accounts')
      .where({ id: req.params.id })
      .first()
      .then((account) => {
        if (account) {
          res.status(200).json({ data: account });
        } else {
          res.status(500).json({ message: 'Server Error, account not found' });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: 'Server Error', error });
      });
  });

  server.post('/accounts', (req, res) => {
    db('accounts')
      .insert(req.body)
      .then((account) => {
        res.status(201).json(account);
      })
      .catch((error) => {
        res.status(500).json({ message: 'Server Error, failed to create account', error })
      });
  });

  server.put('/accounts/:id', (req, res) => {
    db('accounts')
      .where({ id: req.params.id })
      .update(req.body)
      .then((count) => {
        if (count) {
          res.json({ updated: count });
        } else {
          res.status(404).json({ message: 'Account not found, cannot update' });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: 'Server Error', error })
      });
  });

  server.delete('/accounts/:id', (req, res) => {
    db('accounts')
      .where({ id: req.params.id })
      .del()
      .then((account) => {
        if (account) {
          res.status(200).json({ data: account });
        } else {
          res.status(500).json({ message: 'Server Error, account cannot be deleted' });
        }
      });
  });

module.exports = server;
