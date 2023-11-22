import middleware from "next-auth/middleware";

export const  config ={
    matcher:[
        '/issues/new',
        '/issues/edit/:id+'
    ]
}

export default middleware;