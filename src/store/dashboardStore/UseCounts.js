import { create } from 'zustand'
import axios from 'axios';
const PORT = "https://pige-dev.immar-media.com/api/index.php"
const Limit_Data_Allowed = 200000
export const UseCountStore = create((set, get) => ({
  PigeCount: 0,
  count: -2,
  VeilleCount: 0,
  count_v: -2,
  getPigeCount: async (email, media, supports, familles, classes,
    secteurs, varieties, annonceurs, marques, produits, date1, date2) => {
    try {
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
        date_debut: date1,
        date_fin: date2,
      });

      var dataLength = Number(response.data.total)

      if (dataLength > Limit_Data_Allowed) {

        set({
          PigeCount: 0,
          count: response.data.total
        });
      } else if (0 < dataLength && dataLength < Limit_Data_Allowed) {

        set({
          PigeCount: 1,
          count: response.data.total
        });
      } else if (dataLength === 0) {

        set({
          PigeCount: 2,
          count: 0
        });
      }
    } catch (error) {

      set({
        PigeCount: -2,
        count: -2
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
      const response = await axios.post(`${PORT}/${media_type}-veille-${veille_diffusion}/count`, {
        email: email,
        familles: Filterfamilles,
        annonceurs: Filterannonceursids,
        marques: Filtermarquesids,
        produits: Filterproduitsids,
        date_debut: date1,
        date_fin: date2,
      });
    // console.log('count veille',response.data.total)
      var dataLength = Number(response.data.total)
      if (dataLength > Limit_Data_Allowed) {
        set({
          VeilleCount: 0,
          count_v: Number(response.data.total)
        });
      } else if (0 < dataLength && dataLength < Limit_Data_Allowed) {
        set({
          VeilleCount: 1,
          count_v: Number(response.data.total)
        });
      } else if (dataLength === 0) {
        set({
          VeilleCount: 2,
          count_v: 0
        });
      }
    } catch (error) {

      set({
        VeilleCount: -2,
        count_v: -2
      })
    }
  },

}))