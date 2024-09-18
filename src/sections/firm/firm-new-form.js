import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// utils
import axios, { endpoints } from 'src/utils/axios';


import { fData } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// assets
import { countries ,roles} from 'src/assets/data';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function FirmNewForm() {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewFirmSchema = Yup.object().shape({
    FirmName: Yup.string().required('Firma Adı Zorunludur'),
    Email: Yup.string(),
    PhoneNumber: Yup.string(),
    Address: Yup.string(),
   // country: Yup.string().required('Country is required'),
   TaxNumber: Yup.string(),
   
  });



  const methods = useForm({
    resolver: yupResolver(NewFirmSchema),
  
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const firm = {
        FirmName: data.FirmName,
        TaxNumber: data.TaxNumber,
        Address: data.Address,
        PhoneNumber: data.PhoneNumber,
        Email: data.Email
      };

      console.log("data,data",data)
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await axios.post(endpoints.firm.create, firm);
      const { token, user } = response.data;
      console.log("response",response)

      reset();
      enqueueSnackbar( 'Create success!');
      router.push(paths.dashboard.user.list);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

 
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={1}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="FirmName" label="Firma Adı" />
              <RHFTextField name="TaxNumber" label="Vergi Numarası" />
              <RHFTextField name="Email" label="Email " />
              <RHFTextField name="PhoneNumber" label="Telefon Numarası" />
              <RHFTextField name="Address" multiline rows={4} label="Adres" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" >
                Ekle
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

