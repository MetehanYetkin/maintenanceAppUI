import sum from 'lodash/sum';
import { useCallback, useEffect } from 'react';
import { useFormContext, useFieldArray ,Controller} from 'react-hook-form';
// @mui
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// utils
import { fCurrency } from 'src/utils/format-number';
// _mock
import { INVOICE_SERVICE_OPTIONS } from 'src/_mock';

// components
import Iconify from 'src/components/iconify';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function InvoiceNewEditFooter() {

    const { control, watch } = useFormContext();

    const values = watch();
  
    return (
      <>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ p: 3, bgcolor: 'background.neutral' }}
        >
          <RHFTextField
            name="ExitKm"
            label="ÇIKIŞ KM"
            type="number"
            /* value={values.invoiceNumber} */
          />
          <RHFTextField
            name="ReturnKm"
            label="DÖNÜŞ KM"
            type="number"
            /* value={values.invoiceNumber} */
          />
        
<Controller
        name="StarterHours"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DateTimePicker
            label="GİRİŞ SAATİ"
         
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                helperText: error?.message,
              },
            }}
          />
        )}
      />



        <Controller
        name="EndHours"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DateTimePicker
            label="DÖNÜŞ SAATİ"
           
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                helperText: error?.message,
              },
            }}
          />
        )}
      />

          
        </Stack>
        
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ p: 3, bgcolor: 'background.neutral' }}
        >
            <RHFTextField name="Önemli Uyarı" multiline rows={4} label="Önemli Uyarı" />

           <RHFTextField name="CustomerName" multiline rows={4} label="MÜŞTERİ/İMZA" />

          <RHFTextField name="TechnicanName" multiline rows={4} label="SERVİS TEKNİSYENİ" />
  
  
        </Stack>
      </>
    );

}
