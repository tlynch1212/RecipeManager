import React from 'react'
import {
  CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm,
  CFormGroup, CTextarea, CInput, CInputRadio, CLabel, CRow, CListGroupItem, CListGroup
} from '@coreui/react'
import Loading from '../components/Loading'
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'
import uuid from 'uuid';
import * as ApiConnector from '../api/ApiConnector';

const CreateRecipe = () => {
  const [Name, setName] = React.useState('');
  const [CurrentIngredient, setCurrentIngredient] = React.useState('');
  const [Instructions, setInstructions] = React.useState('');
  const [IsPublic, setPublic] = React.useState(false);
  const [Ingredients, setIngredients] = React.useState([]);
  const [IngredientsKeys, setIngredientsKeys] = React.useState([]);

  const { getAccessTokenSilently } = useAuth0();
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    
    let token = '';

    getAccessTokenSilently({
        audience: `https://recipemanager.com/api`,
        scope: "read:user",
      }).then((response) => {
        token = response
      });

  function GetVisibility(isPublic) {
    if (isPublic) {
      return IsPublic;
    }else {
      return !IsPublic;
    }
  }
  function setPublicTrue() {
    setPublic(true);
  }
  function setPublicFalse() {
    setPublic(false);
  }

  function addName(event) {
    setName(event.target.value);
  }
  function addInstructions(event) {
    setInstructions(event.target.value);
  }

  function addIngredient() {
    let newIngredientList = [...Ingredients];
    newIngredientList.push(CurrentIngredient);
    setIngredients(newIngredientList);
    addIngredientKey();
    setCurrentIngredient('');
  }

  function addIngredientKey() {
    let key = uuid.v4();
    let newIngredientKeyList = [...IngredientsKeys];
    newIngredientKeyList.push(key);
    setIngredientsKeys(newIngredientKeyList);
  }


  function addCurrentIngredient(event) {
    setCurrentIngredient(event.target.value);
  }


  function createRecipe() {
    let recipe = {
      Name: Name,
      Instructions: Instructions,
      IsPublic: IsPublic,
      Ingredients: Ingredients.map((item) => {
        return {
          value: item
        }
      })
    }

    ApiConnector.createRecipe(recipe, token).then((response) => {
      if (response.status === 200){
        alert("Success!");
      }
    });


  };

  function deleteIngredient(key) {
    let newIngredientList = [...Ingredients];
    var indexKey = IngredientsKeys.indexOf(key);
    newIngredientList.splice(indexKey, 1);
    setIngredients(newIngredientList);
    deleteIngredientKey(key);
  };

  function deleteIngredientKey(key) {
    let newIngredientList = [...IngredientsKeys];
    var indexKey = newIngredientList.indexOf(key);
    newIngredientList.splice(indexKey, 1);
    setIngredientsKeys(newIngredientList);
  };

  return (
    <CRow>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            Create New Recipe
            </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="Name">Recipe Name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="Name" name="Name" onChange={addName} placeholder="Enter Recipe Name" />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="Instructions">Instructions</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea
                    onChange={addInstructions}
                    name="Instructions"
                    id="Instructions"
                    rows="9"
                    placeholder="Enter the instructions to create this new recipe"
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Visibility</CLabel>
                </CCol>
                <CCol md="9">
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio custom id="inline-radio1" onChange={setPublicTrue} name="inline-radios" value="public" checked={GetVisibility(true)} />
                    <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Public</CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio custom id="inline-radio2" onChange={setPublicFalse} name="inline-radios" value="private" checked={GetVisibility(false)} />
                    <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Private</CLabel>
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Add to Ingredients</CLabel>
                </CCol>
                <CCol md="9">
                  <CFormGroup row>
                    <CCol md="6">
                      <CInput id="AddIngredient" name="AddIngredient" onChange={addCurrentIngredient} value={CurrentIngredient} placeholder="Ingredient" />
                    </CCol>
                    <CCol xs="12" md="2">
                      <CButton type="button" size="sm" onClick={addIngredient}
                        disabled={CurrentIngredient === "" ? true : false} color="success">Add</CButton>
                    </CCol>
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Ingredients</CLabel>
                </CCol>
                <CCol md="6" >
                  <CListGroup key={Ingredients.length + "list"}>
                    {Ingredients.map((item, index) => (
                      <CListGroupItem className="justify-content-between">
                        {item}
                        <CButton type="button" className="float-right" size="sm" onClick={() => deleteIngredient(IngredientsKeys[index])}>Delete</CButton>
                      </CListGroupItem>
                    ))}
                  </CListGroup>
                </CCol>
              </CFormGroup>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="lg" onClick={createRecipe}
              disabled={(Name === '' || Ingredients.length === 0 || Instructions === '')}
              color="primary"> Create</CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default withAuthenticationRequired(CreateRecipe, {
  onRedirecting: () => <Loading />,
});
