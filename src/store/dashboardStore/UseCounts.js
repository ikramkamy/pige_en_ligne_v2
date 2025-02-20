import { create } from 'zustand'
import axios from 'axios';
import dayjs from "dayjs";
const PORT = "https://pige.immar-media.com/api/index.php"
const Limit_Data_Allowed = 1000
export const UseCountStore = create((set, get) => ({
  PigeCount: 0,
  count: -2,
  VeilleCount: 0,
  count_v: -2,
  CountInK:"",
  CountInKLastYear:"",
  IsCounting: false,
  getPigeCount: async (email, media, supports, familles, classes,
    secteurs, varieties, annonceurs, marques, produits, date1, date2) => {
    try {
      set({ IsCounting: true })
      var media_type = media == "" ? "presse" : media;
      console.log('calling axios')
      const response = await axios.post(`${PORT}/${media_type}/count`, {
        email: email,
        supports: supports,
        familles: familles,
        classes: classes,
        secteurs: secteurs,
        varieties: varieties,
        annonceurs: annonceurs,
        marques: marques,
        produits: produits,
        date_debut: date1,
        date_fin: date2,
      });
      var dataLength = Number(response.data.total)
      if (dataLength > Limit_Data_Allowed) {
        set({
          PigeCount: 0,
          count: response.data.total,
          CountInK:Number(response.data.total)/1000 +" K" ,
        
        });
      } else if (0 < dataLength && dataLength < Limit_Data_Allowed) {
        set({
          PigeCount: 1,
          count: response.data.total,
          CountInK:Number(response.data.total) +" " 
        });
      } else if (dataLength === 0) {
        set({
          PigeCount: 2,
          count: 0,
          CountInK:Number(response.data.total) +" " 
        });
      }
      set({ IsCounting: false })
    } catch (error) {
      console.log('network isssue')
      set({
        PigeCount: -2,
        count: -2,
        OpenNetworkPopupCount: true,
        IsCounting: false
      })
    }
  },
  getPigeCountLastYear: async (email, media, supports, familles, classes,
    secteurs, varieties, annonceurs, marques, produits, date1, date2) => {    
    try {
      set({ IsCounting: true })
      var media_type = media == "" ? "presse" : media;    
      
      const response = await axios.post(`${PORT}/${media_type}/count`, {
        email: email,
        supports: supports,
        familles: familles,
        classes: classes,
        secteurs: secteurs,
        varieties: varieties,
        annonceurs: annonceurs,
        marques: marques,
        produits: produits,
        date_debut: dayjs(date1).subtract(1, 'year').format('YYYY-MM-DD'),
        date_fin: dayjs(date2).subtract(1, 'year').format('YYYY-MM-DD'),
      });
      console.log('response',response)
      var dataLength = Number(response.data.total)
      if (dataLength > Limit_Data_Allowed) {
        set({         
          countLastYear: response.data.total,
          CountInKLastYear:Number(response.data.total)/1000 +" K",
        });
      } else if (0 < dataLength && dataLength < Limit_Data_Allowed) {
        set({        
          countLastYear: response.data.total,
          CountInKLastYear:Number(response.data.total) +" " ,
        });
      } else if (dataLength === 0) {

        set({ 
          countLastYear: 0,
          CountInKLastYear:Number(response.data.total) +" " 
        });
      }
      set({ IsCounting: false })
    } catch (error) {
      //console.log('network isssue')
      set({
        PigeCount: -2,
        count: -2,
        OpenNetworkPopupCount: true,
        IsCounting: false
      })
    }
  },
  ResetPigeCount: () => {

    set({
      PigeCount: 3,
      count: -2
    });
  },
  ResetVeilleCount: () => {

    set({
      VeilleCount: -2,
      count_v: -2
    });
  },
  getVeilleCount: async (
    email,
    date1,
    date2,
    media,
    veille_diffusion,
    Filterfamilles,
    Filterannonceursids,
    Filtermarquesids,
    Filterproduitsids
  ) => {
    try {
      var media_type = media == "" ? "presse" : media;
      // console.log("calling count veille ",`${PORT}/${media_type}-veille-${veille_diffusion}/count`,{
      //   email: email,
      //   annonceurs: Filterannonceursids,
      //   marques: Filtermarquesids,
      //   produits: Filterproduitsids,
      //   familles: Filterfamilles,
      //   date_debut: date1,
      //   date_fin: date2,
      // })
      const response = await axios.post(`${PORT}/${media_type}-veille-${veille_diffusion}/count`, {
        email: email,
        annonceurs: Filterannonceursids,
        marques: Filtermarquesids,
        produits: Filterproduitsids,
        familles: Filterfamilles,
        date_debut: date1,
        date_fin: date2,
      });
      // console.log('count veille',response)
      set({
        count_v: Number(response.data.total)
      });
    } catch (error) {

      set({
        VeilleCount: -2,
        count_v: -2,
        OpenNetworkPopupCount: true,
      })
    }
  },
  OpenNetworkPopupCount: false,
  handleCloseNetworkPopupCount: () => {
    set({ OpenNetworkPopupCount: false, })
  }
}))