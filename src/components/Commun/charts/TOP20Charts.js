import * as React from 'react';

import {CustomDataLabelFamilles, CustomDataLabelAnnonceurs,CustomDataLabelMarques,CustomDataLabelProduits, CustomDataLabelAnnonceurParSupport,
  CustomDataLabelCreationParAnnonceur} from '../../Commun/charts/BarCharts';
import { Row, Col } from "react-bootstrap";
import { PieChartVelson,PieChartRepartitionFormat }from '../charts/PieChart';


export default function GridDemo() {
    



  return (
    <div >    
    <Row>
    <Col md={6}>
    <CustomDataLabelFamilles />
    </Col>
    <Col md={6}>
    <CustomDataLabelAnnonceurs/>
    </Col>
</Row>
    <Row>
    <Col md={6}>
      <CustomDataLabelMarques/>
    </Col>
    <Col md={6}>
    <CustomDataLabelProduits/>
    
    </Col>
    {/* <TreeMap/> */}
    
    </Row>
    <Row>
    <Col md={6}>
    {/* <DiffColorTreemap/> */}
    < PieChartVelson/>
    </Col>
    <Col  md={6}>
    {/* <TreemapRepartitionFormat/> */}
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
   </div>
    
  );
}

