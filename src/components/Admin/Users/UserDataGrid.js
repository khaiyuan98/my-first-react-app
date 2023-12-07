import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import moment from 'moment/moment';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Paper } from '@mui/material';

const GET_USERS_URL = '/user';

const columns = [
  {
    field: 'UserId',
    headerName: 'ID',
    width: 0.5,
    editable: false,
  },
  {
    field: 'Username',
    headerName: 'Username',
    flex: 0.2,
    editable: false,
  },
  {
    field: 'FirstName',
    headerName: 'First name',
    flex: 0.2,
    editable: false,
  },
  {
    field: 'LastName',
    headerName: 'Last name',
    flex: 0.2,
    editable: false,
  },
  {
    field: 'RoleName',
    headerName: 'Role',
    flex: 0.2,
    editable: false,
  },
  {
    field: 'UserGroups',
    headerName: 'Groups',
    flex: 0.2,
    editable: false,
    renderCell: (params) =>
      <div>
        {params.value.map(item =>
          <div>
            {item}
          </div>
        )}
      </div>
  },
  {
    field: 'LastLoginDate',
    headerName: 'Last Login',
    flex: 0.2,
    editable: false,
    valueFormatter: params => {
      return params.value != null ? moment(params?.value).format("DD/MM/YYYY hh:mm A") : '-'
    },
  },
  {
    field: 'LastUpdated',
    headerName: 'Last Updated',
    flex: 0.2,
    editable: false,
    valueFormatter: params => {
      return params.value != null ? moment(params?.value).format("DD/MM/YYYY hh:mm A") : '-'
    },
  },
  {
    field: 'LastUpdatedBy',
    headerName: 'Updated By',
    flex: 0.2,
    editable: false,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    getActions: (params) => [
      <GridActionsCellItem
        icon={<VisibilityIcon />}
        label="Duplicate User"
        onClick={() => { console.log(params) }}
      />,
      <GridActionsCellItem
        icon={<ModeEditIcon />}
        label="Edit"
        onClick={() => { }}
        showInMenu
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={() => { }}
        showInMenu
      />,
    ],
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
      : <Paper sx={{ minHeight: 500, width: '100%' }}>
        <DataGrid
          sx={{ minHeight: 'inherit' }}
          density='comfortable'
          getRowHeight={() => 'auto'}
          autoPageSize={true}
          getRowId={(row) => row.UserId}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          disableRowSelectionOnClick={true}
        />
      </Paper>
  );
}

export default UserDataGrid;