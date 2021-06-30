const { Mahasiswa, ProgStud } = require('../models')

class mahasiswaController {
    static showAll(req,res) {
        Mahasiswa.findAll({
            include: {
                model: ProgStud,
                attributes: ["nama"]
            },
            order: [['kode_progstud']]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal server error", detailError: err })
        })
    }

    static addMahasiswa(req,res) {
      const newMahasiswa = {
          nama: req.body.nama,
          tgl_lahir: req.body.tgl_lahir,
          tempat_lahir: req.body.tempat_lahir,
          thn_masuk: req.body.thn_masuk,
          kode_progstud: req.body.kode_progstud,
      }
      Mahasiswa.create(newMahasiswa)
      .then(data => {
          res.status(201).json(data)
      })
      .catch(err => {
          if(err.message) {
              res.status(400).json({ message: err})
          }
          else {
              res.status(500).json({ message: err})
          }
      })
    }

    static findId(req,res) {
        Mahasiswa.findOne({
            where: {
                id: +req.params.id
            },
            include: {
                model: ProgStud,
                attributes: ["nama"]
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(404).json({ message: "Error, Data Not Found", detailError: err })
        })
    }

    static update(req,res) {
        Mahasiswa.update(req.body, {
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

    static delete(req,res) {
        Mahasiswa.destroy({
            where: {
                id: +req.params.id
            }
        })
        .then(data => {
            res.status(200).json({ message: "Mahasiswa success to delete"})
        })
        .catch(err => {
            res.status(404).json({ message: "Error, Data Not Found", detailError: err })
        })
    }
}

module.exports = mahasiswaController