const express = require('express');
const { uploadAndDistribute, getDistributedLists } = require('../controllers/listController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/upload', authMiddleware, uploadAndDistribute);
router.get('/', authMiddleware, getDistributedLists);

module.exports = router;