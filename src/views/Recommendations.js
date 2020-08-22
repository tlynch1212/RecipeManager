import React, { useEffect } from 'react'
import Loading from '../components/Loading';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import * as ApiConnector from '../api/ApiConnector';
import RecipeScroller from '../components/RecipeScroller';
import JwtDecode from 'jwt-decode';

const Recommendations = () => {
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
        let user = JwtDecode(accessToken); 
        const recipeResponse = await ApiConnector.recommend(accessToken, user.sub, 100);
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
    <RecipeScroller AccessToken={AccessToken} Recipes={Recipes} NoContentText={'Sorry! Looks like we dont have any recipes to recommend at the moment. Please go to the browse page and rate your favorite recipes to show some recommendations!'} />
  )
}

export default withAuthenticationRequired(Recommendations, {
  onRedirecting: () => <Loading />,
});
