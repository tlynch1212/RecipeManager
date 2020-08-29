import React from 'react';

const Browse = React.lazy(() => import('./views/Browse'));
const MyRecipes = React.lazy(() => import('./views/MyRecipes'));
const Recommendations = React.lazy(() => import('./views/Recommendations'));
const CreateRecipe = React.lazy(() => import('./views/CreateRecipe'));
const Profile = React.lazy(() => import('./views/Profile'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));


const routes = [
  { path: '/', exact: true, name: 'Browse', component: Browse  },
  { path: '/browse', name: 'Browse', component: Browse },
  { path: '/myrecipes', name: 'My Recipes', component: MyRecipes },
  { path: '/recommended', name: 'Recommendations', component: Recommendations },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/create', name: 'Create Recipe', component: CreateRecipe },
  { path: '/profile', name: 'Profile', component: Profile },
];

export default routes;
