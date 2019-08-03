import React from 'react';
import Grid from '@material-ui/core/Grid';

import Square from './Square';


const Row = (props) => {
  const rowLabel = Number(props.row) + 1;
  const squares = [];
  for (let x = 0; x <= 7; x++) {
    squares.push(
      <Grid item key={x} xs={1}>
        <Square row={props.row} column={String(x)} />
      </Grid>
    )
  }
  return (
    <div>
      <Grid 
        container
        justify="center"
        alignItems="stretch"
      >
        <Grid item xs={1}>
          <h6>{rowLabel}</h6>
        </Grid>	
        {squares}
        <Grid item xs={1}>
          <h6>{rowLabel}</h6>
        </Grid>		
      </Grid>
    </div>
  )
}

export default Row;
