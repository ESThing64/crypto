import PropTypes from 'prop-types';
import { useContext, useEffect, useState, useRef } from 'react';

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

import CurrencyRow from './CurrencyRow';
import { it } from 'date-fns/locale';

import FirebaseContext from '../../contexts/FirebaseContext'
import { array } from 'yup';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //


const PopularCard = ({ isLoading }) => {
    const useAuth = useContext(FirebaseContext)
    const [coinData, setCoinData] = useState([]);
    const [accountData, setAccountData] = useState([]);
    const [clientProfit, setClientProfit] = useState([])
    const [loggedInUser, setLoggedinUser] = useState()
    const [clientRoi, setClientRoi] = useState([])
    const [balance, setBalance] = useState(0)
    const [graphData, setGraphData] = useState([]);
    const [coinUrlz, setCoinUrlz] =useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        if (useAuth.user.email){
            setLoggedinUser(useAuth.user.email)
            axios.get('http://afterlifeapparel.com/newform_test.php').then((data) => {
                setAccountData(data.data);
                console.log('api data', accountData);
            })
        }
    }, []);

    const roundToHundredth = (value) => {
        return Number(value.toFixed(2));
      };



    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    useEffect(() => {
        if(loggedInUser){
            console.log(loggedInUser)
            accountData?.forEach((arrayItem) => {
                if (arrayItem.user === loggedInUser) {
                    setCoinData(arrayItem.coins)
                    setClientRoi(arrayItem.info.roi)
                    setGraphData(arrayItem.info.totals)
                    console.log('coin data',coinData);
                    console.log('client roi',clientRoi);

                }
            })
       
    
             let profit = 0
            coinData?.forEach((arrayItem)=>{
                profit += arrayItem.price * arrayItem.bal
    
            })     
            setClientProfit(profit)
        }
        
        
        
        
    }, [loggedInUser, accountData, coinData])
    
    useEffect(()=>{
        setBalance(clientProfit + clientRoi)
    },[clientRoi, clientProfit])


    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Your Wallet</Typography>
                                    </Grid>
                                    <Grid item>
                                        <MoreHorizOutlinedIcon
                                            fontSize="small"
                                            sx={{
                                                color: theme.palette.primary[200],
                                                cursor: 'pointer'
                                            }}
                                            aria-controls="menu-popular-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            id="menu-popular-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}> Today</MenuItem>
                                            <MenuItem onClick={handleClose}> This Month</MenuItem>
                                            <MenuItem onClick={handleClose}> This Year </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ pt: '16px !important' }}>
                                <BajajAreaChartCard balance={balance} clientRoi={clientRoi} clientProfit={clientProfit} graphData={graphData} />
                            </Grid>
                            <Grid item xs={12}>
                                {coinData.map((data) => (
                                    <CurrencyRow url={data.url} key={data.coin + data.bal} coin={data.coin} bal={data.bal} price={"$" + roundToHundredth(parseFloat(data.price) * parseFloat(data.bal)) }  theme={theme} />
                                ))}
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                        <Button size="small" disableElevation>
                            View All
                            <ChevronRightOutlinedIcon />
                        </Button>
                    </CardActions>
                </MainCard>
            )}
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
