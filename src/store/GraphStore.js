import { create } from 'zustand'
const PORT = "https://pige.immar-media.com/api/index.php";
import axios from 'axios';
export const UseGraphStore = create((set, get) => ({
  
    AnnonceursOptions:[],
    MarcheOptions:[],
    AnnonceurSupportOptions:[],
    CreationParAnnonceurOptions:[],
    FamillesOptions:[],
    AnnonceurOptions:[],
    MarqueOptions:[],
    ProduitsOptions:[],
    EvolutionData:[],
    graphColor:"#2196f3",

    setAnnonceursOptions:(options)=>{
        set({AnnonceursOptions:options})         
    },
    setMarcheOptions:(options)=>{ 
        set({MarcheOptions:options})         
    },
    setAnnonceurSupportOptions:(options)=>{ 
        set({AnnonceurSupportOptions:options})         
    },
    setCreationParAnnonceurOptions:(options)=>{ 
        set({CreationParAnnonceurOptions:options})         
    },
    setFamillesOptions:(options)=>{ 
        set({FamillesOptions:options})         
    },
    setAnnonceurOptions:(options)=>{ 
        set({AnnonceurOptions:options})         
    },
    setMarqueOptions:(options)=>{ 
        set({MarqueOptions:options})         
    }
    ,
    setProduitsOptions:(options)=>{ 
        set({ProduitsOptions:options})         
    },
    getEvolutionData:async(
        supports,
        familles,
        classes,
        secteurs,
        varieties,
        annonceurs,
        marques,
        produits,
        date1,
        date2,
        media,
        email,
        parametre,
        base)=>{

        try {
          
            let response = await axios.post(`${PORT}/${media}/dashboard/${parametre}/${base}`, {
                email: email,
                familles: familles,
                classes: classes,
                supports:supports,
                secteurs: secteurs,
                varieties: varieties,
                annonceurs: annonceurs,
                marques: marques,
                produits: produits,
                date_debut: date1,
                date_fin: date2,
            })
            console.log('resposne',response)
            
            set({ EvolutionData: response.data })
            
      
          } catch (error) {
            console.log(error);
          }},
    seCodeColor:(colorbase)=>{
       set({graphColor:colorbase})
    }

}))