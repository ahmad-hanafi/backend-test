'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KRS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      KRS.belongsTo(models.Mahasiswa, {foreignKey: 'nim'})
      KRS.belongsTo(models.Matkul, {foreignKey: 'kode_matkul'})
    }
  };
  KRS.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nim: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Mahasiswas',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    kode_matkul: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Matkuls',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
  }, {
    sequelize,
    modelName: 'KRS',
  });
  return KRS;
};