import {useQuery} from  'react-query'
import { Opinion } from '../types/Opinion';


export const fetchOpinions = async () =>{
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/opinion/last`);
    return res.json(); 
}

export const useLastOpinions = () => {
    return useQuery<{opinions:Opinion[]}>('fetch-last-opinions', fetchOpinions);
}