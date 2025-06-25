const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getTickets = async (req, res) => {
  const tickets = await prisma.ticket.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' }
  });
  res.json(tickets);
};

exports.createTicket = async (req, res) => {
  const { title, description } = req.body;
  const ticket = await prisma.ticket.create({
    data: {
      title,
      description,
      userId: req.user.id
    }
  });
  res.status(201).json(ticket);
};

exports.updateTicket = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const ticket = await prisma.ticket.update({
    where: { id: Number(id) },
    data
  });
  res.json(ticket);
};

exports.deleteTicket = async (req, res) => {
  const { id } = req.params;
  await prisma.ticket.delete({ where: { id: Number(id) } });
  res.status(204).send();
};
