import { create } from "zustand";
import axios from "axios";
import dayjs from "dayjs";
const PORT = "https://pige-dev.immar-media.com/api/index.php";
const PORT2 = "https://immar-media.com/";
const PORT3 = "https://pige.immar-media.com/api/index.php";

export const UsePigeDashboardStore = create((set, get) => ({
  PressData: [],
  VolumePresse: 0,
  VolumePresseLastYear: 0,
  VolumeMedia: 0,
  VolumeMediaLastyear: 0,

  AnnonceursActif: 0,
  AnnonceursActifLastYear: 0,

  AnnonceursActifMedia: 0,
  AnnonceursActifMediaLastYear: 0,

  CreationUniques: 0,
  CreationUniquesLastYear: 0,


  CreationUniquesMedia: 0,
  CreationUniquesMediaLastYear: 0,
  BudgetBrut: 0,
  BudgetBrutLastYear: 0,

  BudgetBrutMedia: 0,
  BudgetBrutMediaLastYear: 0,

  SupportDiffusion: 0,
  SupportDiffusionLastYear: 0,

  SupportDiffusionMedia: 0,
  SupportDiffusionMediaLastYear: 0,

  Couleur: 0,
  NoireBlanc: 0,
  DureeTotal: 0,
  DureeTotalLastYear: 0,
  DureeMoyenne: 0,
  DureeMoyenneLastYear: 0,

  PicCommunication: {
    count: 0,
    interval_start: "--:--",
    interval_end: "--:--",
  },
  PicCommunicationLastYear: {
    count: 0,
    interval_start: "08:00",
    interval_end: "08:15",
  },

  Top20famillesSectorielles: [],
  Top20Annonceurs: [],
  Top20marques: [],
  Top20produits: [],
  PartmarchePresse: [],
  FormatRepartition: [],
  NombreAnnonceursActifParSupportPresse: [],
  NombreCreationUniqueParAnnonceurPresse: [],
  PartMarche: [],
  isloading: true,
  errorSendingLink: "",
  ExportExcelPending: false,
  DisplayEmailSent: false,
  unifiedGraphStructure:{
    top20familleModified: 0,
    Top20AnnonceursModified: 0,
    top20marquemodified: 0,
    Top20produitsmodified: 0,
    AnnonceurParSupportModified: 0,
    CreationParAnnonceurModified: 0,
    PartMarcheModified: 0,
    FormatRepartitionModified: 0,
    RepartitionParTypeModified: [],
  },
  setunifiedGraphStructure :(data)=>{
      set({unifiedGraphStructure:data})
  },
  CloseEmailExcel: () => {
    set({ DisplayEmailSent: false })
  },

  ErrorDashboard: false,
  HandelErrorDashboard: () => {
    set({ ErrorDashboard: true })
  },
  // Methods
  ResetDataArrays: async () => {
    // console.log("data reset")
    set({
      PressData: [],
      Top20famillesSectorielles: [],
      Top20Annonceurs: [],
      Top20marques: [],
      Top20produits: [],
      PartmarchePresse: [],
      FormatRepartition: [],
      NombreAnnonceursActifParSupportPresse: [],
      NombreCreationUniqueParAnnonceurPresse: [],
      PartMarche: [],
      //VolumePresse:0,
      //VolumeMedia:0,
      AnnonceursActif: 0,
      AnnonceursActifMedia: 0,
      CreationUniques: 0,
      CreationUniquesMedia: 0,
      BudgetBrut: 0,
      BudgetBrutMedia: 0,
      SupportDiffusionPresse: 0,
      SupportDiffusionMedia: 0,
      Couleur: 0,
      NoireBlanc: 0,
      DureeTotal: 0,
      DureeMoyenne: 0,
      AnnonceurParSupport: 0,
      CreationParAnnonceur: 0,
      PicCommunication: {
        count: 0,
        interval_start: "08:00",
        interval_end: "08:15",
      },
      loadingFamille: false,
      loadingAnnonceur: false,
      loadingMarche: false,
      loadingMarque: false,
      loadingProduit: false,
      loadingFormat: false,
      loadingAnnonceurSupport: false,
      loagingCreationAnnonceur: false,

    })
  },
  SetIsloadingMethode: async (e) => {
    set({ isloading: e })
  },
  IsPressdataisFetched: false,
  ResePressdataisFetched: () => {
    set({ IsPressdataisFetched: false })
  },

  getVolumePresse: async (
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

  ) => {

    try {

      let response = await axios.post(`${PORT2}/getfilters2.php`, {
        supports: supports,
        familles: familles,
        classes: classes,
        secteurs: secteurs,
        varieties: varieties,
        annonceurs: annonceurs,
        marques: marques,
        produits: produits,

        date1: date1,
        date2: date2,
        dashboard: "dashboard",
        media: "presse",
        countEnteries: "countEnteries",

      });

      set({ VolumePresse: Number(response.data.data[0].count) });

    } catch (error) {
      //console.log(error);
    }
  },
  getVolumePresseLastYear: async (
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

  ) => {

    try {

      let response = await axios.post(`${PORT2}/getfilters2.php`, {
        supports: supports,
        familles: familles,
        classes: classes,
        secteurs: secteurs,
        varieties: varieties,
        annonceurs: annonceurs,
        marques: marques,
        produits: produits,

        date1: dayjs(date1).subtract(1, 'year').format('YYYY-MM-DD'),
        date2: dayjs(date2).subtract(1, 'year').format('YYYY-MM-DD'),
        dashboard: "dashboard",
        media: "presse",
        countEnteries: "countEnteries",

      });

      set({ VolumePresseLastYear: Number(response.data.data[0].count) });

    } catch (error) {
      console.log(error);
    }
  },
  setBasedeCalucule: (i) => {
    set({ base: i })

  },
  ResetBasedeCalucule: (i) => {
    set({ base: "" })

  },
  getAnnonceursActif: async (
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
    parametre) => {

    try {

      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
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
      //console.log("response ann actif", response)
      set({ AnnonceursActif: Number(response.data[0].total) });
    } catch (error) {
      //console.log(error);
    }
  },
  getAnnonceursActifLastYear: async (
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
    parametre) => {

    try {

      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
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
      console.log("ann acti last", response)
      set({ AnnonceursActifLastYear: Number(response.data[0].total) });
    } catch (error) {
      console.log(error);
    }
  },

  loadingCalcul: false,
  getCreationUniques: async (
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
    parametre
  ) => {

    try {
      set({ loadingCalcul: true })

      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
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
      console.log("get creation unique", response)
      set({
        CreationUniques: Number(response.data[0].total),
        loadingCalcul: false
      });

    } catch (error) {
      console.log(error);
    }
  },
  getCreationUniquesLastYear: async (
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
    parametre) => {
    try {
      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
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
      set({ CreationUniquesLastYear: Number(response.data[0].total) });

    } catch (error) {
      console.log(error);
    }
  },
  getBudgetBrut: async (
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
    parametre
  ) => {
    try {
      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
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
      if (Number(response.data[0].total) < 1000) {
        set({ BudgetBrut: Number(response.data[0].total).toFixed(1)+" M" });
      } else {
        set({ BudgetBrut: (Number(response.data[0].total)/1000).toFixed(1)+" Mrd" });
      }

    } catch (error) {
      //console.log(error);
    }
  },
  getBudgetBrutLastYear: async (
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
    parametre
  ) => {
    try {
      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
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
      // console.log('response',response)
      if (Number(response.data[0].total) < 1000) {
        set({ BudgetBrutLastYear: Number(response.data[0].total).toFixed(1)+" M" });
      } else {
        set({ BudgetBrutLastYear: (Number(response.data[0].total)/1000).toFixed(1)+" Mrd" });
      }
    } catch (error) {
      //console.log(error);
    }
  },
  getSupportDiffusion: async (
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
    parametre) => {

    try {

      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
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
      console.log("response sup", response)
      set({ SupportDiffusion: Number(response.data[0].total) });

    } catch (error) {
      //console.log(error);
    }
  },

  getSupportDiffusionLastYear: async (
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
    parametre) => {

    try {

      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
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

      set({ SupportDiffusionLastYear: Number(response.data[0].total) });

    } catch (error) {
      //console.log(error);
    }
  },

  getCouleur: async (
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
    parametre) => {
    try {
      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
        email: email,
        familles: familles,
        classes: classes,
        secteurs: secteurs,
        varieties: varieties,
        annonceurs: annonceurs,
        marques: marques,
        produits: produits,
        date_debut: date1,
        date_fin: date2
      });
      //console.log("response couleur", response)
      set({ Couleur: response.data.data1[0].total });
      set({ NoireBlanc:response.data.data2[0].total });

    } catch (error) {
      //console.log(error);
    }
  },
  CouleurLastYear:0,
  NoireBlancLastYear:0,
  getCouleurLastYear: async (
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
    parametre) => {
    try {
      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
        email: email,
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
      //console.log("response couleur", response)
      set({ CouleurLastYear: Number(response.data.data1[0].total) });
      set({ NoireBlancLastYear: Number(response.data.data2[0].total) });

    } catch (error) {
      //console.log(error);
    }
  },

  //les fonctions suivantes pour radio et TV
  getVolume: async (
    supports,
    familles,
    classes,
    secteurs,
    varieties,
    annonceurs,
    marques,
    produits,
    media,
    rangs,
    date1,
    date2,

  ) => {
    ////console.log("link to volume calculation",`${PORT2}/getfilters2.php`)
    try {

      let response = await axios.post(`${PORT2}/getfilters2.php`, {
        supports: supports,
        familles: familles,
        classes: classes,
        secteurs: secteurs,
        varieties: varieties,
        annonceurs: annonceurs,
        marques: marques,
        produits: produits,
        date1: date1,
        date2: date2,
        rangs: rangs,
        dashboard: "dashboard",
        media: media,
        countEnteries: "countEnteries",

      });
      if (Number(response.data.data[0].count) > 1000) {
        set({ VolumeMedia: (Number(response.data.data[0].count) / 1000).toFixed(1) + "K" });
      } else {
        set({ VolumeMedia: Number(response.data.data[0].count) });
      }


    } catch (error) {
      //console.log(error);
    }
  },
  getVolumelastyear: async (
    supports,
    familles,
    classes,
    secteurs,
    varieties,
    annonceurs,
    marques,
    produits,
    media,
    rangs,
    date1,
    date2,

  ) => {
    // //console.log("date1",dayjs(date1).subtract(1, 'year').format('YYYY-MM-DD'))
    // //console.log("link to volume calculation",`${PORT}/getfilters2.php`)
    try {
      let response = await axios.post(`${PORT2}/getfilters2.php`, {
        supports: supports,
        familles: familles,
        classes: classes,
        secteurs: secteurs,
        varieties: varieties,
        annonceurs: annonceurs,
        marques: marques,
        produits: produits,
        date1: dayjs(date1).subtract(1, 'year').format('YYYY-MM-DD'),
        date2: dayjs(date2).subtract(1, 'year').format('YYYY-MM-DD'),
        rangs: rangs,
        dashboard: "dashboard",
        media: media,
        countEnteries: "countEnteries",
      });
      if (Number(response.data.data[0].count) > 1000) {
        set({ VolumeMediaLastyear: (Number(response.data.data[0].count) / 1000).toFixed(1) + "K" });
      } else {
        set({ VolumeMediaLastyear: Number(response.data.data[0].count) });
      }
    } catch (error) {
      //console.log(error);
    }
  },
  loadingFamille: false,
  // getAnnonceursActif: async (
  //   supports,
  //   familles,
  //   classes,
  //   secteurs,
  //   varieties,
  //   annonceurs,
  //   marques,
  //   produits,
  //   media,
  //   rangs,
  //   date1,
  //   date2,

  // ) => {

  //   try {

  //     let response = await axios.post(`${PORT2}/getfilters2.php`, {
  //       supports: supports,
  //       familles: familles,
  //       classes: classes,
  //       secteurs: secteurs,
  //       varieties: varieties,
  //       annonceurs: annonceurs,
  //       marques: marques,
  //       produits: produits,
  //       rangs: rangs,
  //       dashboard: "dashboard",
  //       media: media,
  //       annonceursactifs: "annonceursactifs",

  //     });
  //     ////console.log('response', response)
  //     set({ AnnonceursActifMedia: Number(response.data.data[0].count) });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  // getAnnonceursActifLastYear: async (
  //   supports,
  //   familles,
  //   classes,
  //   secteurs,
  //   varieties,
  //   annonceurs,
  //   marques,
  //   produits,
  //   media,
  //   rangs,
  //   date1,
  //   date2,

  // ) => {

  //   try {

  //     let response = await axios.post(`${PORT2}/getfilters2.php`, {
  //       supports: supports,
  //       familles: familles,
  //       classes: classes,
  //       secteurs: secteurs,
  //       varieties: varieties,
  //       annonceurs: annonceurs,
  //       marques: marques,
  //       produits: produits,
  //       rangs: rangs,
  //       dashboard: "dashboard",
  //       media: media,
  //       annonceursactifs: "annonceursactifs",

  //     });
  //     //console.log('response', response)
  //     set({ AnnonceursActifMediaLastYear: Number(response.data.data[0].count) });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  //les fontions sont en commun entre presse radio television
  getTop20famillesSectorielles: async (
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
    base
  ) => {
    set({ loadingFamille: true })
    try {
      set({ isloading: true })
      let response = await axios.post(`${PORT3}/${media}/dashboard/${base}/${parametre}`, {
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
       console.log("familles",response)
      set({
        Top20famillesSectorielles: response.data,
        loadingFamille: false
      });
      set({ isloading: false })


    } catch (error) {
      //console.log(error);
    }
  },
  loadingAnnonceur: false,
  getTop20Annonceurs: async (
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
    base
  ) => {
    set({ loadingAnnonceur: true })
    try {
      set({ isloading: true })
      let response = await axios.post(`${PORT3}/${media}/dashboard/${base}/${parametre}`, {
        media: media,
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
      //console.log('reponse', response)
      set({
        Top20Annonceurs: response.data,
        loadingAnnonceur: false
      });
      set({ isloading: false })


    } catch (error) {
      //console.log(error);
      set({ Top20Annonceurs: [] });
    }

  },
  loadingMarche: false,
  getPrtMarchet: async (
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
    base
  ) => {
    set({ loadingMarche: true })
    try {
      let response = await axios.post(`${PORT3}/${media}/dashboard/${base}/${parametre}`, {
        email: email,
        supports: supports,
        familles: familles,
        classes: classes,
        secteurs: secteurs,
        varieties: varieties,
        annonceurs: annonceurs,
        marques: marques,
        produits: produits,
        media: media,
        base: base,
        date_debut: date1,
        date_fin: date2,

      });

      console.log('response marché', response)
      set({
        PartMarche: response.data,
        loadingMarche: false,
      });

    } catch (error) {
      //console.log(error);
    }








  },

  loadingMarque: false,

  getTop20Marques: async (
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
    base
  ) => {
    set({ loadingMarque: true })
    try {
      set({ isloading: true })
      let response = await axios.post(`${PORT3}/${media}/dashboard/${base}/${parametre}`, {
        email: email,
        supports: supports,
        familles: familles,
        classes: classes,
        secteurs: secteurs,
        varieties: varieties,
        annonceurs: annonceurs,
        marques: marques,
        produits: produits,
        media: media,
        base: base,
        date_debut: date1,
        date_fin: date2,
      });

      // console.log('rangs',rangs)
      // console.log('media',media)
      // console.log('base',base)
     // console.log('response', response)
      set({
        Top20marques: response.data,
        loadingMarque: false,
      });
      set({ isloading: false })


    } catch (error) {
      //console.log(error);
    }
  },
  loadingProduit: false,
  getTop20Produits: async (
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
    base
  ) => {
    set({ loadingProduit: true })
    try {
      set({ isloading: true })
      let response = await axios.post(`${PORT3}/${media}/dashboard/${base}/${parametre}`, {
        email: email,
        supports: supports,
        familles: familles,
        classes: classes,
        secteurs: secteurs,
        varieties: varieties,
        annonceurs: annonceurs,
        marques: marques,
        produits: produits,
        media: media,
        base: base,
        date_debut: date1,
        date_fin: date2,

      });
      //console.log('response 20 produits', response)
      set({
        Top20produits: response.data,
        loadingProduit: false
      });
      set({ isloading: false })


    } catch (error) {
      //console.log(error);
    }
  },
  loadingFormat: false,
  getRepartitionFormat: async (
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
    base
  ) => {
    set({ loadingFormat:true})
    try {
      set({ isloading: true })
      let response = await axios.post(`${PORT3}/${media}/dashboard/${base}/${parametre}`, {
        email: email,
        supports: supports,
        familles: familles,
        classes: classes,
        secteurs: secteurs,
        varieties: varieties,
        annonceurs: annonceurs,
        marques: marques,
        produits: produits,
        media: media,
        base: base,
        date_debut: date1,
        date_fin: date2,

      });
      console.log('response format', response)
      set({
        FormatRepartition: response.data,
        loadingFormat: false,
      });
      set({ isloading: false })

    } catch (error) {
      //console.log(error);
    }
  },
  loadingAnnonceurSupport: false,
  getAnnonceursParSupport: async (
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
    base
  ) => {
    set({ loadingAnnonceurSupport: true })
    try {
      set({ isloading: true })
      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
        email: email,
        supports: supports,
        familles: familles,
        classes: classes,
        secteurs: secteurs,
        varieties: varieties,
        annonceurs: annonceurs,
        marques: marques,
        produits: produits,
        media: media,
        base: base,
        date_debut: date1,
        date_fin: date2,
      });
      // console.log("response",response)
      set({
        AnnonceurParSupport: response.data,
        loadingAnnonceurSupport: false
      });
      set({ isloading: false })


    } catch (error) {
      //console.log(error);
    }
  },
  loagingCreationAnnonceur: false,
  getCreationParAnnonceur: async (
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
    base
  ) => {
    set({ loagingCreationAnnonceur: true })
    try {
      set({ isloading: true })
      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
        email: email,
        supports: supports,
        familles: familles,
        classes: classes,
        secteurs: secteurs,
        varieties: varieties,
        annonceurs: annonceurs,
        marques: marques,
        produits: produits,
        media: media,
        base: base,
        date_debut: date1,
        date_fin: date2,

      });
      console.log("response CreationParAnnonceur", response)
      set({
        CreationParAnnonceur: response.data,
        loagingCreationAnnonceur: false
      });
      set({ isloading: false })


    } catch (error) {
      //console.log(error);
      set({
        CreationParAnnonceur: [],
        loagingCreationAnnonceur: false
      });
    }
  },
  getDureeTotalDiffusion: async (
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
    base
  ) => {
    try {

      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
        supports: supports,
        email: email,
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
      //console.log('response duree', response)
      if (Number(response.data[0].total) > 3600) {
        set({ DureeTotal: (Number(response.data[0].total) / 3600).toFixed(2) + " H" });
      } else {
        set({ DureeTotal: Number(response.data[0].total) + " s" });
      }
    } catch (error) {
      //console.log(error);
    }

  },
  getDureeTotalDiffusionLastYear: async (
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
  ) => {
    try {

      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
        supports: supports,
        email: email,
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
      
      if (Number(response.data[0].total) > 3600) {
        set({ DureeTotalLastYear: (Number(response.data[0].total)/3600).toFixed(2) + " H" });
      } else {
        set({ DureeTotalLastYear: Number(response.data[0].total) + " s" });
      }

    } catch (error) {
      //console.log(error);
    }

  },

  getDureeTotalMoyenne: async (
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
    parametre
  ) => {
    try {

      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
        supports: supports,
        email: email,
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
      //console.log('duree moyenne', (Number(response.data[0].proportion)) + "s")
      if(Number(response.data[0].proportion) > 3600){
        
        set({ DureeMoyenne:(Number(response.data[0].proportion) / 3600).toFixed(2) + " H" });
       }else{
         set({ DureeMoyenne:(Number(response.data[0].proportion).toFixed(2)) + " s" });
       }

    } catch (error) {
      //console.log(error);
    }

  },
  getDureeTotalMoyenneLastYear: async (
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
    parametre
  ) => {
    try {

      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
        supports: supports,
        email: email,
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
      //console.log('duree moyenne last', response)
      if(Number(response.data[0].proportion) >3600){
        
       set({ DureeMoyenneLastYear:(Number(response.data[0].proportion) / 3600).toFixed(2) + " H" });
      }else{
        set({ DureeMoyenneLastYear:(Number(response.data[0].proportion).toFixed(2)) + " s" });
      }
      //set({ DureeMoyenneLastYear: Number(response.data[0].proportion).toFixed(2) });

    } catch (error) {
      //console.log(error);
    }
  },

  getPicCommunication: async (
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
    parametre
  ) => {
    try {
      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
        supports: supports,
        email: email,
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
      //console.log("pic", response.data[0].interval_start)
      set({ PicCommunication: response.data[0] });

    } catch (error) {
      //console.log(error);
    }




  },
  getPicCommunicationLastYear: async (
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
    parametre
  ) => {
    try {
      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
        supports: supports,
        email: email,
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
      //console.log("pic", response)
      if(response.data[0]){
        set({ PicCommunicationLastYear: response.data[0] });
      }else{
        set({ PicCommunicationLastYear: {
          count: 0,
          interval_start: "--:--",
          interval_end: "--:--",} });
      }
     

    } catch (error) {
      //console.log(error);
    }




  },
  DiffusionParCreation:0,
  getDiffusionParCreation: async (
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
    parametre
  ) => {
    try {
      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
        supports: supports,
        email: email,
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
      //console.log("response",response.data)
     set({ DiffusionParCreation: Number(response.data[0].average).toFixed(0) });

    } catch (error) {
      //console.log(error);
    }




  },
  DiffusionParCreationLastYear:0,
  getDiffusionParCreationLastYear: async (
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
    parametre
  ) => {
    try {
      let response = await axios.post(`${PORT3}/${media}/dashboard/${parametre}`, {
        supports: supports,
        email: email,
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
      
      set({ DiffusionParCreationLastYear: Number(response.data[0].average).toFixed(0) });

    } catch (error) {
      //console.log(error);
    }




  },
   RepartitionParType:[],
   isloadingRepatitionType:false,
  getRepartitionParType: async (
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
    base
  ) => {
    set({isloadingRepatitionType:true})
    try {
      let response = await axios.post(`${PORT3}/${media}/dashboard/${base}/${parametre}`, {
        supports: supports,
        email: email,
        familles: familles,
        classes: classes,
        secteurs: secteurs,
        varieties: varieties,
        annonceurs: annonceurs,
        marques: marques,
        produits: produits,
        date_debut:date1,
        date_fin: date2,

      });
      console.log("response type",response)
      
      set({ 
        RepartitionParType:response.data,
        isloadingRepatitionType:false
       });

    } catch (error) {
      //console.log(error);
    }




  },
  RepartitionParVersion:[],
  isloadingRepartitionParVersion:false,
 getRepartitionParVersion: async (
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
   base
 ) => {
   set({isloadingRepartitionParVersion:true})
   try {
     let response = await axios.post(`${PORT3}/${media}/dashboard/${base}/${parametre}`, {
       supports: supports,
       email: email,
       familles: familles,
       classes: classes,
       secteurs: secteurs,
       varieties: varieties,
       annonceurs: annonceurs,
       marques: marques,
       produits: produits,
       date_debut:date1,
       date_fin: date2,

     });
     console.log("response version",response)
     
     set({ 
      RepartitionParVersion:response.data,
      isloadingRepartitionParVersion:false
      });

   } catch (error) {
     //console.log(error);
   }




 },
  sendDownloadLink: async (
    email,
    date1,
    date2,
    media,
    annonceurs,
    produits,
    varietes,
    marques,
    familles,
    classes,
    secteurs,
  ) => {
    try {
      set({ ExportExcelPending: true })
      let response = await axios.post(`${PORT}/${media}/excel`, {
        email: email,
        date_debut: date1,
        date_fin: date2,
        annonceurs_ids: annonceurs,
        produits_ids: produits,
        marques_ids: marques,
        familles_ids: familles,
        classes_ids: classes,
        secteurs_ids: secteurs,
        varietes_ids: varietes
      })
      // console.log("response excel",response)
      set({
        ExportExcelPending: false,
        DisplayEmailSent: true
      })
    } catch (error) {

    }

  },

  formatDateToFrench: (dateString) => {
    // Define an array of French month abbreviations
    const frenchMonths = [
      "Jan", "Fév", "Mars", "Avr", "Mai", "Juin",
      "Juil", "Août", "Sept", "Oct", "Nov", "Déc"
    ];

    // Parse the input date string into a Date object
    const date = new Date(dateString);

    // Ensure the date is valid
    if (isNaN(date.getTime())) {
      // throw new Error("Invalid date format");
      return `${dateString}`;
    }

    // Extract day, month, and year
    const day = date.getDate() + ",";
    const monthIndex = date.getMonth(); // Months are zero-based (0 = January)
    const year = date.getFullYear();

    // Get the French month abbreviation
    const monthAbbreviation = frenchMonths[monthIndex];

    // Format the date as "Fév 4 2025"
    return `${monthAbbreviation} ${day} ${year}`;
  }

}))





