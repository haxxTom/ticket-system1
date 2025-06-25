const express = require('express');
const router = express.Router();
const {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket
} = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getTickets);
router.post('/', createTicket);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);

module.exports = router;
