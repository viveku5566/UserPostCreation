import { Input,Button } from "@chakra-ui/react";
import { useState } from "react";
import axios from 'axios';

const Comment = ({onCreate}) => {
    const [content,setContent] = useState("");

    const handleSubmit = () => {
        axios.post('/public/v2/posts/2342/comments',{content})
        .then(response => {
            setContent("");
            onCreate(response.data);
        })
        .catch(error => {
            console.error('Error creating Comment',error)
        })
    }

    return (
        <div>
            <Input
            value = {content}
            onChange = {e => {
                setContent(e.target.value)
            }}
            placeholder = "Write Comment"
            />

            <Button onClick = {handleSubmit}>
                Comment
            </Button>
        </div>
    )
}

export default Comment;