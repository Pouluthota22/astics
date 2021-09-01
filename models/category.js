module.exports = function (sequelize, Sequelize) {
    const User = sequelize.define(
        'category', {
            categoryId: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            category: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        }, {
            freezeTableName: true
        }
    );

    return User;
};