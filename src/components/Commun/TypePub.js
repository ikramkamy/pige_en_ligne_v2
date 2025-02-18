import React, { useState } from 'react';
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
import RadioIcon from '@mui/icons-material/Radio';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import './commun.css'
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

export default function TypePub() {
  const { setTypeVeilleValue, getFilters, ResetAllFilters } = UseFiltersStore((state) => state)
  const { ResetDataArrays } = UsePigeDashboardStore((state) => state)

  const [selectedtypeveille, setSelectedtypeveille] = useState('Tous')
  const [mediaList, setMediaList] = useState([
    {
      label: "Tous",
      value: ""
    },
    {
      label: "PUB",
      value: "autre"
    },
    {
      label: "Sponsoring",
      value: "BIL"
    },
  ])

  const handleChange = (event) => {
    setSelectedtypeveille(event.target.value);
    var RangSelected = mediaList.filter((elem) => elem.label == event.target.value)
    var IdrangsSeclected = RangSelected.map((elem) => elem.value)
    setTypeVeilleValue && setTypeVeilleValue(IdrangsSeclected)
    //ResetAllFilters && ResetAllFilters()
    //getFilters && getFilters(event.target.value)
    //ResetDataArrays && ResetDataArrays()

  };
  return (

    <FormControl sx={{
      m: 1,
      width: "100%",
      marginTop: "17px"
    }}>

      <MenuItem >
        <Checkbox defaultChecked />
        <ListItemText primary="type" />
      </MenuItem>


      <Select
        sx={{ height: "40px" }}
        labelId="demo-multiple-checkbox-label"
        value={selectedtypeveille}
        onChange={handleChange}
        input={<OutlinedInput label="type" />}
        renderValue={(selected) => selected}
        MenuProps={MenuProps}
      >

        {mediaList.map((elem) => (
          <MenuItem key={elem.value} value={elem.label} >
            <Radio checked={selectedtypeveille.indexOf(elem.label) > -1} />
            <ListItemText primary={elem.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>

  );
}
