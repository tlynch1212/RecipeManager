import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import Loading from './components/Loading';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

const App = () => {
    return (
        <HashRouter>
            <React.Suspense fallback={loading}>
                <Switch>
                    <Route path="/" name="Home" render={props => <TheLayout {...props} />} />
                </Switch>
            </React.Suspense>
        </HashRouter>
    );
}

export default withAuthenticationRequired(App, {
    onRedirecting: () => <Loading />,
});