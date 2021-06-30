const { Matkul, ProgStud } = require('../models')

class matkulController {
    static showAll(req,res) {
        Matkul.findAll({
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

    static addMatkul(req,res) {
      const newMatkul = {
          nama: req.body.nama,
          sks: req.body.sks,
          kode_progstud: req.body.kode_progstud,
      }
      Matkul.create(newMatkul)
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
        Matkul.findOne({
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
        Matkul.update(req.body, {
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
        Matkul.update({sks: req.body.sks}, {
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
        Matkul.destroy({
            where: {
                id: +req.params.id
            }
        })
        .then(data => {
            res.status(200).json({ message: "Matkul success to delete"})
        })
        .catch(err => {
            res.status(404).json({ message: "Error, Data Not Found", detailError: err })
        })
    }
}

module.exports = matkulController