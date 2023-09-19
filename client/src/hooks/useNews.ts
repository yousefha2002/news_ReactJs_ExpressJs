import {useQuery} from  'react-query'
import { New } from '../types/News';
import { singleCategory } from '../types/Categories';


export const fetchAllNews = async (page:number) =>{    
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/new/all?page=${page}`);
    return res.json(); 
}

export const useAllNews = (page:number) => {
    return useQuery<{news:New[],totalPages:number}>('fetch-all-news', ()=>fetchAllNews(page));
}

export const fetchSingleNewsAdmin = async (id:string , token:string) =>{    
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/new/admin/${id}`,{
        headers:{
            "Authorization":token
        }
    });
    return res.json(); 
}

export const useSingleNewsAdmin = (id:string,token:string) => {
    return useQuery<{new:New}>(['fetch-single-admin-news',id], ()=>fetchSingleNewsAdmin(id,token));
}


export const fetchAllNewsByCategory = async (page:number , id:string) =>{    
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/new/category/${id}?page=${page}`);
    return res.json(); 
}

export const useAllNewsByCategory = (page:number,id:string) => {
    return useQuery<{news:New[],totalPages:number , category:singleCategory}>(['fetch-all-news-byCategory',id], ()=>fetchAllNewsByCategory(page,id));
}

export const fetchNew = async (id:string) =>{    
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/new/${id}`);
    return res.json(); 
}

export const useSingleNew = (id:string) => {
    return useQuery<{new:New}>(['fetch-new',id], ()=>fetchNew(id));
}