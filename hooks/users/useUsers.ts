import {useEffect, useState} from "react";
import axios from "axios";
import {baseUrl} from "@/config";
import {LoadingStatus} from "@/models/loading_status/loading_status.model";

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(LoadingStatus.LOADING);


    useEffect(() => {}, [
        axios.get(`${baseUrl}/users`)
            .then((response) => response.data)
            .then((users) => {
                setLoadingStatus(LoadingStatus.SUCCESS)
                setUsers(users)
            })
            .catch((error) => {
                setLoadingStatus(LoadingStatus.ERROR)
            })
    ])

    return {users, loadingStatus};
}
