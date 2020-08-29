import React, { useEffect } from 'react'
import Loading from '../components/Loading';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import * as ApiConnector from '../api/ApiConnector';
import ChartViewer from '../components/ChartViewer';
import BarChart from '../components/BarChart';
import { CRow, CCol } from '@coreui/react';
import PieChart from '../components/PieChart';

const Dashboard = () => {
  const [TopRatings, setTopRatings] = React.useState([]);
  const [RatePieChart, setRatePieChart] = React.useState([]);
  const [TopInteraction, setTopInteraction] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const { getAccessTokenSilently } = useAuth0();
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;


  useEffect(() => {
    const getTopRatings = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: audience,
          scope: "read:user",
        });
        const ratings = await ApiConnector.topRatings(accessToken);
        const rateDifference = await ApiConnector.rateDifference(accessToken);
        const topInteraction = await ApiConnector.topInteraction(accessToken);
        setTopRatings(ratings);
        setRatePieChart(rateDifference);
        setTopInteraction(topInteraction);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };

    getTopRatings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    isLoading ? <Loading /> :
      <CRow>
        <CCol>
          <CRow>
            <CCol md='6' >
              <ChartViewer chartName={"Highest Amount of Ratings"} chart={<BarChart data={TopRatings} />} />
            </CCol>
            <CCol md='6' >
              <ChartViewer chartName={"Types of Rates of Recipes"} chart={<PieChart data={RatePieChart} />} />
            </CCol>
          </CRow>
          <CRow>
            <CCol md='6' >
              <ChartViewer chartName={"Most Interactions"} chart={<BarChart data={TopInteraction} />} />
            </CCol>
          </CRow>
        </CCol>
      </CRow>
  )
}

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <Loading />,
});
