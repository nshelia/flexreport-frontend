import { useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { GridApi, IServerSideGetRowsParams } from 'ag-grid-enterprise';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import api from '../../api';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const createServerSideDatasource = ({ customerId, reportId, onColumns }) => ({
  getRows: async (params: IServerSideGetRowsParams) => {
    try {
      const { startRow, endRow } = params.request;
      const page = startRow / (endRow - startRow) + 1;
      const pageSize = endRow - startRow;

      const response = await api.runQuery({ page, pageSize, customerId, reportId });
      const { headers } = response;
      const cols = headers.map((header) => ({ field: header }));
      const resultRows = response.data.map((row) => {
        const rowObject: { [key: string]: string } = {};
        row.forEach((cell, index) => {
          if (headers[index]) {
            rowObject[headers[index]] = cell;
          }
        });
        return rowObject;
      });
      console.log(cols);
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
  const gridApiRef = useRef<GridApi>(null);

  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', minWidth: 220 },
    { field: 'country', minWidth: 200 },
    { field: 'year' },
    { field: 'sport', minWidth: 200 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ]);

  const onGridReady = (params) => {
    gridApiRef.current = params;
    const datasource = createServerSideDatasource({
      customerId,
      reportId,
      onColumns: (cols) => setColumnDefs(cols),
    });
    console.log(datasource);
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
        paginationPageSize={10}
        onGridReady={onGridReady}
      />
    </div>
  );
}
