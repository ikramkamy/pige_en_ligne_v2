import * as React from 'react';

import {
  CustomDataLabelFamilles, CustomDataLabelAnnonceurs,
  CustomDataLabelMarques, CustomDataLabelProduits, CustomDataLabelAnnonceurParSupport,
  CustomDataLabelCreationParAnnonceur
} from '../../Commun/charts/BarCharts';
import { Row, Col } from "react-bootstrap";
import { PieChartVelson } from '../charts/PieChart';
import { BarchartShadcn, BarChartComponent } from "./BarChartNew"
import { UsePigeDashboardStore } from 'store/dashboardStore/PigeDashboardStore';
import { CaseLower } from 'lucide-react';
import { UseGraphStore } from 'store/GraphStore';
import InteractiveLineChart from './DiffusionEvolutionChart'
export default function GridDemo({ date1, date2, media, base }) {
  const { setFamillesOptions,
    FamillesOptions,
    setAnnonceurOptions,
    setMarqueOptions,
    setProduitsOptions,
    AnnonceurOptions,
    MarqueOptions,
    ProduitsOptions,
    setAnnonceurSupportOptions,
    AnnonceurSupportOptions,
    setCreationParAnnonceurOptions,
    CreationParAnnonceurOptions

  } = UseGraphStore((state) => state)
  const {
    Top20famillesSectorielles,
    getTop20famillesSectorielles,
    getTop20Annonceurs,
    getPrtMarchet,
    getTop20Marques,
    getTop20Produits,
    getRepartitionFormat,
    getAnnonceursParSupport,
    getCreationParAnnonceur,
    CreationParAnnonceur,
    Top20Annonceurs, Top20marques,
    Top20produits,
    AnnonceurParSupport,
    PartMarche,
    FormatRepartition,
  } = UsePigeDashboardStore((state) => state)
  const top20familleModified = Top20famillesSectorielles.map((e) => {
    return { name: e.Famille_Lib, proportion: e.proportion, total: Number(e.total).toFixed(2), average: e.average }
  })
  const Top20AnnonceursModified = Top20Annonceurs.map((e) => { return { name: e.Annonceur_Lib.toLowerCase(), proportion: e.proportion, total: e.total, average: e.average } })

  const top20marquemodified = Top20marques.map((e) => {
    return { name: e.Marque_Lib.toLowerCase(), proportion: e.proportion, total: e.total, average: e.average }
  }
  )
  const Top20produitsmodified = Top20produits.map((e) => {
    return { name: e.Produit_Lib.toLowerCase(), proportion: e.proportion, total: e.total, average: e.average }
  }
  )
  const AnnonceurParSupportModified = AnnonceurParSupport.map((e) => {
    return { name: e.Support_Lib, proportion: e.proportion, total: e.annonceur_count, average: e.average_ratio }
  })

  const CreationParAnnonceurModified = CreationParAnnonceur.map((e) => {
    return { name: e.Annonceur_Lib.toLowerCase(), proportion: e.proportion, total: e.count, average: e.average_ratio }
  })
  console.log("FamillesOptions", FamillesOptions)
  const PartMarcheModified = PartMarche.map((e) => {
    return { name: e.Support_Lib, proportion: e.proportion, total: e.total, average: e.average }
  })
  console.log("FormatRepartition", FormatRepartition)
  const FormatRepartitionModified = FormatRepartition?.map((e) => {
    return { name: e.Durée, proportion: e.proportion, total: e.total, average: e.average }
  })
  return (
    <div >

      <InteractiveLineChart base={base} />
      <Row>
        <Col md={6}>
          <BarchartShadcn date1={date1} date2={date2}
            title={`Top ${FamillesOptions.length} Familles Sectorielles`}

            data={FamillesOptions.length > 0 ? FamillesOptions : top20familleModified.slice(0, 5)}
            media={media}
            options={top20familleModified}
            SetOptionFunction={setFamillesOptions}
            ChangeBaseFunction={getTop20famillesSectorielles}
            filters="familles"
            parametre="top20famille"
          />
        </Col>

        <Col md={6}>

          <BarchartShadcn date1={date1} date2={date2}
            title={`Top ${AnnonceurOptions.length} annonceurs`}
            data={AnnonceurOptions}
            media={media}
            options={Top20AnnonceursModified}
            SetOptionFunction={setAnnonceurOptions}
            ChangeBaseFunction={getTop20Annonceurs}
            filters="annonceurs"
            parametre="top20annonceur"

          />
        </Col>
      </Row>
      <Row>
        <Col>
          < PieChartVelson
            title="Part Marché"
            date1={date1} date2={date2}
            data={PartMarcheModified}
            ChangeBaseFunction={getPrtMarchet}
            parametre="repartitionmarche"
          />
        </Col>
        <Col>

          < PieChartVelson
            title="Répartition par Format"
            date1={date1} date2={date2}
            data={FormatRepartitionModified}
            ChangeBaseFunction={getRepartitionFormat}
            parametre="repartitionformat"
          />

        </Col>


      </Row>
      <Row className='mt-4'>
        <Col md={6} >
          <BarchartShadcn date1={date1} date2={date2}
            title={`Top ${MarqueOptions.length} marques`}
            data={MarqueOptions}
            media={media}
            options={top20marquemodified}
            SetOptionFunction={setMarqueOptions}
            ChangeBaseFunction={getTop20Marques}
            filters="marques"
            parametre="top20marque"
          />
        </Col>
        <Col md={6} >
          <BarchartShadcn date1={date1} date2={date2}
            title={`Top ${ProduitsOptions.length} produits`}
            data={ProduitsOptions}
            media={media}
            options={Top20produitsmodified}
            SetOptionFunction={setProduitsOptions}
            ChangeBaseFunction={getTop20Produits}
            filters="produits"
            parametre="top20produit"

          />
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col md={6} >
          <BarchartShadcn date1={date1} date2={date2}
            title="Annonceurs actifs par support"
            data={AnnonceurSupportOptions}
            media={media}
            options={AnnonceurParSupportModified}
            SetOptionFunction={setAnnonceurSupportOptions}
            ChangeBaseFunction={getAnnonceursParSupport}
            filters="Annonceurs"
            parametre="annonceurparsupport"
          />
        </Col>
        <Col md={6} >
          <BarchartShadcn date1={date1} date2={date2}
            title="Créations uniques par annonceurs"
            data={CreationParAnnonceurOptions}
            media={media}
            options={CreationParAnnonceurModified}
            SetOptionFunction={setCreationParAnnonceurOptions}
            ChangeBaseFunction={getCreationParAnnonceur}
            filters="Créations uniques"
            parametre="creationparannonceur"

          />
        </Col>
      </Row>


      {/* <Row>
    
    
    <Col md={6}>
      <CustomDataLabelMarques/>
    </Col>
    <Col md={6}>
    <CustomDataLabelProduits/>
    
    </Col>
    
    
    </Row>
    <Row>
    <Col md={6}>
  
    < PieChartVelson/>
    </Col>
    <Col  md={6}>
   
    <PieChartRepartitionFormat/>
    </Col>
    </Row>

    <Row>

    <Col  md={6}>
    <CustomDataLabelAnnonceurParSupport/>
    </Col>
    <Col  md={6}>
    <CustomDataLabelCreationParAnnonceur/>
   </Col>
    </Row>
    */}


    </div>

  );
}

