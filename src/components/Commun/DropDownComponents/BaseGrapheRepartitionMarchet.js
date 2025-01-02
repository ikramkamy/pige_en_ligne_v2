import React,{useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import { UsePresseDashboardStore } from 'store/dashboardStore/PresseDashboardStore';
import {ArrowUpward } from '@mui/icons-material';
import LoadingBarIndicator from '../LineLoading';
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
export default function DropDownBaseRepartitionFormat({getData}) {


  const {media, setBase,
   
    Filtersupports,
    Filterclassesids,
    Filterfamilles,
    Filtersecteursids,
    Filtervarietiesids,
    Filterannonceursids,
    Filtermarquesids,
    Filterproduitsids,
    rangs,
    date1,
    date2,
    setbaseGraphe,
  
    baseGraphe,
}=UseFiltersStore((state)=>state)
  const{getPrtMarchet}=UsePresseDashboardStore((state)=>state)
  const [progressControled,setProgressControled]=useState(0);
  const [selectedBase, setSelectedBase]=useState('')
  const [basesg, setBasesg]=useState([
    {label:"volume",
      value:"volume"
    },
    {label:"duree",
      value:"duree"
    },
    {label:"budget",
      value:"budget"
    }
 ])
 useEffect(()=>{


    if(media ==='presse'){
      setBasesg([
        {label:"volume",
          value:"volume"
        },
        {label:"budget",
          value:"budget"
        }
   
      ])
      }else{
        setBasesg([
          {label:"volume",
            value:"volume"
          },
          {label:"duree",
            value:"duree"
          },
          {label:"budget",
            value:"budget"
          }
       ])
       
    }
   
    },[media])


 const ShowDashboardData = async () =>{
    alert("vous avez change la base de calcul")
   
 
 
 }
 const handleMenuItemClick = (event) => {
  //alert("vous avez changer la base de calcul pour ce graph ")
    setSelectedBase(event.target.textContent);
    setbaseGraphe(event.target.textContent)
    console.log("base selected",event.target.textContent)
    const startTime = new Date().getTime();
    setBase(event.target.textContent)
    setProgressControled(0)
    //  getPrtMarchet && getPrtMarchet(Filtersupports,Filterfamilles,
    //  Filterclassesids,Filtersecteursids, Filtervarietiesids,
    //  Filterannonceursids,Filtermarquesids,Filterproduitsids,
    //  event.target.textContent,media,rangs,date1,date2)
     


 const endTime = new Date().getTime();
  const fetchDataTime = endTime - startTime;
  setTimeout(() => {
    //setShow(false)
    console.log("fetchDataTime", fetchDataTime)
    //getData()
  }, fetchDataTime + 15000);
 
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
   };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div style={{width:"100%"}}>
       
      {/* <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ m:1, width:"fit-content"}}
      >
        {selectedBase || 'Base'}
        
      </Button> */}
      {/* <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuProps={{ PaperProps: { style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 550 } } }}
      > */}
        <InputLabel id="demo-multiple-checkbox-label">Base</InputLabel>
         <Select
          labelId="demo-multiple-checkbox-label"
          value={selectedBase}
          placeholder='Selectionner'
         // onChange={handleChange}
          input={<OutlinedInput label="Volume" />}
          renderValue={(selected) => selected}
          MenuProps={MenuProps}
          sx={{ m:1, width:"100%"}}
        >

{basesg.map((elem) => (
          <MenuItem key={elem.value} onClick={handleMenuItemClick}>
            {/* <Checkbox checked={selectedBase === elem.label} /> */}
            <ListItemText primary={elem.label} />
          </MenuItem>
        ))}
          
        </Select>
      
      {/* </Menu> */}


      {/* <LoadingBarIndicator progressControled={progressControled} step={0.5}/> */}
    </div>
  );
}

