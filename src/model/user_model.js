const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING
  }
}, {
});
// User.sync().then(() => {
//   console.log('Book table created successfully!');
// }).catch((error) => {
//   console.error('Unable to create table : ', error);
// });

module.exports = User ;