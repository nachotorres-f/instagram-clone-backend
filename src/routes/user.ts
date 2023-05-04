import express from 'express';
import { User } from '../database/models/user';
const router = express.Router();
const path = '/user';

router
  .route(path)
  .get((req, res) =>
    User.findAll()
      .then((users) => res.json(users))
      .catch((error) =>
        res.status(500).json({ messageError: error.errors[0].message })
      )
  )
  .post((req, res) => {
    const { username, email, password } = req.body;

    User.create({
      username,
      email,
      password,
    })
      .then((user) => res.json(user))
      .catch((error) =>
        res.status(500).json({ messageError: error.errors[0].message })
      );
  });

router
  .route(path + '/:id')
  .get((req, res) =>
    User.findByPk(req.params.id)
      .then((user) => res.json(user))
      .catch((error) =>
        res.status(500).json({ messageError: error.errors[0].message })
      )
  )
  .put((req, res) => {
    User.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((user) => res.json(user))
      .catch((error) =>
        res.status(500).json({ messageError: error.errors[0].message })
      );
  })
  .delete((req, res) =>
    User.destroy({ where: { id: req.params.id } })
      .then(() => res.end())
      .catch((error) =>
        res.status(500).json({ messageError: error.errors[0].message })
      )
  );

export { router as userRouter };
