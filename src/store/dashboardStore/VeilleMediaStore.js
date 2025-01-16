import { create } from "zustand";
import axios from "axios";
import * as XLSX from 'xlsx';

const PORT = "https://pige-dev.immar-media.com/api/index.php"

export const UseVeilleStore = create((set, get) => ({
  veilletvData: [],
  veilletvSearch: [{}],
  veilletvById: [{}],
  dataVeilleISFetched: false,
  ShowSearchKey: false,

  setShowSearchKey: () => set((state) => ({ ShowSearchKey: !state.ShowSearchKey })),

  ResetDataveilleFetched: () => {
    set({ dataVeilleISFetched: false })
  },
  getVeilleCount: async (
    media,
    date1,
    date2,
    annonceurs_ids,
    marques_ids,
    produits_ids,
    familles_ids,
  ) => {
    try {
      let response = await axios.post(`${PORT}/${media}-veille-first/count`)
      console.log("response get data presse", response)
    } catch (error) {

    }
  },
  getveilletvData: async (
    email,
    date1,
    date2,
    media,
    veille_diffusion,
    Filterfamilles,
    Filterannonceursids,
    Filtermarquesids,
    Filterproduitsids,
  ) => {
    try {
      let response = await axios.post(`${PORT}/${media}-veille-${veille_diffusion}/table`, {
        email:email,
        date_debut: date1,
        date_fin: date2,
        annonceurs: Filterannonceursids,
        familles: Filterfamilles,
        marques: Filtermarquesids,
        produits: Filterproduitsids,
      })
      console.log('data_veille encours', response)
      set({
        veilletvData: response.data,
        dataVeilleISFetched: true
      })
      // switch (typeVeille) {
      //   case "BIL":
      //     console.log("BIL")
      //     dataFiltred.filter((item) => item.Insertion_Type == "BIL")
      //     set({ veilletvData: dataFiltred.filter((item) => item.Insertion_Type === "BIL") })
      //     break;
      //   case "autre":
      //     console.log("autre")
      //     // filterddata.filter((item)=>item.Insertion_Type !=="BIL")
      //     set({ veilletvData: dataFiltred.filter((item) => item.Insertion_Type !== "BIL") })
      //     break;
      //   case "":
      //     set({ veilletvData: dataFiltred })
      //     break;
      // }
    } catch (error) {
      console.log(error);
      set({ veilletvData: [] })

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

