const { Router } = require('express');
const chatsController = require('../controller/views.chat.controller');
const userPermission = require('../middlewares/isUser');

const router = Router();

router.get('/', chatsController.getsendMessage);
router.post('/', userPermission, chatsController.sendMessage);
router.delete('/:chid', chatsController.deleteMessage);

module.exports = router;
