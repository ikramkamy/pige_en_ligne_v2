import React,{useState} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import { UsePigeDashboardStore } from 'store/dashboardStore/PigeDashboardStore';
import { UseVeilleStore } from 'store/dashboardStore/VeilleMediaStore';
import { Search } from '@mui/icons-material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function RecherchePub() {
  const { setMediaValue,getFilters,ResetAllFilters,setVeilleDiffusion}=UseFiltersStore((state)=>state)
  const {ResetDataArrays}=UsePigeDashboardStore((state)=>state)
  
  const [selectedMediaPub, setSelectedMediaPub]=useState('')
  const [mediaList, setMediaList]=useState([
    {label:"Diffusion en cours",
      value:"progress"
    },
    {label:"1 ère Diffusion",
      value:"first"
    },

])
const {resetVeilletvdata}=UseVeilleStore((state)=>state)
const handleChange = (event) => {
     //console.log("event",event)
    setVeilleDiffusion(event.target.value)   
    var PubSelected=mediaList.filter((elem)=>elem.value==event.target.value)
    var IdrangsSeclected=PubSelected.map((elem)=>elem.value)
    setSelectedMediaPub(PubSelected[0].label)
    setVeilleDiffusion &&  setVeilleDiffusion(IdrangsSeclected)
    ResetAllFilters && ResetAllFilters()
    //getFilters && getFilters(event.target.value)
    ResetDataArrays && ResetDataArrays()
    resetVeilletvdata && resetVeilletvdata()
  };
  return (
    <div>
      <FormControl sx={{
    m: 1,
    width: {
        xs: '40vw', 
        sm: 150,    
    },
    marginRight: {
        xs: '0px', 
        lg: '16px'
    },
    margin: "0px", // This will apply to all screens, but marginRight will override it on large screens
}}>
      
        <InputLabel id="demo-multiple-checkbox-label"
         sx={{ 
          top:"-10px",
          color: "black",
          '&.Mui-focused': {
            color: 'transparent',
            display:'none'
          },
          }}>
        1 ére diffusion
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          value={selectedMediaPub}
           sx={{backgroundColor:"white", height:"40px"}}
          onChange={handleChange}
          input={<OutlinedInput label="Diffusion en cours" />}
          renderValue={(selected) => selected}
          MenuProps={MenuProps}
        >
          
          {mediaList.map((elem) => (
            <MenuItem key={elem.value} 
             name={elem.label} value={elem.value} 
            >
           
              <Radio checked={selectedMediaPub.indexOf(elem.value)> -1}  name={elem.label}/>
              <ListItemText primary={elem.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
