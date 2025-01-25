import { create } from 'zustand'
import axios from 'axios';
const PORT = "https://pige-dev.immar-media.com/api/index.php"
export const UseFiltersStore = create((set, get) => ({
  supports: [],
  familles: [],
  classes: [],
  secteurs: [],
  varieties: [],
  annonceurs: [],
  marques: [],
  produits: [],

  Filtersupports: [],
  Filterclassesids: [],
  Filterfamilles: [],
  Filterclasses: [],

  Filtersecteurs: [],
  Filtersecteursids: [],

  Filtervarieties: [],
  Filtervarietiesids: [],


  Filterannonceurs: [],
  Filterannonceursids: [],

  Filtermarques: [],
  Filtermarquesids: [],

  Filterproduits: [],
  Filterproduitsids: [],

  rang: [],
  base: '',
  rangs: [],
  media: '',
  typeVeille: '',
  date1: "",
  date2: "",

  SideBarFilterPosition: "-100%",
 
  veille_diffusion: "first",
  pageSize: 50,
  setPageSize: (size) => {
    set({ pageSize: size })
  },

  dataTableShow: true,
  setDataTableShow: (e) => {
    //console.log("att data presse", e)
    set({ dataTableShow: e })
  },
  showDataGridIfNotEmpty: true,
  setShowDataGridIfNotEmpty: (e) => {
    set({ showDataGridIfNotEmpty: e })
  },
  showDataGrid: false,
  setShowDataGrid: (e) => {
    //console.log('att data line loading', e)
    set({ showDataGrid: e })
  },
  setVeilleDiffusion: async (i) => {

    try {
      set({ veille_diffusion: i[0] })

    } catch (error) {
      console.log(error);
    }
  },
  loadingshow: false,
  setDateRang: async (e, v) => {
    set({
      date1: e,
      date2: v,
    })
  },
  ResetAllFilters: () => {
    set({
      supports: [],
  familles: [],
  classes: [],
  secteurs: [],
  varieties: [],
  annonceurs: [],
  marques: [],
  produits: [],

  Filtersupports: [],
  Filterclassesids: [],
  Filterfamilles: [],
  Filterclasses: [],

  Filtersecteurs: [],
  Filtersecteursids: [],

  Filtervarieties: [],
  Filtervarietiesids: [],


  Filterannonceurs: [],
  Filterannonceursids: [],

  Filtermarques: [],
  Filtermarquesids: [],

  Filterproduits: [],
  Filterproduitsids: [],
      rangs: [],

    })
  },
  setLoadingshow: (show) => {
    set({ loadingshow: show })
  },
  setRangFilter: (ids) => {
    set({ rangs: ids })

  },
  setMediaValue: async (i) => {

    try {
      set({ media: i[0] })

    } catch (error) {
      console.log(error);
    }



  },
  setTypeVeilleValue: async (i) => {

    try {
      set({ typeVeille: i[0] })

    } catch (error) {
      console.log(error);
    }



  },
  setBase: async (base) => {

    try {
      set({ base: base })

    } catch (error) {
      console.log(error);
    }



  },
  FilterLoading:false,
  getFilters: async (
  email,
  media,
  date1,
  date2
  ) => {
    try { 
      set({FilterLoading:true})
      let response=await axios.post(`${PORT}/${media}/filters`,{
        email:email,
        date_debut:date1,
        date_fin:date2
      })
        set({
          supports: response.data?.supports,
          Filtersupports: response.data.supports?.map((e)=>e.Support_Id),
          familles: response.data.familles,
          Filterfamilles: response.data.familles.map((e)=>e.Famille_Id),
          classes: response.data.classes,
          Filterclasses: response.data.classes,  
          secteurs: response.data.secteurs,
          Filtersecteurs: response.data.secteurs,

          varieties: response.data.varietes,
          Filtervarieties: response.data.varietes,

          annonceurs: response.data.annonceurs,
          Filterannonceurs: response.data.annonceurs,

          Filterannonceursids:response.data.annonceurs.map((e)=>e.Annonceur_Id),
          marques:response.data.marques,
          Filtermarques: response.data.marques,
          Filtermarquesids :response.data.marques.map((e)=>e.Marque_Id) ,
          produits: response.data.produits,
          Filterproduits: response.data.produits,
          Filterproduitsids:response.data.produits.map((e)=>e.Produit_Id)
        });
        set({FilterLoading:false})
        //console.log('response filter', Filtermarquesids,)
    } catch (error) {
      console.log(error);
    }
  },
  //no longer using this function
  getUserPrevilege: async (user_id) => {

    try {
      let response = await axios.post(`${PORT}login_v2.php`, {
        getAutorisation: "getAutorisation",
      })
      //   let response = await axios.get('https://immar-media.com/login_v2.php')
      console.log("user_previleges", response)
      //  console.log("previleges",response , user_id)
      //  set({
      //   usePrevilegesSupport_radio:response.data.data.auth_5,
      //   usePrevilegeschainetv:response.data.data.auth_6,
      //   usePrevilegesFamilles:response.data.data.auth_7,
      //   usePrevilegesClasse:response.data.data.auth_8,
      //   usePrevilegesSecteur:response.data.data.auth_9,
      //   usePrevilegesVarietes:response.data.data.auth_10,
      //   usePrevilegesProduit:response.data.data.auth_11,       
      //   usePrevilegesAnnonceurs:response.data.data.auth_12,
      //   usePrevilegesMarques:response.data.data.auth_13,

      //  })



    } catch (error) {
      console.log(error);
    }
  },
  setFiltersupports: (ids) => {
    set({ Filtersupports: ids })
  },
  setbaseGraphe: async (base) => {
    set({ baseGraphe: base })
  },

  setFilterfamilles: async (ids, classes, secteurs, varieties, produits, annonceurs, marques) => {
   
    try {
      if (ids == []) {

        var classesByFamilles = [];
        var secteurByFamille = [];
        var varietiesByFamille = [];
        var annonceursByFamille = [];
        var produitsByFamille = [];
        var marquesByFamille = [];

      } else {
        var classesByFamilles = classes.filter((elem) => ids.includes(elem.Famille_Id));
        var classesids = classesByFamilles.map((elem) => elem.Classe_Id)

        var secteurByFamille = secteurs.filter((elem) => ids.includes(elem.Famille_Id));
        var secteurids = secteurByFamille.map((elem) => elem.Classe_Id);

        var varietiesByFamille = varieties.filter((elem) => ids.includes(elem.Famille_Id));
        var varietiesids = varietiesByFamille.map((elem) => elem.Variété_Id);


        var produitsByFamille = produits.filter((elem) => ids.includes(elem.Famille_Id));
        var produitsids = produitsByFamille.map((elem) => elem.Produit_Id);


        //var annonceurIdsinproduits=produitsByFamille.map((elem)=>elem.Annonceur_id)
        var annonceurIdsinproduits = [...new Set(produitsByFamille.map((elem) => elem.Annonceur_Id))];
        var annonceursByFamille = annonceurs.filter((elem) => annonceurIdsinproduits.includes(elem.Annonceur_Id));
       


        var marquesIdsinproduits = [...new Set(produitsByFamille.map((elem) => elem.Marque_Id))];
        var marquesByFamille = marques.filter((elem) => marquesIdsinproduits.includes(elem.Marque_Id))

      }

      set({
        Filterfamilles: ids,

        Filterclasses: classesByFamilles,
        Filterclassesids: classesids,

        Filtersecteurs: secteurByFamille,
        Filtersecteursids: secteurids,


        Filtervarieties: varietiesByFamille,
        Filtervarietiesids: varietiesids,



        Filterproduits: produitsByFamille,
        Filterproduitsids: produitsids,

        Filterannonceurs: annonceursByFamille,
        Filterannonceursids: annonceurIdsinproduits,

        Filtermarques: marquesByFamille,
        Filtermarquesids: marquesIdsinproduits,

      })

    } catch (error) {
    }
  },
  setFilterclasses: (ids, classes, secteurs, varieties, produits, marques, annonceurs) => {

    try {
      if (ids == []) {

        var secteurByClasse = [];
        var varietiesByClasse = varieties;
        var produitsByClasse = produits;

      } else {

        var secteurByClasse = secteurs.filter((elem) => ids.includes(elem.Classe_Id));
        var secteurids = secteurByClasse.map((elem) => elem.Secteur_Id);


        var varietiesByClasse = varieties.filter((elem) => ids.includes(elem.Classe_Id));
        var varietiesids = varietiesByClasse.map((elem) => elem.Variété_Id);



        var produitsByClasse = produits.filter((elem) => ids.includes(elem.Classe_Id));
        var produitsids = produitsByClasse.map((elem) => elem.Produit_Id);



        var annonceurIdsinproduits = [...new Set(produitsByClasse.map((elem) => elem.Annonceur_Id))]
        var annonceursByClassse = annonceurs.filter((elem) => annonceurIdsinproduits.includes(elem.Annonceur_Id));
        //console.log("annonceursByClassse", annonceursByClassse)


        var marquesIdsinproduits = [...new Set(produitsByClasse.map((elem) => elem.Marque_Id))]
        var marquesByClassse = marques.filter((elem) => marquesIdsinproduits.includes(elem.Marque_Id))

      }

      set({
        // Filterfamilles:ids,
        Filterclassesids: ids,

        Filtersecteurs: secteurByClasse,
        Filtersecteursids: secteurids,

        Filtervarieties: varietiesByClasse,
        Filtervarietiesids: varietiesids,


        Filterproduits: produitsByClasse,
        Filterproduitsids: produitsids,

        Filterannonceurs: annonceursByClassse,
        Filterannonceursids: annonceurIdsinproduits,


        Filtermarques: marquesByClassse,
        Filtermarquesids: marquesIdsinproduits,

      })

    } catch (error) {

    }

  },

  setFiltersecteur: (ids, varieties, produits, marques, annonceurs) => {

    try {
      if (ids == []) {



        var varietiesBySecteur = [];
        var produitsBySecteur = [];
        var annonceursBySecteur = [];
        var marquesBySecteur = [];

      } else {


        var varietiesBySecteur = varieties.filter((elem) => ids.includes(elem.Secteur_Id));
        var varietiesids = varietiesBySecteur.map((elem) => elem.Variété_Id);


        var produitsBySecteur = produits.filter((elem) => ids.includes(elem.Secteur_Id));
        var produitsids = produitsBySecteur.map((elem) => elem.Produit_Id);


        var annonceurIdsinproduits = [...new Set(produitsBySecteur.map((elem) => elem.Annonceur_Id))]
        var annonceursBySecteur = annonceurs.filter((elem) => annonceurIdsinproduits.includes(elem.Annonceur_Id));

          //console.log('annonceursBySecteur',annonceursBySecteur)
        var marquesIdsinproduits = [...new Set(produitsBySecteur.map((elem) => elem.Marque_Id))]
        var marquesBySecteur = marques.filter((elem) => marquesIdsinproduits.includes(elem.Marque_Id))
      }

      set({

        Filtersecteursids: ids,

        Filtervarieties: varietiesBySecteur,
        Filtervarietiesids: varietiesids,


        Filterproduits: produitsBySecteur,
        Filterproduitsids: produitsids,

        Filterannonceurs: annonceursBySecteur,
        Filterannonceursids: annonceurIdsinproduits,

        Filtermarques: marquesBySecteur,
        Filtermarquesids: marquesIdsinproduits,
      })

    } catch (error) {

    }

  },
  setFiltervariete: (ids, produits, annonceurs, marques) => {

    try {
      if (ids == []) {
        var produitsByVariete = produits;
        var annonceursByVariete = [];
        var marquesByVariete = [];
      } else {
        var produitsByVariete = produits.filter((elem) => ids.includes(elem.Variété_Id));
        var produitsids = produitsByVariete.map((elem) => elem.Produit_Id);
        var annonceurIdsinproduits = [...new Set(produitsByVariete.map((elem) => elem.Annonceur_Id))];
        var annonceursByVariete = annonceurs.filter((elem) =>annonceurIdsinproduits.includes(elem.Annonceur_Id));
        //console.log("annonceursByVariete",annonceursByVariete)
        var marquesIdsinproduits = [...new Set(produitsByVariete.map((elem) => elem.Marque_Id))]
        var marquesByVariete = marques.filter((elem) => marquesIdsinproduits.includes(elem.Marque_Id))

      }
      set({
        Filtervarietiesids: ids,


        Filterproduits: produitsByVariete,
        Filterproduitsids: produitsids,


        Filterannonceurs: annonceursByVariete,
        Filterannonceursids: annonceurIdsinproduits,


        Filtermarques: marquesByVariete,
        Filtermarquesids: marquesIdsinproduits,
      })

    } catch (error) {

    }

  },
  setFilterproduit: (ids, produitsSelected, annonceurs, marques) => {

    try {
      if (ids == []) {
        var annonceursByProduit = [];
        var marquesByProduit = [];


      } else {
        var annonceursIds = [...new Set(produitsSelected.map((elem) => elem.Annonceur_Id))];
        var marquesIds = [...new Set(produitsSelected.map((elem) => elem.Marque_Id))];


        var annonceursByProduit = annonceurs.filter((elem) => (annonceursIds.includes(elem.Annonceur_Id)))
        var marquesByProduit = marques.filter((elem) => marquesIds.includes(elem.Marque_Id))

      }

      set({
        Filterproduitsids: ids,

        Filterannonceurs: annonceursByProduit,
        Filterannonceursids: annonceursIds,


        Filtermarques: marquesByProduit,
        Filtermarquesids: marquesIds,

      })

    } catch (error) {

    }

  },
  setFilterannonceur: (ids, marques, produits) => {

    try {
      if (ids == []) {

        var marquesByAnnonceur = [];
        var produitsByAnnonceur = [];

      } else {

        var marquesByAnnonceur = marques.filter((elem) => ids.includes(elem.Annonceur_Id))
        var produitsByAnnonceur = produits.filter((elem) => ids.includes(elem.Annonceur_Id))


        var marquesIds = [...new Set(marquesByAnnonceur.map((elem) => elem.Marque_Id))];
        var produitsids = produitsByAnnonceur.map((elem) => elem.Produit_Id);


      }

      set({

        Filterannonceursids: ids,

        Filtermarques: marquesByAnnonceur,
        Filtermarquesids: marquesIds,


        Filterproduits: produitsByAnnonceur,
        Filterproduitsids: produitsids,

      })

    } catch (error) {

    }

  },
  setFiltermarque: (ids, annonceurs, produits) => {

    try {
      if (ids == []) {

        var annonceurByMarque = [];
        var produitsByMarque = [];

      } else {

        var produitsByMarque = produits.filter((elem) => ids.includes(elem.Marque_Id))
        var produitsids = produitsByMarque.map((elem) => elem.Produit_Id);

        var annonceurByMarqueIds = [...new Set(produitsByMarque.map((elem) => elem.Annonceur_Id))]
        var annonceurByMarque = annonceurs.filter((elem) => annonceurByMarqueIds.includes(elem.Annonceur_Id))



      }

      set({
        Filtermarquesids: ids,


        Filterproduits: produitsByMarque,
        Filterproduitsids: produitsids,

        Filterannonceurs: annonceurByMarque,
        Filterannonceursids: annonceurByMarqueIds,


      })

    } catch (error) {

    }

  },
  ManageSideBarfilterDisplay: async (e) => {
    set({ SideBarFilterPosition: e })
  },
}))