const express = require("express");
const cors = require("cors");
const multer=require("multer");
const xlsx=require("xlsx");
const app = express();


const storage=multer.diskStorage({

});

const upload = multer({dest:'uploads/'});
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: Infinity }));
app.use("/uploads",express.static("uploads"));
app.use(cors());

app.get("/api/test", (req, res) => {
  res.status(200).json({ data: "data" });
});

app.get("/api/my-documents", (req, res) => {
  const documents = [
    {
      docId: "1",
      name: "Excel",
    },
    {
      docId: "2",
      name: "Word",
    },
  ];
  res.status(200).json(documents);
});

// UPLOAD EXCEL API

app.post("/exchange/upload-excel", upload.single('file'), (req, res) => {
  const  file = req.file;

  console.log(file);
  try{
    let results=[];
    
    const workbook=xlsx.readFile(file.path);
       workbook.SheetNames.forEach((sheetName)=>{
        const worksheet=workbook.Sheets[sheetName];
         const data=xlsx.utils.sheet_to_json(worksheet,{header:1});
        results.push({module:sheetName ,comment:'we have '+data.length + 'rows in module ' +sheetName});
    });

    res.status(200).json(results);

  }catch(err){
    res.status(500).json(err);;

  }

  res.status(200).json("ok");
});

app.post("/exchange/upload-word",upload.array('files'), (req, res) => {
  const  files = req.files;

  let modules=[];
  files.forEach(element => {
    modules.push({module:element.originalname,comment:element.mimetype})
    
  });

  res.status(200).json(modules);
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
