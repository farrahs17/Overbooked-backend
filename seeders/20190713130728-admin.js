"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "admins",
      [
        {
          username: "Salma",
          email: "salma@test.com",
          password:
            "$2y$12$lMhrjY54434c6L5c2BLfU.4i1y2ec7DP89j8Bk9WviiyEbNM5oaD2",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
