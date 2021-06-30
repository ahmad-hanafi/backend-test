'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProgStud extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProgStud.hasMany(models.Mahasiswa, {foreignKey: 'kode_progstud'})
      ProgStud.hasMany(models.Matkul, {foreignKey: 'kode_progstud'})
    }
  };
  ProgStud.init({
    nama: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
         args: true,
         msg: 'Ini tidak boleh kosong'
       }
      }
     }
  }, {
    sequelize,
    modelName: 'ProgStud',
  });
  return ProgStud;
};