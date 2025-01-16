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
    console.log("openSearchPop",openSearchPop)
    setShowloadingPopup(true)
    setTimeout(() => {
      setShowloadingPopup(false)
    }, 3000);

   
  }
  useEffect(() => {
    setPreviousSelection(Filterproduitsids);
    console.log("Filterproduitsids.slice(0,50)",Filterproduitsids)
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

    // Simulate a delay for loading (e.g., fetching data)
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate a 500ms delay

    setLoading(false); // End loading
  };

  // // Filter products based on input value
  // const filteredElems = inputValue.length > 0 ? Filterproduits.filter((item) => {
  //   return item.Produit_Lib.toLowerCase().startsWith(inputValue.toLowerCase());
  // }) : [];
  // Filter products based on input value
  const filteredElems = Filterproduits.filter((item) => {
    return item.Produit_Lib.toLowerCase().startsWith(inputValue.toLowerCase());
  }) 
  const isAllSelected = previousSelection.length === Filterproduits.length;
  console.log("isAllSelected",isAllSelected,previousSelection,Filterproduits)
  return (
    <FormControl sx={{ m: 1, width: "100%" }}>
      {/* Custom Select All option */}
      <div style={{ marginTop: 10, }} onClick={handelopenPopup}>
        <MenuItem onClick={handleSelectAll}>
          <Checkbox checked={isAllSelected} />
          <ListItemText primary="produits" />
        </MenuItem>
      </div>
      <InputLabel id="demo-multiple-checkbox-label"></InputLabel>
      {/* <Button
              sx={{
                textTransform: 'none',
                width: '100%',
                height: "55px",
                //marginTop: '10px',
                padding: '10px 12px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                //backgroundColor: '#fff', 

                '&:hover': {
                  backgroundColor: '#f4f6f8',
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              //disabled={!disablebtn}
              // startIcon={showloadingPopup ? <CircularProgress size={20} color="red" /> : null}
            >
              produits {previousSelection.length}
            </Button> */}
          
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
            label={`Produits (${previousSelection.length})`} 
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