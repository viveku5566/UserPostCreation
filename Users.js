import { useState , useEffect } from "react";
import axios from 'axios';
import {Box,UnorderedList,ListItem,Input,Button,VStack} from '@chakra-ui/react';

const Users = () => {
    const [users, setUsers] = useState(['']);
    const [newUser , setNewUser] = useState('');

    useEffect (() => {
        axios.get('/public/v2/users/2342')
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.error('Error fetching users:' ,error);
        })
    },[]);


    const handleAddUser = () => {
        axios.post('/public/v2/users',
        {name:newUser})
        .then(response => {
            setUsers([...users,response.data]);
            setNewUser('');
        })
        .catch(error => {
            console.error('Error creating user',error)
        })
    }

    return (
        <Box>
            <VStack spacing = {5}>
                <Input value = {newUser}
                onChange={(e) =>
                setNewUser(e.target.value)}
                placeholder = "New User"
                />

            <Button onClick = {handleAddUser}>
                Add User </Button>
            </VStack>
            
            <UnorderedList>
                {users.map((user,index) => (
                  <ListItem key={index}> {user} </ListItem>  
                ))}
            </UnorderedList>
        </Box>
    )
}

export default Users;