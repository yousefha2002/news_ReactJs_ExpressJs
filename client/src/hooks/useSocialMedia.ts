import {useQuery} from  'react-query'
import { social } from '../types/socialmedia';


export const fetchAllSocialmedia = async () =>{    
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/socialmedia/all`);
    return res.json(); 
}

export const useAllSocialmedia = () => {
    return useQuery<{social:social[],totalPages:number}>('fetch-all-socialmedia', fetchAllSocialmedia);
}