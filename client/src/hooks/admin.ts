import {useQuery} from  'react-query'


export const fetchBoxInfo = async () =>{    
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/admin/info`);
    return res.json(); 
}

export const useBoxInfo = () => {
    return useQuery<{authors:number,videos:number,opinions:number,news:number}>('fetch-all-authors', fetchBoxInfo);
}



