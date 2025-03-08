import React, { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import NetworkErrorPopup from 'components/Commun/popups/NetworkErrorPopup'
import Radio from '@mui/material/Radio';
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

export default function MultipleSelectBase() {
  const { media, setBase, base, date1, date2 } = UseFiltersStore((state) => state)
  const { ResetBasedeCalucule } = UsePigeDashboardStore((state) => state)
  const [previousSelection, setPreviousSelection] = useState([]);
  const [selectedBase, setSelectedBase] = useState('')
  const [open, setOpen] = useState(false)
  function isDateInRange(date1, startDate, endDate) {
    // Helper function to parse a date string (YYYY-MM-DD) into a Date object
    const parseDate = (dateStr) => {
      const [year, month, day] = dateStr.split('-').map(Number);
      return new Date(year, month - 1, day); // Month is 0-indexed in JavaScript
    };
 // Parse all dates
    const d1 = parseDate(date1);
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    // Check if date1 is within the range [startDate, endDate]
    return d1 >= start && d1 <= end;
  }

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
  const isdate1inRamdan = isDateInRange(date1, "2025-03-01", "2025-03-31")
  const isdate2inRamdan = isDateInRange(date2, "2025-03-01", "2025-03-31")
  const checkMedialis = () => {

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
    }
    else {
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
  }
  useEffect(() => {
    checkMedialis()
  }, [media, isdate1inRamdan, isdate2inRamdan])

  const handleChange = (event) => {
    setSelectedBase(event.target.value);
    var RangSelected = bases.filter((elem) => elem.label == event.target.value)
    var IdrangsSeclected = RangSelected.map((elem) => elem.value)
    if (media && (IdrangsSeclected[0] == "budget") && (isdate1inRamdan || isdate2inRamdan)) {
      setOpen(true)
      ResetBasedeCalucule && ResetBasedeCalucule()
      setBase && setBase("")
    } 
    else if ((IdrangsSeclected[0]!=="budget")  ||  (!isdate1inRamdan && !isdate2inRamdan)) {
      setBase && setBase(IdrangsSeclected[0])
    }
    // console.log("condition",IdrangsSeclected[0]!=="budget")
  };
  useEffect(() => {
    // console.log('selectedBase',selectedBase)
    if (media && (selectedBase == "budget") && (isdate1inRamdan || isdate2inRamdan)) {
      setOpen(true)
      ResetBasedeCalucule && ResetBasedeCalucule()
    } else {
      const prevSelection = bases.filter((elem) => elem.value == base)
      setPreviousSelection(prevSelection);
    }
  }, [base, media, date1,date2]);

  const HandeErrorFetchFiletrs = () => {
    setOpen(false)
    ResetBasedeCalucule && ResetBasedeCalucule() 
  }
  // console.log("base", base)
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
            top: "-10px",
            color: "#020b42",
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
          sx={{ backgroundColor: "white", height: "40px" }}
        >
          {bases.map((elem) => (
            <MenuItem key={elem.value} value={elem.label} >
              <Radio checked={previousSelection.indexOf(elem.label) > -1} />
              <ListItemText primary={elem.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <NetworkErrorPopup
        OpenNetworkPopup={open}
        handleCloseNetworkPopup={HandeErrorFetchFiletrs}
        message="Les tarifs du mois de Ramadan 2025 ne sont pas encore appliqués"
      />
    </div>
  );
}
