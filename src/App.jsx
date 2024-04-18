// Frontend code (App.js)

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { DataGrid } from '@mui/x-data-grid';
import Draggable from 'react-draggable';
const socket = io('http://localhost:3000'); // Assuming backend is running on localhost:3000

function App() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Listen for 'data' event from server
    socket.on('data', (data) => {
      setRows(data);
    });

    // Clean up socket connection on component unmount

    // iska pucho ye kse chalra hai
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  // Define columns for the data grid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'value', headerName: 'Value', width: 150 },
  ];

  return (
    <Draggable>
    <div style={{ position: 'absolute', top: 0, left: 0 ,cursor:"move"}}>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
        />
      </div>
    </div>
  </Draggable>
  );
}

export default App;
