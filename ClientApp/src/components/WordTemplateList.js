import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";


import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function WordTemplateList(props) {
  const { showWordTemplateList, setShowWordTemplateList,progressBarValue ,currentWordFiles,onSubmitToBackend ,isSubmitting,setIsSubmitting} = props;
  

  const onClose = () => {
    if(!isSubmitting)setShowWordTemplateList(false);
  };


  const onSave=()=>{
    if(currentWordFiles.length!==6) return alert('file uploaded should equal to six items');
    setIsSubmitting(true);
    onSubmitToBackend(currentWordFiles)
  }

  return (
    <Dialog
      open={showWordTemplateList}

      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle>View uploaded Word template files</DialogTitle>
      <DialogContent dividers>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {currentWordFiles.map((file,index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <ListItem key={index} disablePadding>
            <ListItemButton role={undefined} dense>
              <ListItemText id={labelId} primary={` ${index + 1} ${file.name}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
 <div className="progress" style={{ height: "30px" }}>
              <div
                className={`progress-bar progress-bar-striped progress-bar-animate p-2 bg-${progressBarValue===100?'success':'primry'}`}
                role="progressbar"
                aria-valuenow={progressBarValue}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progressBarValue+"%" }}
              >
                <span className="m-3" style={{ fontSize: "18px" }}>
                  {" "}
                 {progressBarValue===100?'Completed':progressBarValue+'%'} 
                </span>
              </div>
            </div>
    
      </DialogContent>
      <DialogActions>
        <button disabled={isSubmitting} onClick={onSave} className="btn btn-success">
        {isSubmitting?'Submitting...':'Submit'}
        </button>
        <button disabled={isSubmitting} onClick={onClose} className="btn btn-secondary">
         Close
        </button>
      </DialogActions>
    </Dialog>
  );
}

export default WordTemplateList;
