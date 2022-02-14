// material-ui
import { Typography } from '@mui/material';
import { useState } from 'react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import BalanceCard from './BalanceCard'

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
    <MainCard title="Welcome">
        <BalanceCard />
    </MainCard>
);

export default SamplePage;
