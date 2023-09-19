import React from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddNew from '../../components/admin/news/AddNew';
import AdminViewNews from '../../components/admin/news/ViewNews';
import AddAuthor from '../../components/admin/authors/AddAuthor';
import AdminViewAuthors from '../../components/admin/authors/ViewAuthors';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


function AdminAuthors() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <AdminLayout>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="إضافة مؤلف" {...a11yProps(0)} />
                <Tab label="مشاهدة المؤلفين" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <AddAuthor/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <AdminViewAuthors/>
            </TabPanel>
        </Box>
    </AdminLayout>
  )
}

export default AdminAuthors