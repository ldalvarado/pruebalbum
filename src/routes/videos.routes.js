const tutorials = require("../controllers/videos.controller");
var router = require("express").Router();

router.get('/', tutorials.findAll);
router.post('/', tutorials.putItems);
router.post('/delete', tutorials.deleteItems);

module.exports = router;