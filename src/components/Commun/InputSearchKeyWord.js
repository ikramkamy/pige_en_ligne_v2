import Input from "@mui/material/Input";

const InputSearchKeyWord=({setSearchTerm,searchTerm})=>{

    return(
    <Input
    
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />)

}
export default InputSearchKeyWord;
