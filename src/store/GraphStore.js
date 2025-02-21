import { create } from 'zustand'
const PORT = "https://pige.immar-media.com/api/index.php";
import axios from 'axios';
export const UseGraphStore = create((set, get) => ({

    AnnonceursOptions: [],
    MarcheOptions: [],
    FormatOptions: [],
    AnnonceurSupportOptions: [],
    CreationParAnnonceurOptions: [],
    FamillesOptions: [],
    AnnonceurOptions: [],
    MarqueOptions: [],
    ProduitsOptions: [],
    EvolutionData: [],
    graphColor: "#2196f3",
    baseGraphs: {
        "evolution": "",
        "top20famille": "",
        "top20annonceur": "",
        "top20marque": "",
        "top20produit": "",
        "repartitionmarche": "",
        "repartitionformat": "",
        "creationParAnnonceur": "",
        "annonceurSupport": "",
        "annonceurparsupport":"",
        "creationparannonceur":""
    },

    setAnnonceursOptions: (options) => {
        set({ AnnonceursOptions: options })
    },
    setMarcheOptions: (options) => {
        set({ MarcheOptions: options })
    },
    setAnnonceurSupportOptions: (options) => {
        set({ AnnonceurSupportOptions: options })
    },
    setCreationParAnnonceurOptions: (options) => {
        set({ CreationParAnnonceurOptions: options })
    },
    setFamillesOptions: (options) => {
        set({ FamillesOptions: options })
    },
    setAnnonceurOptions: (options) => {
        set({ AnnonceurOptions: options })
    },
    setMarqueOptions: (options) => {
        set({ MarqueOptions: options })
    }
    ,
    setFormatOptions: (options) => {
        set({ FormatOptions: options })
    },
    TypeOptions:[],
    setTypeOptions: (options) => {
        set({ TypeOptions: options })
    },
    VersionOptions:[],
    setVersionOptions: (options) => {
        set({ VersionOptions: options })
    },
    setProduitsOptions: (options) => {
        set({ ProduitsOptions: options })
    },
    loadingEvolution:false,
    getEvolutionData: async (
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
        base) => {
         set({loadingEvolution:true})
        try {

            let response = await axios.post(`${PORT}/${media}/dashboard/${parametre}/${base}`, {
                email: email,
                familles: familles,
                classes: classes,
                supports: supports,
                secteurs: secteurs,
                varieties: varieties,
                annonceurs: annonceurs,
                marques: marques,
                produits: produits,
                date_debut: date1,
                date_fin: date2,
            })
            console.log('resposne', response)

            set({ EvolutionData: response.data,
                loadingEvolution:false,
             })


        } catch (error) {
            console.log(error);
        }
    },
    seCodeColor: (colorbase) => {
        set({ graphColor: colorbase })
    },

    secondsToHoursObject(seconds) {
        if (typeof seconds !== 'number' || seconds < 0) {
            throw new Error("Input must be a non-negative number.");
        }

        const hours = (seconds / 3600);
        return `${hours.toFixed(2)}`;
    },
    setBaseGraphs: (key, value) => {
        set((state) => ({
            baseGraphs: {
                ...state.baseGraphs,
                [key]: value,
            },
        }));
    },
}))