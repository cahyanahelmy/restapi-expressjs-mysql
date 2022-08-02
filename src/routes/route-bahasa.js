const router = require("express").Router()
const { bahasa } = require("../controllers")

router.get("/bahasa", bahasa.getBahasaList)
router.post("/bahasa/add", bahasa.addBahasa)
router.post("/bahasa/:id", bahasa.getBahasaById)
router.put("/bahasa/update/:id", bahasa.updateBahasa)
router.delete("/bahasa/delete/:id", bahasa.deleteBahasa)

module.exports = router