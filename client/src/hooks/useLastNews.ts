import {useQuery} from  'react-query'
import { New } from '../types/News';


export const fetchNews = async () =>{
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/new/last`);
    return res.json(); 
}

export const useLastNews = () => {
    return useQuery<{news:New[]}>('fetch-last-news', fetchNews);
}