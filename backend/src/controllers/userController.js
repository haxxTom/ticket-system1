const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const roleEnum = role.toUpperCase();

    const user = await prisma.user.create({
    data: {
        name,
        email,
        password: hashedPassword,
        role: roleEnum, // např. 'ADMIN', 'AGENT' nebo 'USER'
    },
    });
    const validRoles = ['ADMIN', 'AGENT', 'USER'];

    if (!validRoles.includes(roleEnum)) {
    return res.status(400).json({ error: 'Neplatná role uživatele.' });
    }


    res.json({ token: generateToken(user.id) });
  } 
  catch (err) {
    console.error(err);  // místo print.err

    if (err.code === 'P2002') {
      // Prisma error pro duplikát unikátního pole (email)
      return res.status(400).json({ error: 'Uživatel s tímto emailem již existuje.' });
    }

    res.status(500).json({ error: 'Nastala chyba při registraci uživatele.' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ token: generateToken(user.id) });
  } else {
    res.status(401).json({ error: 'Neplatné přihlašovací údaje.' });
  }
};

exports.getMe = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, name: true, email: true, role: true }
  });
  res.json(user);
};
