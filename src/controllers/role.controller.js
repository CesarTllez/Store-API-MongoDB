import { Router } from 'express';
import Role from '../models/role.model.js';

const roleRouter = Router();

roleRouter.post('/', (req, res) => {
  const role = new Role({
    name: req.body.name,
  });

  Role.countDocuments({ name: role.name }, (err, count) => {
    if (count === 1) res.status(409).json({ message: 'Role already exists.' });
    else {
      role.save().then(() => {
        res.status(201).json({
          message: 'Role created successfuly.',
        });
      });
    }
  });
});

roleRouter.get('/', (req, res) => {
  Role.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

export default roleRouter;
