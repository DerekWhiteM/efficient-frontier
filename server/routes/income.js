const router = require('express').Router();
let Income = require('../models/income.model');

// Create

router.route('/add').post((req, res) => {
    const user_id = String(req.body.user_id);
    const age1 = Number(req.body.age1);
    const age2 = Number(req.body.age2);
    const income = Number(req.body.income);
    const savings = Number(req.body.savings);
    const tolerance = Number(req.body.tolerance);

    const newIncome = new Income({
        user_id,
        age1,
        age2,
        income,
        savings,
        tolerance
    });

    newIncome.save()
    .then(() => res.json('Income added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Read

router.route('/').get((req, res) => {
    Income.find({
        user_id: req.query.user_id
    })
      .then(incomes => res.json(incomes))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Income.findById(req.params.id)
        .then(income => res.json(income))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update

router.route('/update/:id').post((req, res) => {
    Income.findById(req.params.id)
        .then(income => {
        income.age1 = Number(req.body.age1);
        income.age2 = Number(req.body.age2);
        income.income = Number(req.body.income);
        income.savings = Number(req.body.savings);
        income.tolerance = Number(req.body.tolerance);

        income.save()
            .then(() => res.json('Income updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete

router.route('/:id').delete((req, res) => {
    Income.findByIdAndDelete(req.params.id)
        .then(() => res.json('Income deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;