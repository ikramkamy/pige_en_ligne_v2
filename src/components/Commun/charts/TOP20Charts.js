import * as React from 'react';

import {
  CustomDataLabelFamilles, CustomDataLabelAnnonceurs, CustomDataLabelMarques, CustomDataLabelProduits, CustomDataLabelAnnonceurParSupport,
  CustomDataLabelCreationParAnnonceur
} from '../../Commun/charts/BarCharts';
import { Row, Col } from "react-bootstrap";
import { PieChartVelson, PieChartRepartitionFormat } from '../charts/PieChart';
import { BarchartShadcn, BarChartComponent } from "./BarChartNew"
import { UsePigeDashboardStore } from 'store/dashboardStore/PigeDashboardStore';
import { CaseLower } from 'lucide-react';

export default function GridDemo({ date1, date2, media }) {
  const { Top20famillesSectorielles,
    CreationParAnnonceur,
    Top20Annonceurs, Top20marques,
    Top20produits,
    AnnonceurParSupport,
  } = UsePigeDashboardStore((state) => state)
  const top20familleModified = Top20famillesSectorielles.map((e) => {
    return { name: e.Famille_Lib, proportion: e.proportion, total: e.total, average: e.average }
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
  console.log("AnnonceurParSupport", CreationParAnnonceurModified,)
  return (
    <div >
      <Row>
        <Col md={6}>
          <BarchartShadcn date1={date1} date2={date2} title="Top 20 Familles Sectorielles"
            data={top20familleModified}
            media={media}
            options={CreationParAnnonceur}
          />
          {/* <CustomDataLabelFamilles /> */}
        </Col>

        <Col md={6}>
          {/* <CustomDataLabelAnnonceurs /> */}
          <BarchartShadcn date1={date1} date2={date2}
            title="Top 20 annonceurs"
            data={Top20AnnonceursModified}
            media={media}
            options={CreationParAnnonceur}

          />
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col md={6} >
          <BarchartShadcn date1={date1} date2={date2}
            title="Top 20 marques"
            data={top20marquemodified}
            media={media}
            options={CreationParAnnonceur}

          />
        </Col>
        <Col md={6} >
          <BarchartShadcn date1={date1} date2={date2}
            title="Top 20 produits"
            data={Top20produitsmodified}
            media={media}
            options={CreationParAnnonceur}

          />
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col md={6} >
          <BarchartShadcn date1={date1} date2={date2}
            title="Annonceurs actifs par suppor"
            data={AnnonceurParSupportModified}
            media={media}
            options={CreationParAnnonceur}

          />
        </Col>
        <Col md={6} >
          <BarchartShadcn date1={date1} date2={date2}
            title="Créations uniques par annonceurs"
            data={CreationParAnnonceurModified.slice(0,10)}
            media={media}
            options={CreationParAnnonceur}

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

