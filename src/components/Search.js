import React,{useState,useEffect} from 'react'
import {useLocation,useHistory} from 'react-router-dom'
import queryString  from 'query-string'
export const Search = () => {
    const loc=useLocation()
    const history= useHistory()
    const {path,search} = loc;
    const parsed=queryString.parse(search)
    console.log(parsed.name)
    const [page,setPage]= useState(parsed.name)
    console.log("page is ",page)
    const changeURL=(e)=>{
       setPage(e.target.value)
        // history.push(`Search/?name={ishfaq}`)
    }
    useEffect(()=>{
        const params=new URLSearchParams(loc.search)
        const q= params.get('name')
        console.log("q is ",q)
       history.push(`/search?name=`+ page)
    },[page])
    return (
        <div>
            <h2>Search page</h2>
            
            <input type="text" onChange={changeURL}/>
        </div>
    )
}
