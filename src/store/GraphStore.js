import { create } from 'zustand'


export const UseGraphStore = create((set, get) => ({
  
    AnnonceursOptions:[],
    setAnnonceursOptions:(options)=>{
        console.log('selected',options)
        set({AnnonceursOptions:options})         
    }


}))