import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

const express = require('express');
const app = express();
const port = 1245;
const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 },
];

function getItemById(id) {
  return listProducts.find(product => product.itemId === id);
}

app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = getItemById(itemId);
  if (product) {
    const currentQuantity = await getCurrentReservedStockById(itemId);
    res.json({ ...product, currentQuantity });
  } else {
    res.json({ status: 'Product not found' });
  }
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = getItemById(itemId);
  if (product) {
    const currentQuantity = await getCurrentReservedStockById(itemId);
    if (currentQuantity < product.initialAvailableQuantity) {
      await reserveStockById(itemId, currentQuantity + 1);
      res.json({ status: 'Reservation confirmed', itemId });
    } else {
      res.json({ status: 'Not enough stock available', itemId });
    }
  } else {
    res.json({ status: 'Product not found' });
  }
});

async function reserveStockById(itemId, stock) {
  client.set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
  const reservedStock = await getAsync(`item.${itemId}`);
  return reservedStock ? parseInt(reservedStock) : 0;
}

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
