import React, { useEffect } from 'react'
import Loading from '../components/Loading';
import RecipeBrowser from '../components/RecipeBrowser';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import loading from "../assets/loading.svg";
import NoContent from '../components/NoContent';

const RecipeScroller = (props) => {
  const [Recipes, setRecipes] = React.useState([]);
  const [TotalIndex, setTotalIndex] = React.useState(0);
  const [LoadedIndex, setLoadedIndex] = React.useState(0);
  const [LoadedRecipes, setLoadedRecipes] = React.useState([]);
  const [HasMore, setHasMore] = React.useState(true);
  const [isLoading, setLoading] = React.useState(true);

  const loadMore = () => {
    if (LoadedIndex >= TotalIndex) {
      setHasMore(false);
      return;
    }
    setLoadedIndex(LoadedIndex + (Recipes.length < 20 ? Recipes.length : 20));
    setLoadedRecipes(LoadedRecipes.concat(Recipes.splice(0, Recipes.length < 20 ? Recipes.length : 20)));
  };

  useEffect(() => {
    const getRecipes = async () => {
        setRecipes(props.Recipes);
        setTotalIndex(props.Recipes.length);
        setLoadedRecipes(props.Recipes.splice(LoadedIndex, 20));
        setLoadedIndex(LoadedIndex + 20);
        setLoading(false);
    };

    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isLoading ? <Loading /> :
        LoadedRecipes.length > 0 ?
          <InfiniteScroll
            dataLength={Recipes.length}
            next={loadMore}
            hasMore={HasMore}
            loader={<div className="spinner">
              <img src={loading} alt="Loading" />
            </div>}>
            <RecipeBrowser AccessToken={props.AccessToken} userId={props.userId} isEditable={props.isEditable} Recipes={LoadedRecipes}></RecipeBrowser>
          </InfiniteScroll>
          :
          <NoContent Text={props.NoContentText} />
      }

    </div>
  )
}

export default withAuthenticationRequired(RecipeScroller, {
  onRedirecting: () => <Loading />,
});
