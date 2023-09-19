export type New ={
    id: number,
    image?:string,
    title?: string,
    description?: string,
    views?: number,
    isSelected ?: boolean,
    createdAt?: string ,
    updatedAt?: string,
    categoryId? : number,
    category ?: {
        id: number,
        title: string
    },
    headLine?:string
}