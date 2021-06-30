'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mahasiswa.belongsToMany(models.Matkul, {through: 'KRS', foreignKey: 'nim'})
      Mahasiswa.belongsTo(models.ProgStud, {foreignKey: 'kode_progstud'})
    }
  };
  Mahasiswa.init({
    nama: {
    type: DataTypes.STRING,
     validate: {
       notEmpty: {
        args: true,
        msg: 'Ini tidak boleh kosong'
      }
     }
    },
    tgl_lahir: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Harus nomor"
        },
        notEmpty: {
          args: true,
          msg: "Ini tidak boleh kosong"
        },
        notNegative(value) {
          if (value.length > 8 ) {
            throw new Error("Kebanyakan, contohnya begini 20112011")
          }
        }
      }
    },
    tempat_lahir: {
      type: DataTypes.STRING,
       validate: {
         notEmpty: {
          args: true,
          msg: 'Ini tidak boleh kosong'
        }
       }
      },
    thn_masuk: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Harus nomor"
        },
        notEmpty: {
          args: true,
          msg: "Ini tidak boleh kosong"
        },
        notNegative(value) {
          if (value.length > 8 ) {
            throw new Error("Kebanyakan, contohnya begini 20112011")
          }
        }
      }
    },
    kode_progstud: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProgStuds',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    }
  }, {
    sequelize,
    modelName: 'Mahasiswa',
  })
  return Mahasiswa;
};