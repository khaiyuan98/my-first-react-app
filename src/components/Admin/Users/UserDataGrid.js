import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const GET_USERS_URL = '/user';

const columns = [
  {
    field: 'UserId',
    headerName: 'ID',
    editable: false,
  },
  {
    field: 'Username',
    headerName: 'Username',
    editable: false,
  },
  {
    field: 'FirstName',
    headerName: 'First name',
    editable: false,
  },
  {
    field: 'LastName',
    headerName: 'Last name',
    editable: false,
  },
  {
    field: 'Role',
    headerName: 'Role',
    editable: false,
  },
  {
    field: 'LastLoginDate',
    headerName: 'Last Login',
    editable: false,
  },
  {
    field: 'LastUpdated',
    headerName: 'Last Updated',
    editable: false,
  },
  {
    field: 'LastUpdatedBy',
    headerName: 'Updated By',
    editable: false,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
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
        console.log(response.data)
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