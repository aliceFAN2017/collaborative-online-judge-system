var express = require('express');
var router = express.Router();
var problemService = require('../services/problemService');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

router.get('/problems', (req, res) => {
  problemService.getProblems()
    .then(problems => res.json(problems));
});

router.get('/problems/:id', (req, res) => {
  problemService.getProblem(+req.params.id)
    .then(problem => res.json(problem));
});

router.post('/problems', jsonParser, (req, res) => {
  console.log(req.body)
  problemService.addProblem(req.body)
    .then(problem => res.json(problem))
    .catch(error => res.status(400).send(error.message))
});

module.exports = router;
