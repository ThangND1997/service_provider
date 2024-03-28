import * as express from "express";
import betiuService from "../routes/BetiuService"
import { telegramClient } from "../../infrastructure";
import * as multer from "multer";
import * as fs from 'fs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.use("/betiu-services", betiuService);
router.get("health-check", (req, res) => {
    res.status(200)
    res.send();
});

function detectImagePdfArray(fileName: string | undefined): "image" | "video" | "none" {
    if (!fileName) return "none";
    let ext: any = fileName.split(".").pop();
    if (["JPEG", "PNG", "WEBP"].includes(ext.toUpperCase())) {
        return "image"
    } else {
        return "video"
    }
}

router.post("/telegram", upload.single('file'), async (req, res) => {
    // Send media
    if (req.file && req.file.path) {
        fs.readFile(req.file.path, async (err, data) => {
            if (err) {
                console.error('Lỗi khi đọc tệp tin:', err);
                return;
            }
            
            const fileBuffer = Buffer.from(data);
            switch (detectImagePdfArray(req.file?.originalname)) {
                case "image":
                    await telegramClient.sendPhoto(fileBuffer);
                    break;

                case "video":
                    await telegramClient.sendVideo(fileBuffer);
                    break;    
            
                default:
                    break;
            }
        })        
    }
    // Send Message
    if (req.body.message) {
        await telegramClient.sendMessage(req.body.message);
    }

    res.status(200)
    res.json({status: "done"});
})

export default router;