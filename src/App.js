import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const commonStyles = {
  bgcolor: 'background.paper',
  border: 2,
  width: '100%',
  height: 'auto',
  marginBottom: 2
};

function DropDownListconst(props) {
  const idName = "ddlSchema" + props.Schema;
  return (
    <>
      <Select
        id={idName}
        value={props.Schema}
        displayEmpty
        disabled
        style={{ marginBottom: 10 }}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="">--Add schema to segment--</MenuItem>
        <MenuItem value="first_Name">First Name</MenuItem>
        <MenuItem value="last_Name">Last Name</MenuItem>
        <MenuItem value="gender">Gender</MenuItem>
        <MenuItem value="age">Age</MenuItem>
        <MenuItem value="account_name">Account Name</MenuItem>
        <MenuItem value="city">City</MenuItem>
        <MenuItem value="state">State</MenuItem>
      </Select>
    </>
  );
}


function App() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [SchemaFields, setSchemaFields] = useState({
    emptyOption: "--Add schema to segment--",
    first_Name: "First Name",
    last_Name: "Last Name",
    gender: "Gender",
    age: "Age",
    account_name: "Account Name",
    city: "City",
    state: "State"
  });
  const [AddedSchemaFields, setAddedSchemaFields] = useState({});

  const [Schema, setSchema] = React.useState('emptyOption');
  const [SegmentName, setSegmentName] = React.useState('');

  const handleChange = (event) => {
    setSchema(event.target.value);

  };
const handle = (e)=>{
setSegmentName(e.target.value);
}
  const [ddlList, setddlList] = useState([]);

  const onAddBtnClick = event => {
    if (Schema != null && Schema != undefined && Schema != "emptyOption") {
      setddlList(ddlList.concat(<DropDownListconst Schema={Schema} key={ddlList.length} />));
      let valText = SchemaFields[Schema];

      AddedSchemaFields[Schema] = valText;
      console.log(AddedSchemaFields);

      let copiedSchemaFields = { ...SchemaFields };
      delete copiedSchemaFields[Schema];
      setSchemaFields(SchemaFields => ({ ...copiedSchemaFields }));
      setSchema(Schema => ('emptyOption'));
    }
    else {
      alert("Please choose different schema to add segment.");
      return;
    }
  };

  const [finalOutput, setfinalOutput] = useState({});

  const SaveJson = event => {
    if (SegmentName != null && SegmentName != undefined && SegmentName != "") {
      console.log(Object.keys(AddedSchemaFields).length)
      if (Object.keys(AddedSchemaFields).length > 0) {
        finalOutput.SegmentName = SegmentName;
        finalOutput.Schema = [AddedSchemaFields];
        console.log(finalOutput);
      }
      else {
        alert("Please fill the schema details to add new segment.");
        return;
      }
    }
    else {
      alert("Please enter the segment name to add new segment.");
      return;
    }
  };



  function DefaultDropDown(props) {
    const menuItems = Object.keys(SchemaFields).map(item => (
      <MenuItem value={item}>{SchemaFields[item]}</MenuItem>
    ));

    return (
      <>
        <Select
          id="ddlSchema"
          value={props.Schema}
          displayEmpty
          style={{ marginBottom: 10 }}
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={handleChange}
        >
          {menuItems}
        </Select>
      </>
    );
  }




  return (
    <div className="App">
      <Button variant="outlined" onClick={handleClickOpen}>Save Segment</Button>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Saving Segment
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth>
            <FormLabel style={{ marginBottom: 10, color: '#000' }}>Enter the Name of the Segment</FormLabel>
            <TextField onChange={handle} style={{ marginBottom: 20 }} id="txtName" value={SegmentName} variant="outlined" />
            <FormLabel style={{ marginBottom: 20, color: '#000' }}>To save your segment, you need to add the schemas to build the query</FormLabel>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box style={{ padding: 10 }} sx={{ ...commonStyles, borderColor: 'primary.main' }} >
                <FormControl fullWidth>
                  {ddlList}
                </FormControl>
              </Box>
            </Box>
            <DefaultDropDown Schema={Schema}></DefaultDropDown>
            <Link href="#" onClick={onAddBtnClick} >+ Add new schema</Link>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" autoFocus onClick={SaveJson}>
            Save the Segment
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div >
  );
}

export default App;
