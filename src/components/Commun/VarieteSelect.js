import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { UseFiltersStore } from '../../store/dashboardStore/FiltersStore';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Button, CircularProgress, Box } from '@mui/material';
import SearchPopupVarieties from './SearchPopupVarities';
import "./commun.css"
export default function MultipleSelectVarieties() {
  const { Filtervarieties, produits, setFiltervariete, 
    annonceurs, marques, Filtervarietiesids } = UseFiltersStore((state) => state);
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [previousSelection, setPreviousSelection] = useState([]);


  const filteredElems =Filtervarieties.filter((item) => {
    return item.Variété_Lib.toLowerCase().startsWith(inputValue.toLowerCase());
  });


  useEffect(() => {
    setPreviousSelection(Filtervarietiesids);
  }, [Filtervarietiesids]);

  const handleSelectAll = () => {
    if (selectedItems.length === filteredElems.length) {
      setSelectedItems([]);
      setFiltervariete && setFiltervariete([], produits, annonceurs, marques);
    } else {
      setSelectedItems(filteredElems.map((item) => item.Variété_Id));
      const ids = filteredElems.map((item) => item.Variété_Id);
      setFiltervariete && setFiltervariete(ids, produits, annonceurs, marques);
      //console.log("varieties filter", ids);
    }
  };
  //console.log('Filtervarietiesids', Filtervarietiesids)
  const handleAutocompleteChange = (event, value) => {
    setSelectedItems([...value.map((item) => item.Variété_Id)]);
    const ids = value.map((item) => item.Variété_Id);
    setFiltervariete && setFiltervariete(ids, produits, annonceurs, marques);
  };

  const onInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const isAllSelected = previousSelection.length === filteredElems.length;
  const [openSeachVarities, setOpenSeachVarities] = useState(false)
  const [showloadingPopup, setShowloadingPopup] = useState(false)
  const handleCloseSearchVarieties = () => {
    //  setOpenSeachVarities(false)
    setOpenSeachVarities(false)
  }

  const handelopenPopup = () => {
    setShowloadingPopup(true)
    setTimeout(() => {
      setShowloadingPopup(false)
    }, 3000);
    setOpenSeachVarities(true)
  }

  return (
    <FormControl sx={{ m: 1, width: "100%", }} >
    
        {/* Custom Select All option */}
          <MenuItem onClick={handleSelectAll}>
            <Checkbox checked={isAllSelected} />
            <ListItemText primary="variétés" />
          </MenuItem>
       
        <InputLabel id="demo-multiple-checkbox-label"></InputLabel>


            <Autocomplete 
            sx={{height:"40px"}}
            multiple
            freeSolo
            options={filteredElems}
            disabled={showloadingPopup}
            value={Filtervarieties.filter((item) => previousSelection.includes(item.Variété_Id))}
            onChange={handleAutocompleteChange}
            getOptionLabel={(option) => option.Variété_Lib}
            inputValue={inputValue}
            onInputChange={onInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`variétés (${previousSelection.length})`} 
                // Display the count of selected items
                variant="outlined"
              />
            )}
            renderOption={(props, option) => (
              <MenuItem {...props} key={option.Variété_Id} value={option.Variété_Id}>
                <Checkbox  checked={previousSelection.includes(option.Variété_Id)} />
                <ListItemText primary={option.Variété_Lib} />
              </MenuItem>
            )}
            renderTags={(value, getTagProps) => null}
            disableCloseOnSelect
          /> 
      {showloadingPopup && (<div>Loading...</div>)}
      <SearchPopupVarieties openSeachVarities={openSeachVarities}
        handleCloseSearchVarieties={handleCloseSearchVarieties}
      />
    </FormControl>
  );
}