import React from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { useParams } from 'react-router-dom'
import Loading from '../../components/reusableUi/Loading';
import AddNew from '../../components/admin/news/AddNew';
import HeaderTitle from '../../components/reusableUi/HeaderTitle';
import { useSingleNewsAdmin } from '../../hooks/useNews';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function AdminEditNew() {
    const {newId} = useParams();
    const {token} = useSelector((s:RootState) => s.admin)
    const {isLoading , data} = useSingleNewsAdmin(newId||"" , token);
    
  return (
    <AdminLayout>
        {
            isLoading?
            <Loading/>
            :
            <>
            <HeaderTitle title={"تعديل الخبر"} color={true}/>
            <AddNew title={data?.new.title} description={data?.new.description} categoryId={`${data?.new.categoryId}`}
            isUpdate={true} newId={data?.new.id}/>
            </>
        }
    </AdminLayout>
  ) 
}
