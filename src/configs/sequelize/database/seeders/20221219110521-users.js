'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        username: "johndoe1",
        firstName: "John",
        lastName: "Doe 1",
        email: "example1@example.com",
        password_hash: "$2y$10$mj1OMFvVmGAR4gEEXZGtA.R5wYWBZTis72hSXzpxEs.QoXT3ifKSq", // password
        status: 1,
        gender: "f",
        phoneNumber: "0239239249239",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  }
};
