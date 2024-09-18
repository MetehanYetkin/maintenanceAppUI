import PropTypes from 'prop-types';
import { format } from 'date-fns';
// @mui

import LoadingButton from '@mui/lab/LoadingButton';

import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// utils
import { fCurrency } from 'src/utils/format-number';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function InvoiceTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
  const { formName, firmName, creationDate, description, status, id, totalAmount } = row;
  const router = useRouter();
  const confirm = useBoolean();
  const popover = usePopover();



  const handleButtonClick = (rowid) => {
    console.log('Selected Row ID:', rowid);
    router.push(paths.dashboard.invoice.details(id));
  };




  return (
    <>
      <TableRow hover selected={selected}>
     
        <TableCell>
        <LoadingButton
          size="large"
          variant="contained"
          onClick={() => handleButtonClick(id)}

        >
          Detay
        </LoadingButton>
        </TableCell>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
         

          <ListItemText
            disableTypography
            primary={
              <Typography variant="body2" noWrap>
                {formName}
              </Typography>
            }
            
          />
        </TableCell>
        
        <TableCell>
        <ListItemText
            disableTypography
            primary={
              <Typography variant="body2" noWrap>
                {description}
              </Typography>
            }
           
          />
        </TableCell>
         <TableCell>
          <ListItemText
            primary={format(new Date(creationDate), 'dd MMM yyyy')}
            secondary={format(new Date(creationDate), 'p')}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'paid' && 'success') ||
              (status === 'pending' && 'warning') ||
              (status === 'overdue' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell>
        <TableCell>
        <ListItemText
            disableTypography
            primary={
              <Typography variant="body2" noWrap>
                {firmName}
              </Typography>
            }
           
          />
        </TableCell>
       
        
{/*
        <TableCell>
          <ListItemText
            primary={format(new Date(dueDate), 'dd MMM yyyy')}
            secondary={format(new Date(dueDate), 'p')}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        <TableCell>{fCurrency(totalAmount)}</TableCell>

        <TableCell align="center">{sent}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'paid' && 'success') ||
              (status === 'pending' && 'warning') ||
              (status === 'overdue' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ px: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}

InvoiceTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
