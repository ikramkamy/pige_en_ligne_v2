import React, { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
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

export default function MultipleSelectBase() {
  const { media, setBase, base } = UseFiltersStore((state) => state)
  const [previousSelection, setPreviousSelection] = useState([]);
  const [selectedBase, setSelectedBase] = useState('')
  const [bases, setBases] = useState([
    {
      label: "volume",
      value: "volume"
    },
    {
      label: "Durée",
      value: "duree"
    },
    {
      label: "budget",
      value: "budget"
    }
  ])
  useEffect(() => {

    if (media === 'presse') {
      setBases([
        {
          label: "volume",
          value: "volume"
        },
        {
          label: "budget",
          value: "budget"
        }

      ])
    } else {
      setBases([
        {
          label: "volume",
          value: "volume"
        },
        {
          label: "durée",
          value: "duree"
        },
        {
          label: "budget",
          value: "budget"
        }
      ])
    }

  }, [media])
  const handleChange = (event) => {
    setSelectedBase(event.target.value);
    var RangSelected = bases.filter((elem) => elem.label == event.target.value)
    var IdrangsSeclected = RangSelected.map((elem) => elem.value)
    setBase && setBase(IdrangsSeclected[0])


  };
  useEffect(() => {

    const prevSelection = bases.filter((elem) => elem.value == base)
    console.log("base in base", prevSelection)
    setPreviousSelection(prevSelection);
  }, [base]);
  return (
    <div>
      <FormControl
        sx={{
          m: 0,
          width: 150,
          marginRight: { xs: 0, sm: "10px" }
        }}>
        <InputLabel id="demo-multiple-checkbox-label"
          sx={{
            bottom: "15px",
            color: "black",
            '&.Mui-focused': {
              color: 'transparent',
            },
          }}>Base</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          value={previousSelection.map((e) => e.label)}
          onChange={handleChange}
          input={<OutlinedInput label="Volume" />}
          renderValue={(selected) => selected}
          MenuProps={MenuProps}
          sx={{ backgroundColor: "white", height: "50px" }}
        >
          {bases.map((elem) => (
            <MenuItem key={elem.value} value={elem.label} >
              <Radio checked={previousSelection.indexOf(elem.label) > -1} />
              <ListItemText primary={elem.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
