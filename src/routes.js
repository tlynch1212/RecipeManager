import React from 'react';

const Browse = React.lazy(() => import('./views/Browse'));
const MyRecipes = React.lazy(() => import('./views/MyRecipes'));
const Recommendations = React.lazy(() => import('./views/Recommendations'));
const CreateRecipe = React.lazy(() => import('./views/CreateRecipe'));
const Home = React.lazy(() => import('./views/Home'));

const routes = [
  { path: '/', exact: true, name: 'Home', component: Home  },
  { path: '/browse', name: 'Browse', component: Browse },
  { path: '/myrecipes', name: 'My Recipes', component: MyRecipes },
  { path: '/recommended', name: 'Recommendations', component: Recommendations },
  { path: '/create', name: 'Create Recipe', component: CreateRecipe }
];

export default routes;
