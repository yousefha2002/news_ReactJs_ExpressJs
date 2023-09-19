import React from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { useParams } from 'react-router-dom'
import Loading from '../../components/reusableUi/Loading';
import HeaderTitle from '../../components/reusableUi/HeaderTitle';
import AddOpinion from '../../components/admin/opinions/AddOpinion';
import { useSingleOpinion } from '../../hooks/useOpinions';

export default function AdminEditOpinion() {
    const {opinionId} = useParams();
    const {isLoading , data} = useSingleOpinion(opinionId||"");
  return (
    <AdminLayout>
        {
            isLoading?
            <Loading/>
            :
            <>
                <HeaderTitle title={"تعديل الرأي"} color={true}/>
                <AddOpinion title={data?.opinion.title} description={data?.opinion.description} headLine={data?.opinion.headLine}
                authortId={`${data?.opinion.author?.id}`} categoryId={`${data?.opinion.category?.id}`} isUpdate={true} opinionId={data?.opinion.id}/>
            </>
        }
    </AdminLayout>
  ) 
}
