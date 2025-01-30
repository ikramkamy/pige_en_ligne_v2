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

export function SelectGraphOptions({ options, UpdatedGraphDisplay }) {
    const { setAnnonceursOptions, AnnonceursOptions } = UseGraphStore((state) => state);
    const optionList = options.map((e) => e.name.split(' ')[0]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedList, setSelectedList] = useState(options.slice(0, 5));

    useEffect(() => {
        setSelectedItems(optionList.slice(0, 5));
    }, [options]);

    const handleChange = (event) => {
        const selected = event.target.value;
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(selected)) {
                return prevSelectedItems.filter((item) => item !== selected);
            } else {
                if (prevSelectedItems.length >= 5) {
                    return [...prevSelectedItems.slice(1), selected];
                } else {
                    return [...prevSelectedItems, selected];
                }
            }
        });

    };
    useEffect(() => {
        const newSelectedList = options.filter((e) =>
            selectedItems.includes(e.name.split(" ")[0])
        );
        setSelectedList(newSelectedList);
        setAnnonceursOptions && setAnnonceursOptions(newSelectedList);
    }, [selectedItems, options, setAnnonceursOptions]);
    useEffect(() => {
        UpdatedGraphDisplay()
    }, [selectedList])
    return (
        <div>
            <FormControl
                sx={{
                    m: 0,
                    width: 150,
                    marginRight: { xs: 0, sm: "0px" }
                }}>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    value={selectedItems}
                    onChange={handleChange}
                    input={<OutlinedInput label="top 5 annonceurs" />}

                    renderValue={() => `Top ${selectedItems.length} Format`}
                    MenuProps={MenuProps}
                    sx={{ backgroundColor: "white", height: "40px" }}
                >
                    {optionList.map((elem) => (
                        <MenuItem key={elem} value={elem}>
                            <Checkbox checked={selectedItems.includes(elem)} />
                            <ListItemText primary={elem} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
export function SelectGraphOptionsMarche({ options, UpdatedGraphDisplay }) {
    const { MarcheOptions,
        setMarcheOptions } = UseGraphStore((state) => state);
    const optionList = options.map((e) => e.name.split('-')[0]);
    const [selectedItems, setSelectedItems] = useState([]);  
    const [selectedList, setSelectedList] = useState(options.slice(0,5));
   
    useEffect(() => {
        setSelectedItems(optionList.slice(0,5));
    }, [options]);
    
    const handleChange = (event) => {
        const selected = event.target.value;
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(selected)) {
                return prevSelectedItems.filter((item) => item !== selected);
            } else {
                if (prevSelectedItems.length >= 5) {
                    return [...prevSelectedItems.slice(1), selected];
                } else {
                    return [...prevSelectedItems, selected];
                }
            }
        });

    };
    useEffect(() => {
        const newSelectedList = options.filter((e) =>
            selectedItems.includes(e.name.split("-")[0])
        );
        setSelectedList(newSelectedList);
        setMarcheOptions && setMarcheOptions(newSelectedList);
    }, [selectedItems, options, setMarcheOptions]);
    useEffect(() => {
        UpdatedGraphDisplay()
    }, [selectedList])
    return (
        <div>
            <FormControl
                sx={{
                    m: 0,
                    width: 150,
                    marginRight: { xs: 0, sm: "0px" }
                }}>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    value={selectedItems}
                    onChange={handleChange}
                    input={<OutlinedInput label="top 5 annonceurs" />}

                    renderValue={() => `Top ${selectedItems.length} Marché`}
                    MenuProps={MenuProps}
                    sx={{ backgroundColor: "white", height: "40px" }}
                >
                    {optionList.map((elem) => (
                        <MenuItem key={optionList.indexOf(elem)} value={elem}>
                            <Checkbox checked={selectedItems.includes(elem)} />
                            <ListItemText primary={elem} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
export function SelectGraphOptionsAnnonceurParsupport({ options, UpdatedGraphDisplay,media }) {
    const {setAnnonceurSupportOptions,AnnonceurSupportOptions} = UseGraphStore((state) => state);
    let optionList=[]
    if(media!=="presse"){
        optionList = options.map((e) => e.Chaine_Lib);
    }else{
       optionList = options.map((e) => e.Titre_Lib);
    }
   
    const [selectedItems, setSelectedItems] = useState([]);  
    const [selectedList, setSelectedList] = useState(options.slice(0,5)); 
    // console.log('options',options)

    useEffect(() => {
        setSelectedItems(optionList.slice(0,5));
    }, [options]);
    
    const handleChange = (event) => {
        const selected = event.target.value;
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(selected)) {
                return prevSelectedItems.filter((item) => item !== selected);
            } else {
                if (prevSelectedItems.length >= 5) {
                    return [...prevSelectedItems.slice(1), selected];
                } else {
                    return [...prevSelectedItems, selected];
                }
            }
        });

    };
    useEffect(() => {
        if(media==="presse"){
            const newSelectedList = options.filter((e) =>
                selectedItems.includes(e.Titre_Lib)
            ); 
               // console.log("newSelectedList",newSelectedList)
        setSelectedList(newSelectedList);
        setAnnonceurSupportOptions && setAnnonceurSupportOptions(newSelectedList); 
        console.log("newSelectedList",newSelectedList) 
        }else{
            const newSelectedList = options.filter((e) =>
                selectedItems.includes(e.Chaine_Lib)
            ); 
               // console.log("newSelectedList",newSelectedList)
        setSelectedList(newSelectedList);
        setAnnonceurSupportOptions && setAnnonceurSupportOptions(newSelectedList);
        }
        
    }, [selectedItems, options, setAnnonceurSupportOptions]);
    useEffect(() => {
        UpdatedGraphDisplay()
    }, [selectedList])


    return (
        <div>
            <FormControl
                sx={{
                    m: 0,
                    width: 150,
                    marginRight: { xs: 0, sm: "0px" }
                }}>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    value={selectedItems}
                    onChange={handleChange}
                    input={<OutlinedInput label="top 5 annonceurs" />}

                    renderValue={() => `Top ${selectedItems.length} annonceurs`}
                    MenuProps={MenuProps}
                    sx={{ backgroundColor: "white", height: "40px" }}
                >
                    {optionList.map((elem) => (
                        <MenuItem key={optionList.indexOf(elem)} value={elem}>
                            <Checkbox checked={selectedItems.includes(elem)} />
                            <ListItemText primary={elem} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
export function SelectGraphOptionsCreationParAnnonceur({ options, UpdatedGraphDisplay }) {
    const {setCreationParAnnonceurOptions,} = UseGraphStore((state) => state);
    const optionList = options.map((e) => e.Annonceur_Nom);
    const [selectedItems, setSelectedItems] = useState([]);  
    const [selectedList, setSelectedList] = useState(options.slice(0,5)); 
    // console.log('options',options)
    useEffect(() => {
        setSelectedItems(optionList.slice(0,5));
    }, [options]);
    
    const handleChange = (event) => {
        const selected = event.target.value;
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(selected)) {
                return prevSelectedItems.filter((item) => item !== selected);
            } else {
                if (prevSelectedItems.length >= 5) {
                    return [...prevSelectedItems.slice(1), selected];
                } else {
                    return [...prevSelectedItems, selected];
                }
            }
        });

    };
    useEffect(() => {
        const newSelectedList = options.filter((e) =>
            selectedItems.includes(e.Annonceur_Nom)
        );
        // console.log("newSelectedList",newSelectedList)
        setSelectedList(newSelectedList);
        setCreationParAnnonceurOptions && setCreationParAnnonceurOptions(newSelectedList);
    }, [selectedItems, options, setCreationParAnnonceurOptions]);
    useEffect(() => {
        UpdatedGraphDisplay()
    }, [selectedList])


    return (
        <div>
            <FormControl
                sx={{
                    m: 0,
                    width: 150,
                    marginRight: { xs: 0, sm: "0px" }
                }}>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    value={selectedItems}
                    onChange={handleChange}
                    input={<OutlinedInput label="top 5 annonceurs" />}

                    renderValue={() => `Top ${selectedItems.length} création`}
                    MenuProps={MenuProps}
                    sx={{ backgroundColor: "white", height: "40px" }}
                >
                    {optionList.map((elem) => (
                        <MenuItem key={optionList.indexOf(elem)} value={elem}>
                            <Checkbox checked={selectedItems.includes(elem)} />
                            <ListItemText primary={elem} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}