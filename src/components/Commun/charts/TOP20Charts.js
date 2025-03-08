import React, { useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
import { PieChartVelson } from '../charts/PieChart';
import { BarchartShadcn } from "./BarChartNew"
import { UsePigeDashboardStore } from 'store/dashboardStore/PigeDashboardStore';
import { UseGraphStore } from 'store/GraphStore';
import InteractiveLineChart from './DiffusionEvolutionChart';
export default function GridDemo({ date1, date2, media, base }) {
  const { setFamillesOptions,
    FamillesOptions,
    setAnnonceurOptions,
    setMarqueOptions,
    setProduitsOptions,
    AnnonceurOptions,
    MarqueOptions,
    setFormatOptions,
    setTypeOptions,
    TypeOptions,
    VersionOptions,
    setVersionOptions,
    ProduitsOptions,
    setMarcheOptions,
    setAnnonceurSupportOptions,
    AnnonceurSupportOptions,
    setCreationParAnnonceurOptions,
    CreationParAnnonceurOptions,
    getEvolutionData,
    MarcheOptions,
    FormatOptions,
    loadingEvolution,
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
    loadingFamille,
    loadingAnnonceur,
    loadingMarche,
    loadingMarque,
    loadingProduit,
    loadingFormat,
    loadingAnnonceurSupport,
    loagingCreationAnnonceur,
    RepartitionParType,
    getRepartitionParType,
    isloadingRepatitionType,
    setunifiedGraphStructure,
    RepartitionParVersion,
    isloadingRepartitionParVersion,
    getRepartitionParVersion,
  } = UsePigeDashboardStore((state) => state)
  const top20familleModified = Top20famillesSectorielles?.map((e) => {
    return { name: e.Famille_Lib, proportion: e.proportion, total: Number(e.total).toFixed(2), average: e.average }
  })
  const Top20AnnonceursModified = Top20Annonceurs?.map((e) => { return { name: e.Annonceur_Lib, proportion: e.proportion, total:Number(e.total).toFixed(1), average: e.average } })

  const top20marquemodified = Top20marques?.map((e) => {
    return { name: e.Marque_Lib, proportion: e.proportion, total:Number(e.total).toFixed(2), average: e.average }
  }
  )
  const Top20produitsmodified = Top20produits?.map((e) => {
    return { name: e.Produit_Lib, proportion: e.proportion, total: Number(e.total).toFixed(2), average: e.average }
  }
  )
  const AnnonceurParSupportModified = AnnonceurParSupport?.map((e) => {
    return { name: e.Support_Lib, proportion: e.proportion, total:Number(e.annonceur_count).toFixed(2) , average: e.average_ratio }
  })
  const CreationParAnnonceurModified = CreationParAnnonceur?.map((e) => {
    return { name: e.Annonceur_Lib, proportion: e.proportion, total:Number(e.count).toFixed(2), average: e.average_ratio }
  })
  const PartMarcheModified = PartMarche?.map((e) => {
    return { name: e.Support_Lib, proportion: e.proportion, total:Number(e.total).toFixed(2), average: e.average }
  })

  const FormatRepartitionModified = FormatRepartition?.map((e) => {
    return { name: e.Format, proportion: e.proportion,
       total:Number(e.total).toFixed(2), average: e.average }
  })
  // console.log('FormatRepartitionModified', FormatRepartition, FormatRepartitionModified)

  const RepartitionParTypeModified = RepartitionParType?.map((e) => {
    return { name: e.Type, proportion: e.proportion, total: Number(e.total).toFixed(2), average: e.average }
  })
  const RepartitionParVersionModified = RepartitionParVersion?.map((e) => {
    return { name: e.Version, proportion: e.proportion, total: Number(e.total).toFixed(2), average: e.average }
  })
  
  return (
    <div>
      <InteractiveLineChart
        base={base}
        ChangeBaseFunction={getEvolutionData}
        parametre="evolution"
        isloading={loadingEvolution}
      />
      <Row id="section2">
        <Col md={6}>
          <BarchartShadcn date1={date1} date2={date2}
            title={`Top ${FamillesOptions.length} Familles Sectorielles`}

            data={FamillesOptions}
            media={media}
            options={top20familleModified}
            SetOptionFunction={setFamillesOptions}
            ChangeBaseFunction={getTop20famillesSectorielles}
            filters="familles"
            parametre="top20famille"
            isloading={loadingFamille}
            heightgraph={FamillesOptions.length*29.5 +10}

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
            isloading={loadingAnnonceur}
            heightgraph={AnnonceurOptions.length*29.5 +10}
          />
        </Col>
      </Row>
      <Row id="section3" className='mt-4 mb-4 '>
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
            isloading={loadingMarque}
            heightgraph={MarqueOptions.length*29.5 +10}
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
            isloading={loadingProduit}
            heightgraph={ProduitsOptions.length*29.5 +10}

          />
        </Col>
      </Row>
      <Row id="section4" className='mb-4'>
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
            isloading={loadingAnnonceurSupport}
            heightgraph={AnnonceurSupportOptions.length*29.5 +10}
            grapgname=""
          />
        </Col>
        <Col md={6} >
          <BarchartShadcn date1={date1} date2={date2}
            title="Créations uniques par annonceur"
            data={CreationParAnnonceurOptions}
            media={media}
            options={CreationParAnnonceurModified}
            SetOptionFunction={setCreationParAnnonceurOptions}
            ChangeBaseFunction={getCreationParAnnonceur}
            filters="Créations uniques"
            parametre="creationparannonceur"
            isloading={loagingCreationAnnonceur}
            heightgraph={CreationParAnnonceurOptions.length*29.5 +10}
            

          />
        </Col>
      </Row>

      <Row id="section5" className="mt-4 mb-4"> {/* Add g-2 for spacing */}
        <Col md={6}> {/* Each graph takes 1/3 of the width */}
          <PieChartVelson
            title="Part Marché"
            date1={date1}
            date2={date2}
            data={PartMarcheModified}
            SetOptionFunction={setMarcheOptions}
            ChangeBaseFunction={getPrtMarchet}
            parametre="repartitionmarche"
            filter="Marché"
            initialOptions={MarcheOptions}
            isloading={loadingMarche}
          />
        </Col>
        <Col md={6}> {/* Each graph takes 1/3 of the width */}
          <PieChartVelson
            title="Répartition par Format"
            date1={date1}
            date2={date2}
            data={FormatRepartitionModified}
            SetOptionFunction={setFormatOptions}
            ChangeBaseFunction={getRepartitionFormat}
            parametre="repartitionformat"
            filter="Format"
            initialOptions={FormatOptions}
            isloading={loadingFormat}
          />
        </Col>

      </Row>
      {media !== "presse" && (
      <Row id="section6" className="mt-4">   
          <Col md={6}>
            <PieChartVelson
              title="Répartition par Type"
              date1={date1}
              date2={date2}
              data={RepartitionParTypeModified}
              SetOptionFunction={setTypeOptions}
              ChangeBaseFunction={getRepartitionParType}
              parametre="type"
              filter="Type"
              initialOptions={TypeOptions}
              isloading={isloadingRepatitionType}
            />
          </Col>
        
        <Col md={6}>
          <PieChartVelson
            title="Répartition par Version"
            date1={date1}
            date2={date2}
            data={RepartitionParVersionModified}
            SetOptionFunction={setVersionOptions}
            ChangeBaseFunction={getRepartitionParVersion}
            parametre="repartitionversion"
            filter="version"
            initialOptions={VersionOptions}
            isloading={isloadingRepartitionParVersion}
          />
        </Col>

      </Row>
    )}
    </div>

  );
}

