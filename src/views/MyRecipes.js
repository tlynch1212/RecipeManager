import React, { useEffect } from 'react'
import Loading from '../components/Loading';
import RecipeBrowser from '../components/RecipeBrowser';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import JwtDecode from 'jwt-decode';
import * as ApiConnector from '../api/ApiConnector';

const MyRecipe = () => {
  const [Recipes, setRecipes] = React.useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: audience,
          scope: "read:user",
        });

        const recipeResponse = await ApiConnector.getRecipes(accessToken, JwtDecode(accessToken).sub);
        setRecipes(recipeResponse);

      } catch (e) {
        console.log(e.message);
      }
    };

    getRecipes();
  });

  return (
    <RecipeBrowser Recipes={Recipes}></RecipeBrowser>
  )
}

export default withAuthenticationRequired(MyRecipe, {
  onRedirecting: () => <Loading />,
});
