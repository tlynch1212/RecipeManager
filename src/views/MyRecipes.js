import React from 'react'
import Loading from '../components/Loading';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const MyRecipe = () => {
  return (
    <div></div>
  )
}

export default withAuthenticationRequired(MyRecipe, {
  onRedirecting: () => <Loading />,
});
