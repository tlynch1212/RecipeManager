import React, { useEffect } from 'react'
import Loading from '../components/Loading';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import JwtDecode from 'jwt-decode';
import * as ApiConnector from '../api/ApiConnector';
import RecipeScroller from '../components/RecipeScroller';

const MyRecipe = () => {
  const [Recipes, setRecipes] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
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
        setLoading(false)
      } catch (e) {
        console.log(e.message);
      }
    };

    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    isLoading ? <Loading /> :
    <RecipeScroller Recipes={Recipes} NoContentText={'Sorry! You dont have any Created or starred Recipes. Go to Browse to find some or Create your own by clicking the plus sign on the top left of the screen.'} />
  )
}

export default withAuthenticationRequired(MyRecipe, {
  onRedirecting: () => <Loading />,
});
