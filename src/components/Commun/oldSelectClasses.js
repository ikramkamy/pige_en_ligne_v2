import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Autocomplete} from '@mui/material';
import { UseFiltersStore } from '../../store/dashboardStore/FiltersStore';
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

export default function MultipleSelectClasses() {

  const [selectedItems, setSelectedItems]=React.useState([])
  const {media,classes}=UseFiltersStore((state)=>state)

  React.useEffect(()=>{
    const codes = classes.map((elem) => elem.Groupe_Id);
    setSelectedItems(codes);
  },[media])


const handleChange = (event) => {
    console.log('event', event)
    const {
      target: { value },
    } = event;
  setSelectedItems(typeof value === 'string' ? value.split(',') : value,)
  
  };
const handelselectAll=(selected)=>{
  
  if(selected.target.checked){
    // console.log("selected", selected.target.checked)
    const codes = classes.map((elem) => elem.Groupe_Id);
    setSelectedItems(codes);
  }else{
    setSelectedItems([])
  }
}

const handelRenderValue=(selected)=>{
  selected.join(',')
  const elemSelected=classes.filter((elem)=> selected.includes( elem.Groupe_Id))
  // console.log("elemSelected", elemSelected)
  const Names= elemSelected.map((elem) => elem.Groupe_Lib);
 

  if (selected.length > 2){
    return ( selected.length + "  Classes Selectionnées")
  }else{
    return Names.join(',')
  }
  
 }

const filterOptions = (options, { inputValue }) => {
    return options.filter((option) => option.Groupe_Lib.toLowerCase().startsWith(inputValue.toLowerCase()));
  };
  return (
    <div>
     <FormControl sx={{ m: 1, width: 300 }}>
  <InputLabel id="demo-multiple-checkbox-label">Classes</InputLabel>

      
  <Select
    labelId="demo-multiple-checkbox-label"
    id="demo-multiple-checkbox"
    multiple
    value={selectedItems}
    onChange={(handleChange)}
    input={<OutlinedInput label="Classes" />}
    renderValue={(selected) => handelRenderValue(selected)}
    MenuProps={MenuProps}

  >
    <MenuItem>
      <Checkbox
        
        checked={selectedItems.length === classes.length}
        onChange={(selected)=>handelselectAll(selected)}
      />
      <ListItemText primary="Select all" />
    </MenuItem>
    {classes.map((item) => (
      <MenuItem key={item.id} value={item.Groupe_Id} label={item.Groupe_Lib}>
        <Checkbox checked={selectedItems.indexOf(item.Groupe_Id) > -1} />
        <ListItemText primary={item.Groupe_Lib} />
      </MenuItem>
    ))}

  </Select>


</FormControl>
    </div>
  );
}


import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Checkbox, ListItemText, OutlinedInput, TextField, Autocomplete } from '@mui/material';
import { UseFiltersStore } from '../../store/dashboardStore/FiltersStore';

const MultipleSelectSupports = () => {
  const { media, classes, supports } = UseFiltersStore((state) => state);
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

const filteredClasses = classes.filter((item) =>
 
{

  return (item.Groupe_Lib.toLowerCase().startsWith(inputValue.toLowerCase()));
}
  );


const handleSelectAll = () => {
    if (selectedItems.length === filteredClasses.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredClasses.map((item) => item.Groupe_Id));
    }
  };

  const isAllSelected = selectedItems.length === filteredClasses.length;

  const handleAutocompleteChange = (event, value) => {
    console.log('value autocomplete', value)
    //setSelectedItems(value.map((item) => item.Groupe_Id));
    setSelectedItems([...value.map((item) => item.Groupe_Id)]);
  };
// const totalselection=[...selectedItems, ]
  const onInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-checkbox-label"></InputLabel>
     
      <Autocomplete
        multiple
        freeSolo
        options={filteredClasses}
        //value={filteredClasses.filter((item) => selectedItems.includes(item.Groupe_Id))}
        value={classes.filter((item) => selectedItems.includes(item.Groupe_Id))}
        onChange={handleAutocompleteChange}
        getOptionLabel={(option) => option.Groupe_Lib}
        inputValue={inputValue}
        onInputChange={onInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Supports"
            variant="outlined"
          />
          
        )}
        
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.Groupe_Id} value={option.Groupe_Id}>
            <Checkbox checked={selectedItems.includes(option.Groupe_Id)} />
            <ListItemText primary={option.Groupe_Lib} />
          </MenuItem>
        )}
      />
      
      {/* Custom Select All option */}
      <div style={{ marginTop: 10 }}>
        <MenuItem onClick={handleSelectAll}>
          <Checkbox checked={isAllSelected} />
          <ListItemText primary="Select all" />
        </MenuItem>
      </div>
    </FormControl>
  );
};

export default MultipleSelectSupports;



//old famille component 
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { UseFiltersStore } from '../../store/dashboardStore/FiltersStore';
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

export default function MultipleSelectCheckmarks() {

  const [selectedFamille, setSelectedFamille]=React.useState([])
  const {familles,media}=UseFiltersStore((state)=>state)
  React.useEffect(()=>{
    const codeFamilles = familles.map((famille) => famille.CodeFamille);
    setSelectedFamille(codeFamilles);
    console.log("media", media)
  },[media])
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
  setSelectedFamille(typeof value === 'string' ? value.split(',') : value,)
  
  };
const handelselectAll=(selected)=>{
  
  if(selected.target.checked){
    // console.log("selected", selected.target.checked)
    const codeFamilles = familles.map((famille) => famille.CodeFamille);
    
       setSelectedFamille(codeFamilles);
  }else{
    setSelectedFamille([])
  }
}
const handelRenderValue=(selected)=>{
  selected.join(',')
  
  const elemSelected=familles.filter((elem)=> selected.includes( elem.CodeFamille))
  // console.log("elemSelected", elemSelected)
  const FamillesNames= elemSelected.map((elem) => elem.Famille);
  // console.log("elemSelected names", FamillesNames)

  if (selected.length > 2){
    return ( selected.length + "  Familles Selectionnées")
  }else{
    return FamillesNames.join(',')
  }
  
 }
  return (
    <div>
     <FormControl sx={{ m: 1, width: 300 }}>
  <InputLabel id="demo-multiple-checkbox-label">Famille </InputLabel>
  <Select
    labelId="demo-multiple-checkbox-label"
    id="demo-multiple-checkbox"
    multiple
    value={selectedFamille}
    onChange={(handleChange)}
    input={<OutlinedInput label="Famille" />}
    renderValue={(selected) => handelRenderValue(selected)}
    MenuProps={MenuProps}
  >
    <MenuItem>
      <Checkbox
        
        checked={selectedFamille.length === familles.length}
        onChange={(selected)=>handelselectAll(selected)}
      />
      <ListItemText primary="Select all" />
    </MenuItem>
    {familles.map((item) => (
      <MenuItem key={item.id} value={item.CodeFamille} label={item.Famille}>
        <Checkbox checked={selectedFamille.indexOf(item.CodeFamille) > -1} />
        <ListItemText primary={item.Famille} />
      </MenuItem>
    ))}
  </Select>
</FormControl>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import isEqual from "lodash/isEqual";
import debounce from "lodash/debounce";
import {
  Autocomplete,
  Checkbox,
  Grid,
  FormControlLabel,
  TextField
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";

import { UseFiltersStore } from "../../store/dashboardStore/FiltersStore";









const MultipleSelectSecteurs = ({ items, selectAllLabel, }) => {

const initialValue = [{ label: "Uber/Sales", value: "14" }];
console.log("items", items)
  const {secteurs}=UseFiltersStore((state)=>state)
  console.log("secteurs",secteurs)
    const getTextBoxInputValue = (input) => {
        return input.map((itm) => itm.label).join(";");
      };
    
      const [currentSelection, setCurrentSelection] = useState(
        getTextBoxInputValue(initialValue)
      );
    
      
   
  
    const handleSelectionChange = (result) => {
        const valueToSave = result.map((itm) => itm.label).join(";");
        setCurrentSelection(valueToSave);
      };
      
  const [selectedOptions, setSelectedOptions] = useState(initialValue);
  const [filteredOptions, setFilteredOptions] = useState(null);
  const multiSelectRef = useRef(null);

  useEffect(() => {
    handleSelectionChange(selectedOptions);
  }, [selectedOptions]);

  const handleToggleOption = (selectedOptions) =>
    setSelectedOptions(selectedOptions);
  const handleClearOptions = () => setSelectedOptions([]);
  const getOptionLabel = (option) => `${option.Categorie_Lib}`;

  const allItemsSelected = () => {
    // if options are filtered, check to see if all filtered options are in selected items
    // if yes, selectAll - true, else selectAll - false
    // if options are not filtered, check to see if all items are selected or not
    if (filteredOptions?.length !== items.length) {
      const excludedFilteredOptions = filteredOptions?.filter(
        (opt) => !selectedOptions.find((selOpt) => selOpt.label === opt.label)
      );
      if (excludedFilteredOptions?.length > 0) {
        return false;
      }
      return true;
    }
    const allSelected =
      items.length > 0 && items.length === selectedOptions.length;
      console.log('allSelected',allSelected)
    return allSelected;
  };

  const clearSelected = (selOptions) => {
    // filter out the selOptions
    if (selOptions.length > 0) {
      setSelectedOptions(
        selectedOptions.filter(
          (item) =>
            !selOptions.find((selOption) => selOption.label === item.label)
        )
      );
    } else {
      setSelectedOptions([]);
    }
  };

  const handleSelectAll = (isSelected) => {
    let selectedList = [];
    if (
      filteredOptions?.length > 0 &&
      filteredOptions.length !== items.length
    ) {
      selectedList = items.filter((item) =>
        filteredOptions.find(
          (filteredOption) => filteredOption.label === item.label
        )
      );
    }
    if (isSelected) {
      if (selectedList.length > 0) {
        setSelectedOptions([...selectedOptions, ...selectedList]);
      } else {
        setSelectedOptions(items);
      }
    } else {
      clearSelected(selectedList);
    }
  };

  const handleToggleSelectAll = () => {
    handleSelectAll(!allItemsSelected());
  };

  const handleChange = (event, selectedOptions, reason) => {
    let result = null;
    if (reason === "clear") {
      handleClearOptions();
    } else if (reason === "selectOption" || reason === "removeOption") {
      if (selectedOptions.find((option) => option.value === "select-all")) {
        handleToggleSelectAll();
        // let result = [];
        result = items.filter((el) => el.value !== "select-all");
        // onChange(result);
      } else {
        handleToggleOption(selectedOptions);
        result = selectedOptions;
        // onChange(selectedOptions);
      }
    }
  };

  const handleCheckboxChange = (e, option) => {
    if (option.value === "select-all") {
      handleToggleSelectAll();
      // if (e.target.checked) {
      //     // onChange(items);
      // } else {
      //     // onChange([]);
      // }
    } else if (e.target.checked) {
      const result = [...selectedOptions, option];
      setSelectedOptions(result);
      // onChange(result);
    } else {
      const result = selectedOptions.filter(
        (selOption) => selOption.value !== option.value
      );
      setSelectedOptions(result);
      // onChange(result);
    }
  };

  const optionRenderer = (props, option, { selected }) => {
    const selectAllProps =
      option.value === "select-all" // To control the state of 'select-all' checkbox
        ? { checked: allItemsSelected() }
        : {};
    return (
      <Grid container key={option.Categorie_Id}>
        <Grid item xs={12} sx={{ pl: 1, pr: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                key={option.Categorie_Id}
                checked={selected}
                onChange={(e) => handleCheckboxChange(e, option)}
                {...selectAllProps}
                sx={{ mr: 1 }}
              />
            }
            label={getOptionLabel(option)}
            key={option.Categorie_Lib}
          />
        </Grid>
      </Grid>
    );
  };

  const debouncedStateValue = debounce((newVal) => {
    // console.log(isEqual(newVal, filteredOptions));
    if (newVal && !isEqual(newVal, filteredOptions)) {
      // console.log('setting filtered options');
      setFilteredOptions(newVal);
    }
  }, 1000);

  const updateFilteredOptions = (filtered) => {
    debouncedStateValue(filtered);
  };

  const inputRenderer = (params) => <TextField {...params} />;

  const filter = createFilterOptions();

  return (
    <Autocomplete
      ref={multiSelectRef}
      sx={{
        width: "350px",
        maxHeight: "120px",
        overflowY: "scroll"
      }}
      multiple
      size="small"
      options={items}
      value={selectedOptions}
      disableCloseOnSelect
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={(option, val) => option.value === val.value}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        updateFilteredOptions(filtered);
        return [{ label: selectAllLabel, value: "select-all" }, ...filtered];
      }}
      onChange={handleChange}
      renderOption={optionRenderer}
      renderInput={inputRenderer}
    />
  );
};

export default MultipleSelectSecteurs;