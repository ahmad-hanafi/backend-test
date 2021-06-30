const { KRS, Mahasiswa, Matkul, sequelize } = require('../models')

class krsController {
    static showAll(req,res) {
        KRS.findAll({
            include: [
                {
                model: Mahasiswa,
                attributes: ['id', 'nama'] },
                {
                model: Matkul,
                attributes: ['id', 'nama', 'sks'],
                // attributes: ['id', 'nama', [sequelize.fn('COUNT', sequelize.col('sks')), 'total_sks']],
                // group: ['Matkul.sks']
                }
            ],
            order: [['nim']]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({ message: "Internal server error", detailError: err })
        })
    }

    static addKRS(req,res) {
      const newKRS = {
          nim: req.body.nim,
          kode_matkul: req.body.kode_matkul,
      }
      KRS.create(newKRS)
      .then(data => {
          res.status(201).json(data)
      })
      .catch(err => {
          if(err.message) {
            //   console.log(err.message)
              res.status(400).json({ message: err})
          }
          else {
              res.status(500).json({ message: err})
          }
      })
    }

    static findId(req,res) {
        KRS.findAll({
            where: {
                nim: +req.params.nim
            },
            include: [
                {
                model: Mahasiswa,
                attributes: ['id', 'nama'] },
                {
                    model: Matkul,
                    attributes: ['id', 'nama', 'sks'],
                    // attributes: ['id', 'nama', [sequelize.fn('COUNT', sequelize.col('sks')), 'total_sks']],
                    // group: ['Matkul.sks']
                    }
            ]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(404).json({ message: "Error, Data Not Found", detailError: err })
        })
    }

    static update(req,res) {
        KRS.update(req.body, {
            where: {
                id: +req.params.id
            },
            returning: true
        })
        .then(data => {
            res.status(200).json({message: "Succeess Update", data})
        })
        .catch(err => {
            // console.log(err)
            res.status(404).json({ message: "Error, Data Not Found", detailError: err })
        })
    }

    static updateOne(req,res) {
        KRS.update({kode_matkul: req.body.kode_matkul}, {
            where: {
                id : +req.params.id
            },
            returning: true
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(404).json({ message: "Error, Data Not Found", detailError: err })
        })
    }

    static delete(req,res) {
        KRS.destroy({
            where: {
                id: +req.params.id
            }
        })
        .then(data => {
            res.status(200).json({ message: "KRS success to delete"})
        })
        .catch(err => {
            res.status(404).json({ message: "Error, Data Not Found", detailError: err })
        })
    }
}

module.exports = krsController