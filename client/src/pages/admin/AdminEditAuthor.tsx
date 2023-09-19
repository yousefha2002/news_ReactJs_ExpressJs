import React from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { useParams } from 'react-router-dom'
import Loading from '../../components/reusableUi/Loading';
import AddAuthor from '../../components/admin/authors/AddAuthor';
import HeaderTitle from '../../components/reusableUi/HeaderTitle';
import { useSingleAuthor } from '../../hooks/useAuthors';

export default function AdminEditAuthor() {
    const {authorId} = useParams();
    const {data , isLoading} = useSingleAuthor(authorId||"");
    
  return (
    <AdminLayout>
        {
            isLoading?
            <Loading/>
            :
            <>
                <HeaderTitle title={"تعديل المؤلف"} color={true}/>
                <AddAuthor name={data?.author.name} headline={data?.author.headline} isUpdate={true} id={data?.author.id}/>
            </>
        }
    </AdminLayout>
  ) 
}
