import React, { useEffect } from 'react'
import Loading from '../components/Loading';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import * as ApiConnector from '../api/ApiConnector';
import RecipeScroller from '../components/RecipeScroller';

const Browse = () => {
  const [Recipes, setRecipes] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [AccessToken, setAccessToken] = React.useState('');
  const { getAccessTokenSilently } = useAuth0();
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;


  useEffect(() => {
    const getRecipes = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: audience,
          scope: "read:user",
        });
        setAccessToken(accessToken);
        const recipeResponse = await ApiConnector.browse(accessToken);
        setRecipes(recipeResponse);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };

    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    isLoading ? <Loading /> :
    <RecipeScroller AccessToken={AccessToken} Recipes={Recipes} NoContentText={'Sorry! Looks like we dont have any recipes to browse at the moment.'} />
  )
}

export default withAuthenticationRequired(Browse, {
  onRedirecting: () => <Loading />,
});
