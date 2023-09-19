import { New } from "./News"
import { Opinion } from "./Opinion"

export type Categories = Category[]

export type singleCategory ={
    id:number,
    title:string,
    createdAt:string,
    updatedAt:string,
}

export type Category = singleCategory &{
    news:New[],
    opinions:Opinion[]
}