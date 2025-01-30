import { create } from 'zustand'


export const UseGraphStore = create((set, get) => ({
  
    AnnonceursOptions:[],
    MarcheOptions:[],
    AnnonceurSupportOptions:[],
    CreationParAnnonceurOptions:[],

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
    }
}))