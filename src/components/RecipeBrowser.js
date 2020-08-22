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
import * as ApiConnector from '../api/ApiConnector';
import JwtDecode from 'jwt-decode';
import { withRouter } from 'react-router-dom';
import { faTrash, faEdit, faInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RecipeBrowser = (props) => {
  const [IsOpen, setIsOpen] = React.useState(false);
  const [IsFavorited, setIsFavorited] = React.useState(false);
  const [IsRated, setIsRated] = React.useState(false);
  const [Recipe, setRecipe] = React.useState(null);
  const [Recipes, setRecipes] = React.useState(props.Recipes);
  const [UpdateSuccess, setUpdateSuccess] = React.useState(false);

  const editRecipe = (recipe) =>{
    props.history.push({pathname: '/create', state: {recipe: recipe, accessToken: props.AccessToken}});
  };

  const seeDetails = (recipe, accessToken) => {
    var user = JwtDecode(accessToken);
    ApiConnector.getUser(accessToken, user.sub).then((response) => {
      ApiConnector.getFavorite(accessToken,user.sub, recipe.id).then((recipeResponse) => {
        if (recipeResponse != null) {
            setIsFavorited(true);
        } else {
          setIsFavorited(false);
        }
        });

      ApiConnector.getRating(accessToken, response.id, recipe.id).then((rating) => {
        if (rating != null) {
          setIsRated(true);
        } else {
          setIsRated(false);
        }
      });
    });
    setRecipe(recipe);
    setIsOpen(true);
  }

  const addToMyRecipes = (recipe, accessToken) => {
    var user = JwtDecode(accessToken);
    ApiConnector.FavoriteRecipe(recipe.id, user.sub, accessToken).then(() => {
      ApiConnector.getRecipe(accessToken, recipe.id).then((response) => {
        if (Recipe.sharedWith !== response.sharedWith) {
          setIsFavorited(true);
        }
        setRecipe(response);
      });
    });

  }

  const closeModel = (isOpen) => {
    setIsOpen(isOpen);
    setIsRated(true);
    setIsFavorited(true);
  }

  const rateThisRecipe = (recipe, rating, accessToken) => {
    var user = JwtDecode(accessToken);
    ApiConnector.RateRecipe(recipe, user.sub, rating, accessToken);
    setIsRated(true);
  }

  const deleteRecipe = (accessToken, isOwned, recipe) => {
    var user = JwtDecode(accessToken);

    if (isOwned){
      ApiConnector.deleteRecipe(recipe, accessToken).then((response) => {
        if (response.status === 200) {
          setUpdateSuccess(true);
          ApiConnector.getRecipes(accessToken, user.sub).then((response) => {
            setRecipes(response);
          });
        }
      });
    }else {
      ApiConnector.unFavoriteRecipe(accessToken, user.sub, recipe.id).then((response) => {
        if (response.status === 200) {
          setUpdateSuccess(true);
          ApiConnector.getRecipes(accessToken, user.sub).then((response) => {
            setRecipes(response);
          });
        }
      });
    }
  }

  return (
    <CRow>
      <AlertModel
          isOpen={UpdateSuccess}
          onClose={() => setUpdateSuccess(!UpdateSuccess)}
          color='success'
          Message={'The recipe has been removed from your recipes!'}
          Title={'Success!'} >
        </AlertModel>
      {Recipe != null ? <AlertModel
        size="xl"
        isOpen={IsOpen}
        onClose={() => closeModel(!IsOpen)}
        color='info'
        Message={
          <span>
            {!IsFavorited ? <CButton color="primary" onClick={() => addToMyRecipes(Recipe, props.AccessToken)}>Add to My Recipes!</CButton> : null}
            <hr></hr>
            <CRow>
              <CCol md="3">
                <h6>Description</h6>
              </CCol>
              <CCol>
                {Recipe.description}
              </CCol>
            </CRow>
            <hr></hr>
            <CRow>
              <CCol md="5">
                <h6>Instructions</h6>
              </CCol>
              <CCol>
                {Recipe.instructions.map((instructions) => (
                  <CRow>
                    <CCol>
                      {instructions.value}
                    </CCol>
                  </CRow>
                ))}
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
            {!IsRated ?
              <span>
                <hr></hr>
                <CRow>
                  <CCol>
                    <h6>Like this recipe? Rate it below!</h6>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="2">
                    <CButton color="success" onClick={() => rateThisRecipe(Recipe, 1, props.AccessToken)}>1</CButton>
                  </CCol>
                  <CCol md="2">
                    <CButton color="success" onClick={() => rateThisRecipe(Recipe, 2, props.AccessToken)}>2</CButton>
                  </CCol>
                  <CCol md="2">
                    <CButton color="success" onClick={() => rateThisRecipe(Recipe, 3, props.AccessToken)}>3</CButton>
                  </CCol>
                  <CCol md="2">
                    <CButton color="success" onClick={() => rateThisRecipe(Recipe, 4, props.AccessToken)}>4</CButton>
                  </CCol>
                  <CCol md="2">
                    <CButton color="success" onClick={() => rateThisRecipe(Recipe, 5, props.AccessToken)}>5</CButton>
                  </CCol>
                </CRow>
              </span> : null}
          </span>
        }
        Title={Recipe.name}>
      </AlertModel> : null}

      {Recipes != null ? Recipes.map((recipe) => (
        <CCol md="3">
          <CCard className="browse_cards">
            <CCardHeader className="browse_header">
              <CRow>
                <CCol md="9">
                  <h5>{recipe.name}</h5>
                </CCol>
                <CCol md="3">
                  <CRow>
                    <CCol md="1">
                      <FontAwesomeIcon title="Details" onClick={() => seeDetails(recipe, props.AccessToken)} icon={faInfo} size="md" className="clickable-icon" />
                    </CCol>
                      {
                        props.isEditable && recipe.userId === props.userId.toString() ?
                        <CCol md="1">
                          <FontAwesomeIcon title="Edit" onClick={() => editRecipe(recipe, props.AccessToken)} icon={faEdit} size="md" className="clickable-icon" />
                        </CCol> 
                        : null
                      }   
                      {
                        props.isEditable ?
                        <CCol md="1">
                          <FontAwesomeIcon title="Remove" icon={faTrash} size="md" className="clickable-icon" 
                            onClick={() => deleteRecipe(props.AccessToken, props.isEditable && recipe.userId === props.userId.toString(), recipe)}
                          />
                        </CCol>    
                        : null 
                      }        
                  </CRow>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody className="browse_body">
              <CRow>
                <CCol>
                  <h6>Description</h6>
                </CCol>
              </CRow>
              <CRow>

                <CCol>
                  {recipe.description.length > 200 ? recipe.description.substring(0, 200).trim() + "..." : recipe.description}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      )) : null}
    </CRow>

  )
}

export default withRouter(RecipeBrowser);