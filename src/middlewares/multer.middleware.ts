import multer from 'multer'

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname)
  },
})

const audioStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/audio/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname)
  },
})

export const upload = {
  image: multer({ storage: imageStorage }),
  audio: multer({ storage: audioStorage }),
}
