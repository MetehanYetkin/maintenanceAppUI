import sum from 'lodash/sum';
import { useCallback, useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import PropTypes from 'prop-types';

// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// utils
import { fCurrency } from 'src/utils/format-number';

// components
import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function InvoiceDetailsDetail() {
  const { control, setValue, watch, resetField, reset } = useFormContext();
  const formValues = watch();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  // Güvenli bir şekilde `formValues.ReplacedInformation`'ı kullanma
  const items = formValues.items || [];
  const totalOnRow = items.map((item) => item.unitPrice * item.amount);
  const subTotal = sum(totalOnRow);
  const totalAmount = subTotal * ((formValues.taxes  || 0) / 100 + 1);

  useEffect(() => {
    // Reset fonksiyonunu sadece formValues uygun olduğunda çalıştır
    if (formValues.ReplacedInformation || formValues.Kdv || formValues.totalAmount) {
      reset({
        items: formValues.ReplacedInformation || [],
        taxes: formValues.Kdv || 0,
        totalAmount: totalAmount|| 0,
      });
    }
  }, [formValues.ReplacedInformation, formValues.Kdv, formValues.totalAmount, reset]);

  const handleAdd = () => {
    append({
      partCode: '',
      partName: '',
      amount: 1,
      unitPrice: 0,
      price: 0,
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const handleClearService = useCallback(
    (index) => {
      resetField(`items[${index}].quantity`);
      resetField(`items[${index}].price`);
      resetField(`items[${index}].total`);
    },
    [resetField]
  );

  const renderTotal = (
    <Stack
      spacing={2}
      alignItems="flex-end"
      sx={{ mt: 3, textAlign: 'right', typography: 'body2' }}
    >
      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>ÖN TOPLAM</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(subTotal) || '-'}</Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>KDV %</Box>
        <Box sx={{ width: 160 }}>{formValues.taxes ? formValues.taxes : '-'}</Box>
      </Stack>

      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <Box>TOPLAM</Box>
        <Box sx={{ width: 160 }}>{fCurrency(totalAmount) || '-'}</Box>
      </Stack>
    </Stack>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Değiştirilen Parçalar:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                size="small"
                name={`items[${index}].partCode`}
                label="Parça Kodu"
                disabled
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField
                size="small"
                name={`items[${index}].partName`}
                label="Parça Adı"
                disabled
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField
                size="small"
                type="number"
                name={`items[${index}].amount`}
                label="Miktar"
                disabled
                placeholder="0"
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 96 } }}
              />

              <RHFTextField
                size="small"
                type="number"
                disabled
                name={`items[${index}].unitPrice`}
                label="Birim Fiyatı"
                placeholder="0"
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 96 } }}
              />

              <RHFTextField
                size="small"
                type="number"
                name={`items[${index}].price`}
                label="Tutar"
                placeholder="0.00"
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ maxWidth: { md: 96 } }}
              />
            </Stack>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
      >
      

        <Stack
          spacing={2}
          justifyContent="flex-end"
          direction={{ xs: 'column', md: 'row' }}
          sx={{ width: 1 }}
        >
       
        </Stack>
      </Stack>

      {renderTotal}
    </Box>
  );
}
