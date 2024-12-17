import React from 'react';
import { Menu, MenuItemLink } from 'react-admin';
import BarChartIcon from '@mui/icons-material/BarChart';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import PersonIcon from '@mui/icons-material/Person';

const CustomMenu = (props: any) => (
    <Menu {...props}>
        <MenuItemLink to="/customer" primaryText="Customer" leftIcon={<PersonIcon />} />
     
        <MenuItemLink to="/ChartPage1" primaryText="chartPage" leftIcon={<BarChartIcon />} />
        <MenuItemLink to="/ChartPage2" primaryText="3Dscatter" leftIcon={<BarChartIcon />} />

    </Menu> 
);

export default CustomMenu;