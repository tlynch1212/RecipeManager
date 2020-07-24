import React, { useEffect } from 'react'
import Loading from '../components/Loading';
import RecipeBrowser from '../components/RecipeBrowser';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import JwtDecode from 'jwt-decode';
import * as ApiConnector from '../api/ApiConnector';
import InfiniteScroll from 'react-infinite-scroll-component';
import loading from "../assets/loading.svg";

const MyRecipe = () => {
  const [Recipes, setRecipes] = React.useState([]);
  const [LoadedIndex, setLoadedIndex] = React.useState(0);
  const [LoadedRecipes, setLoadedRecipes] = React.useState([]);
  const [HasMore, setHasMore] = React.useState(true);
  const { getAccessTokenSilently } = useAuth0();
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const loadMore = () => {
    if (LoadedIndex >= Recipes.length){
      setHasMore(false);
      return;
    }

    setLoadedRecipes(LoadedRecipes.concat(Recipes.splice(LoadedIndex, 20)));
    setLoadedIndex(LoadedIndex + 20);
  };

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: audience,
          scope: "read:user",
        });

        const recipeResponse = await ApiConnector.getRecipes(accessToken, JwtDecode(accessToken).sub);
        setRecipes(recipeResponse);
        setLoadedRecipes(recipeResponse.splice(LoadedIndex, 20));
        setLoadedIndex(LoadedIndex + 20);

      } catch (e) {
        console.log(e.message);
      }
    };

    getRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InfiniteScroll
      dataLength={Recipes.length}
      next={loadMore}
      hasMore={HasMore}
      loader={<div className="spinner">
        <img src={loading} alt="Loading" />
      </div>}>
      <RecipeBrowser Recipes={LoadedRecipes}></RecipeBrowser>
    </InfiniteScroll>
  )
}

export default withAuthenticationRequired(MyRecipe, {
  onRedirecting: () => <Loading />,
});
