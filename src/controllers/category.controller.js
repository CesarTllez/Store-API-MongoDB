import { Router } from 'express';
import Category from '../models/category.model.js';

const categoryRouter = Router();

categoryRouter.post('/', (req, res) => {
  const category = new Category({
    name: req.body.name,
  });

  Category.count({ name: category.name }, (err, count) => {
    if (count === 1)
      res.status(400).json({ message: 'Category already exists.' });
    else {
      category
        .save()
        .then(() => {
          res.status(201).json({
            message: 'Category created successfully.',
          });
        })
        .catch((err) => console.log(err));
    }
  });
});

categoryRouter.get('/', (req, res) => {
  Category.find()
    .populate('products', { name: 1, price: 1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

categoryRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;

  Category.count({ _id: id }, (err, count) => {
    if (count === 1) {
      Category.findById(id)
        .populate('products', { name: 1, price: 1 })
        .then((data) => {
          res.json(data);
        })
        .catch(next);
    } else res.status(404).json({ message: 'Category does not exist.' });
  });
});

categoryRouter.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const newCategory = req.body;

  Category.count({ _id: id }, (err, count) => {
    if (count === 1) {
      Category.findByIdAndUpdate(id, newCategory, { new: true })
        .then((data) => {
          res.json(data);
        })
        .catch(next);
    } else res.status(404).json({ message: 'Category does not exist' });
  });
});

categoryRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  Category.count({ _id: id }, (err, count) => {
    if (count === 1) {
      Category.findByIdAndDelete(id)
        .then(() => {
          res.status(204).end();
        })
        .catch(next);
    } else res.status(404).json({ message: 'Category does not exist.' });
  });
});

export default categoryRouter;
