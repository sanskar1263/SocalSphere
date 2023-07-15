import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../components/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";



interface CreateFormData {
    title: string;
    description: string;
}

export const CreateForm = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must add a description"),
    });

    const { register, handleSubmit } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    const postRef = collection(db,"posts");

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postRef,{
            ...data,
            username:user?.displayName,
            userId:user?.uid,
        })

        navigate("/");
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onCreatePost)}>
                <input placeholder="title.." {...register("title")} />
                <textarea placeholder="description..." {...register("description")} />
                <input type="submit" />
            </form>
        </div>
    );
};