import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react';

const ChartViewer = (props) => {
  return (
          <CCard>
            <CCardHeader>
              <h4>{props.chartName}</h4>
            </CCardHeader>
            <CCardBody>
              {props.chart}
            </CCardBody>
          </CCard>
  )
}

export default ChartViewer;