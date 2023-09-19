import {useQuery} from  'react-query'
import { New } from '../types/News';


export const fetchNews = async () =>{
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/new/mostViews`);
    return res.json(); 
}

export const useViewNews = () => {
    return useQuery<{news:New[]}>('fetch-view-news', fetchNews);
}