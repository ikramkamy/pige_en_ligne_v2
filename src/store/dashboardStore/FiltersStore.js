import { create } from 'zustand'
import axios from 'axios';
const PORT = "https://immar-media.com/"
//const PORT="http://localhost/pigeonligne"
import dayjs from "dayjs";
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

  // usePrevilegesSupport_radio:[],
  // usePrevilegeschainetv:[],
  // usePrevilegesFamilles:[],
  // usePrevilegesClasse:[],
  // usePrevilegesSecteur:[],
  // usePrevilegesProduit:[],
  // usePrevilegesVarietes:[],
  // usePrevilegesAnnonceurs:[],
  // usePrevilegesMarques:[],



  rang: [],
  base: '',
  rangs: [],
  media: '',
  typeVeille: '',
  date1: "",
  date2: "",

  SideBarFilterPosition: "-100%",
  //veille_diffusion:"",
  veille_diffusion: "premiere",
  pageSize: 50,
  setPageSize: (size) => {
    set({ pageSize: size })
  },

  dataTableShow: true,
  setDataTableShow: (e) => {
    console.log("att data presse", e)
    set({ dataTableShow: e })
  },
  showDataGridIfNotEmpty: true,
  setShowDataGridIfNotEmpty: (e) => {
    set({ showDataGridIfNotEmpty: e })
  },
  showDataGrid: false,
  setShowDataGrid: (e) => {
    console.log('att data line loading', e)
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
  getFilters: async (
    media,
    user_id,
    usePrevilegesSupport_radio,
    usePrevilegeschainetv,
    usePrevilegesFamilles,
    usePrevilegesClasse,
    usePrevilegesSecteur,
    usePrevilegesVarietes,
    usePrevilegesProduit,
    usePrevilegesAnnonceurs,
    usePrevilegesMarques,
    userPrevilegesVeille,
    page
  ) => {
    try {
      console.log("page",page)
      set({ isLoading: true });
      console.log("usePrevilegesSupport_radio", usePrevilegesSupport_radio)

      let response = await axios.post(`${PORT}/getfilters2.php`, {
        media: media,
        filters: 'filters',
      });
      console.log("response filters", response)

      if(page !== "veille") {
       console.log("calling pige + dashboard filters")
        var prevfamilleIDS = usePrevilegesFamilles.map((e) => e.famille_id)
        var famillesPrev = response.data.data.familles.filter(
          (elem) => prevfamilleIDS.includes(elem.CodeFamille))
        // console.log('fam prev',famillesPrev)
  
        var FamillePrevIds = famillesPrev.map((elem) => elem.CodeFamille)
        //console.log("FamillePrevIds", FamillePrevIds)
  
        var prevclassesIDS = usePrevilegesClasse.map((e) => e.classe_id)
        var classesPrev = response.data.data.classes.filter((elem) =>
          prevclassesIDS.includes(elem.Groupe_Id)
        )
        //console.log('classes with prev', classesPrev)
        var secteursprevIDS = usePrevilegesSecteur.map((e) => e.secteur_id)
        var secteurPrev = response.data.data.categories.filter((elem) => secteursprevIDS.includes(elem.Categorie_Id))
        //console.log('secteurs prev', usePrevilegesSecteur)
  
        var varietiesprevIDS = usePrevilegesVarietes.map((e) => e.variete_id)
        var varitiesPrev = response.data.data.varieties.filter((elem) => varietiesprevIDS.includes(elem.Variete_id))
        //console.log("var prev", varitiesPrev)
        //console.log("usePrevilegesAnnonceurs", usePrevilegesAnnonceurs)
        var annonceursprevIDS = usePrevilegesAnnonceurs.map((e) => e.annonceur_id)
        var annonceursprevnames = usePrevilegesAnnonceurs.map((e) => e.annonceur)
        //console.log("annonceur names", annonceursprevnames)
        //  I will use names instead
        //var annonceurPrev=response.data.data.annonceurs.filter((elem)=>annonceursprevIDS.includes(elem.Annonceur_Id)) 
        var annonceurPrev = response.data.data.annonceurs.filter((elem) =>
          annonceursprevIDS.includes(elem.Annonceur_Id))
        console.log("ann prev", annonceurPrev)
        //console.log('usePrevilegesMarques', usePrevilegesMarques)
        var marquesprevIDS = usePrevilegesMarques.map((e) => e.marque_id)
        var marquePrev = response.data.data.marques.filter((elem) => marquesprevIDS.includes(elem.Marque_id))
        //console.log("mar prev", marquePrev)
        //console.log('usePrevilegesProduit', usePrevilegesProduit)
        var produitsprevIDE = usePrevilegesProduit.map((e) => e.produit_id)
        //console.log("produitsprevIDE", produitsprevIDE)
        var produitPrev = response.data.data.produits.filter((elem) =>
          produitsprevIDE.includes(elem.Produit_Id))
        // console.log("prod prev",produitPrev)
        console.log("selectedItems  filtered", annonceurPrev) 
        console.log("selectedItems ids ",  annonceurPrev.map((e)=>e.Annonceur_Id)) 

        
        
        set({

          familles: famillesPrev,
          Filterfamilles: FamillePrevIds,
          classes: classesPrev,
          Filterclasses: classesPrev,
  
          secteurs: secteurPrev,
          Filtersecteurs: secteurPrev,

          varieties: varitiesPrev,
          Filtervarieties: varitiesPrev,

          annonceurs: annonceurPrev,
          Filterannonceurs: annonceurPrev,
          Filterannonceursids:annonceurPrev.map((e)=>e.Annonceur_Id),

          marques: marquePrev,
          produits: produitPrev,
          Filterproduits: produitPrev,

          Filtermarques: marquePrev,
  
        });
        switch (media) {
          case 'presse':
            let IDSSupports = response.data.data.supports.map((elem) => elem.support_id)
            set({
              supports: response.data.data.supports,
              Filtersupports: IDSSupports,
            })
            // console.log("presse supports are ready to go",response.data.data.supports)
            break;
          case 'radio':
            var prevSupporIDS = usePrevilegesSupport_radio.map((e) => e.media_id)
            var prevradioChannels = response.data.data.supports.filter((elem) =>
              prevSupporIDS.includes(elem.support_id))
            var chaineRadioIds = prevradioChannels.map((elem) => elem.support_id)
            set({
              supports: prevradioChannels,
              Filtersupports: chaineRadioIds
            })
            console.log("radio", prevradioChannels)
            break;
          case 'television':
            // console.log("media",media)
            var prevSupporIDS = usePrevilegeschainetv.map((e) => e.media_id)
            var prevradioChannels = response.data.data.supports.filter((elem) =>
              prevSupporIDS.includes(elem.support_id))
            var chaineivIds = prevradioChannels.map((elem) => elem.support_id)
            set({
              supports: prevradioChannels,
              Filtersupports: chaineivIds,

            })
            //console.log("tv",prevradioChannels)
            break;
        }
      }else {
        
    //pour la veille les priviléges sont appliquer que les familles
          var prevfamilleIDS = userPrevilegesVeille.map((e) => e.CodeFamille)       
          var famillesPrev = response.data.data.familles.filter(
          (elem) => prevfamilleIDS.includes(elem.CodeFamille))
          console.log("veille familles",famillesPrev.slice(0,10) )        
          var FamillePrevIds = famillesPrev.map((elem) => elem.CodeFamille)
          set({
        
            familles: famillesPrev.slice(0,10),
            Filterfamilles: FamillePrevIds.slice(0,10),
   
            classes:response.data.data.classes,
            Filterclasses: response.data.data.classes,
    
            secteurs: response.data.data.categories,
            Filtersecteurs: response.data.data.categories,
    
            varieties: response.data.data.varieties,
            Filtervarieties: response.data.data.varieties,
    
            annonceurs: response.data.data.annonceurs,
            Filterannonceurs: response.data.data.annonceurs,
    
            marques: response.data.data.marques,
            produits: response.data.data.marques,
            Filterproduits: response.data.data.produits,
            Filtermarques: response.data.data.produits,
    
          });
      }
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
        var classesByFamilles = classes.filter((elem) => ids.includes(elem.CodeFamille));
        var classesids = classesByFamilles.map((elem) => elem.Groupe_Id)

        var secteurByFamille = secteurs.filter((elem) => ids.includes(elem.famille_id));
        var secteurids = secteurByFamille.map((elem) => elem.Categorie_Id);



        var varietiesByFamille = varieties.filter((elem) => ids.includes(elem.famille_id));
        var varietiesids = varietiesByFamille.map((elem) => elem.Variete_id);


        var produitsByFamille = produits.filter((elem) => ids.includes(elem.famille_id));
        var produitsids = produitsByFamille.map((elem) => elem.Produit_Id);


        //var annonceurIdsinproduits=produitsByFamille.map((elem)=>elem.Annonceur_id)
        var annonceurIdsinproduits = [...new Set(produitsByFamille.map((elem) => elem.Annonceur_id))];
        var annonceursByFamille = annonceurs.filter((elem) => annonceurIdsinproduits.includes(elem.Annonceur_Id));
        console.log("annonceursByFamille", annonceursByFamille)


        var marquesIdsinproduits = [...new Set(produitsByFamille.map((elem) => elem.Marque_id))];
        var marquesByFamille = marques.filter((elem) => marquesIdsinproduits.includes(elem.Marque_id))

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

        var secteurByClasse = secteurs.filter((elem) => ids.includes(elem.Groupe_Id));
        var secteurids = secteurByClasse.map((elem) => elem.Categorie_Id);




        var varietiesByClasse = varieties.filter((elem) => ids.includes(elem.classe_id));
        var varietiesids = varietiesByClasse.map((elem) => elem.Variete_id);



        var produitsByClasse = produits.filter((elem) => ids.includes(elem.classe_id));
        var produitsids = produitsByClasse.map((elem) => elem.Produit_Id);



        var annonceurIdsinproduits = [...new Set(produitsByClasse.map((elem) => elem.Annonceur_id))]
        var annonceursByClassse = annonceurs.filter((elem) => annonceurIdsinproduits.includes(elem.Annonceur_Id));
        console.log("annonceursByClassse", annonceursByClassse)


        var marquesIdsinproduits = [...new Set(produitsByClasse.map((elem) => elem.Marque_id))]
        var marquesByClassse = marques.filter((elem) => marquesIdsinproduits.includes(elem.Marque_id))

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


        var varietiesBySecteur = varieties.filter((elem) => ids.includes(elem.Categorie_id));
        var varietiesids = varietiesBySecteur.map((elem) => elem.Variete_id);


        var produitsBySecteur = produits.filter((elem) => ids.includes(elem.secteur_id));
        var produitsids = produitsBySecteur.map((elem) => elem.Produit_Id);


        var annonceurIdsinproduits = [...new Set(produitsBySecteur.map((elem) => elem.Annonceur_id))]
        var annonceursBySecteur = annonceurs.filter((elem) => annonceurIdsinproduits.includes(elem.Annonceur_Id));

          console.log('annonceursBySecteur',annonceursBySecteur)
        var marquesIdsinproduits = [...new Set(produitsBySecteur.map((elem) => elem.Marque_id))]
        var marquesBySecteur = marques.filter((elem) => marquesIdsinproduits.includes(elem.Marque_id))

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
        var produitsByVariete = produits.filter((elem) => ids.includes(elem.Variete_id));
        var produitsids = produitsByVariete.map((elem) => elem.Produit_Id);
        var annonceurIdsinproduits = [...new Set(produitsByVariete.map((elem) => elem.Annonceur_id))];
        var annonceursByVariete = annonceurs.filter((elem) => annonceurIdsinproduits.includes(elem.Annonceur_Id));
        console.log("annonceursByVariete",annonceursByVariete)
        var marquesIdsinproduits = [...new Set(produitsByVariete.map((elem) => elem.Marque_id))]
        var marquesByVariete = marques.filter((elem) => marquesIdsinproduits.includes(elem.Marque_id))

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
        var annonceursIds = [...new Set(produitsSelected.map((elem) => elem.Annonceur_id))];
        var marquesIds = [...new Set(produitsSelected.map((elem) => elem.Marque_id))];


        var annonceursByProduit = annonceurs.filter((elem) => (annonceursIds.includes(elem.Annonceur_Id)))
        var marquesByProduit = marques.filter((elem) => marquesIds.includes(elem.Marque_id))

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

        var marquesByAnnonceur = marques.filter((elem) => ids.includes(elem.Annonceur_id))
        var produitsByAnnonceur = produits.filter((elem) => ids.includes(elem.Annonceur_id))


        var marquesIds = [...new Set(marquesByAnnonceur.map((elem) => elem.Marque_id))];
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

        var produitsByMarque = produits.filter((elem) => ids.includes(elem.Marque_id))
        var produitsids = produitsByMarque.map((elem) => elem.Produit_Id);

        var annonceurByMarqueIds = [...new Set(produitsByMarque.map((elem) => elem.Annonceur_id))]
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
    console.log('here', e)
    set({ SideBarFilterPosition: e })
  },
}))