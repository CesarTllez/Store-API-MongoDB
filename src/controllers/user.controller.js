import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import Role from '../models/role.model.js';

const userRouter = Router();

userRouter.post('/', (req, res) => {
  const { body } = req;
  const { nickName, idCard, password, roleId } = body;

  Role.countDocuments({ _id: roleId }, async (err, count) => {
    if (count === 1) {
      const passwordHash = await bcrypt.hash(password, 10);
      const user = new User({
        nickName,
        idCard,
        password: passwordHash,
        roleId,
      });
      user
        .save()
        .then(() => {
          res.status(201).json({
            message: 'User created successfully.',
          });
        })
        .catch((err) => console.log(err));
    } else res.status(409).json({ message: 'Role does not exist.' });
  });
});

userRouter.get('/', (req, res) => {
  User.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

export default userRouter;
