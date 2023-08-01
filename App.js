import * as React from  "react";
import { ChakraProvider } from "@chakra-ui/react";
import Users from "./Users";
import PostForm from "./PostForm";
import Comment from "./Cooment";
import UserPage from "./UserCreationPost";
import HomePage from "../src";

function MyApp() {
    return (
        <ChakraProvider>
            <Users/>
            <PostForm/>
            <Comment/>
            <HomePage/>
            <UserPage/>
        </ChakraProvider>
    )
}

export default MyApp;