const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let route = 'documents';
    if (file.fieldname == 'thumbnail') route = 'profile';
    if (file.fieldname == 'image') route = 'documents';
    cb(null, __dirname + `/../public/documents/${route}`);
  },
  filename: function (req, file, cb) {
    let user = req.user;
    let filename = `${Date.now()}-${file.originalname}`;
    if (file.fieldname != 'image' && file.fieldname != 'thumbnail') filename = `${user.email}-${file.fieldname}`;

    let fileExtension = file.originalname.split('.');

    cb(null, `${filename}.${fileExtension[1]}`);
  },
});

const uploader = multer({ storage: storage });

const saveDocs = uploader.fields([{ name: 'thumbnail' }, { name: 'image' }, { name: 'location' }, { name: 'accState' }, { name: 'identification' }]);

const upload = multer();

const reviewDocs = upload.fields([{ name: 'thumbnail' }, { name: 'image' }, { name: 'location' }, { name: 'accState' }, { name: 'identification' }]);

module.exports = {
  saveDocs,
  reviewDocs,
};
