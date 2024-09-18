import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { useFormContext } from 'react-hook-form';
// @mui
import Stack from '@mui/material/Stack';
// components
import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function InvoiceDetailStatusDate() {

  const {setValue,watch} = useFormContext();
  const formValues = watch();
  console.log("formValues1",formValues)

  return (
    <>
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ p: 3, bgcolor: 'background.neutral' }}
      >

        <RHFTextField name="FirmName" label="Firma" disabled/>
        <RHFTextField name="Address" label="Adres" disabled
        />
        <RHFTextField name="TaxOfficeNameAndNumber" label="Vergi D. VE NO" disabled
        />
        <RHFTextField name="TelephoneNumber" label="TEL"  disabled
       />
      </Stack>

      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ p: 3, bgcolor: 'background.neutral' }}
      >
        <RHFTextField name="SubjectOfComplaint" multiline rows={4} label="Şikayet Konusu" disabled/>
        <RHFTextField name="Rapor" multiline rows={4} label="Rapor" disabled/>
    
      </Stack>
    </>
  );
}
