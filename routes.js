var router = require('express').Router();
var controllers = require('./controllers');

router.route('/add').post(controllers.add);
router.route('/get').post(controllers.get);
router.route('/getNewContent').post(controllers.getNewContent);
router.route('/getTopContent').post(controllers.getTopContent);
router.route('/update').post(controllers.update);
router.route('/delete').post(controllers.delete);

module.exports = router;