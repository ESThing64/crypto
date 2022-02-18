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

import CurrencyRow from './CurrencyRow';
import { it } from 'date-fns/locale';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

let updatedValue = {}
let currentValues;

const PopularCard = ({ isLoading }) => {
    const [apiData, setApiData] = useState([]);
    const [currentCoinApi, setCurrentCoinData] = useState([]);
    const [accountBalanceData, setAccountBalanceData] = useState([]);
    const [convertUsd, setConvertUsd] = useState(
        {
            bitcoin:'Try Again Later, (Api) failed!',
            ethereum:'Try Again Later, (Api) failed!',
            chainlink:'Try Again Later, (Api) failed!',
            strong: '',
            bsc: '',
            matic: '',
            ftm: '',
            power: '',
        });
    //Gets the coin data for each user
        const accountApi = 'https://afterlifeapparel.com/index.php';
    useEffect(() => {
        axios.get(accountApi).then((data) => {    
            setApiData(data.data);
        });
    }, []);

    // get user's info balance and so on
    const accoutBalanceUrl = "https://afterlifeapparel.com/balance.php"
    useEffect(() =>{
        axios.get(accoutBalanceUrl).then((data) => data.status === 200 ? setAccountBalanceData(data.data[0]) : setAccountBalanceData('loading'))
    },[])

    //Gets current conversion rate to USD 
    useEffect(() =>{
        function getCoinData(coinUrl){
            axios.get(coinUrl).then((data) => {
                updatedValue = data.data
                setConvertUsd(prevState =>({
                    ...prevState,
                    ...updatedValue
                }))
            })

        }
        const coinUrls = [
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=chainlink&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=strong&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=wbnb&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=wmatic&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=fantom&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=power-nodes&vs_currencies=usd"
        ]

        coinUrls.forEach(getCoinData)
    }, [])

    useEffect(()=>{
        currentValues = convertUsd
        console.log(currentValues);
    },[convertUsd])
    
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                                <BajajAreaChartCard accountBalanceData={accountBalanceData} />
                       
                            </Grid>
                            <Grid item xs={12}>

                                {apiData.map((data) => (
                        <CurrencyRow coin={data.coin} bal={data.bal} price={"$"+Math.round(currentValues[data.coin].usd * data.bal)+ ".00"} theme={theme} />
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
