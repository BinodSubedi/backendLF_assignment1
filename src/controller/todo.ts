import { Request, Response } from "express";

export const getTodoList = (req:Request,res:Response)=>{

    res.status(200).json({
        status:'success',
        list:[]
    })

}

export const postTodoList = (req:Request,res:Response)=>{

    res.status(200).json({
        status:'success',
        list:[]
    })

}


export const putTodoList = (req:Request,res:Response)=>{

    res.status(200).json({
        status:'success',
        list:'added'
    })

}

export const patchTodoList = (req:Request,res:Response)=>{

    res.status(200).json({
        status:'success',
        list:'updated'
    })

}


export const deleteTodoList = (req:Request,res:Response)=>{

    res.status(200).json({
        status:'success',
        list:'deleted item'
    })

}