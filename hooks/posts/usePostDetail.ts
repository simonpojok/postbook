import {useEffect, useState} from "react";
import {LoadingStatus} from "@/models/loading_status/loading_status.model";
import axios from "axios";
import {baseUrl} from "@/config"; // 151172

export const usePostDetail = ({id}: { id: number }) => {
    const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(LoadingStatus.LOADING);
    const [post, setPost] = useState<any>(null);


    useEffect(() => {
        Promise.all([axios.get(`${baseUrl}/users`), axios.get(`${baseUrl}/posts`), axios.get(`${baseUrl}/comments`)])
            .then((response) => response.map((response) => response.data))
            .then(([users, posts, comments]) => {
                const userContent = posts.filter((post: Post) => post.id == id).map((post: Post) => {
                    return {
                        ...post,
                        user: users.find((user: User) => user.id === post.userId),
                        comments: comments.filter((comment: Comment) => comment.postId === post.id),
                    }
                })
                setPost(userContent[0])
                setLoadingStatus(LoadingStatus.SUCCESS);
            }).catch((error) => {
            console.error(error);
            setLoadingStatus(LoadingStatus.ERROR)
        })
    }, [id])

    return {loadingStatus, post};
}
