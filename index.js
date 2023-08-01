import {Box, Button, Input, VStack} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from '../../node_modules/next/link';

const HomePage = () => {
    const [users,setUsers] = useState([]);
    const [username, setUsername] = useState ('');

    useEffect( ()=> {
        axios.get('https://gorest.co.in/public/v2/users')
        .then(response =>
            setUsers(response.data))
            .catch(error => 
                console.error(error))
    }, []);

    const handleNewUser = () => {
        axios.post('https://gorest.co.in/public/v2/users', {username})
        .then(response => setUsers(oldUsers => 
            [...oldUsers,response.data.data]))
            .catch(error => console.error(error));
            setUsername('');
    }

    return (
        <VStack>
            <Box>
                <Input value = {username} onChange = {e=>
                setUsername(e.target.value)} /> 
                <Button onClick={handleNewUser}>
                    Add User
                </Button>
            </Box>
            {users.map(user => (
                <Box key={user.id}>
                    <Link href={`/${user.id}`}>
                    <a>{user.name}</a>
                    </Link>
                </Box>
            ))}
        </VStack>
    )

}

export default HomePage;