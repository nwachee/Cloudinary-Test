const fileService = require('../services/fileupload.service')
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require('dotenv')
dotenv.config({ path: './src/.env' })


class fileController {
    async audio(req, res){
         // Get the file name and extension with multer
        const storage = multer.diskStorage({
            filename: (req, file, cb) => {
            const fileExt = file.originalname.split(".").pop();
            const filename = `${new Date().getTime()}.${fileExt}`;
            cb(null, filename);
            },
        });

        // Filter the file to validate if it meets the required audio extension
        const fileFilter = (req, file, cb) => {
            if (file.mimetype === "audio/mp3" || file.mimetype === "audio/mpeg") {
            cb(null, true);
            } else {
            cb(
                {
                message: "Unsupported File Format",
                },
                false
            );
            }
        };

        // Set the storage, file filter and file size with multer
        const upload = multer({
            storage,
            limits: {
            fieldNameSize: 200,
            fileSize: 5 * 1024 * 1024,
            },
            fileFilter,
        }).single("audio");

        // upload to cloudinary
        upload(req, res, (err) => {
            if (err) {
            return res.send(err);
            }

            // SEND FILE TO CLOUDINARY
            cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            });
            const { path } = req.file; // file becomes available in req at this point
            
            const fName = req.file.originalname.split(".")[0];
            cloudinary.uploader.upload(
            path,
            {
                resource_type: "raw",
                public_id: `AudioUploads/${fName}`,
            },

            // Send cloudinary response or catch error
            (err, audio) => {
                if (err) return res.send(err);

                fs.unlinkSync(path);
                res.send(audio);
            },

                    
            );

        });

        //Get file Url and add to the database
        // const filelink = await fileService.create(urldata);

        //     res.status(201).json({
        //     success: true,
        //     message: 'File Link created Successfully',
        //     data: filelink
        // })
        
    }

    async video(req, res){
                    // Get the file name and extension with multer
            const storage = multer.diskStorage({
                filename: (req, file, cb) => {
                const fileExt = file.originalname.split(".").pop();
                const filename = `${new Date().getTime()}.${fileExt}`;
                cb(null, filename);
                },
            });

            // Filter the file to validate if it meets the required video extension
            const fileFilter = (req, file, cb) => {
                if (file.mimetype === "video/mp4") {
                cb(null, true);
                } else {
                cb(
                    {
                    message: "Unsupported File Format",
                    },
                    false
                );
                }
            };

            // Set the storage, file filter and file size with multer
            const upload = multer({
                storage,
                limits: {
                fieldNameSize: 200,
                fileSize: 30 * 1024 * 1024,
                },
                fileFilter,
            }).single("video");

            upload(req, res, (err) => {
                if (err) {
                return res.send(err);
                }

                // SEND FILE TO CLOUDINARY
                cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
                });
                const { path } = req.file; // file becomes available in req at this point

                const fName = req.file.originalname.split(".")[0];
                cloudinary.uploader.upload(
                path,
                {
                    resource_type: "video",
                    public_id: `VideoUploads/${fName}`,
                    chunk_size: 6000000,
                    eager: [
                    {
                        width: 300,
                        height: 300,
                        crop: "pad",
                        audio_codec: "none",
                    },
                    {
                        width: 160,
                        height: 100,
                        crop: "crop",
                        gravity: "south",
                        audio_codec: "none",
                    },
                    ],
                },

                // Send cloudinary response or catch error
                (err, video) => {
                    if (err) return res.send(err);

                    fs.unlinkSync(path);
                    return res.send(video);
                }
                );
            });
    }
}

module.exports = new fileController()