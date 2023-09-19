import {useQuery} from  'react-query'
import { video } from '../types/Video';


export const fetchAllVideo = async (page:number , size:number) =>{    
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/video/all?page=${page}&&size=${size}`);
    return res.json(); 
}

export const useAllVideos = (page:number, size:number) => {
    return useQuery<{videos:video[],totalPages:number}>('fetch-all-videos', ()=>fetchAllVideo(page,size));
}

export const fetchVideos = async () =>{
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/video/all?size=8&&page=1`);
    return res.json(); 
}

export const useVideos = () => {
    return useQuery<{videos:video[]}>('fetch-videos', fetchVideos);
}

export const fetchSingleVideo = async (id:string) =>{
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/video/${id}`);
    return res.json(); 
}

export const useSingleVideo = (id:string) => {
    return useQuery<{video:video}>(['fetch-video',id], ()=>fetchSingleVideo(id));
}

export const fetchRandomVideos = async () =>{
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/video/random`);
    return res.json(); 
}

export const useRandomVideos = () => {
    return useQuery<{videos:video[]}>('fetch-videos-random', fetchRandomVideos);
}