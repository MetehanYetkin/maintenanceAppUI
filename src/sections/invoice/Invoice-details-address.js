import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';

import { useFormContext } from 'react-hook-form';
// @mui
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// _mock
import { _addressBooks } from 'src/_mock';
// components
//

import FormProvider, {
  RHFTextField,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function InvoiceDetailAddress() {
  
  const {setValue,watch} = useFormContext();
  const formValues = watch();
  const upMd = useResponsive('up', 'md');
 

  return (
    <>
      <Stack
        spacing={{ xs: 3, md: 5 }}
        direction={{ xs: 'column', md: 'row' }}
        divider={
          <Divider
            flexItem
            orientation={upMd ? 'vertical' : 'horizontal'}
            sx={{ borderStyle: 'dashed' }}
          />
        }
        sx={{ p: 3 }}
      >
        <Stack sx={{ width: 1 }}>
          <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h7" sx={{ color: 'text.disabled', flexGrow: 1 }}>
              JENERATÖR GRUBU:
            </Typography>
          </Stack>
          <Stack spacing={1}>
          <RHFTextField name="GeneratorModel" label="MODEL"  disabled/>
          <RHFTextField name="GeneratorPower" label="GÜCÜ" disabled/>
          <RHFTextField name="GeneratorSerialNo" label="SERİ NO" disabled/>
          </Stack>
        </Stack>

        <Stack sx={{ width: 1 }}>
          <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h7" sx={{ color: 'text.disabled', flexGrow: 1 }}>
              ALTERNATÖR:
            </Typography>
          </Stack>
            <Stack spacing={1}>
             <RHFTextField name="AlternatorModel" label="MODEL" disabled />
             <RHFTextField name="AlternatorPower" label="GÜCÜ" disabled />
             <RHFTextField name="AlternatorSerialNo" label="SERİ NO"  disabled/>
            </Stack>
        </Stack>


        <Stack sx={{ width: 1 }}>
          <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h7" sx={{ color: 'text.disabled', flexGrow: 1 }}>
              MOTOR:
            </Typography>
          </Stack>
            <Stack spacing={1}>
           <RHFTextField name="MotorModel" label="MODEL" disabled />
          <RHFTextField name="MotorPower" label="GÜCÜ" disabled />
          <RHFTextField name="MotorSerialNo" label="SERİ NO" disabled/>
            </Stack>      
        </Stack>


        <Stack sx={{ width: 1 }}>
        
            <Stack spacing={1}>
            <RHFTextField name="FailureDate" label="Arıza Tarihi"  disabled/>
            <RHFTextField name="WorkingHours" label="Çalışma Saati" disabled/>

          <RHFTextField name="CardModel" label="Kart Modeli" disabled/>
          <RHFTextField name="CabinStatus" label="Kabin Durumu" disabled/>
            </Stack>      
        </Stack>



      </Stack>

      
      

     
    </>
  );
}
InvoiceDetailAddress.propTypes = {
  currentInvoice: PropTypes.object,
};
