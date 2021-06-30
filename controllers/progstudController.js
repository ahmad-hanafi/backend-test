const { ProgStud, Matkul } = require('../models')

class progstudController {
    static showAll(req,res) {
        ProgStud.findAll({
            include: {
                model: Matkul,
                attributes: ["id", "nama", "sks"],
            },
            order: [['id']]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal server error", detailError: err })
        })
    }

    static addProgStud(req,res) {
      const newProgStud = {
          nama: req.body.nama
      }
      ProgStud.create(newProgStud)
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
        ProgStud.findOne({
            where: {
                id: +req.params.id
            },
            include: {
                model: Matkul,
                attributes: ["id", "nama", "sks"]
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
        ProgStud.update(req.body, {
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
        ProgStud.destroy({
            where: {
                id: +req.params.id
            }
        })
        .then(data => {
            res.status(200).json({ message: "ProgStud success to delete"})
        })
        .catch(err => {
            res.status(404).json({ message: "Error, Data Not Found", detailError: err })
        })
    }
}

module.exports = progstudController