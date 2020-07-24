import React from 'react'
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react'

const AlertModel = (props) => {
    return (
        <CModal
            show={props.isOpen}
            onClose={props.onClose}
            color={props.color}
            size={props.size}
        >
            <CModalHeader closeButton>
                <CModalTitle>{props.Title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {props.Message}
            </CModalBody>
            <CModalFooter>
                <CButton color="success" onClick={props.onClose}>Close</CButton>{' '}
            </CModalFooter>
        </CModal>
    )
}

export default AlertModel
