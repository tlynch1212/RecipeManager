import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../components/Loading';

const Recommendations = () => {
  return (
    <div></div>
  )
}

export default withAuthenticationRequired(Recommendations, {
  onRedirecting: () => <Loading />,
});
