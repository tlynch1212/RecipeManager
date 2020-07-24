import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CButton
} from '@coreui/react';
import AlertModel from './AlertModel';

const RecipeBrowser = (props) => {
  const [IsOpen, setIsOpen] = React.useState(false);
  const [Recipe, setRecipe] = React.useState(null);

  const seeDetails = (recipe) => {
    setRecipe(recipe);
    setIsOpen(true);
  }

  return (
    <CRow>
      {Recipe != null ? <AlertModel size="xl"
        isOpen={IsOpen}
        onClose={() => setIsOpen(!IsOpen)}
        color='info'
        Message={
          <span>
            <CRow>
              <CCol md="5">
                <h6>Instructions</h6>
              </CCol>
              <CCol>
                {Recipe.instructions}
              </CCol>
            </CRow>
            <hr></hr>
            <CRow>
              <CCol md="5">
                <h6>Ingredients</h6>
              </CCol>
              <CCol>
                {Recipe.ingredients.map((ingredient) => (
                  <CRow>
                    <CCol>
                      {ingredient.value}
                    </CCol>
                  </CRow>
                ))}
              </CCol>
            </CRow>
          </span>
        }
        Title={Recipe.name}>
      </AlertModel> : null}

      {props.Recipes != null ? props.Recipes.map((recipe) => (
        <CCol md="3">
          <CCard>
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
                <CCol md="9">
                  <h5>{recipe.name}</h5>
                </CCol>
                <CCol md="3">
                  <CButton color="info" onClick={() => seeDetails(recipe)}>Details</CButton>
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