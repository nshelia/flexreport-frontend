//@ts-nocheck
import { useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { IServerSideGetRowsParams } from 'ag-grid-enterprise';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import api from '../../api';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const createServerSideDatasource = ({
  customerId,
  reportId,
  onColumns,
}: {
  customerId: string;
  reportId: string;
  onColumns: (cols: any) => void;
}) => ({
  getRows: async (params: IServerSideGetRowsParams) => {
    try {
      const { startRow, endRow } = params.request;
      // if (!startRow || !endRow) {
      //   return;
      // }
      const page = startRow / 5 + 1;
      const pageSize = 5;

      const response = await api.runQuery({ page, pageSize, customerId, reportId });
      const { headers } = response;
      const cols = headers.map((header: any) => ({ field: header }));
      const resultRows = response.data.map((row: any) => {
        const rowObject: { [key: string]: string } = {};
        row.forEach((cell: any, index: any) => {
          if (headers[index]) {
            rowObject[headers[index]] = cell;
          }
        });
        return rowObject;
      });
      onColumns(cols);
      params.success({
        rowData: resultRows,
        rowCount: response.totalCount,
      });
    } catch (error) {
      params.fail();
    }
  },
});
export default function TableScrollArea({
  customerId,
  reportId,
}: {
  customerId: string;
  reportId: string;
}) {
  const gridApiRef = useRef<any>(null);

  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', minWidth: 220 },
    { field: 'country', minWidth: 200 },
    { field: 'year' },
    { field: 'sport', minWidth: 200 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ]);

  const onGridReady = (params: any) => {
    if (!gridApiRef.current) {
      return;
    }

    gridApiRef.current = params;
    const datasource = createServerSideDatasource({
      customerId,
      reportId,
      onColumns: (cols: any) => setColumnDefs(cols),
    });
    // register the datasource with the grid
    params.api.setServerSideDatasource(datasource);
  };

  return (
    <div className="ag-theme-alpine-dark" style={{ height: 400, width: 1005 }}>
      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: true,
          filter: true,
        }}
        pagination
        rowModelType="serverSide"
        modules={[ServerSideRowModelModule]}
        paginationPageSize={5}
        cacheBlockSize={5}
        onGridReady={onGridReady}
      />
    </div>
  );
}
