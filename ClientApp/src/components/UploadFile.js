import { Link } from "react-router-dom";
import "./App.css";
import uploadIcon from "../assets/upload-icon.png";
import { useEffect, useState } from "react";
import ChooseDirectory from "./ChooseDirectory";
import axios from "axios";
import { Alert } from "@mui/material";
import WordTemplateList from "./WordTemplateList";
const allowedExcelExtensions = [".xls", ".xlsx"];
const allowedWordExtensions = [".doc", ".docx"];
const allowedWordFiles = ["m.docx", "M_PO.docx","M_POE.docx","mE.docx","u.docx","uE.docx"];

export function UploadFile() {
  const [showChooseDIrectory, setShowCHooseDirectory] = useState(false);
  const [showWordTemplateList, setShowWordTemplateList] = useState(false);
  const [showloader, setShowloader] = useState(false);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [currentDIr, setCurrentDIr] = useState("");
  const [modules, setModules] = useState([]);
  const [currentExcelFiles, setCurrenExceltFiles] = useState(null);
  const [currentWordFiles, setCurrentWOrdFiles] = useState([]);
  const [wordFilesToUpload, setWordFilesToUpload] = useState([]);
  const [progressBarValue, setProgressBarValuer] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    currentDirectoryHasError: false,
    currentFileHasError: false,
    allowExcelFileFormat: false,
  });

  const resetError = () => {
    setErrors({ currentDirectoryHasError: false, currentFileHasError: false });
  };

// send excel file to backend

  const submitExcelFileToBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    setProgressBarValuer(0);
    const endpoint ="upload-excel";
    setShowloader(true);
    try {
      const { data } = await axios.post(
       '/exchange/upload-excel',
        formData,
          {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );

            setTimeout(() => {
              setProgressBarValuer(progress);
            }, 500);
          },
        }
      );

      setModules(data); //get message box data from backend
      setTimeout(() => {
        setShowMessageBox(true); // show message box
        // setProgressBarValuer(0);
      }, 200);
    } catch (error) {
      console.log(error);
    }
  };

  // start upload excel files

  const onStart = () => {
    const error = {
      currentDirectoryHasError: false,
      currentFileHasError: false,
      excelFileFormatHasError: false,
      wordFileFormatHasError: false,
      hasError: false,
    };
    if (!currentDIr) {
      error.currentDirectoryHasError = true;
      error.hasError = true;
    }

    if (!currentExcelFiles) {
      error.currentFileHasError = true;
      error.hasError = true;
    }

    if (error.hasError) setErrors(error);
    if (!error.hasError) {
         submitExcelFileToBackend(currentExcelFiles);

    }
  };

  const isExcelFile = (file) => {
    const fileName = file.name;
    const fileExtension = fileName
      .slice(fileName.lastIndexOf("."))
      .toLowerCase();

    return allowedExcelExtensions.includes(fileExtension);
  };

  const isWordFile = (file) => {
    const fileName = file.name;
    const fileExtension = fileName
      .slice(fileName.lastIndexOf("."))
      .toLowerCase();

    return allowedWordExtensions.includes(fileExtension);
  };

  //Handle upload excel files
  const handleExcelFileSelect = (event) => {
    const file = event?.target?.files[0] || null;
    const error = {
      excelFileFormatHasError: false,
      hasError: false,
    };

   // check if is  files
    if (file && isExcelFile(file)) {
      setCurrenExceltFiles(file);

    } else {
      error.excelFileFormatHasError = true;
      error.hasError = true;
    }

    setErrors(error);
  };


  //Handle upload word document, get files from pc

  const handleWordFileSelect = (event) => {
    setCurrenExceltFiles(null);

    setWordFilesToUpload(event.target.files); 

    const files = Array.from(event.target.files);  
    setProgressBarValuer(0);
    setShowWordTemplateList(false);
    const error = {
      wordFileFormatHasError: false,
      wordFileNameHasError: false,
      hasError: false,
    };
//console.log(files);
    const words = [];
    let notIncluded=[];
    files.forEach((file) => {
     // const included=allowedWordFiles.includes(file.name);

      if(!allowedWordFiles.includes(file.name)){
          notIncluded.push(file.name);
      }

      if (file && isWordFile(file)) { // check if is word document
        words.push(file); // push selected files
      }
       else {
        error.wordFileFormatHasError = true;
        error.hasError = true;
      }
    });


      if(notIncluded.length > 0){
        const _notIncluded=notIncluded.join();
        return alert(` Bitte den Dateiname überprüfen ${_notIncluded} `);
      }else{
        const currentWordFiles = words;
      if (currentWordFiles.length !== 6) // chek if files uploaded equal to 6 docs
        return alert("Bitte Sechs(6) Files auswählen");
      setCurrentWOrdFiles([
        ...currentWordFiles.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        ),
      ]);
      setProgressBarValuer(0);
      setShowWordTemplateList(true);
    }
  
  };



// send word document files to backend or to api

  const submitWordToBackend = async () => {

     const formData = new FormData();
    for (let i = 0; i < wordFilesToUpload.length; i++) {
      formData.append('files', wordFilesToUpload[i]);
    }
    setProgressBarValuer(0);
    
      try {
        const { data } = await axios.post(
           '/exchange/upload-word',
          formData,
         
          { 
          headers: {"Content-Type": "multipart/form-data"},
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setTimeout(() => {
                setProgressBarValuer(progress);
              }, 500);
            },
          }
        );

        setTimeout(() => {
          setShowWordTemplateList(false);
          setIsSubmitting(false);
          // setProgressBarValuer(0);
        }, 1500);

        setModules(data);

        setTimeout(() => {
          setShowMessageBox(true);
        }, 200);


        
      } catch (error) {
        console.log(error);
      }
  
  };

  return (
    <div className="container">
      <div className="row m-5 p-0">
        <div className="col-lg-7">
          <div className="row">
            <div className="col-lg-6">
              {showChooseDIrectory && (
                <ChooseDirectory
                  setCurrentDIr={setCurrentDIr}
                  showChooseDIrectory={showChooseDIrectory}
                  setShowCHooseDirectory={setShowCHooseDirectory}
                />
              )}
              {showWordTemplateList && (
                <WordTemplateList
                  progressBarValue={progressBarValue}
                  isSubmitting={isSubmitting}
                  setIsSubmitting={setIsSubmitting}
                  currentWordFiles={currentWordFiles}
                  showWordTemplateList={showWordTemplateList}
                  setShowWordTemplateList={setShowWordTemplateList}
                  onSubmitToBackend={submitWordToBackend}
                />
              )}

              <div className="card round-2 px-4 py-5 m-0 d-flex align-items-center">
                <img
                  src={uploadIcon}
                  style={{ width: "101px" }}
                  className="card-img-top text-center"
                />
                <div className="card-body">
                <input
                    type="file"
                    id="fileExecelInput"
                    defaultValue={null}
                    accept={allowedExcelExtensions}
                    style={{ display: "none" }}
                    onChange={handleExcelFileSelect}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      document.getElementById("fileExecelInput").click();
                    }}
                  >
                    Datei auswälen
                  </button>
                </div>
                {!!currentExcelFiles && (
                  <div className="card-footer">
                    <div className="text-justify text-break text-primary py-2">
                      {currentExcelFiles.name}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card round-2 px-4 py-5 m-0 d-flex align-items-center">
                <img
                  src={uploadIcon}
                  style={{ width: "101px" }}
                  className="card-img-top text-center"
                />
                <div className="card-body">
                  <input
                    type="file"
                    multiple
                    id="fileWordInput"
                    defaultValue={null}
                    accept=".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    style={{ display: "none" }}
                    onChange={handleWordFileSelect}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      document.getElementById("fileWordInput").click();
                    }}
                  >
                    Word-Template auswälen
                  </button>
                </div>
                {!!wordFilesToUpload.length && (
                  <div className="card-footer">
                    <div className="text-justify text-break text-primary py-2">
                     {wordFilesToUpload.length} word tmp files selected
                    </div>
                  </div>
                )}
              </div>
            </div>
         
            <div className="col-lg-12 mt-5">
              <div className="d-flex align-items-center">
                <div className="m-2"></div>
                <button
                  onClick={() => {
                    setCurrentDIr("");
                    resetError();
                    setShowCHooseDirectory(true);
                  }}
                  className="btn btn-danger d-flex align-items-center"
                >
                  {" "}
                  <span className="material-icons-outlined">
                    drive_folder_upload
                  </span>
                  Verzeichnis für Ausgabe auswählen
                </button>
                <div className="m-2"></div>
                <input
                  type="text"
                  className="form-control w-100 "
                  value={currentDIr}
                />
              </div>
            </div>

            <div className="col-lg-12 mt-5">
              <div className="d-flex align-items-center">
                <button
                  onClick={() => onStart()}
                  className="btn btn-primary d-flex align-items-center px-4 py-2"
                >
                  {" "}
                  <span className="material-icons-outlined">arrow_circle_up</span>
                  <div className="m-1"></div>
                  Start
                </button>
                <div className="m-2"></div>
                <button
                  onClick={() => {
                    setCurrenExceltFiles(null);
                    setCurrentDIr("");
                    resetError();
                    setShowloader(false);
                  }}
                  className="btn btn-danger d-flex align-items-center px-4 py-2"
                >
                  {" "}
                  <span className="material-icons-outlined ">cancel</span>
                  <div className="m-1"></div>
                  Löschen
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          {errors.hasError && (
            <div>
              {errors.excelFileFormatHasError && (
                <Alert severity="error">
                  We accept only Excel file format!
                </Alert>
              )}
              {errors.wordFileFormatHasError && (
                <Alert severity="error">We accept only Word file format!</Alert>
              )}

              {errors.currentDirectoryHasError && (
                <Alert severity="error">Please choose Directory!</Alert>
              )}
              {errors.currentFileHasError && (
                <Alert
                  severity="error"
                  className={errors.currentDirectoryHasError ? "mt-2" : ""}
                >
                  Please upload file!
                </Alert>
              )}
            </div>
          )}

          {showMessageBox && (
            <>
              <label> Warnungshinweise:</label>
              <div
                className="form-control w-100 "
                style={{ height: "520px", overflow: "auto" }}
              >
                {modules.map((row, index) => (
                  <p key={index}>
                    <strong>Module</strong>: {row.module} <br />
                    Comments: {row.comment}
                  </p>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {showloader && (
        <div className="row m-5 p-0">
          <div className="col-lg-12">
            <div className="progress" style={{ height: "30px" }}>
              <div
                className={`progress-bar progress-bar-striped progress-bar-animate p-2 bg-${
                  progressBarValue === 100 ? "success" : "primry"
                }`}
                role="progressbar"
                aria-valuenow={progressBarValue}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progressBarValue + "%" }}
              >
                <span className="m-3" style={{ fontSize: "18px" }}>
                  {" "}
                  {progressBarValue === 100
                    ? "Completed"
                    : progressBarValue + "%"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row m-5 p-0">
        <div className="col-lg-12">
          <Link
            style={{ textDecoration: "none", width: "150px" }}
            to="/"
            className="btn btn-info py-2 text-white d-flex align-items-start"
          >
            {" "}
            <span className="material-icons-outlined">arrow_circle_left</span>
            <div className="m-1"></div>
            Zuruck
          </Link>
        </div>
      </div>
    </div>
  );
}
