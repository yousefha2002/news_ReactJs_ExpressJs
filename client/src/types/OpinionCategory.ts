export type OpinionCategory = {
    id:number, 
    title:string,
    opinions:{
        id: number,
        title: string,
        authorId: number,
        author: {
            id: number,
            name: string,
            image:string
        }
    }[]
}