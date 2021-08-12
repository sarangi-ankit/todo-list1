import React, { useState,useEffect } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const getLocalItems=()=>{
    let list=localStorage.getItem("lists")

    if (list){
        return JSON.parse(localStorage.getItem("lists"))
    }
    else{
        return []
    }
}


export default function List() {

    const [list,setList]=useState("")
    const [items,setItems]=useState(getLocalItems())
    const [toggle,setToggle]=useState(true)
    const [isEdit,setIsEdit]=useState(null)

    const addSubmit=(e)=>{
        setList(e.target.value)
        
    }

    const addKeyPress=(e)=>{
        
        if (e.key === 'Enter') {
            if(!list){

            }else{
                const allInputData={id:new Date().getTime().toString(),name:list}
                setItems([...items,allInputData])
                setList("")
            }
        }
    }
    const addBtn=()=>{
        if(!list){
            alert("plz fill the data")
        }else if(list && !toggle){
            setItems(
                items.map((item)=>{
                    if (item.id===isEdit){
                        return {...item,name:list}
                    }
                    return item
                }
            ))
            setToggle(true)
            setList('')
            setIsEdit(null) 
        }
        else{
            const allInputData={id:new Date().getTime().toString(),name:list}
            setItems([...items,allInputData])
            setList("")
        }
    }

    const deleteItems=(index)=>{
        setItems((allData)=>{
            return allData.filter((itemval)=>{
                return index!==itemval.id
            })
        })
    }
    const editItems=(id)=>{
        const editItem=items.find((elem)=>{
            return id===elem.id
        })
        console.log(editItem)

        setToggle(false)
        setList(editItem.name)
        setIsEdit(id)
    }
    

    useEffect(() => {
        
        localStorage.setItem("lists",JSON.stringify(items))
    }, [items])
 
    
    return (
        <div className="container">
            <div className="sub-container">
                <h1 className="heading">Todo list</h1>
                <input 
                type="text" 
                placeholder="enter list" 
                value={list}
                onKeyDown={addKeyPress} 
                onChange={addSubmit}
                />
                {toggle?<button onClick={addBtn}>+</button>:
                <button><EditIcon onClick={addBtn} /></button>}
                 
                
                <ol>
                    {items.map((item)=>{
                    return(
                        <div key={item.id}>
                            <span onClick={()=>deleteItems(item.id)}>
                                <DeleteIcon className="deleteIcon" />
                            </span>
                            <span onClick={()=>editItems(item.id)}>
                                <EditIcon className="deleteIcon" />
                            </span>    
                            <li>{item.name}</li>
                            
                        </div>
                    ) 
                        
                    })}
                    
                </ol>
            </div>
        </div>
    )
}
