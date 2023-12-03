import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const GET_USERS_URL = '/user';

const columns = [
  {
    field: 'UserId',
    headerName: 'ID',
    width: 90,
    editable: false,
  },
  {
    field: 'Username',
    headerName: 'Username',
    width: 150,
    editable: false,
  },
  {
    field: 'FirstName',
    headerName: 'First name',
    width: 150,
    editable: false,
  },
  {
    field: 'LastName',
    headerName: 'Last name',
    width: 150,
    editable: false,
  },
  {
    field: 'Role',
    headerName: 'Role',
    width: 110,
    editable: false,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.FirstName || ''} ${params.row.LastName || ''}`,
  },
];

const UserDataGrid = () => {
  const axios = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get(GET_USERS_URL)
      .then((response) => {
        setRows(response.data);
        setIsLoading(false);
      })
      .catch(error => {

      });

  }, []);

  return (
    isLoading ? 'Loading...'
      : <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          getRowId={(row) => row.UserId}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
  );
}

export default UserDataGrid;