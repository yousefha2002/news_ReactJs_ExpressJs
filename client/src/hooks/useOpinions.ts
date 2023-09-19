import {useQuery} from  'react-query'
import { Opinion } from '../types/Opinion';
import { OpinionCategory } from '../types/OpinionCategory';


export const fetchAllOpinion = async (page:number) =>{    
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/opinion/all?page=${page}`);
    return res.json(); 
}

export const useAllOpinions = (page:number) => {
    return useQuery<{opinions:Opinion[],totalPages:number}>('fetch-all-opinions', ()=>fetchAllOpinion(page));
}

export const fetchSingleOpinion = async (id:string) =>{    
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/opinion/${id}`);
    return res.json(); 
}

export const useSingleOpinion = (id:string) => {
    return useQuery<{opinion:Opinion}>(['fetch-single-opinion',id], ()=>fetchSingleOpinion(id));
}

export const fetchAllOpinionsWithCategories = async () =>{    
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/opinion/all/categories`);
    return res.json(); 
}

export const useAllOpinionsWithCategories = () => {
    return useQuery<{categories:OpinionCategory[]}>('fetch-all-with-categories-opinion', fetchAllOpinionsWithCategories);
}

export const fetchAllOpinionsByCategory = async (id:string , page:number) =>{    
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/opinion/all/category/${id}?page=${page}`);
    return res.json(); 
}

export const useAllOpinionsByCategory = (id:string , page:number) => {
    return useQuery<{opinions:Opinion[] , totalPages:number , title:string}>(['fetch-all-by-categories-opinion',id], ()=>fetchAllOpinionsByCategory(id,page));
}