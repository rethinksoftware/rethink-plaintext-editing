import React, { useState } from 'react';
import {
  Modal,
  Grid,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TextField,
  Button
} from '@material-ui/core'
import cities from './city.json'
import { filter } from "lodash"

function DataTable(props) {

  const { openTable, setOpenTable } = props

  const [cityData, setCityData] = useState(cities)

  const handleSearchQuery = (event) => {
    let filteredCities = filter(cities, function(o) { return  o.name.toLowerCase().indexOf(event.target.value) > -1; })
    setCityData([...filteredCities])
  }

  return (
    <Modal
      open={openTable}
      style={{height: "100vh"}}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Grid
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "white",
          padding: "2rem"
        }}
      >

        <TextField
          onKeyUp={handleSearchQuery}
          label='Enter search query'
          style={{ margin: "0 2rem 2rem 0" }}
        />

        <Button onClick={() => setOpenTable(false) } style={{padding: "1rem", backgroundColor: "lightgray"}}>
          Back to Home Page
        </Button>
        <TableContainer style={{ height: "80vh" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Country</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Latitude</TableCell>
                <TableCell>Longitude</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cityData.map((data, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{data.country}</TableCell>
                      <TableCell>{data.name}</TableCell>
                      <TableCell>{data.lat}</TableCell>
                      <TableCell>{data.lng}</TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Modal>
  );
}

export default DataTable;
