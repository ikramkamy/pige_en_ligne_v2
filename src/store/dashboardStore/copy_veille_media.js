import { create } from "zustand";
import axios from "axios";
import * as XLSX from 'xlsx';
import JSZip from "jszip";

const PORT = "https://immar-media.com"
//const PORT="http://localhost/pigeonligne"
const PORT2 = "https://immar-media.com/pub_online_rechercherv2.php?media="
const PORTSearch = "https://immar-media.com/pub_online_rechercherv2.php"
export const UseVeilleStore = create((set, get) => ({
  veilletvData: [],
  veilletvSearch: [{}],
  veilletvById: [{}],
  dataVeilleISFetched: false,
  ResetDataveilleFetched: () => {
    set({ dataVeilleISFetched: false })
  },
  getveilletvData: async (
    date1,
    date2,
    veille_diffusion,
    media,
    typeVeille,
    Filterfamilles,
    familles,
    Filtersupports,
    supports,
    classes,
    Filterclassesids,
    Filtersecteursids,
    secteurs,
    Filtervarietiesids,
    varieties,
    Filterannonceursids,
    annonceurs,
    Filtermarquesids,
    marques,
    Filterproduitsids,
    produits,
  ) => {
    // console.log("type ppub",veille_diffusion)
    // console.log("posting to path",`${PORT2}${media}`)
    let isResponseReady = false;
    console.log("param date", date1)
    console.log("param date", date2)
    console.log('param diffusion type', veille_diffusion)    
    set({ veilletvData: [] });
    const params = new URLSearchParams({
      diffusion: veille_diffusion,
      date1: date1,
      date2: date2,
    });
    const fullURL = `${PORT2}${media}?${params.toString()}`;
    console.log("Fetching data from:", fullURL);
    try {
     var data_veille=[]
      if(media!=='television'){
        let response = await axios.get("https://immar-media.com/pub_online_rechercherv2.php?"+ "&media=" 
          + media + "&diffusion=" + veille_diffusion + "&date1=" + date1 + "&date2=" + date2)
        data_veille=response.data
     
        
      }else{
        let response = await axios.post("https://immar-media.com/pub_online_rechercherv2.php",{
          'veille_diffusion':veille_diffusion,
          'date1':date1,
          'date2':date2,
          "Filtersupports":Filtersupports,
          "Filterfamilles":Filterfamilles,
          "Filterclassesids":Filterclassesids,
          "Filtersecteursids":Filtersecteursids,
          "Filtervarietiesids":Filtervarietiesids,
          "Filterannonceursids":Filterannonceursids,
          "Filtermarquesids":Filtermarquesids,
          "Filterproduitsids":Filterproduitsids,
        })
        data_veille=response.data
        }
     
  console.log('data_veille',data_veille)  
      //handeling empty filters list (it is never empty by defaul full)
      console.log(" Filtersupports", Filtersupports)
      console.log("support", supports)
      console.log('data before', response)
      let allFamilies = familles.map((e) => e.CodeFamille)
      console.log('all families', allFamilies)

      //let dataVeillesFilterdFamille=[];
      let familleIds_use = []
      if (Filterfamilles.length === 0) {
        // dataVeillesFilterdFamille= response.data?.filter((elem) =>
        //   allFamilies.includes(elem.Insertion_Famille_Id)
        // );
        familleIds_use = allFamilies;
      } else {
        familleIds_use = Filterfamilles;
        // dataVeillesFilterdFamille = response.data?.filter((elem) =>
        //   Filterfamilles.includes(elem.Insertion_Famille_Id)
        // );
      }
      let support_use = [];

      let all_spports = supports.map((e) => e.support_name)
      if (Filtersupports.length === 0) {
        support_use = all_spports;
      } else {
        let i = supports.filter((e) => Filtersupports.includes(e.support_id))
        support_use = i.map((e) => e.support_name);
        console.log('support_use liste', support_use)
      }
      // console.log("Filterclasses",Filterclasses)

      let Filterclasses_use = [];
      let all_classes = classes.map((e) => e.Groupe_Id)

      if (Filterclassesids.length === 0) {
        Filterclasses_use = all_classes;
      } else {
        Filterclasses_use = Filterclassesids;
      }
      

      let secteur_use = [];
      let allsecteurs = secteurs.map((e) => e.Categorie_Id)

      if (Filtersecteursids.length === 0) {
        secteur_use = allsecteurs;

      } else {
        secteur_use = Filtersecteursids;
      }

      let varities_use = [];
      let all_varities = varieties.map((e) => e.Variete_id)
      console.log("Filtervarietiesids", Filtervarietiesids)
      if (Filtervarietiesids.length === 0) {
        varities_use = all_varities;
      } else {
        varities_use = Filtervarietiesids;
      }
      let annonceur_use = []
      
      let all_annonceurs = annonceurs.map((e) => e.Annonceur_Id)
      if (Filterannonceursids.length === 0) {
        annonceur_use = all_annonceurs;
      } else {
        annonceur_use = Filterannonceursids;
      }
      console.log('add',all_annonceurs)

      let marques_use = []
      let all_marques = marques.map((e) => e.Marque_id)
      if (Filtermarquesids.length === 0) {
        annonceur_use = all_marques;
      } else {
        marques_use = Filtermarquesids;
      }
      let produit_use = []
      let all_produits = produits.map((e) => e.Produit_Id)
      if (Filterproduitsids.length === 0) {
        produit_use = all_produits;
      } else {
        produit_use == Filterproduitsids;
      }
      let dataFiltred=data_veille
        // let dataFiltred = response.data.filter((item => 1===1
        //   // familleIds_use.includes(item.Insertion_Famille_Id)
        //    //&& Filterclasses_use.includes(item.Insertion_Classe_Id)
        //   // && secteur_use.includes(item.Insertion_Secteur_Id) 
        //   //  && varities_use.includes(item.Insertion_Variete_Id) 
        //   //  && annonceur_use.includes(item.Insertion_Advertiser_Id)
        //   //  && marques_use.includes(item.Insertion_Brand_Id) 
        //   // &&
        //   // produit_use.includes(item.Insertion_Product_Id)
        //   // && support_use.some(support =>
        //   //   item.Insertion_Supports.split(',').map(s => s.trim()).includes(support)
        //   // )

        // ))

        //la fonction consomme bcp de resource
        // response.data.forEach((elem)=>{
        //   console.log("sopport list",elem.Insertion_Supports.split(",").map(s => s.trim()))
        // })
        
        console.log('type', typeVeille)
        switch (typeVeille) {
          case "BIL":
            console.log("BIL")
            dataFiltred.filter((item) => item.Insertion_Type == "BIL")
            set({ veilletvData: dataFiltred.filter((item) => item.Insertion_Type === "BIL") })
            break;
          case "autre":
            console.log("autre")
            // filterddata.filter((item)=>item.Insertion_Type !=="BIL")
            set({ veilletvData: dataFiltred.filter((item) => item.Insertion_Type !== "BIL") })
            break;
          case "":
            set({ veilletvData: dataFiltred })
            break;
        }
      console.log('dataFiltred new2', dataFiltred,Filterclasses_use)
      isResponseReady = true;
      console.log("isResponseReady ",isResponseReady )
      set({ dataVeilleISFetched: true })
      //set({ veilletvData: dataFiltred });
 
    } catch (error) {
      console.log(error);

    }
  },

  resetVeilletvdata: async () => {
    set({ veilletvData: [] });

  },
  filterVeilledata: async (data, familles, annonceurs, supports,
    supportsNames, varietes, classes, marques, secteurs, produits, media, veille_diffusion, date1, date2, type) => {
    //  console.log("familles veille filtering",familles)
    //  console.log("annonceurs veille filtering",annonceurs)
    //  console.log("support veille filtering",supports)
    //  console.log("supportsNames ",supportsNames)
    //  console.log("classes ",classes)

    var suportNamesForfiltering = supportsNames.filter((item) => supports.includes(item.support_id)).map((item) => item.support_name);
    console.log("suportNamesForfiltering", suportNamesForfiltering)
    try {
      let response = await axios.get(`${PORT2}${media}`,

        {
          params: {
            diffusion: veille_diffusion,
            date1: date1,
            date2: date2,
          }
        }
      );

      set({ veilletvDataFiltering: response.data });
      if (response.data.length > 0) {
        var filterddata = response.data.filter((item) =>
          (familles.includes(item.Insertion_Famille_Id) || familles.length === 0)
          && (annonceurs.includes(item.Insertion_Advertiser_Id) || annonceurs.length === 0)
          && (suportNamesForfiltering.some((supportName) => item.Insertion_Supports.split(',').map(name => name.trim()).includes(supportName)) || supports.length === 0)
          && (varietes.includes(item.Insertion_Variete_Id) || varietes.length === 0)
          && (classes.includes(item.Insertion_Classe_Id) || classes.length === 0)
          && (marques.includes(item.Insertion_Brand_Id) || marques.length === 0)
          && (secteurs.includes(item.Insertion_Secteur_Id) || secteurs.length === 0)
          && (produits.includes(item.Insertion_Product_Id) || produits.length === 0)

        )

        console.log("type de veille", type)
        switch (type) {
          case "BIL":
            console.log("BIL")
            filterddata.filter((item) => item.Insertion_Type == "BIL")
            set({ veilletvData: filterddata.filter((item) => item.Insertion_Type === "BIL") })
            break;
          case "autre":
            console.log("autre")
            // filterddata.filter((item)=>item.Insertion_Type !=="BIL")
            set({ veilletvData: filterddata.filter((item) => item.Insertion_Type !== "BIL") })
            break;
          case "":
            set({ veilletvData: filterddata })
            break;
        }
        // console.log("data",data)
        // console.log("datafilteredBytype",datafilteredBytype)
        // console.log("type",type)


        // set ({veilletvData: filterddata})

      } else {
        //set({veilletvData:[]})
      }

    } catch (error) {
      console.log(error);
    }
  },



  //to get filters of each media
  getVeilleSearch: async (
    date1,
    date2,
    veille_diffusion,
    media,
  ) => {
    try {
      let response = await axios.get(`${PORT2}${media}`,
        {
          params: {
            date1: date1,
            date2: date2,
            diffusion: veille_diffusion,
            search: 'data'
          }
        }
      );
      // console.log("veille diffusion", veille_diffusion)
      // console.log("posting to path for veille search",`${PORT2}${media}`)
       console.log('veille serach response', response)
      //set({veilletvSearch: response});
    } catch (error) {
      console.log(error);
    }
  },
  getVeilleById: async (
    date1,
    date2,
    veille_diffusion,
    media,
  ) => {
    try {

      let response = await axios.get(`${PORT2}${media}`,
        {
          params: {
            date1: date1,
            date2: date2,
            diffusion: veille_diffusion,
          }
        }
      );
      console.log("posting to path", `${PORT2}${media}`)
      console.log('veille By ID response', response)
      //set({veilletvById: response});
    } catch (error) {
      console.log(error);
    }


  },
  DownloadExlsxFile: async (filteredData, media) => {
    // Convert JSON data to worksheet
    const columns = [
      "Date_de_1ère_diffusion",
      "Annonceur",
      "Marque",
      "Produit",
      "Message",
      "Format",
      "Version",
      "Famille",
      "Classe",
      "Secteur",
      "Variété",
      "Id_message",
    ];

    console.log("data to export", filteredData)

    const dataToexport = filteredData.map((item) => ({
      "Date_de_1ère_diffusion": item["Insertion_Premiere"] || "",
      "Annonceur": item["Insertion_Advertiser_Name"] || "",
      "Marque": item["Insertion_Brand_Name"] || "",
      "Produit": item["Insertion_Product_Name"] || "",
      "Message": item["Insertion_Pub_Name"] || "",
      "Format": item["Insertion_Format"] || "",
      "Version": item["Insertion_Version"] || "",
      "Famille": item["Insertion_Famille_Name"] || "",
      "Classe": item["Insertion_Classe_Name"] || "",
      "Secteur": item["Insertion_Secteur_Name"] || "",
      "Variété": item["Insertion_Variete_Name"] || "",
      "Id_message": item["Insertion_Pub_Id"] || "",
    }));


    console.log("data to export", dataToexport)
    const worksheet = XLSX.utils.json_to_sheet(dataToexport, { header: columns });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'media_veille');

    // Write the workbook to file
    XLSX.writeFile(workbook, `veille_${media}.xlsx`);
  }
}))

