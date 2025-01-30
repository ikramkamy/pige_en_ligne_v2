import { create } from 'zustand'


export const UseGraphStore = create((set, get) => ({
  
    AnnonceursOptions:[],
    MarcheOptions:[],
    setAnnonceursOptions:(options)=>{
        set({AnnonceursOptions:options})         
    },
    setMarcheOptions:(options)=>{ 
        set({MarcheOptions:options})         
    }
}))