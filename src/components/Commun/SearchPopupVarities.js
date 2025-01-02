import React, { useState,useEffect } from 'react';
import { Checkbox, TextField, 
    FormControlLabel, Box, List, 
    ListItem, ListItemText, Typography, 
    Divider 
} from '@mui/material';
import {
    Dialog,
    MenuItem
  } from "@mui/material";
  import { UseFiltersStore } from '../../store/dashboardStore/FiltersStore';
  import { Close } from '@mui/icons-material';
const  SearchPopupVarieties=({openSeachVarities,handleCloseSearchVarieties}) =>{
    const { Filtervarieties, produits, setFiltervariete,
         annonceurs, marques, Filtervarietiesids } = UseFiltersStore((state) => state);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(Filtervarietiesids);
  const [selectedItems, setSelectedItems] = useState(Filtervarietiesids);
  // Filter options based on the search term
//   const filteredOptions = options.filter(option => 
//     option.label.toLowerCase().includes(searchTerm.toLowerCase())
//   );
console.log('selectedOptions Filtervarietiesids',Filtervarietiesids)
console.log('selectedOptions',selectedOptions)
  const filteredOptions =Filtervarieties.filter((item) => {
    return item.Variete_Lib.toLowerCase().startsWith(searchTerm.toLowerCase());
  })
  // Handle checkbox selection/deselection
  const handleCheckboxChange = (event, optionId) => { 
    if (event.target.checked) {
      setSelectedOptions([...selectedOptions, optionId]);
      setFiltervariete && setFiltervariete(selectedOptions, produits, annonceurs, marques);
    } else {
      setSelectedOptions(selectedOptions.filter(id => id !== optionId));
      setFiltervariete && setFiltervariete(selectedOptions, produits, annonceurs, marques);
    }
   
  };
  const isAllSelected = selectedItems.length === filteredOptions.length;
  const handleSelectAll = () => {
    if (selectedItems.length === filteredOptions.length) {
      setSelectedItems([]);
      setSelectedOptions([])
      setFiltervariete && setFiltervariete([], produits, annonceurs, marques);
    } else {
      setSelectedItems(filteredOptions.map((item) => item.Variete_id));
      setSelectedOptions(filteredOptions.map((item) => item.Variete_id))
      const ids = filteredOptions.map((item) => item.Variete_id);
      setFiltervariete && setFiltervariete(ids, produits, annonceurs, marques);
     
    }
  };

  useEffect(()=>{
    setFiltervariete && setFiltervariete(selectedOptions, produits, annonceurs, marques);
  },[selectedOptions])
  return (

    <Dialog open={openSeachVarities} onClose={handleCloseSearchVarieties}
    sx={{width:"100%"}}
    >
<div style={{display:"flex", justifyContent:'space-between', backgroundColor:"#f8f9fa"}}>
    <Typography sx={{margin:"16px", color:""}}>
        Recheche avancée des varietés
        </Typography>  
        <Typography sx={{margin:"16px", color:""}}>
       <Close sx={{cursor:"pointer"}} onClick={handleCloseSearchVarieties}/>
        </Typography>
        </div>
    <Box display="flex" justifyContent="space-between" sx={{ p: 2,
        
      
        width:'100%'
        }}>
      {/* liste des varités */}
      <Box width="45%" >

        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
        <MenuItem onClick={handleSelectAll}>
        <Checkbox
                    checked={isAllSelected}
                    onChange={() => handleSelectAll()}
                    sx={{paddingLeft:"0px"}}
                  />
                  <ListItemText primary="touts" />
        </MenuItem>
        <List  sx={{
           
            height:"60vh",
            overflowY:"scroll"
        }}>
          {filteredOptions.map((option) => (
            <ListItem key={option.Variete_id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedOptions.includes(option.Variete_id)}
                    onChange={(e) => handleCheckboxChange(e, option.Variete_id)}
                    value={option.Variete_id}
                    
                  />
                }
                label={option.Variete_Lib}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* les élèments selectionné  */}
      <Box width="45%" sx={{ borderLeft: '2px solid #ccc', pl: 2 }}>
        <Typography sx={{ mb: 2  , padding:"16.5px 14px"}} >
          Varietés selectionnées
        </Typography>
        <List  sx={{
            
            height:"60vh",
            overflowY:"scroll"
        }}>
          {selectedOptions.length === 0 ? (
            <ListItem>
              <ListItemText primary="No items selected" />
            </ListItem>
          ) : (
            selectedOptions.map((Variete_id) => {
              const selectedOption = Filtervarieties.find(option => option.Variete_id === Variete_id);
              return (
                <ListItem key={Variete_id}>
                  <ListItemText primary={selectedOption?.Variete_Lib} />
                </ListItem>
              );
            })
          )}
        </List>
      </Box>
    </Box>
    </Dialog>
  );
}
export default SearchPopupVarieties;
