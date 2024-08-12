import {useEffect, useState} from "react";
import {LoadingStatus} from "@/models/loading_status/loading_status.model";
import axios from "axios";
import {baseUrl} from "@/config";

export const usePosts = () => {
    const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(LoadingStatus.LOADING);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        Promise.all([axios.get(`${baseUrl}/users`), axios.get(`${baseUrl}/posts`), axios.get(`${baseUrl}/comments`)])
            .then((response) => response.map((response) => response.data))
            .then(([users, posts, comments]) => {
                const userContent = posts.map((post: Post) => {
                    return {
                        ...post,
                        user: users.find((user: User) => user.id === post.userId),
                        comments: comments.filter((comment: Comment) => comment.postId === post.id),
                    }
                })
                setPosts(userContent)
                setLoadingStatus(LoadingStatus.SUCCESS);
            }).catch((error) => {
                console.error(error);
            setLoadingStatus(LoadingStatus.ERROR);
        })
    }, [])

    return {loadingStatus, posts};
}
