import React from 'react'
import {
    CHeader,
    CHeaderBrand,
    CHeaderNav,
    CHeaderNavItem,
    CHeaderNavLink,
    CSubheader,
    CBreadcrumbRouter} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { useAuth0 } from "@auth0/auth0-react";

// routes config
import routes from '../routes'

import {
    TheHeaderDropdown
} from './index'
import LoginButton from '../components/LoginButton'

const TheHeader = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <CHeader withSubheader>
            <CHeaderBrand to="/">
                <CIcon name="logo" height="90" alt="Logo" src={'logo_transparent.svg'} />
            </CHeaderBrand>

            <CHeaderNav className="d-md-down-none mr-auto">
                <CHeaderNavItem className="px-2" >
                    <CHeaderNavLink to="/create"><FontAwesomeIcon icon={faPlusSquare} size="2x" /></CHeaderNavLink>
                </CHeaderNavItem>
                <CHeaderNavItem className="px-3" >
                    <CHeaderNavLink to="/browse">Browse</CHeaderNavLink>
                </CHeaderNavItem>
                <CHeaderNavItem className="px-3" >
                    <CHeaderNavLink to="/myrecipes">My Recipes</CHeaderNavLink>
                </CHeaderNavItem>
                <CHeaderNavItem className="px-3" >
                    <CHeaderNavLink to="/recommended">Recommended</CHeaderNavLink>
                </CHeaderNavItem>
            </CHeaderNav>

            <CHeaderNav className="px-3">
                {isAuthenticated ? <TheHeaderDropdown /> : <LoginButton />}
            </CHeaderNav>

            <CSubheader className="px-3 justify-content-between">
                <CBreadcrumbRouter
                    className="border-0 c-subheader-nav m-0 px-0 px-md-3"
                    routes={routes}
                />
            </CSubheader>
        </CHeader>
    )
}

export default TheHeader
