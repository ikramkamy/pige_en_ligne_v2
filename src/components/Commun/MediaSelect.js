import React, { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import Spinner from 'react-bootstrap/Spinner';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import { UsePigeDashboardStore } from 'store/dashboardStore/PigeDashboardStore';
import { UseVeilleStore } from 'store/dashboardStore/VeilleMediaStore';
import { UseLoginStore } from 'store/dashboardStore/useLoginStore';
import RadioIcon from '@mui/icons-material/Radio';
import { Button } from 'react-bootstrap';
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

export default function MultipleSelectMedia() {
  const { getUserPrevilege,
    usePrevilegesSupport_radio,
    usePrevilegeschainetv,
    usePrevilegesFamilles,
    usePrevilegesClasse,
    usePrevilegesSecteur,
    usePrevilegesVarietes,
    usePrevilegesProduit,
    usePrevilegesAnnonceurs,
    usePrevilegesMarques,
    userPrevilegesVeille,
    autorisePigePresse,
    autorisePigeRadio,
    autorisePigeTv,
    autoriseVeillePresse,
    autoriseVeilleRadio,
    autoriseVeilleTv,
    email,

  } = UseLoginStore((state) => state)
  const user_id = window.localStorage.getItem('user_id')
  const {
    setMediaValue, getFilters, ResetAllFilters,

    RestRadioTvData,
    setShowDataGridIfNotEmpty,
    setShowDataGrid,
    setDataTableShow,
    setLoadingshow,
    supports,
    media,

  } = UseFiltersStore((state) => state)
  const { ResetDataArrays } = UsePigeDashboardStore((state) => state)
  const { resetVeilletvdata } = UseVeilleStore((state) => state)
  const [selectedMedia, setSelectedMedia] = useState('')
  const [previousSelection, setPreviousSelection] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false)
 
  const media_array = [
    {
      label: "Presse",
      value: "presse",
      auth: autorisePigePresse,
    },
    {
      label: "Radio",
      value: "radio",
      auth: autorisePigeRadio,
    },
    {
      label: "Télèvision",
      value: "television",
      auth: autorisePigeTv,
    }
  ]
  const [mediaList, setMediaList] = useState(media_array.filter((elem) => elem.auth == true))
  useEffect(() => {
    
    ResetAllFilters && ResetAllFilters()
    setMediaValue && setMediaValue('')
    // if (location.hash.includes('/veille/veille_creations_publicitaires')) {
    //   var media_array = [
    //     {
    //       label: "Presse",
    //       value: "presse",
    //       auth: autoriseVeillePresse,
    //     },
    //     {
    //       label: "Radio",
    //       value: "radio",
    //       auth: autoriseVeilleRadio,
    //     },
    //     {
    //       label: "Télèvision",
    //       value: "television",
    //       auth: autoriseVeilleTv,
    //     }
    //   ]
    //   setMediaList(media_array.filter((elem) => elem.auth == true))
    // } else {
      // var media_array = [
      //   {
      //     label: "Presse",
      //     value: "presse",
      //     auth: autorisePigePresse,
      //   },
      //   {
      //     label: "Radio",
      //     value: "radio",
      //     auth: autorisePigeRadio,
      //   },
      //   {
      //     label: "Télèvision",
      //     value: "television",
      //     auth: autorisePigeTv,
      //   }
      // ]
      // setMediaList(media_array.filter((elem) => elem.auth == true))


    // }
    setMediaList(media_array.filter((elem) => elem.auth == true))
  }, [autorisePigeRadio,autorisePigePresse,autorisePigeTv])


  useEffect(() => {
    setShowSpinner(true)
    setShowSpinner(false)
  }, [media])

  const handleChange = (event) => {
    RestRadioTvData && RestRadioTvData();
    ResetDataArrays && ResetDataArrays();
    setShowDataGridIfNotEmpty && setShowDataGridIfNotEmpty(true)
    setShowDataGrid && setShowDataGrid(false)
    setDataTableShow && setDataTableShow(false)
    setLoadingshow && setLoadingshow(false)
    setSelectedMedia(event.target.value);
    resetVeilletvdata && resetVeilletvdata()
    var RangSelected = mediaList.filter((elem) => elem.label == event.target.value)
    var IdrangsSeclected = RangSelected.map((elem) => elem.value)
    setMediaValue && setMediaValue(IdrangsSeclected)
    ResetAllFilters && ResetAllFilters()
    //get previleges before getting filters
    const page = location.hash.split('/')[1]
    //console.log('page in media select', location.hash.split('/')[1])
    // getUserPrevilege && getUserPrevilege(user_id)
    // getFilters && getFilters(
    //   IdrangsSeclected[0],
    //   email,
    //   date1,
    //   date2,
    //   page
    // )
    ResetDataArrays && ResetDataArrays()
  };
  
  useEffect(() => {
    const prevSelection = mediaList.filter((elem) => elem.value == media)
    //console.log("media in media", prevSelection)
    setPreviousSelection(prevSelection);
  }, [media]);





  return (
    <div style={{ position: "relative" }}>
      <FormControl sx={{
        m: 0,
        width: 150,
        marginRight: { xs: 0, sm: "10px" }
      }} >
        {/* <Button onClick={handelgetFilters}>tester</Button> */}
        <InputLabel id="demo-multiple-checkbox-label"
          sx={{
            //bottom: "10px",
            color: "#020b42",
            position:"absolute",
            top:"-10px",
            '&.Mui-focused': {
              color: 'transparent',
              display:"none"
            },
          }}  >

          Media
        </InputLabel>
        <Select
          sx={{
            backgroundColor: "white", height: "40px",
            display: "flex", justifyContent: "center", alignItems: "cenetr"

          }}
          defaultValue={media}
          labelId="demo-multiple-checkbox-label"
          value={previousSelection.map((e) => e.label)}
          onChange={handleChange}
          input={<OutlinedInput label="Media" />}
          renderValue={(selected) => selected}

          MenuProps={MenuProps}>

          {mediaList.map((elem) => (
            <MenuItem key={elem.value} value={elem.label} sx={{ width: "100%" }}>
              <Radio checked={previousSelection.indexOf(elem.label) > -1} />
              <ListItemText primary={elem.label} />
            </MenuItem>
          ))}
        </Select>


      </FormControl>
      {showSpinner && (
        <Spinner animation="border" color='primary'
          role="status" style={{ position: "absolute", top: "20%", left: "0%" }}>
          <span className="visually-hidden">en cours...</span>
        </Spinner>)}

    </div>
  );
}
