const express = require('express');
const router = express.Router();

const uploadToProductImage = require('../multer/multerConfig')("product_images");
const uploadToConversationImage = require('../multer/multerConfig')("conversation_images");
const { API_PATH } = require('../constants/api');

const handleUploadingFile = (req, res) => {
    try {
        if (req.file) {
            if (req.error) {
                throw new Error("invalid file type");
            }
            let fullPath = `${API_PATH + req.file.path}`;
            res.status(202).send(fullPath);
        }
        else {
            throw new Error("No File Found");
        }
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
}

router.post('/productImage', uploadToProductImage.single('product-image'), async (req, res) => {
    handleUploadingFile(req, res);
});

router.post('/conversationImage', uploadToConversationImage.single('conversation-image'), async (req, res) => {
    handleUploadingFile(req, res);
});


module.exports = router;

