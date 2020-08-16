import React from 'react'
import {
  CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm,
  CFormGroup, CInput, CInputRadio, CLabel, CRow, CTextarea} from '@coreui/react'
import Loading from '../components/Loading'
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'
import * as ApiConnector from '../api/ApiConnector';
import AlertModel from '../components/AlertModel';
import ListForm from '../components/ListForm';

var jwtDecode = require('jwt-decode');

const CreateRecipe = (props) => {
  const state = props.location.state;
  const [Id] = React.useState(state ? state.recipe.id : '');
  const [Name, setName] = React.useState(state ? state.recipe.name : '');
  const [Description, setDescription] = React.useState(state ? state.recipe.description : '');
  const [Instructions, setInstructions] = React.useState(state ? state.recipe.instructions : []);
  const [IsPublic, setPublic] = React.useState(state ? state.recipe.isPublic :  false);
  const [Ingredients, setIngredients] = React.useState(state ? state.recipe.ingredients : []);
  const [CreateSuccess, setCreateSuccess] = React.useState(false);

  const { getAccessTokenSilently } = useAuth0();
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  let token = state ? state.accessToken : '';
  let decodedToken;

  if (token === '') {
    getAccessTokenSilently({
      audience: audience,
      scope: "read:user",
    }).then((response) => {
      token = response;
      decodedToken = jwtDecode(token);
    });
  }else {
    decodedToken = jwtDecode(token);
  }


  function getIndredients(){
    return Ingredients;
  }
  function getInstructions(){
    return Instructions;
  }

  function GetVisibility(isPublic) {
    if (isPublic) {
      return IsPublic;
    } else {
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

  function addDescription(event) {
    setDescription(event.target.value);
  }

  function createRecipe() {
    let recipe = {
      UserId: decodedToken.sub,
      Description: Description,
      Name: Name,
      Instructions: Instructions,
      IsPublic: IsPublic,
      Ingredients: Ingredients
    }

    ApiConnector.createRecipe(recipe, token).then((response) => {
      if (response.status === 200) {
        setCreateSuccess(true);
        setIngredients([]);
        setName('');
        setInstructions([]);
        setPublic(false);
      }
    });


  };

  function updateRecipe() {
    let recipe = {
      Id: Id,
      UserId: state.recipe.UserId,
      Description: Description,
      Name: Name,
      Instructions: Instructions,
      IsPublic: IsPublic,
      Ingredients: Ingredients
    }

    ApiConnector.updateRecipe(recipe, token).then((response) => {
      if (response.status === 200) {
        setCreateSuccess(true);
        setIngredients([]);
        setName('');
        setInstructions([]);
        setPublic(false);
      }
    });


  };

  return (
    <CRow>
      <CCol xs="12" md="12"> 
        <AlertModel
          isOpen={CreateSuccess}
          onClose={() => setCreateSuccess(!CreateSuccess)}
          color='success'
          Message={Id !== '' ? 'Your new recipe has been updated!' : 'Your new recipe has been created! You can find it in the My Recipes page.'}
          Title={'Success!'} >
        </AlertModel>
        <CCard>
          <CCardHeader>
            {Id !== '' ? 'Update Recipe' : 'Create New Recipe'}
            </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="Name">Recipe Name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="Name" name="Name" onChange={addName} value={Name} placeholder="Enter recipe name" />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="Description">Description</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea
                    onChange={addDescription}
                    value={Description}
                    name="Description"
                    id="Description"
                    rows="9"
                    placeholder="Enter the description"
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
              <ListForm ListAddName={'Add To Instructions'} getListItems={() => getInstructions()} 
                  setListItems={(list) => setInstructions(list)} ListName={'Insructions'} ListItems={Instructions} placeHolder={'Enter an instruction'}/>
              <ListForm ListAddName={'Add To Ingredients'} getListItems={() => getIndredients()}
                  setListItems={(list) => setIngredients(list)} ListName={'Ingredients'} ListItems={Ingredients} placeHolder={'Enter an ingredient'}/>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="lg" onClick={ Id !== '' ? updateRecipe : createRecipe}
              disabled={(Name === '' || Ingredients.length === 0 || Instructions === '' || Description === '')}
              color="primary"> {Id !== '' ? 'Update' : 'Create'}</CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default withAuthenticationRequired(CreateRecipe, {
  onRedirecting: () => <Loading />,
});
