'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("posts", [
      {
        title: "Title post one",
        slug: "title-post-one",
        userId: 1,
        content: "Text content post one",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Title post two",
        slug: "title-post-two",
        userId: 1,
        content: "Text content post two",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("posts", null, {});
  }
};
