import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol
} from '@coreui/react';

const RecipeBrowser = (props) => {
  return (
    <CRow>
      {props.Recipes != null ? props.Recipes.map((recipe) => (
        <CCol md="3">
          <CCard onClick={() => { alert('clickeds') }}>
              {/*<CRow>
                  <CCol md="12">
                  <CCardImg src={'avatars/6.jpg'}
                    height="200px"
                    width="200px"
                    alt="admin@bootstrapmaster.com" >
                  </CCardImg>
                </CCol>
              </CRow>*/}
              <CCardHeader>
                <CRow>
                  <CCol md="12">
                    <h5>{recipe.name}</h5>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol md="3">
                    <h6>Instructions</h6>
                  </CCol>
                  <CCol>
                    {recipe.instructions.substring(0, 200).trim() + "..."}
                  </CCol>
                </CRow>
              </CCardBody>
          </CCard>
        </CCol>
      )) : null}
    </CRow>

      )
}

export default RecipeBrowser;