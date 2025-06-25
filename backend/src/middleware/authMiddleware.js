const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!req.user) throw new Error();
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Neautorizováno' });
    }
  } else {
    return res.status(401).json({ error: 'Token chybí' });
  }
};
