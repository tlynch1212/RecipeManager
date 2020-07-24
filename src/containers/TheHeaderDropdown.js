import React from 'react'
import {
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CHeaderNavLink,
    CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useAuth0 } from '@auth0/auth0-react'

const TheHeaderDropdown = () => {
    const { logout, user } = useAuth0();
  const { picture} = user;

    return (
        <CDropdown
            inNav
            className="c-header-nav-items mx-2"
            direction="down"
        >
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                <div className="c-avatar">
                    <CImg
                        src={picture}
                        className="c-avatar-img"
                        alt="admin@bootstrapmaster.com"
                    />
                </div>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem>
                    <CIcon name="cil-user" className="mfe-2" />
                    <CHeaderNavLink to="/profile">Profile</CHeaderNavLink>
                </CDropdownItem>
                <CDropdownItem divider />
                <CDropdownItem>
                    <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="mfe-2" />
                    <CHeaderNavLink onClick={() =>
                        logout({
                            returnTo: window.location.origin,
                        })
                    }
                        to="/">
                        Sign Out
            </CHeaderNavLink>
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default TheHeaderDropdown
