import sum from 'lodash/sum';
import PropTypes, { string } from 'prop-types';
import { useCallback, useEffect,useState } from 'react';
import { useFormContext, useFieldArray ,Controller} from 'react-hook-form';
// @mui
import Stack from '@mui/material/Stack';

// components
import { RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function InvoinceDetailFooter() {
    const {setValue,watch} = useFormContext();
    const formValues = watch();
    console.log("formValues2",formValues)
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
            disabled
          />
          <RHFTextField
            name="ReturnKm"
            label="DÖNÜŞ KM"
            type="number"
            disabled        
              />
        
        <RHFTextField
            name="startDate"
             label="GİRİŞ SAATİ"
            disabled        
              />  
            <RHFTextField
            name="endDate"
             label="DÖNÜŞ SAATİ"
            disabled        
              />  
          
        </Stack>
        
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ p: 3, bgcolor: 'background.neutral' }}
        >
           <RHFTextField name="CustomerName" multiline rows={4} label="MÜŞTERİ/İMZA" disabled />

          <RHFTextField name="TechnicanName" multiline rows={4} label="SERVİS TEKNİSYENİ"  disabled/>
  
  
        </Stack>
      </>
    );

}


