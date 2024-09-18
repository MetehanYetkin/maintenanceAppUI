import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// @mui
import Container from '@mui/material/Container';
import axios, { endpoints } from 'src/utils/axios';

// components
import InvoiceDetails from '../invoice-details';
import InvoiceDetailForm from '../invoince-detail-form';

// ----------------------------------------------------------------------

export default function InvoiceDetailsView({ id }) {
  const [apiData, setApiData] = useState(null); // Başlangıçta null
  const [loading, setLoading] = useState(true); // Başlangıçta yükleniyor

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:5001/api/Form/GetFormById"; 
        console.log("url",url)// Endpoint doğru mu?
        const response = await axios.get(url, {
          params: { id }
        });
        setApiData(response.data);
      } catch (error) {
        console.error('API hatası:', error);
      } finally {
        setLoading(false); // Veri alındıktan sonra yüklenme durumu kapalı
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Yüklenme mesajı veya spinner
  }

  return (
    <Container maxWidth="lg">
      {apiData ? (
        <InvoiceDetailForm currentInvoice={apiData} />
      ) : (
        <div>No invoice data available</div>
      )}
    </Container>
  );
}

InvoiceDetailsView.propTypes = {
  id: PropTypes.string.isRequired,
};
