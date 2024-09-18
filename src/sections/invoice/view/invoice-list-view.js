import sumBy from 'lodash/sumBy';

import { useState, useCallback,useEffect } from 'react';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import axios, { endpoints } from 'src/utils/axios';

// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// utils
import { fTimestamp } from 'src/utils/format-time';
// _mock
import { _invoices } from 'src/_mock';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
//
import InvoiceAnalytic from '../invoice-analytic';
import InvoiceTableRow from '../invoice-table-row';
import InvoiceTableToolbar from '../invoice-table-toolbar';
import InvoiceTableFiltersResult from '../invoice-table-filters-result';

// ----------------------------------------------------------------------


const TABLE_HEAD2 = [
  { id: 'detail',label:'Detay' },
  { id: 'formName', label: 'FormAdı' }, 
  { id: 'description', label: 'Açıklama' },
  { id: 'creationDate', label: 'Oluşturma Tarihi' },
  { id: 'status', label: 'Durum' },
  { id: 'firmName', label: 'Firma Adı', align: 'center' },
];

const defaultFilters = {
  formName: '',
  description:'',
  creationDate:'',
  status:'',
  id:'',
  firmName:''
};

// ----------------------------------------------------------------------

export default function InvoiceListView() {
  const theme = useTheme();

  const settings = useSettingsContext();

  const router = useRouter();

  const table = useTable({ defaultOrderBy: 'createDate' });

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(_invoices);

  const [filters, setFilters] = useState(defaultFilters);
  const [apiData, setApiData] = useState(defaultFilters);
  const [loading, setLoading] = useState(true); // Yükleniyor durumu


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoints.invoince.list);
        console.log('API response:', response.data);
  
        // Eğer response.data bir dizi değilse, onu uygun formatta bir diziye dönüştür
        if (Array.isArray(response.data)) {
          setApiData(response.data);
        } else {
          console.error('API verisi beklenen formatta değil:', response.data);
          setApiData([]);  // Boş bir diziye ayarla veya başka bir işlem yap
        }
      } catch (error) {
        console.error('API hatası:', error);
      }  finally {
        setLoading(false); // Yükleme tamamlandı
      }
    };
  
    fetchData();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  const dataFiltered = applyFilter(
    {
    inputData: apiData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    
  });
  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 56 : 76;

  const canReset =
    !!filters.name ||
    filters.status !== 'all' 

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleEditRow = (id) => {
    router.push(paths.dashboard.invoice.edit(id));
  };
  const handleFilters = (name, value) => {
    table.onResetPage();
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setTableData(deleteRow);
  
    table.onUpdatePageDeleteRow(dataInPage.length);
  };

  const handleDeleteRows = () => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    setTableData(deleteRows);
  
    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  };
  const handleViewRow = (id) => {
    router.push(paths.dashboard.invoice.details(id));
  };
 
  const handleResetFilters = () => {
    setFilters(defaultFilters);
  };


  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
    
        <Card>
       
          <InvoiceTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
          />

          {canReset && (
            <InvoiceTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Stack direction="row">
                  <Tooltip title="Sent">
                    <IconButton color="primary">
                      <Iconify icon="iconamoon:send-fill" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Download">
                    <IconButton color="primary">
                      <Iconify icon="eva:download-outline" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Print">
                    <IconButton color="primary">
                      <Iconify icon="solar:printer-minimalistic-bold" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={confirm.onTrue}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD2}
                  rowCount={apiData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <InvoiceTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters,  }) {
  const { name } = filters;
console.log("inputData",inputData)
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (invoice) =>
        invoice.firmId.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        invoice.firmName.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }


  return inputData;
}
