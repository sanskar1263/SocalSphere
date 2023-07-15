import { getDocs,collection } from "firebase/firestore";
import {useState,useEffect} from "react";
import {db} from "../../components/config/firebase";
import {Post} from "../main/post";

export interface Posts{
    id:string;
    userId:string;
    title:string;
    username:string;
    description:string;
}

export const Main =()=>{

    const [postList,setPostsLists] = useState<Posts[] | null>(null);
    const postRef = collection(db,"posts");

    const getPosts = async () =>{
        const data = await getDocs(postRef);
        setPostsLists(data.docs.map((doc)=>({...doc.data(), id: doc.id})) as Posts[]
        );
    };
    useEffect(() => {
        getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    return <div>
        {postList?.map((post) =>(
            <Post post ={post}/>
        ))}
    </div>
}