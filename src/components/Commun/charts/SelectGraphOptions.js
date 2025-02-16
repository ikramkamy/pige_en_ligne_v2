import React, { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { UseGraphStore } from 'store/GraphStore';
import {
    ListSubheader,
    ClickAwayListener,
    Grow,
    Paper,
    Popper,
    MenuList,

  } from "@mui/material";
  import MoreVertIcon from "@mui/icons-material/MoreVert";
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
export function SelectGraphOptionsMarche({ options, UpdatedGraphDisplay,filter,SetOptionFunction }) {
    const optionList = options.map((e) => e.name.split('-')[0]);
    const [selectedItems, setSelectedItems] = useState([]);  
    const [selectedList, setSelectedList] = useState(options.slice(0,5));
   
    useEffect(() => {
        setSelectedItems(optionList.slice(0,10));
    }, [options]);
 
    const handleChange = (event) => {
        const selected = event.target.value;
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(selected)) {
                return prevSelectedItems.filter((item) => item !== selected);
            } else {
                if (prevSelectedItems.length >= 10) {
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
        SetOptionFunction && SetOptionFunction(newSelectedList);
    }, [selectedItems, options, SetOptionFunction]);
    useEffect(() => {
        UpdatedGraphDisplay()
    }, [selectedList])
    return (
            <FormControl
                sx={{
                    m: 0,
                    width: 10,
                    marginTop: "0px",
                    marginRight: { xs: 0, sm: "0px" },
                    height:"15px"               
                }}>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    value={selectedItems}
                    onChange={handleChange}
                    input={<OutlinedInput label="" />}
                    renderValue={() => <div style={{ color: "white",
                         transform: "rotate(90deg)", fontWeight:"900" }}>
                            <span style={{ transform: "rotate(90deg)", fontWeight:"900"}}>...</span>
                            </div>}
                    MenuProps={MenuProps}
                    sx={{ backgroundColor: "010A41E6", height: "" ,color:"white", }}
                >
                    {optionList.map((elem) => (
                        <MenuItem key={optionList.indexOf(elem)} value={elem}>
                            <Checkbox checked={selectedItems.includes(elem)} />
                            <ListItemText primary={elem} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
          
    );
}

// export function SelectGraphOptionsMarche({ options, UpdatedGraphDisplay, filter, SetOptionFunction }) {
//     const optionList = options.map((e) => e.name.split("-")[0]);
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [selectedList, setSelectedList] = useState(options.slice(0, 5));
//     const [anchorEl, setAnchorEl] = useState(null); // For controlling the Popper menu
//     const open = Boolean(anchorEl);

//     useEffect(() => {
//         setSelectedItems(optionList.slice(0, 10));
//     }, [options]);

//     const handleChange = (event) => {
//         const selected = event.target.value;
//         setSelectedItems((prevSelectedItems) => {
//             if (prevSelectedItems.includes(selected)) {
//                 return prevSelectedItems.filter((item) => item !== selected);
//             } else {
//                 if (prevSelectedItems.length >= 10) {
//                     return [...prevSelectedItems.slice(1), selected];
//                 } else {
//                     return [...prevSelectedItems, selected];
//                 }
//             }
//         });
//     };

//     useEffect(() => {
//         const newSelectedList = options.filter((e) =>
//             selectedItems.includes(e.name.split("-")[0])
//         );
//         setSelectedList(newSelectedList);
//         SetOptionFunction && SetOptionFunction(newSelectedList);
//     }, [selectedItems, options, SetOptionFunction]);

//     useEffect(() => {
//         UpdatedGraphDisplay();
//     }, [selectedList]);

//     const handleToggle = (event) => {
//         setAnchorEl(anchorEl ? null : event.currentTarget);
//     };

//     const handleClose = (event) => {
//         if (anchorEl && anchorEl.contains(event.target)) {
//             return;
//         }
//         setAnchorEl(null);
//     };

//     return (
//         <div>
//             {/* Custom trigger button (three vertical points icon) */}
//             <button
//                 style={{
//                     backgroundColor: "#010A41E6",
//                     color: "white",
//                     border: "none",
//                     padding: "5px",
//                     cursor: "pointer",
//                     width: "35px",
//                     height: "35px",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     borderRadius: "4px",
//                 }}
//                 onClick={handleToggle}
//                 aria-haspopup="true"
//                 aria-expanded={open ? "true" : undefined}
//             >
//                 <MoreVertIcon />
//             </button>

//             {/* Popper for the dropdown menu */}
//             <Popper
//                 open={open}
//                 anchorEl={anchorEl}
//                 role={undefined}
//                 transition
//                 disablePortal
//                 placement="bottom-start"
//             >
//                 {({ TransitionProps, placement }) => (
//                     <Grow
//                         {...TransitionProps}
//                         style={{
//                             transformOrigin:
//                                 placement === "bottom-start" ? "left top" : "left bottom",
//                         }}
//                     >
//                         <Paper>
//                             <ClickAwayListener onClickAway={handleClose}>
//                                 <MenuList
//                                     autoFocusItem={open}
//                                     id="menu-list-grow"
//                                     onKeyDown={handleClose}
//                                 >
//                                     {optionList.map((elem) => (
//                                         <MenuItem
//                                             key={optionList.indexOf(elem)}
//                                             value={elem}
//                                             onClick={(event) => {
//                                                 handleChange(event);
//                                                 handleClose(event); // Close the menu after selection
//                                             }}
//                                         >
//                                             <Checkbox checked={selectedItems.includes(elem)} />
//                                             <ListItemText primary={elem} />
//                                         </MenuItem>
//                                     ))}
//                                 </MenuList>
//                             </ClickAwayListener>
//                         </Paper>
//                     </Grow>
//                 )}
//             </Popper>
//         </div>
//     );
// }
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
                    input={<OutlinedInput label="" />}

                    renderValue={() => `Top ${selectedItems.length} supports`}
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