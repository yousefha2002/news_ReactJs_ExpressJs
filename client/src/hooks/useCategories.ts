import {useQuery} from  'react-query'
import { Categories, singleCategory } from '../types/Categories';


export const fetchCategories = async () =>{
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/category/all`);
    return res.json(); 
}

export const useCategories = () => {
    return useQuery<{categories:Categories}>('fetch-all-categories', fetchCategories);
}

export const fetchCategory = async (id:string | undefined) =>{
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/category/${id}`);
    return res.json(); 
}

export const useCategory = (id:string | undefined) => {
    return useQuery<{category:singleCategory}>(['fetch-single-categories',id], ()=>fetchCategory(id));
}