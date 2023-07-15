import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import {Posts} from "./main";
import { auth, db } from "../../components/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
interface Props {
    post:Posts;
}
interface Like {
    likeId:string;
    userId:string;
}
export const Post=(props : Props) =>{
    const {post} = props;
    const [user] = useAuthState(auth);

    const[likes,setLikes] = useState<Like[] | null>(null);

    const likeRef = collection(db,"likes");

    const likesDoc = query(likeRef, where("postId", "==" , post.id));

    const getLike = async() =>{
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc)=>({userId: doc.data().userId,likeId: doc.id})));
    };

    const addLike = async()=>{
        try{
            const newDoc = await addDoc(likeRef,{userId:user?.uid ,postId:post.id});
            if (user){
                setLikes((prev) =>
                    prev? [...prev, {userId :user.uid,likeId:newDoc.id}] 
                    : [{userId : user.uid,likeId:newDoc.id}]
                );
            }
        } catch(err){
            console.log(err);
        }
        

    };

    const removeLike = async()=>{
        try{
            const likeToDeleteQuery = query(
                likeRef, where("postId","==",post.id),
                where("userId","==",user?.uid)
            );
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db,"likes",likeId);
            await deleteDoc(likeToDelete);
            
            if (user){
                setLikes((prev) =>
                    prev && prev.filter((like)=> like.likeId !== likeId)
                );
            }
        } catch(err){
            console.log(err);
        }
        

    };



    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

    useEffect(()=>{
        getLike();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return <div className="postbox">
        <div className="title">
            <h1>{post.title}</h1>
        </div>
        <div className="description">
            <p>{post.description}</p>
        </div>
        <div className="footer">
            <p>@{post.username}</p>
        </div>
        <button onClick={hasUserLiked ? removeLike : addLike}>
        {" "}
        {hasUserLiked? <>&#128078;</> : <>&#128077;</>}{" "}
        </button>
        {likes && <p>Likes:{likes?.length}</p>}
    </div>
}