import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import axios from 'axios';

// assets;
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';


function currencyRow( { theme, coin, bal, price, url }) {
    return (
      <>
                               <Grid container direction="column">
                                    
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                   
                                                    <a target="_blank" href={url}>{coin}</a>
                                                </Typography>
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    {bal}
                                                </Typography>
                                            </Grid>
                                            </Grid>


                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            {price}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                                            {}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 1.5 }} />
                                

      </>
                                
                                

    
 
  )
}

export default currencyRow