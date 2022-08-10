import { useState, useRef, useLayoutEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Play from './Play.js';
import Signup from './Signup.js';
import Login from './Login.js';

export default Auth = (props) => {
    const [userState, render] = useState({
        email: null,
        first_name: null,
        last_name: null
    });
    const [page, toggle] = useState(0);
    const user = useRef({
        email: null,
        first_name: null,
        last_name: null
    });

    function logout() {
        render({
            email: null,
            first_name: null,
            last_name: null
        });
        user.current = {
            email: null,
            first_name: null,
            last_name: null
        };
        toggle(0);
    }

    useLayoutEffect(() => {
        if(userState.email != null)
            toggle(2);
    });

    return (
        page < 2?
        <View style={styles.container}>
            {page === 0 ? <Login ref={user} render={render}/>:<Signup ref={user} render={render}/>}
            <Button style={{position: 'relative',margin: 5}}title={page===0? "Not a Player? Join Today!":"Already a Player? Sign in!"} onPress={()=>page===0?toggle(1):toggle(0)}/>
        </View>:
        <Play ref={user} render={logout}/>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputs: {
        height: 40,
        width: 205,
        margin: 12,
        borderWidth: 1,
        borderRadius: 3,
        padding: 10,
    },
  });