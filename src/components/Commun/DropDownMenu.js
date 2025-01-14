import React,{useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import { UsePigeDashboardStore } from 'store/dashboardStore/PigeDashboardStore';
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
export default function DropDownBase() {


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
  const{getPrtMarchet}=UsePigeDashboardStore((state)=>state)
  const [selectedBase, setSelectedBase]=useState('')
  const [bases, setBases]=useState([
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
      setBases([
        {label:"volume",
          value:"volume"
        },
        {label:"budget",
          value:"budget"
        }
   
      ])
      }else{
        setBases([
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
    setSelectedBase(event.target.textContent);
    setbaseGraphe(event.target.textContent)
    console.log("base selected",event.target.textContent)
    const startTime = new Date().getTime();
   
     getPrtMarchet && getPrtMarchet(Filtersupports,Filterfamilles,
     Filterclassesids,Filtersecteursids, Filtervarietiesids,
     Filterannonceursids,Filtermarquesids,Filterproduitsids,
     event.target.textContent,media,rangs,date1,date2)
     


 const endTime = new Date().getTime();
  const fetchDataTime = endTime - startTime;
  setTimeout(() => {
    //setShow(false)
    console.log("fetchDataTime", fetchDataTime)
  }, fetchDataTime + 5000);
 
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
    <div>
       
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ m: 1, width:'fit-content'}}
      >
        {selectedBase || 'Base'}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuProps={{ PaperProps: { style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250 } } }}
      >
        {bases.map((elem) => (
          <MenuItem key={elem.value} onClick={handleMenuItemClick}>
            {/* <Checkbox checked={selectedBase === elem.label} /> */}
            <ListItemText primary={elem.label} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

