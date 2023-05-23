import express from 'express';
import { User } from '../models/user';
import { sendMail } from '../utils/mail';
const router = express.Router();
const path = '/user';

router
  .route(path)
  .get((req, res) =>
    User.findAll({ attributes: ['username', 'email'] })
      .then((users) => res.json(users))
      .catch((error) =>
        res.status(500).json({
          messageError: error.errors[0].message,
          path: error.errors[0].path,
        })
      )
  )
  .post((req, res) => {
    const { username, email, password } = req.body;

    let code = '';

    for (let i = 0; i < 6; i++) {
      code += Math.round(Math.random() * 9);
    }

    const codeActivation = Number(code);

    User.create({
      username,
      email,
      password,
      codeActivation,
    })
      .then(() => {
        sendMail({
          userEmail: email,
          subject: 'Confirm your email',
          templateName: 'confirmEmail.html',
          message: code,
        });

        res.status(201).end();
      })
      .catch((error) =>
        res.status(500).json({
          messageError: error.errors[0].message,
          path: error.errors[0].path,
        })
      );
  });

router
  .route(path + '/:id')
  .get((req, res) =>
    User.findByPk(req.params.id)
      .then((user) => res.json(user))
      .catch((error) =>
        res.status(500).json({
          messageError: error.errors[0].message,
          path: error.errors[0].path,
        })
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
        res.status(500).json({
          messageError: error.errors[0].message,
          path: error.errors[0].path,
        })
      );
  })
  .delete((req, res) =>
    User.destroy({ where: { id: req.params.id } })
      .then(() => res.end())
      .catch((error) =>
        res.status(500).json({
          messageError: error.errors[0].message,
          path: error.errors[0].path,
        })
      )
  );

router.route(path + '/active/:id').put((req, res) => {
  User.update(
    { active: true, codeActivation: null },
    {
      where: {
        id: req.params.id,
        codeActivation: req.body.codeActivation,
      },
    }
  )
    .then((user) => res.json(user))
    .catch(() => res.status(500).end());
});

export { router as userRouter };
