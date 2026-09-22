const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");

async function loginUser({email,password}){
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const passwordMatch = await bcrypt.compare(
    password,
    user.passwordHash
  );
   if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

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

module.exports = {registerUser,loginUser};
