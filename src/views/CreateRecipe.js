import React from 'react'
import {
  CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm,
  CFormGroup, CTextarea, CInput, CInputRadio, CLabel, CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Loading from '../components/Loading'
import { withAuthenticationRequired } from '@auth0/auth0-react'

const CreateRecipe = () => {
  return (
      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              Create New Recipe
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Recipe Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" placeholder="Enter Recipe Name" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Instructions</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea 
                      name="textarea-input" 
                      id="textarea-input" 
                      rows="9"
                      placeholder="Enter the instructions to create this new recipe" 
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Visibility</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio1" name="inline-radios" value="public" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Public</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio2" name="inline-radios" value="private" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Private</CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="create" size="sm" color="primary"><CIcon name="cil-scrubber" /> Create</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
  )
}

export default withAuthenticationRequired(CreateRecipe, {
  onRedirecting: () => <Loading />,
});
