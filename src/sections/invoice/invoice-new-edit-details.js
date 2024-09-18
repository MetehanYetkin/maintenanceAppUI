import sum from 'lodash/sum';
import { useCallback, useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { inputBaseClasses } from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
// utils
import { fCurrency } from 'src/utils/format-number';
// _mock
import { INVOICE_SERVICE_OPTIONS } from 'src/_mock';

// components
import Iconify from 'src/components/iconify';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function InvoiceNewEditDetails() {
  const { control, setValue, watch, resetField } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  const totalOnRow = values.items.map((item) => item.UnitPrice * item.Amount);

  const subTotal = sum(totalOnRow);

  const totalAmount = subTotal  * ((values.taxes / 100)+1) ;
const display = true;
  useEffect(() => {
    setValue('totalAmount', totalAmount);
  }, [setValue, totalAmount]);

  const handleAdd = () => {
    append({
      title: '',
      description: '',
      service: '',
      quantity: 1,
      price: 0,
      total: 0,
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

  


  const handleChangeUnitPrice = useCallback(
    (event, index) => {
      setValue(`items[${index}].UnitPrice`, Number(event.target.value));
      setValue(
        `items[${index}].Price`,
        values.items.map((item) => item.UnitPrice * item.Amount)[index]
      );
      setValue(
        `items[${index}].totalAmount`,
        values.items.map((item) => item.UnitPrice * item.Amount)[index]
      );
    },
    [setValue, values.items]
  );
  
  const handleChangeAmount = useCallback(
    (event, index) => {
      setValue(`items[${index}].Amount`, Number(event.target.value));
      setValue(
        `items[${index}].Price`,
        values.items.map((item) => item.UnitPrice * item.Amount)[index]
      );
      setValue(
        `items[${index}].totalAmount`,
        values.items.map((item) => item.UnitPrice * item.Amount)[index]
      );
    },
    [setValue, values.items]
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
        <Box sx={{ width: 160 }}>{values.taxes ? values.taxes : '-'}</Box>

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
                name={`items[${index}].PartCode`}
                label="Parça Kodu"
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField
                size="small"
                name={`items[${index}].PartName`}
                label="Parça Adı"
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField
                size="small"
                type="number"
                name={`items[${index}].Amount`}
                label="Miktar"
                placeholder="0"
                onChange={(event) => handleChangeAmount(event, index)}
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 96 } }}
              />

              <RHFTextField
                size="small"
                type="number"
                name={`items[${index}].UnitPrice`}
                label="Birim Fiyatı"
                placeholder="0"
                onChange={(event) => handleChangeUnitPrice(event, index)}
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 96 } }}
              />

              <RHFTextField
                size="small"
                type="number"
                name={`items[${index}].Price`}
                label="Tutar"
                placeholder="0.00"
                disabled={display}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}> </Box>
                    </InputAdornment>
                  ),
                }}
                sx={{ maxWidth: { md: 96 } }}
              />

             
            </Stack>

            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={() => handleRemove(index)}
            >
              Remove
            </Button>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
      >
        <Button
          size="small"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          Add Item
        </Button>

        <Stack
          spacing={2}
          justifyContent="flex-end"
          direction={{ xs: 'column', md: 'row' }}
          sx={{ width: 1 }}
        >
       

        
          <RHFTextField
            size="small"
            label="KDV"
            name="taxes"
            type="number"
            sx={{ maxWidth: { md: 120 } }}
          />
        </Stack>
      </Stack>

      {renderTotal}
    </Box>
  );
}
