const express = require('express');
const { getBudgets, createBudget, updateBudget } = require('../controllers/budgetController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/', getBudgets);
router.post('/', createBudget);
router.put('/:id', updateBudget);

module.exports = router;
