const multer = require('multer');
const csv = require('csv-parser');
const XLSX = require('xlsx');
const fs = require('fs');
const Agent = require('../models/Agent');
const DistributedList = require('../models/DistributedList');

const upload = multer({ dest: 'uploads/' });

exports.uploadAndDistribute = [
  upload.single('file'),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const filePath = req.file.path;
    const ext = req.file.originalname.split('.').pop().toLowerCase();
    if (!['csv', 'xlsx', 'xls'].includes(ext)) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: 'Invalid file type. Only csv, xlsx, xls allowed.' });
    }

    let items = [];
    try {
      if (ext === 'csv') {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (row) => {
            if (!row.FirstName || isNaN(row.Phone) || !row.Notes) {
              throw new Error('Invalid CSV format');
            }
            items.push({
              firstName: row.FirstName,
              phone: parseInt(row.Phone),
              notes: row.Notes
            });
          })
          .on('end', () => distribute(items, res, filePath));
      } else {
        const workbook = XLSX.readFile(filePath);
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        sheet.forEach(row => {
          if (!row.FirstName || isNaN(row.Phone) || !row.Notes) {
            throw new Error('Invalid XLSX/XLS format');
          }
          items.push({
            firstName: row.FirstName,
            phone: parseInt(row.Phone),
            notes: row.Notes
          });
        });
        distribute(items, res, filePath);
      }
    } catch (err) {
      fs.unlinkSync(filePath);
      res.status(400).json({ message: err.message });
    }
  }
];

async function distribute(items, res, filePath) {
  try {
    const agents = await Agent.find().limit(5); // Assume 5 agents
    if (agents.length < 5) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: 'Need at least 5 agents' });
    }

    await DistributedList.deleteMany({}); // Clear previous distributions

    const numAgents = 5;
    const base = Math.floor(items.length / numAgents);
    const remainder = items.length % numAgents;

    let index = 0;
    for (let i = 0; i < numAgents; i++) {
      const agentItems = items.slice(index, index + base + (i < remainder ? 1 : 0));
      const distList = new DistributedList({ agentId: agents[i]._id, items: agentItems });
      await distList.save();
      index += base + (i < remainder ? 1 : 0);
    }

    fs.unlinkSync(filePath);
    res.json({ message: 'Distributed successfully' });
  } catch (err) {
    fs.unlinkSync(filePath);
    res.status(500).json({ message: 'Distribution error' });
  }
}

exports.getDistributedLists = async (req, res) => {
  try {
    const lists = await DistributedList.find().populate('agentId', 'name');
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching lists' });
  }
};