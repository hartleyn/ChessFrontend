import React from 'react';
import Grid from '@material-ui/core/Grid';


const ColumnHeaderRow = () => (
  <div>
    <Grid 
      container
      justify="center"
    >
      <Grid item xs={1}></Grid>
      <Grid item xs={1}><h6>A</h6></Grid>
      <Grid item xs={1}><h6>B</h6></Grid>
      <Grid item xs={1}><h6>C</h6></Grid>
      <Grid item xs={1}><h6>D</h6></Grid>
      <Grid item xs={1}><h6>E</h6></Grid>
      <Grid item xs={1}><h6>F</h6></Grid>
      <Grid item xs={1}><h6>G</h6></Grid>
      <Grid item xs={1}><h6>H</h6></Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  </div>
)

export default ColumnHeaderRow;
