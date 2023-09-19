import {useQuery} from  'react-query'
import { New } from '../types/News';


export const fetchMainNews = async () =>{
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/new/random`);
    return res.json(); 
}

export const useMainNews = () => {
    return useQuery<{news:New[]}>('fetch-all-news', fetchMainNews);
}