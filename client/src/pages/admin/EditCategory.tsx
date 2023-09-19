import React from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { useParams } from 'react-router-dom'
import Loading from '../../components/reusableUi/Loading';
import HeaderTitle from '../../components/reusableUi/HeaderTitle';
import { useCategory } from '../../hooks/useCategories';
import AddCategory from '../../components/admin/category/AddCategory';

export default function AdminEditCategory() {
    const {categoryId} = useParams();
    const {data , isLoading} = useCategory(categoryId);
    
  return (
    <AdminLayout>
        {
            isLoading?
            <Loading/>
            :
            <>
                <HeaderTitle title={"تعديل القسم"} color={true}/>
                <AddCategory isUpdate={true} category={data?.category}/>
            </>
        }
    </AdminLayout>
  ) 
}
