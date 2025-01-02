// import React, { useState, useEffect } from 'react';
// import {
//     Checkbox, TextField,
//     FormControlLabel, Box, List,
//     ListItem, ListItemText, Typography,
//     Divider
// } from '@mui/material';
// import {
//     Dialog,
//     MenuItem
// } from "@mui/material";
// import { UseFiltersStore } from '../../store/dashboardStore/FiltersStore';
// import { Close } from '@mui/icons-material';

// const SearchPopupProduits = ({ openSearchPop, handleCloseSearchPop }) => {
//     const { annonceurs, produits, Filterproduits, marques, setFilterproduit, Filterproduitsids } = UseFiltersStore((state) => state);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedOptions, setSelectedOptions] = useState(Filterproduitsids);
//     const [selectedItems, setSelectedItems] = useState(Filterproduitsids);
//     // Filter options based on the search term
//     //   const filteredOptions = options.filter(option => 
//     //     option.label.toLowerCase().includes(searchTerm.toLowerCase())
//     //   );
//     console.log('selectedOptions Filterproduitsids', Filterproduitsids)
//     console.log('selectedOptions', selectedOptions)
//     const filteredOptions = Filterproduits.filter((item) => {
//         return item.Produit_Lib.toLowerCase().startsWith(searchTerm.toLowerCase());
//     }).slice(0,50)
//     // Handle checkbox selection/deselection
//     const handleCheckboxChange = (event, optionId) => {
//         if (event.target.checked) {
//             setSelectedOptions([...selectedOptions, optionId]);
//             setFilterproduit && setFilterproduit(selectedOptions, produits, annonceurs, marques);
//         } else {
//             setSelectedOptions(selectedOptions.filter(id => id !== optionId));
//             setFilterproduit && setFilterproduit(selectedOptions, produits, annonceurs, marques);
//         }

//     };
//     const isAllSelected = selectedItems.length === filteredOptions.length;
//     const handleSelectAll = () => {
//         if (selectedItems.length === filteredOptions.length) {
//             setSelectedItems([]);
//             setSelectedOptions([])
//             setFilterproduit && setFilterproduit([], produits, annonceurs, marques);
//         } else {
//             setSelectedItems(filteredOptions.map((item) => item.Produit_Id));
//             setSelectedOptions(filteredOptions.map((item) => item.Produit_Id))
//             const ids = filteredOptions.map((item) => item.Produit_Id);
//             setFilterproduit && setFilterproduit(ids, produits, annonceurs, marques);

//         }
//     };
//     console.log("filteredOptions.length",filteredOptions.length)
//     useEffect(()=>{
//         setFilterproduit && setFilterproduit(selectedOptions, produits, annonceurs, marques);
//     },[selectedOptions])
//     return (

//         <Dialog open={openSearchPop} onClose={handleCloseSearchPop}
//             sx={{ width: "100%" }}
//         >
//             <div style={{ display: "flex", justifyContent: 'space-between', backgroundColor: "#f8f9fa" }}>
//                 <Typography sx={{ margin: "16px", color: "" }}>
//                     Recheche avancée des produits
//                 </Typography>
//                 <Typography sx={{ margin: "16px", color: "" }}>
//                     <Close sx={{ cursor: "pointer" }} onClick={handleCloseSearchPop} />
//                 </Typography>
//             </div>
//             <Box display="flex" justifyContent="space-between" sx={{
//                 p: 2,
//                 width: '100%',
//                 maxWidth:"1000px",
//                 width:"600px"
//             }}>
//                 {/* liste des varités */}
//                 <Box width="45%" >

//                     <TextField
//                         fullWidth
//                         label="Search"
//                         variant="outlined"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         sx={{ mb: 2 }}
//                     />
//                     <MenuItem onClick={handleSelectAll}>
//                         <Checkbox
//                         sx={{paddingLeft:"0px"}}
//                             checked={isAllSelected}
//                             onChange={() => handleSelectAll()}
//                         />
//                         <ListItemText primary="touts" />
//                     </MenuItem>
//                     <List sx={{

//                         height: "60vh",
//                         overflowY: "scroll"
//                     }}>
//                         {filteredOptions.map((option) => (
//                             <ListItem key={option.Produit_Id}>
//                                 <FormControlLabel
//                                     control={
//                                         <Checkbox
//                                             checked={selectedOptions.includes(option.Produit_Id)}
//                                             onChange={(e) => handleCheckboxChange(e, option.Produit_Id)}
//                                             value={option.Produit_Id}

//                                         />
//                                     }
//                                     label={option.Produit_Lib}
//                                 />
//                             </ListItem>
//                         ))}
//                     </List>
//                 </Box>

//                 {/* les élèments selectionné  */}
//                 <Box width="45%" sx={{ borderLeft: '2px solid #ccc', pl: 2 }}>
//                     <Typography sx={{ mb: 2, padding: "16.5px 14px" }} >
//                         Produits selectionnés
//                     </Typography>
//                     <List sx={{

//                         height: "60vh",
//                         overflowY: "scroll"
//                     }}>
//                         {selectedOptions.length === 0 ? (
//                             <ListItem>
//                                 <ListItemText primary="No items selected" />
//                             </ListItem>
//                         ) : (
//                             selectedOptions.map((id) => {
//                                 const selectedOption = Filterproduits.find(option => option.Produit_Id === id);
//                                 return (
//                                     <ListItem key={id}>
//                                         <ListItemText primary={selectedOption?.Produit_Lib} />
//                                     </ListItem>
//                                 );
//                             })
//                         )}
//                     </List>
//                 </Box>
//             </Box>
//         </Dialog>
//     );
// }
// export default SearchPopupProduits;
import React, { useState, useEffect } from 'react';
import {
  Checkbox, TextField, FormControlLabel, Box, Typography, Divider
} from '@mui/material';
import { Dialog, MenuItem,ListItemText , ListItem} from "@mui/material";
// import {
//     //     Checkbox, TextField,
//     //     FormControlLabel, Box, List,
//     //     ListItem, ListItemText, Typography,
//     //     Divider
//     // } from '@mui/material';
import { UseFiltersStore } from '../../store/dashboardStore/FiltersStore';
import { Close } from '@mui/icons-material';
import { FixedSizeList as List } from 'react-window';

const SearchPopupProduits = ({ openSearchPop, handleCloseSearchPop }) => {
  const { annonceurs, produits, Filterproduits, marques, setFilterproduit, Filterproduitsids } = UseFiltersStore((state) => state);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(Filterproduitsids);
  const [selectedItems, setSelectedItems] = useState(Filterproduitsids);

  const filteredOptions = Filterproduits.filter((item) => {
    return item.Produit_Lib.toLowerCase().startsWith(searchTerm.toLowerCase());
  }).slice(0, 50); // You can adjust this number as needed

  const handleCheckboxChange = (event, optionId) => {
    if (event.target.checked) {
      setSelectedOptions([...selectedOptions, optionId]);
      setFilterproduit && setFilterproduit(selectedOptions, produits, annonceurs, marques);
    } else {
      setSelectedOptions(selectedOptions.filter(id => id !== optionId));
      setFilterproduit && setFilterproduit(selectedOptions, produits, annonceurs, marques);
    }
  };

  const isAllSelected = selectedItems.length === filteredOptions.length;
  const handleSelectAll = () => {
    if (selectedItems.length === filteredOptions.length) {
      setSelectedItems([]);
      setSelectedOptions([]);
      setFilterproduit && setFilterproduit([], produits, annonceurs, marques);
    } else {
      setSelectedItems(filteredOptions.map((item) => item.Produit_Id));
      setSelectedOptions(filteredOptions.map((item) => item.Produit_Id));
      const ids = filteredOptions.map((item) => item.Produit_Id);
      setFilterproduit && setFilterproduit(ids, produits, annonceurs, marques);
    }
  };

  useEffect(() => {
    setFilterproduit && setFilterproduit(selectedOptions, produits, annonceurs, marques);
  }, [selectedOptions]);

  // Render row for react-window List
  const renderRow = ({ index, style }) => {
    const option = filteredOptions[index];
    return (
      <div style={style} key={option.Produit_Id}>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedOptions.includes(option.Produit_Id)}
              onChange={(e) => handleCheckboxChange(e, option.Produit_Id)}
              value={option.Produit_Id}
            />
          }
          label={option.Produit_Lib}
        />
      </div>
    );
  };

  return (
    <Dialog open={openSearchPop} onClose={handleCloseSearchPop} sx={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: 'space-between', backgroundColor: "#f8f9fa" }}>
        <Typography sx={{ margin: "16px", color: "" }}>
          Recherche avancée des produits
        </Typography>
        <Typography sx={{ margin: "16px", color: "" }}>
          <Close sx={{ cursor: "pointer" }} onClick={handleCloseSearchPop} />
        </Typography>
      </div>
      <Box display="flex" justifyContent="space-between" sx={{ p: 2, width: '100%', maxWidth: "1000px", width: "600px" }}>
        {/* Liste des variétés */}
        <Box width="45%">
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />
          <MenuItem onClick={handleSelectAll}>
            <Checkbox
              sx={{ paddingLeft: "0px" }}
              checked={isAllSelected}
              onChange={() => handleSelectAll()}
            />
            <ListItemText primary="Tout sélectionner" />
          </MenuItem>

          {/* Use FixedSizeList for virtualization */}
          <List
            height={400} 
            itemCount={filteredOptions.length}
            itemSize={60} 
            width="100%"
          >
            {renderRow}
          </List>
        </Box>

        {/* Les éléments sélectionnés */}
        <Box width="45%" sx={{ borderLeft: '2px solid #ccc', pl: 2 }}>
          <Typography sx={{ mb: 2, padding: "16.5px 14px" }}>
            Produits sélectionnés
          </Typography>
          {/* <List sx={{, overflowY: "scroll" }}> */}
            {selectedOptions.length === 0 ? (
              <ListItem>
                <ListItemText primary="No items selected" />
              </ListItem>
            ) : (
              selectedOptions.map((id) => {
                const selectedOption = Filterproduits.find(option => option.Produit_Id === id);
                return (
                  <ListItem key={id}>
                    <ListItemText primary={selectedOption?.Produit_Lib} />
                  </ListItem>
                );
              })
            )}
          {/* </List> */}
        </Box>
      </Box>
    </Dialog>
  );
}

export default SearchPopupProduits;
