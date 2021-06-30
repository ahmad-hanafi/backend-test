const router = require('express').Router()
const krsController = require('../controllers/krsController')
const mahasiswaController = require('../controllers/mahasiswaController')
const matkulController = require('../controllers/matkulController')
const progstudController = require('../controllers/progstudController')

router.get('/', (req,res) => {
    res.send("Welcome")
})

router.get('/mahasiswa', mahasiswaController.showAll) // done
router.get('/mahasiswa/:id', mahasiswaController.findId) // done
router.post('/mahasiswa', mahasiswaController.addMahasiswa) // done 
router.put('/mahasiswa/:id', mahasiswaController.update) // done
router.delete('/mahasiswa/:id', mahasiswaController.delete) //  done                      

router.get('/krs', krsController.showAll) // done
router.get('/krs/:nim', krsController.findId) // done
router.post('/krs', krsController.addKRS) // done
router.put('/krs/:id', krsController.update) // 
router.patch('/krs/:id', krsController.updateOne) // 
router.delete('/krs/:id', krsController.delete) //                        

router.get('/matkul', matkulController.showAll) // done
router.get('/matkul/:id', matkulController.findId) // done
router.post('/matkul', matkulController.addMatkul) // done
router.put('/matkul/:id', matkulController.update) // done
router.patch('/matkul/:id', matkulController.updateOne) // done
router.delete('/matkul/:id', matkulController.delete) //  done                      

router.get('/programstudi', progstudController.showAll) // done
router.get('/programstudi/:id', progstudController.findId) // done
router.post('/programstudi', progstudController.addProgStud) // done
router.put('/programstudi/:id', progstudController.update) // done
router.delete('/programstudi/:id', progstudController.delete) //  done                      


module.exports = router