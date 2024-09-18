import { useState, useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

import { useFormContext, Controller } from 'react-hook-form';
// @mui
import Stack from '@mui/material/Stack';
// components
import { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function InvoiceNewEditStatusDate() {
  const { control, watch ,setValue} = useFormContext();
  const values = watch();
  const [apiData, setApiData] = useState([]);
  const [selectedFirmName, setSelectedFirmName] = useState("");

  const handleCreateAndSend = async (selectedFirmId) => {
    try {
      // Formdaki mevcut değerleri alıyoruz.
      const selectedFirm = apiData.find((firm) => firm.id === selectedFirmId);
      if (selectedFirm) {
        setValue("Address", selectedFirm.address);
        setValue("TaxOfficeNameAndNumber", selectedFirm.taxNumber);
        setValue("TelephoneNumber", selectedFirm.phoneNumber);
        setValue("FirmName", selectedFirm.firmName);
      }

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Bileşen ilk yüklendiğinde çalışır
    const fetchData = async () => {
      try {
        // API'den veri çekme
        const response = await axios.get(endpoints.firm.getall);
        setApiData(response.data);
      } catch (error) {
        console.error('API hatası:', error);
      }
    };

    fetchData();
  }, []);
  

  return (
    <>
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ p: 3, bgcolor: 'background.neutral' }}
      >

        {apiData.length > 0 && (

          
<RHFAutocomplete
name="FirmName"
label="Firma"
value={selectedFirmName}
options={apiData.map((firm) => firm.firmName)}
onChange={(event, newValue) => {
  const selectedFirm = apiData.find((firm) => firm.firmName === newValue);
  setSelectedFirmName(newValue);
  if (selectedFirm) {
    handleCreateAndSend(selectedFirm.id); // Id değerini burada alıyoruz
  }
}}
getOptionLabel={(option) => option}
isOptionEqualToValue={(option, value) => option === value}
renderOption={(props, option) => {
  const firm = apiData.find((firm1) => firm1.firmName === option);

  if (!firm) {
    return null;
  }

  return (
    <li {...props} key={firm.id}>
      {firm.firmName}
    </li>
  );
}}
/>
        )}

        <RHFTextField name="Address" label="Adres"
        />
        <RHFTextField name="TaxOfficeNameAndNumber" label="Vergi D. VE NO"
        />
        <RHFTextField name="TelephoneNumber" label="TEL" 
       />
      </Stack>

      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ p: 3, bgcolor: 'background.neutral' }}
      >
        <RHFTextField name="SubjectOfComplaint" multiline rows={4} label="Şikayet Konusu" />
        <RHFTextField name="Rapor" multiline rows={4} label="Rapor" />
    
      </Stack>
    </>
  );
}
