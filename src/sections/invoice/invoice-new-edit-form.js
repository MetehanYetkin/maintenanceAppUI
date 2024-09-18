import PropTypes, { string } from 'prop-types';
import { useMemo } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// _mock
import { _addressBooks } from 'src/_mock';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import FormProvider from 'src/components/hook-form';
//
import axios, { endpoints } from 'src/utils/axios';

import InvoiceNewEditDetails from './invoice-new-edit-details';
import InvoiceNewEditAddress from './invoice-new-edit-address';
import InvoiceNewEditStatusDate from './invoice-new-edit-status-date';
import InvoiceNewEditFooter from './invoince-new-edit-footer';
// ----------------------------------------------------------------------

export default function InvoiceNewEditForm({ currentInvoice }) {
  const router = useRouter();

  const loadingSave = useBoolean();

  const loadingSend = useBoolean();
  const today = new Date();
  const NewInvoiceSchema = Yup.object().shape({
    
  });

  const defaultValues = useMemo(
    () => ({
     
      GeneratorModel: "",
      GeneratorPower: "",
      GeneratorSerialNo: "",
      AlternatorPower: "",
      AlternatorModel: "",
      AlternatorSerialNo: "",
      MotorSerialNo: "",
      MotorPower: "",
      MotorModel: "",
      FailureDate: "",
      WorkingHours: "",
      CardModel: "",
      CabinStatus: "",
      FirmName: "",
      Address: "",
      TaxOfficeNameAndNumber: "",
      TelephoneNumber: "",
      SubjectOfComplaint: "",
      Rapor: "",
      ExitKm: 0,
      ReturnKm: 0,
      StarterHours:"",
      EndHours: "",

      CustomerName: "",
      TechnicanName: "",
      taxOfficeNameAndNumber:"",
      items:  [
        {
          PartCode: '',
          PartName: '',
          Price: 0,
          UnitPrice: 0,
          Amount: 0,
          total: 0,
        },
      ],
      totalAmount: currentInvoice?.totalAmount || 0,
      KDV:0
   
    })
  ,
    [currentInvoice]
  );

  const methods = useForm({
    resolver: yupResolver(NewInvoiceSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleCreateAndSend = handleSubmit(async (request) => {
    try {
      console.log("data",request)
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await axios.post(endpoints.invoince.create, request);
      reset();
      loadingSend.onFalse();
      router.push(paths.dashboard.invoice.root);
    } catch (error) {
      console.error(error);
    }

  });

  return (
    <FormProvider methods={methods}>
      <Card>
        <InvoiceNewEditAddress />
        <InvoiceNewEditStatusDate />
        <InvoiceNewEditDetails />
        <InvoiceNewEditFooter />
        
        
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        

        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend.value && isSubmitting}
          onClick={handleCreateAndSend}
        >
          {currentInvoice ? 'Update' : 'Create'} & Send
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

InvoiceNewEditForm.propTypes = {
  currentInvoice: PropTypes.object,
};
