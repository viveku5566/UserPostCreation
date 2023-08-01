import {Box, Button, Input, VStack} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const UserPage =()=> {
    const [user,setUser] = useState (null);
    const [posts,setPosts] = useState([]);
    const [newPost,setNewPost] = useState ('');
    const [newComment,setNewComment] = useState('');
    const [selectedPostId,setSelectedPostId] = useState(null);

    const router = useRouter();
    const {id} = router.query;


    useEffect(()=>{
        if (!id) return;
        axios.get(`https://gorest.co.in/public/v2/users/${id}`)
        .then(response => 
            setUser(response.data.data)
        )
        .catch(error => 
            console.error(error));

            axios.get(`https://gorest.co.in/public/v2/posts?user_id=${id}`)
            .then(response => {
                const updatedPosts =
                response.data.data.map(post => ({
                    ...post,
                    comments : []
                }))
                setPosts(updatedPosts);
            })
            .catch(error =>
                console.error(error))
    }, [id]);

    useEffect(()=>{
        if(!selectedPostId) return;
        axios.get(`https://gorest.co.in/public/v2/comments?post_id=${selectedPostId}`)
        .then(response => {
            const updatedPosts = posts.map(post =>
                post.id === selectedPostId ? {...post,comments :response.data.data}:post);;
                setPosts(updatedPosts)
        })
        .catch(error => 
            console.error(error));
    },[posts, selectedPostId]);


    const handleNewPost =()=>{
        axios.post(`https://gorest.co.in/public/v2/users/2342/posts`,{
            user_id : id,
            body : newPost
        })
        .then(response => setPosts(oldPosts => 
            [...oldPosts,response.data.data]))
            .catch(error =>
                console.error(error));
                setNewPost('');
    }

    const handleNewComment =()=> {
        axios.post(`https://gorest.co.in/public/v2/posts/2342/comments`,{
            post_id : selectedPostId,
            body : newComment
        })
        .then(response => {
            const updatedPosts = posts.map(post =>
                post.id === selectedPostId ? {...post,
                comments :[...post.comments,
                response.data.data]} : post)
                setPosts(updatedPosts);
        })
        .catch(error =>
            console.error(error))
            setNewComment('');
    }

    if(!user) return null;

    return(
        <VStack>
            <Box>
                <h2>{user.name}</h2>
            </Box>
            <Box>
                <Input value ={newPost}
                onChange={e => setNewPost(e.target.value)}
                placeholder = "New Post Content"/>
                <Button onClick={handleNewPost}>
                    Add Post
                </Button>
            </Box>
                {posts.map(post => (
                    <Box key ={post.id}>
                        <p>{post.body}</p>
                        <Button onClick={()=>
                        setSelectedPostId(post.id)}>
                            View Comments
                        </Button>
                        
                        {selectedPostId === post.id && (
                            <>
                            <Box>
                                <Input value ={newComment}
                                onChange ={ e=>
                                setNewComment(e.target.value)}
                                placeholder = "New Comment Content" />
                                <Button onClick={handleNewComment}>
                                    Add Comment
                                </Button>
                            </Box>
                            {post.comments.map(comment =>
                                (
                                  <Box key={comment.id}>
                                  <p>{comment.body}</p></Box>  
                                ))}
                            </>
                        )}
            </Box>
        ))};
    </VStack>
    )
    
}

export default UserPage;