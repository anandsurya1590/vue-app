const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Get all users
  async getAllUsers() {
    return await prisma.user.findMany();
  },

  // Get user by ID
  async getUserByEmail(email) {
    return await prisma.user.findUnique({
      where: { email: email ? String(email) : undefined },
    });
  },

  // Add new user
  async addUser(data) {
    return await prisma.user.create({
      data,
    });
  },

  // Update user by ID
  async updateUser(id, data) {
    return await prisma.user.update({
      where: { id: Number(id) },
      data,
    });
  },

  // Delete user by ID
  async deleteUser(id) {
    return await prisma.user.delete({
      where: { id: Number(id) },
    });
  },
}