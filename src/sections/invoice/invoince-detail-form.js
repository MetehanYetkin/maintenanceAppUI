import PropTypes, { string } from 'prop-types';
import { useMemo ,useEffect,useRef } from 'react';
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
// pdf libraries
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import InvoiceDetailStatusDate from './invoince-detail-status-date';
import InvoiceDetailAddress from './Invoice-details-address';
import InvoiceDetailsDetail from './invoice-details-detail';
import InvoinceDetailFooter from './invoince-detail-footer';


// ----------------------------------------------------------------------

export default function InvoiceDetailForm({ currentInvoice }) {

const printRef = useRef(); 

  const defaultValues = useMemo(
    () => ({
     
      GeneratorModel:  currentInvoice.generatorInformation.generatorModel || "",
      GeneratorPower:  currentInvoice.generatorInformation.generatorPower || "",
      GeneratorSerialNo:currentInvoice.generatorInformation.generatorSerialNo || "",
      AlternatorPower: currentInvoice.generatorInformation.alternatorModel || "",
      AlternatorModel: currentInvoice.generatorInformation.alternatorPower || "",
      AlternatorSerialNo:currentInvoice.generatorInformation.alternatorSerialNo || "",
      MotorSerialNo:currentInvoice.generatorInformation.motorSerialNo || "",
      MotorPower: currentInvoice.generatorInformation.motorPower || "",
      MotorModel: currentInvoice.generatorInformation.motorModel || "",
      FailureDate: currentInvoice.generatorInformation.failureDate || "",
      WorkingHours: currentInvoice.generatorInformation.workingHours || "",
      CardModel:currentInvoice.formInformation.cardModel || "",
      CabinStatus: currentInvoice.formInformation.cabinStatus|| "",
      FirmName:  currentInvoice.formInformation.firmName||"",
      Address: currentInvoice.formInformation.address || "",
      TaxOfficeNameAndNumber:currentInvoice.formInformation.taxOfficeNameAndNumber|| "",
      TelephoneNumber: currentInvoice.formInformation.telephoneNumber||"",
      SubjectOfComplaint:currentInvoice.formInformation.subjectOfComplaint|| "",
      Rapor:currentInvoice.formInformation.rapor|| "",
      ExitKm: currentInvoice.formInformation.exitKm|| 0,
      ReturnKm:currentInvoice.formInformation.returnKm|| 0,
      startDate:currentInvoice.formInformation.starterHours||"",
      endDate: currentInvoice.formInformation.endHours||"",
      CustomerName:currentInvoice.formInformation.customerName|| "",
      TechnicanName:currentInvoice.formInformation.technicanName|| "",
      ReplacedInformation : currentInvoice.replacedPartInformations||[],
      Kdv:currentInvoice.kdv

    })
  ,
    [currentInvoice]
  );
  const handleGeneratePDF = () => {
    const input = printRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('invoice.pdf');
    });
  };
  const methods = useForm({
    defaultValues,
  });

  const { reset } = methods;

  useEffect(() => {
    if (currentInvoice) {
      reset(defaultValues);
    }
  }, [currentInvoice, reset, defaultValues]);
 
  return (
    <FormProvider methods={methods}>
    <div ref={printRef}>
      <Card>
        <InvoiceDetailAddress />
        <InvoiceDetailStatusDate />
        <InvoiceDetailsDetail />
        <InvoinceDetailFooter />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        {/* Eklenen buton */}
        <LoadingButton variant="contained" onClick={handleGeneratePDF}>
          PDF Oluştur
        </LoadingButton>
      </Stack>
    </div>
  </FormProvider>
  );
}

InvoiceDetailForm.propTypes = {
  currentInvoice: PropTypes.object,
};
