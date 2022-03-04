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

let updatedValue = {}
let currentValues;

const PopularCard = ({ isLoading }) => {
    const useAuth = useContext(FirebaseContext)
    const [coinData, setCoinData] = useState([]);
    const [accountData, setAccountData] = useState([]);
    const [clientProfit, setClientProfit] = useState([])
    const [loggedInUser, setLoggedinUser] = useState()
    const [clientRoi, setClientRoi] = useState([])
    const [balance, setBalance] = useState(0)
    const [graphData, setGraphData] = useState([]);
    const [convertUsdObj, setConvertUsdObj] = useState(
        {
            bitcoin: 'Try Again Later, (Api) failed!',
            ethereum: 'Try Again Later, (Api) failed!',
            chainlink: 'Try Again Later, (Api) failed!',
            strong: '',
            bsc: '',
            matic: '',
            ftm: '',
            power: '',
        });
    useEffect(() => {
        if (useAuth.user.email){

            setLoggedinUser(useAuth.user.email)
            axios.get('http://afterlifeapparel.com/newform.php').then((data) => {
                setAccountData(data.data);
                console.log(typeof(accountData))
            });
        }
    }, []);


    //Gets current conversion rate to USD 
    useEffect(() => {
        function getCoinData(coinUrl) {
            axios.get(coinUrl).then((data) => {
                updatedValue = data.data
                setConvertUsdObj(prevState => ({
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
            "https://api.coingecko.com/api/v3/simple/price?ids=power-nodes&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=wrapped-cro&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=25&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=wrapped-avax&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=cronodes&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=wrapped-cro&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=strong&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=oxygen&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=chainlink&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=power-nodes&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=spores-network&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=cronodes&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=wrapped-cro&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=wrapped-avax&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=wbnb&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=wmatic&vs_currencies=usd",
            "https://api.coingecko.com/api/v3/simple/price?ids=fantom&vs_currencies=usd"

        ]

    

        coinUrls.forEach(getCoinData)
    }, [])

    useEffect(() => {
        currentValues = convertUsdObj
        console.log(convertUsdObj)
    }, [convertUsdObj])

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
                }
            })
       
    
             let profit = 0
            coinData?.forEach((arrayItem)=>{
                profit += currentValues[arrayItem.coin].usd * arrayItem.bal
    
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
                                    <CurrencyRow key={data.coin + data.bal} coin={data.coin} bal={data.bal} price={"$" + Math.round(currentValues[data.coin].usd * data.bal) + ".00"} theme={theme} />
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
