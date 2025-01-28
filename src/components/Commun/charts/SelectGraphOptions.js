import React, { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { UseGraphStore } from 'store/GraphStore';
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

export default function SelectGraphOptions({ options }) {
    const { setAnnonceursOptions } = UseGraphStore((state) => state)
    const optionList = options.map((e) => e.name.split(' ')[0])
    //console.log("optionList",optionList)
    const [selectedItems, setSelectedItems] = useState('')
    const [selectedList,setSelectedList]=useState(options.slice(0,5))
    useEffect(() => {
        setSelectedItems(optionList.slice(0, 5))
    }, [options])
    const handleChange = (event, value) => {
        var selected = event.target.value
        if (selectedItems.indexOf(selected) === -1) {
            if (selectedItems.length === 5) {
                const newSelectedItems = [...selectedItems.slice(1), selected];
                setSelectedItems(newSelectedItems);
            } else {
                setSelectedItems([...selectedItems, selected]);
            }
        } else {
            setSelectedItems(selectedItems.filter((item) => item !== selected));
        }   
        setSelectedList(options.filter((e)=> selectedItems.includes(e.name.split(" ")[0])))        
    };
    useEffect(()=>{
        setAnnonceursOptions && setAnnonceursOptions(selectedList)
    },[selectedList])
    //console.log("selected", selectedItems)
    console.log("selected list", selectedList)
    return (
        <div>
            <FormControl
                sx={{
                    m: 0,
                    width: 150,
                    marginRight: { xs: 0, sm: "10px" }
                }}>
                <Select

                    labelId="demo-multiple-checkbox-label"
                    value="top 5 annonceurs"
                    onChange={handleChange}
                    input={<OutlinedInput label="top 5 annonceurs" />}
                    renderValue={(selected) => selected}
                    MenuProps={MenuProps}
                    sx={{ backgroundColor: "white", height: "40px" }}
                >
                    {optionList.map((elem) => (
                        <MenuItem key={elem} value={elem} >
                            <Checkbox checked={selectedItems.indexOf(elem) > -1} />
                            <ListItemText primary={elem}
                            />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
