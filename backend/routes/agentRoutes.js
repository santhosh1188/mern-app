const express = require('express');
const { addAgent, getAgents } = require('../controllers/agentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/', authMiddleware, addAgent);
router.get('/', authMiddleware, getAgents);

module.exports = router;