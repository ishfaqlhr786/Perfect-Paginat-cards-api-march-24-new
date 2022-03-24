

import React,{useState,useEffect,useCallback} from 'react'
import {useLocation,Link,BrowserRouter as Router,useHistory}  from 'react-router-dom'
import axios from 'axios'
import {Pagination}  from './Pagination'
import queryString from 'query-string'
export const Home = () => {
   const loc=useLocation()
  const history= useHistory()
    const {path,search} = loc
    const parsed=queryString.parse(search)
    console.log(parsed)
    console.log("limit is",parsed.limit)
    console.log("offst is", parsed.offset)
   // const [page,setPage]= useState(parsed.name)
  //  console.log("page is ",page)
    const changeURL=(e)=>{
     //  setPage(e.target.value)
        // history.push(`Search/?name={ishfaq}`)
    }
   
    
  const [posts,setPosts]=useState([]);
 // const history=useHistory();
  const [limit,setLimit]=useState(parsed.limit)
  const [showPerPage,setShowPerPage]= useState(limit)
  const [startPage,setStartPage]= useState(0)
  const [pagination,setPagination]=useState({
    start:parsed.offset,
    end:showPerPage
  })
  
  const onPageChange=(start,end)=>{
   
    console.log(start,end)
    setPagination({start:start,end:end})
   // changeUrl();
    history.push({
        pathname: '/Home',
        search: "?" + new URLSearchParams({limit: limit}).toString() +"&&"+ new URLSearchParams({offset: start}).toString()
        })
  // history.push(`/?limit=10`)
  }
//   useEffect(()=>{
//     history.push(`?limit=${limit}`)
// },limit)
  const handleLimit=(e)=>{
  e.preventDefault()
    setLimit(e.target.value)
    setShowPerPage(e.target.value)
    onPageChange(0,e.target.value)

   // changeUrl();
    // history.push({
    //     pathname: '/Home',
    //     search: "?" + new URLSearchParams({limit: limit}).toString() +"&&"+ new URLSearchParams({offset:pagination.start}).toString()
    //     })
  
   
   
  }
  useEffect(()=>{
    changeUrl();
  },[limit])
const changeUrl=()=>{
    history.push({
        pathname: '/Home',
        search: "?" + new URLSearchParams({limit: limit}).toString() +"&&"+ new URLSearchParams({offset:pagination.start}).toString()
        })
}
 
 
  console.log("limit is",limit)
 // setShowPerPage(limit)
  console.log("show per page is", showPerPage)
  console.log(posts)
  const FetchData=async()=>{
    const res= await axios.get(`https://jsonplaceholder.typicode.com/posts`)
    console.log(res.data)
    setPosts(res.data)

  }
  console.log("posts ",posts)
 
 

 
useEffect(()=>{
   FetchData();
},[])

  return (
    <div className="App">
    
      
      <div className="row">
     {
       posts.slice(pagination.start,pagination.end).map(post=>{
         return (<>
         <div className="col-md-3 mb3" key={post.id}>
           <div className="card">
             <div className="card-body">
               <h3>postid#{post.id}  and{post.title}</h3>
               <p>
                 {post.body}
               </p>


             </div>
           </div>
         </div>
         </>)
       })
     }
      </div>
      <div style={{textAlign:"center"}}>
      <ul style={{display:"flex", listStyleType:"none",marginLeft:"500px"}}>
          <li>
      <select style={{height:"40px",width:"100px"}}
               value={limit}
                name="limit"
              //  placeholder={placeholder}
                onChange={handleLimit}
                
              >
               
                <option value="10">10</option>
                <option value="20">
                  20
                  </option>
                <option value="5">5</option>
                <option value="25">25</option>
              </select>
              </li>
              <li>
      <Pagination showPerPage={showPerPage} onPageChange={onPageChange} 
      total={posts.length} limit={limit} start={pagination.start}
      />
      </li>
      </ul>
      </div>
    </div>
  )
}

