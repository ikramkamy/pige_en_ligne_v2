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
export default function MultipleSelectVarieties() {
  const { Filtervarieties, produits, setFiltervariete, 
    annonceurs, marques, Filtervarietiesids } = UseFiltersStore((state) => state);
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [previousSelection, setPreviousSelection] = useState([]);


  const filteredElems = inputValue.length > 0 ? Filtervarieties.filter((item) => {
    return item.Variete_Lib.toLowerCase().startsWith(inputValue.toLowerCase());
  }) : [];
  // const filteredElems =Filtervarieties.filter((item) => {
  //   return item.Variete_Lib.toLowerCase().startsWith(inputValue.toLowerCase());
  // })

  useEffect(() => {
    setPreviousSelection(Filtervarietiesids);
  }, [Filtervarietiesids]);

  const handleSelectAll = () => {
    if (selectedItems.length === filteredElems.length) {
      setSelectedItems([]);
      setFiltervariete && setFiltervariete([], produits, annonceurs, marques);
    } else {
      setSelectedItems(filteredElems.map((item) => item.Variete_id));
      const ids = filteredElems.map((item) => item.Variete_id);
      setFiltervariete && setFiltervariete(ids, produits, annonceurs, marques);
      console.log("varieties filter", ids);
    }
  };
  console.log('Filtervarietiesids', Filtervarietiesids)
  const handleAutocompleteChange = (event, value) => {
    setSelectedItems([...value.map((item) => item.Variete_id)]);
    const ids = value.map((item) => item.Variete_id);
    setFiltervariete && setFiltervariete(ids, produits, annonceurs, marques);
  };

  const onInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const isAllSelected = selectedItems.length === filteredElems.length;
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
      <div onClick={handelopenPopup}>
        {/* Custom Select All option */}
        <div style={{ marginTop: 10, }}>
          <MenuItem onClick={handleSelectAll}>
            <Checkbox checked={isAllSelected} />
            <ListItemText primary="variétés" />
          </MenuItem>
        </div>
        <InputLabel id="demo-multiple-checkbox-label"></InputLabel>

        {/* {Filtervarietiesids.length === 0 && <Alert severity="error" width="5px"
        sx={{ fontSize: "10px", padding: '0px' }}>
        aucune variété n'est sélectionnée
      </Alert>} */}
        {!showloadingPopup && (
          <Box display="flex" alignItems="center" sx={{
            padding: "0px", height: "52px"
          }}>
            <Button
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
              startIcon={showloadingPopup ? <CircularProgress size={20} color="red" /> : null}
            >
              Variétés {Filtervarietiesids.length}
            </Button>
            {showloadingPopup && (
              <CheckCircleIcon
                style={{ color: 'green', marginLeft: '10px' }}
              />
            )}
          </Box>
          //   <Autocomplete 
          //   multiple
          //   freeSolo
          //   options={filteredElems}
          //   disabled={showloadingPopup}
          //   value={Filtervarieties.filter((item) => previousSelection.includes(item.Variete_id))}
          //   onChange={handleAutocompleteChange}
          //   getOptionLabel={(option) => option.Variete_Lib}
          //   inputValue={inputValue}
          //   onInputChange={onInputChange}
          //   renderInput={(params) => (
          //     <TextField
          //       {...params}
          //       label={`Variétés (${previousSelection.length})`} // Display the count of selected items
          //       variant="outlined"
          //     />
          //   )}
          //   renderOption={(props, option) => (
          //     <MenuItem {...props} key={option.Variete_id} value={option.Variete_id}>
          //       <Checkbox defaultChecked checked={previousSelection.includes(option.Variete_id)} />
          //       <ListItemText primary={option.Variete_Lib} />
          //     </MenuItem>
          //   )}
          //   renderTags={(value, getTagProps) => null}
          //   disableCloseOnSelect
          // />
        )}


      </div>
      {showloadingPopup && (<div>Loading...</div>)}
      <SearchPopupVarieties openSeachVarities={openSeachVarities}
        handleCloseSearchVarieties={handleCloseSearchVarieties}
      />
    </FormControl>
  );
}