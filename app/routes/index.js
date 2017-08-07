const express = require('express');
const Briq = require('briq-api').Client;

const BRIQ_ACCESS_TOKEN = process.env.BRIQ_ACCESS_TOKEN;
const BRIQ_ORGANIZATION_KEY = process.env.BRIQ_ORGANIZATION_KEY;

const briq = new Briq(BRIQ_ACCESS_TOKEN);
const briqOrganization = briq.organization(BRIQ_ORGANIZATION_KEY);

const router = express.Router();

router.get('/', (req, res) => {
  return briqOrganization.users()
    .then((users) => {
      res.render('index', { users, organization: BRIQ_ORGANIZATION_KEY });
    });
});

router.post('/transactions', (req, res) => {
  const { userToId, userFromId } = req.body;
  return briqOrganization
    .createTransaction({
      from: userFromId,
      to: userToId,
      comment: ':hugging_face:',
      amount: 1
    })
    .then(() => {
      res.redirect('/');
    });
});

module.exports = router;
