import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import { UseMediaDashboardStore } from 'store/dashboardStore/MediaDashboardStore';

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

export default function MultipleSelectRangs() {
  const { setRangFilter, media } = UseFiltersStore((state) => state);
  const { FilterDataMediaByrangs, MediaData } = UseMediaDashboardStore((state) => state);

  const [selectedRang, setSelectedRang] = useState([]);
  const [rangs, setRangs] = useState([
    { label: "Ouverture 1er rang", value: 1 },
    { label: "Ouverture 2ème rang", value: 2 },
    { label: "Fermeture dernier", value: 3 },
    { label: "Fermeture avant dernier", value: 4 },
    { label: "autre", value: 5 },
  ]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedRang(value);

    // Get the selected rang IDs
    const IdrangsSeclected = rangs.filter((elem) => value.includes(elem.label));
    const Ids = IdrangsSeclected.map((elem) => elem.value);
    console.log("ids rang",Ids)
    
    setRangFilter && setRangFilter(Ids);
    FilterDataMediaByrangs(Ids, MediaData, media);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="demo-multiple-checkbox-label">Rangs</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          value={selectedRang}
          onChange={handleChange}
          input={<OutlinedInput label="Rangs" />}
          renderValue={(selected) => `${selected.length}`} // Show number of selected items
          MenuProps={MenuProps}
          multiple
        >
          {rangs.map((elem) => (
            <MenuItem key={elem.value} value={elem.label}>
              <Checkbox checked={selectedRang.indexOf(elem.label) > -1} />
              <ListItemText primary={elem.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}