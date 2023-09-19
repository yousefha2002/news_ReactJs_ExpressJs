export type Opinion ={
    id:number,
    title?:string,
    description?:string,
    image?:string,
    category ?: {
        id: number,
        title: string
    },
    author?:{
        id:number,
        name:string,
        image?:string
    },
    createdAt?: string ,
    updatedAt?: string,
    categoryId? : number,
    authorId? : number,
    headLine?:string
}