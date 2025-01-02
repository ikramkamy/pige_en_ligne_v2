import React, { Component } from "react";
import { Dropdown, Badge, Button, Form } from "react-bootstrap";
import AnchorTemporaryDrawer from '../FixedPlugin/SideDrawer'

function FixedPlugin({}) {


  return (
    <div className="fixed-plugin">
     
  
      <Dropdown>
      {/* <AnchorTemporaryDrawer   /> */}
        {/* <Dropdown.Toggle
          id="dropdown-fixed-plugin"
          variant=""
          className="text-white border-0 opacity-100"
        >
          <i className="fas fa-cogs fa-2x mt-1"></i>
        </Dropdown.Toggle> */}


      
        {/* <Dropdown.Menu className="bg-danger h-">
          <li className="adjustments-line d-flex align-items-center justify-content-between ">
            <p>Liste de Filtres</p>
            <Form.Check
              type="switch"
              id="custom-switch-1-image"
              checked={hasImage}
              onChange={setHasImage}
            />
          </li>
          <li className="adjustments-line mt-3">
      <MultipleSelectRangs/>
      <MultipleSelectBase/>
      <MultipleSelectSupports/>    
       <MultipleSelectFamilles />
       <MultipleSelectClasses />
       <MultipleSelectSecteurs/>
       <MultipleSelectVarieties/>
       <MultipleSelectAnnoneurs/>
       <MultipleSelectMarques/>
       <MultipleSelectProducts/> 
           
          </li>                          
          <li className="button-container">
            <div>
              <Button
                block
                className="btn-fill"
                href="http://www.creative-tim.com/product/light-bootstrap-dashboard-react"
                rel="noopener noreferrer"
                target="_blank"
                variant="info"
              >
              Appliquer
              </Button>
            </div>
          </li>
       
        </Dropdown.Menu> */}
      </Dropdown>
    </div>
  );
}

export default FixedPlugin;
