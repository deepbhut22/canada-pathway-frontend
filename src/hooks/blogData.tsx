import { useState, useEffect } from "react";
import { BlogPostNew } from "../types";
import api from "../utils/axios";

export default function BlogData() {
    const [blogs, setBlogs] = useState<BlogPostNew[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        api.get('/blog').then((blogs) => {
            console.log(blogs.data);
            setBlogs(blogs.data);
            setIsLoading(false);
        });
    }, []);

    return { blogs, isLoading };
}