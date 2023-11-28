import axios from "axios";
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";
import CategoryF from "../components/CategoryF";
import { cate } from "../components/cate";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const CreateBlog = ()=> {

    

    const [auth, setAuth] = useAuth();

    const [name, setName] = useState();
    const [desc, setDesc] = useState();
    const [cate, setCate] = useState();
    const [image, setImage] = useState();

    const editorRef = useRef(null);

    const log = () => {
        if (editorRef.current) {
          console.log(editorRef.current.getContent());
        }
      };
    
    const createBlog = async()=> {
        try {
            // if(editorRef.current.getContent.length >= 0){
            //    return alert('comment section empty')
            // }
            const blogData = new FormData();
            blogData.append('name', name);
            blogData.append('description', editorRef.current.getContent());
            blogData.append('category', cate);
            blogData.append('image', image);
            blogData.append('user', auth.user._id)
            const {data} = await axios.post('http://localhost:8080/api/v1/blogs/createBlog', blogData);
            if(data?.success){
                alert('blog updated')
            }
        } catch (error) {
            console.log(error);
            alert('some error')
        }
    }

   
        const [ca, setCa] = useState([]);
        const cat = async()=> {
            try {
                const {data} = await axios.get('http://localhost:8080/api/v1/category/getCate');
        
                if(data?.success){
                   setCa(data?.cate)
            
                }
            } catch (error) {
                console.log(error)
            }
        }



        
        useEffect(()=> {
            cat()
        }, [])


    return (
        <>
       <div className="blog container section-ratio">

       <HeaderAdmin />
     

       <div className="blog-right">
    
       <input type='text' name='name' value={name} placeholder='title' onChange={ (e)=> setName(e.target.value) }  />
       {/* <input type='text' name='password' value={desc} placeholder='description' onChange={(e)=> setDesc(e.target.value)} /> */}
      

       <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 400,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />

       <select name="cate" onChange={(e)=>setCate(e.target.value)}>
    
        {
            ca.map((elem)=> {
          return <option value={elem.category}>{elem.category}</option>
            })
        }
      </select>
       <input type='file' name='image'  onChange={(e)=> setImage(e.target.files[0])} />

       <button onClick={createBlog}>create</button>



      
      <button onClick={log}>Log editor content</button>


        
       </div>

       </div>
        </>
    )
}

export default CreateBlog