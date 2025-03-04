// import React, { useEffect, useState } from 'react';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
// import { UseGraphStore } from 'store/GraphStore';
// import { styled } from "@mui/system";
// import {
//     ListSubheader,
//     ClickAwayListener,
//     Grow,
//     Paper,
//     Popper,
//     MenuList,

//   } from "@mui/material";
//    import MoreVertIcon from "@mui/icons-material/MoreVert";
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

// export function SelectGraphOptionsMarche({ options, UpdatedGraphDisplay,filter,SetOptionFunction }) {
//     const optionList = options.map((e) => e.name.split('-')[0]);
//     const [selectedItems, setSelectedItems] = useState([]);  
//     const [selectedList, setSelectedList] = useState(options.slice(0,5));
   
//     useEffect(() => {
//         setSelectedItems(optionList.slice(0,10));
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
//         UpdatedGraphDisplay()
//     }, [selectedList])
//     const StyledSelect = styled(Select)(({ theme }) => ({
//         "& .MuiOutlinedInput-notchedOutline": {
//           border: "none", // Remove the default border
//         },
//         "& .MuiSvgIcon-root": {
//           display: "none", // Hide the dropdown arrow icon
//         },
//         "&:focus": {
//           outline: "none", // Remove focus outline
//           boxShadow: "none", // Remove focus shadow
//         },
//         backgroundColor: "#010A41E6", // Set background color
//         color: "white", // Set text color
//         height: "35px", // Set custom height
//       }));
//     return (
//             <FormControl
//                 sx={{
//                     m: 0,
//                     width: 10,
//                     marginTop: "0px",
//                     marginRight: { xs: 0, sm: "0px" },
//                     height:"15px"               
//                 }}>
//                 <StyledSelect
//                     labelId="demo-multiple-checkbox-label"
//                     value={selectedItems}
//                     onChange={handleChange}
//                     input={<OutlinedInput label="" />}
//                     renderValue={() => <div style={{ color: "white",
//                          transform: "rotate(90deg)", fontWeight:"900" }}>
//                             <span style={{ transform: "rotate(90deg)", 
//                                 fontWeight:"900"}}>...</span>
//                             </div>}
//                     MenuProps={MenuProps}
//                     sx={{ backgroundColor: "010A41E6", height: "" ,color:"white", }}
//                 >
//                     {optionList.map((elem) => (
//                         <MenuItem key={optionList.indexOf(elem)} value={elem}>
//                             <Checkbox checked={selectedItems.includes(elem)} />
//                             <ListItemText primary={elem} />
//                         </MenuItem>
//                     ))}
//                 </StyledSelect>
//             </FormControl>
          
//     );
// }
import React, { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { UseGraphStore } from 'store/GraphStore';
import { styled } from "@mui/system";
import {
    Input,
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

export function SelectGraphOptionsMarche({ options, UpdatedGraphDisplay, filter, 
    SetOptionFunction ,optionNumber,ModifyList}) {
    const optionList = options.map((e) => e.name.split('-')[0]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedList, setSelectedList] = useState(options.slice(0, 50));

    useEffect(() => {
        setSelectedItems(optionList.slice(0, 50));
    }, [options]);

    const handleChange = (event) => {
        const selected = event.target.value;
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(selected)) {
                return prevSelectedItems.filter((item) => item !== selected);
            } else {
                if (prevSelectedItems.length >= 50) {
                    return [...prevSelectedItems.slice(1), selected];
                } else {
                    return [...prevSelectedItems, selected];
                }
            }
        });
    };

    // Handle "Select All" functionality
    const handleSelectAll = () => {
        if (selectedItems.length === optionList.length) {
            setSelectedItems([]); // Deselect all if all are already selected
        } else {
            setSelectedItems(optionList); // Select all options
        }
    };

    useEffect(() => {
        const newSelectedList = options.filter((e) =>
            selectedItems.includes(e.name.split("-")[0])
        );
        setSelectedList(newSelectedList);
        SetOptionFunction && SetOptionFunction(newSelectedList);
    }, [selectedItems, options, SetOptionFunction]);

    useEffect(() => {
        UpdatedGraphDisplay();
    }, [selectedList]);

    const StyledSelect = styled(Select)(({ theme }) => ({
        "& .MuiOutlinedInput-notchedOutline": {
            border: "none", // Remove the default border
        },
        "& .MuiSvgIcon-root": {
            display: "none", // Hide the dropdown arrow icon
        },
        "&:focus": {
            outline: "none", // Remove focus outline
            boxShadow: "none", // Remove focus shadow
        },
        backgroundColor: "#010A41E6", // Set background color
        color: "white", // Set text color
        height: "35px", // Set custom height
    }));

    return (
        // <FormControl
        //     sx={{
        //         m: 0,
        //         width: 10,
        //         marginTop: "0px",
        //         marginRight: { xs: 0, sm: "0px" },
        //         height: "15px",
        //     }}           
        // > <StyledSelect
        //         labelId="demo-multiple-checkbox-label"
        //         value={selectedItems}
        //         onChange={handleChange}               
        //         input={<OutlinedInput label="" />}
        //         renderValue={() => (
        //             <div style={{ color: "white", transform: "rotate(90deg)", fontWeight: "900" }}>
        //                 <span style={{transform: "rotate(90deg)", fontWeight: "900" }}>...</span>
        //             </div>
        //         )}
        //         MenuProps={MenuProps}
        //         sx={{ backgroundColor: "010A41E6", height: "", color: "white" }}
        //     >
        //         {/* Add "Select All" option */}
        //         <MenuItem key="select-all" onClick={handleSelectAll}>
        //             <Checkbox
        //                 checked={selectedItems.length === optionList.length}
        //                 indeterminate={
        //                 selectedItems.length > 0 && selectedItems.length < optionList.length
        //                 }
        //             />
        //             <ListItemText primary="Select All" />
        //         </MenuItem>

        //         {/* Render individual options */}
        //         {optionList.map((elem) => (
        //             <MenuItem key={optionList.indexOf(elem)} value={elem}>
        //                 <Checkbox checked={selectedItems.includes(elem)} />
        //                 <ListItemText primary={elem} />
        //             </MenuItem>
        //         ))}
        //     </StyledSelect>
        // </FormControl>
        <FormControl sx={{
            m: 0,
            width: "50",
            marginTop: "-5px",
            margin: "0px",
            marginRight: "0px",
            visibility:"hidden"
      
          }}>
            <Input
              type='number'
              value={optionNumber}
              inputProps={{ min: 1, max: 20 }}
              onChange={UpdatedGraphDisplay}
              sx={{
                color: "white",
                width: "50px",
                border: "1px solid white",
                borderRadius: "5px",
                paddingLeft: "5px"
              }}
            />
          </FormControl>
    );
}


