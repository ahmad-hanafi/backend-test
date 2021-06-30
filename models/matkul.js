'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matkul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Matkul.belongsTo(models.ProgStud,  {foreignKey: 'kode_progstud'})
      Matkul.belongsToMany(models.Mahasiswa, {through: 'KRS', foreignKey: 'kode_matkul'})
    }
  };
  Matkul.init({
    nama: {
      type: DataTypes.STRING,
       validate: {
         notEmpty: {
          args: true,
          msg: 'Ini tidak boleh kosong'
        }
       }
      },
    sks: DataTypes.INTEGER,
    kode_progstud: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProgStuds',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
  }, {
    sequelize,
    modelName: 'Matkul',
  });
  return Matkul;
};