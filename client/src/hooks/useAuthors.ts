import {useQuery} from  'react-query'
import { Author } from '../types/Author';
import { Opinion } from '../types/Opinion';


export const fetchAllAuthors = async (page:number) =>{    
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/author/all?page=${page}`);
    return res.json(); 
}

export const useAllAuthors = (page:number) => {
    return useQuery<{authors:Author[],totalPages:number}>('fetch-all-mk-authors', ()=>fetchAllAuthors(page));
}



export const fetchSingleAuthor = async (id:string) =>{        
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/author/${id}`);
    return res.json(); 
}

export const useSingleAuthor = (id:string) => {
    return useQuery<{author:Author}>(['fetch-single-author',id], ()=>fetchSingleAuthor(id));
}

export const fetchAuthorOpinions = async (page:number , id:string) =>{        
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/author/${id}/opinions?page=${page}`);
    return res.json(); 
}

export const useAuthorOpinions = (page:number , id:string) => {
    return useQuery<{opinions:Opinion[] , totalPages:number}>(['fetch-author-opinions',id], ()=>fetchAuthorOpinions(page,id));
}