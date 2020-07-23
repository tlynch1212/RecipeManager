import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol
} from '@coreui/react';

const RecipeViewer = (props) => {
  return (
    <CRow>
      {props.Recipes.map((recipe) => (
        <CCol md="6">
          <CCard>
            <CCardHeader>
              <h4>{recipe.name}</h4>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md="5">
                  <h6>Instructions</h6>
                </CCol>
                <CCol>
                  {recipe.instructions}
                </CCol>
              </CRow>
              <CRow>
                <CCol md="5">
                  <h6>Ingredients</h6>
                </CCol>
                <CCol>
                  {recipe.ingredients.map((ingredient) => (
                    <CRow>
                      <CCol>
                        {ingredient.value}
                      </CCol>
                    </CRow>
                  ))}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      ))}
    </CRow>
  )
}

export default RecipeViewer;