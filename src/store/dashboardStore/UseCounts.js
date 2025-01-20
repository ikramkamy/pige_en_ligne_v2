import { create } from 'zustand'
import axios from 'axios';
const PORT = "https://pige-dev.immar-media.com/api/index.php"
const Limit_Data_Allowed=200000
export const UseCountStore = create((set, get) => ({
PigeCount:0,

getPigeCount :async(email,media, supports, familles, classes, 
    secteurs, varieties, annonceurs, marques, produits,date1, date2)=>{
        try {
            var media_type = media == "" ? "presse" : media;
            const response = await axios.post(`${PORT}/${media_type}/count`, {
              email:email,
              supports: supports,
              familles: familles,
              classes: classes,
              secteurs: secteurs,
              varieties: varieties,
              annonceurs: annonceurs,
              marques: marques,
              produits: produits,     
              media: media,       
              date_debut: date1,
              date_fin: date2,
            });
               
               var dataLength=Number(response.data.total)
           if(dataLength>Limit_Data_Allowed){
           
            set({
                PigeCount: 0
              });
           }else if(0<dataLength && dataLength<Limit_Data_Allowed){
           
            set({
                PigeCount: 1
              });
           }else if(dataLength===0){
     
            set({
                PigeCount: 2
              });
           }        
          } catch (error) {
           
                set({ PigeCount: -2 })     
          }
},
ResetPigeCount:()=>{
    set({
        PigeCount: 0,
      }); 
},


}))