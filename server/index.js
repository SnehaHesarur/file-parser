const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const fs = require('fs')

const app =  express();
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/file-upload', upload.any(), (req, res) => {
    if (req.files) {
      const file = req.files[0]
      fs.readFile(file.path, function (err, data) {
        if (err) throw err;
        // delete file
        fs.unlink(file.path, function (err) {
          if (err) throw err;
        });
        res.send({data: data.toString()})
      });
    } else {
      throw new Error('No File Uploaded');
    }
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);