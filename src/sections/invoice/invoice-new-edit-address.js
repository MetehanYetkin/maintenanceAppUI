import { useFormContext ,Controller} from 'react-hook-form';
// @mui
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// _mock
import { _addressBooks } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
//

import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { AddressListDialog } from '../address';

// ----------------------------------------------------------------------

export default function InvoiceNewEditAddress() {
  const {
    watch,
    setValue,
    formState: { errors },
    control
  } = useFormContext();

  const upMd = useResponsive('up', 'md');

  const values = watch();

  const { invoiceFrom, invoiceTo } = values;

 

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
          <RHFTextField name="GeneratorModel" label="MODEL" />
          <RHFTextField name="GeneratorPower" label="GÜCÜ" />
          <RHFTextField name="GeneratorSerialNo" label="SERİ NO" />
          </Stack>
        </Stack>

        <Stack sx={{ width: 1 }}>
          <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h7" sx={{ color: 'text.disabled', flexGrow: 1 }}>
              ALTERNATÖR:
            </Typography>
          </Stack>
            <Stack spacing={1}>
             <RHFTextField name="AlternatorModel" label="MODEL" />
             <RHFTextField name="AlternatorPower" label="GÜCÜ" />
             <RHFTextField name="AlternatorSerialNo" label="SERİ NO" />
            </Stack>
        </Stack>


        <Stack sx={{ width: 1 }}>
          <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h7" sx={{ color: 'text.disabled', flexGrow: 1 }}>
              MOTOR:
            </Typography>
          </Stack>
            <Stack spacing={1}>
           <RHFTextField name="MotorModel" label="MODEL" />
          <RHFTextField name="MotorPower" label="GÜCÜ" />
          <RHFTextField name="MotorSerialNo" label="SERİ NO" />
            </Stack>      
        </Stack>


        <Stack sx={{ width: 1 }}>
        
            <Stack spacing={1}>
            <Controller
        name="FailureDate"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DateTimePicker
            label="Arıza Tarihi"
           
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
        name="WorkingHours"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DateTimePicker
            label="Çalışma Saati"
           
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
          <RHFTextField name="CardModel" label="Kart Modeli" />
          <RHFTextField name="CabinStatus" label="Kabin Durumu" />
            </Stack>      
        </Stack>



      </Stack>

      
      

     
    </>
  );
}
