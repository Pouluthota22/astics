module.exports = function (sequelize, Sequelize) {
    const User = sequelize.define(
        'item', {
            itemId: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            item: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            photo: {
                type: Sequelize.STRING(4096),
            }
        }, {
            freezeTableName: true
        }
    );

    return User;
};