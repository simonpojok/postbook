interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    user: User;
    comments: Comment[];
}
