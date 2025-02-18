import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { UseFiltersStore } from '../../store/dashboardStore/FiltersStore';
import { Autocomplete } from '@mui/material';
import { TextField, CircularProgress } from '@mui/material';
import SearchPopupProduits from './SearchpopupProduits';
import "./commun.css";
export default function MultipleSelectProducts() {
  const { annonceurs, produits, Filterproduits, marques, setFilterproduit, Filterproduitsids } = UseFiltersStore((state) => state);
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState(Filterproduitsids);
  const [previousSelection, setPreviousSelection] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [openSearchPop, setOpenSearchPop] = useState(false)
  const [showloadingPopup, setShowloadingPopup] = useState(false)
  const handleCloseSearchPop = () => {
    //  setOpenSeachVarities(false)
    setOpenSearchPop(false)
  }
  const handelopenPopup = () => {
    setOpenSearchPop(true)

    setShowloadingPopup(true)
    setTimeout(() => {
      setShowloadingPopup(false)
    }, 3000);

   
  }
  useEffect(() => {
    setPreviousSelection(Filterproduitsids);
  
  }, [Filterproduitsids]);

  const handleSelectAll = () => {
    if (selectedItems.length === Filterproduits.length) {
      setSelectedItems([]);
      setFilterproduit && setFilterproduit([], [], annonceurs, marques);
    } else {
      setSelectedItems(Filterproduits.map((item) => item.Produit_Id));
      const ids = Filterproduits.map((item) => item.Produit_Id);
      setFilterproduit && setFilterproduit(ids, Filterproduits, annonceurs, marques);
    }
  };

  const handleAutocompleteChange = (event, value) => {
    setSelectedItems([...value.map((item) => item.Produit_Id)]);
    const ids = value.map((item) => item.Produit_Id);
    setFilterproduit && setFilterproduit(ids, value, annonceurs, marques);
  };

  const onInputChange = async (event, newInputValue) => {
    setInputValue(newInputValue);
    setLoading(true); // Start loading
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate a 500ms delay

    setLoading(false); 
  };

  const filteredElems = Filterproduits.filter((item) => {
    return item.Produit_Lib.toLowerCase().startsWith(inputValue.toLowerCase());
  }) 
  const isAllSelected = previousSelection.length === Filterproduits.length;

  return (
    <FormControl sx={{ m: 1, width: "100%" }}>
        <MenuItem onClick={handleSelectAll}>
          <Checkbox checked={isAllSelected} />
          <ListItemText primary="produits" />
        </MenuItem>
  
      <InputLabel id="demo-multiple-checkbox-label"></InputLabel>      
      <Autocomplete
       sx={{height:"40px"}}
        multiple
        freeSolo
        options={filteredElems}
        value={Filterproduits.filter((item) => previousSelection.includes(item.Produit_Id))}
        onChange={handleAutocompleteChange}
        getOptionLabel={(option) => option.Produit_Lib}
        inputValue={inputValue}
        onInputChange={onInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`produits (${previousSelection.length})`} 
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.Produit_Id} value={option.Produit_Id}>
            <Checkbox  checked={previousSelection.includes(option.Produit_Id)} />
            <ListItemText primary={option.Produit_Lib} />
          </MenuItem>
        )}
        renderTags={(value, getTagProps) => null}
        disableCloseOnSelect
      />
      <SearchPopupProduits 
       openSearchPop={openSearchPop}
       handleCloseSearchPop={handleCloseSearchPop}/>
    </FormControl>
  );
}