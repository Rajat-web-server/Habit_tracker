const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");

async function registerUser({ name, email, password }) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    throw new Error("user already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

module.exports = registerUser;
