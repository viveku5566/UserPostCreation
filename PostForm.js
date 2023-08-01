import {Input,Button} from "@chakra-ui/react";
import { useState } from "react";
import axios from 'axios';

const PostForm = ({userId,onCreate}) => {
    const [content, setContent] = useState("");

    const handleSubmit = () => {
        axios.post('/public/v2/users/{userID}/2342/posts',
        {content})
        .then(response => {
            setContent("");
            onCreate(response.data)
        })
        .catch(error => {
            console.error('Error creating Posts',error)
        })
    }

    return (
        <div>
            <Input 
            value = { content }
            onChange = {e => 
            setContent(e.target.value)}
            placeholder = "Write Something..."/>

            <Button onClick = {handleSubmit}>
                POST
            </Button>
        </div>
    )
}
 export default PostForm;