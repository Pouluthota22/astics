module.exports = function (sequelize, Sequelize) {
  const User = sequelize.define(
    'user', {
      userId: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }
  );

  return User;
};