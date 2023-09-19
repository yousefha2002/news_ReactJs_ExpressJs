import React from 'react'
import {Box,Container,Tab} from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import LastNews from './LastNews';
import MostReadNews from './MostReadNews';

export default function NewsDetails() {

    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{backgroundColor:"#f7f7f9",paddingY:"20px",marginTop:"60px",marginBottom:"50px"}}>
            <Container>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="آخر الأخبار" value="1" sx={{fontSize:"20px"}}/>
                            <Tab label="الأكثر قراءة" value="2" sx={{fontSize:"20px"}}/>
                        </TabList>
                    </Box>
                    <TabPanel value="1"><LastNews/></TabPanel>
                    <TabPanel value="2"><MostReadNews/></TabPanel>
                </TabContext>
            </Container>
        </Box>
    )
}
