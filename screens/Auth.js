import { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Play from './Play.js';
import Signup from './Signup.js';
import Login from './Login.js';

export default Auth = (props) => {
    const [page, toggle] = useState(0);
    const user = useRef({
        email: null,
        first_name: null,
        last_name: null
    });

    useEffect(() => {
        console.log(user);
        if(user.current.email != null)
            toggle(2);
    });

    return (
        page < 2?
        <View style={styles.container}>
            {page === 0 ? <Login ref={user}/>:<Signup ref={user}/>}
            <Button style={{position: 'relative',margin: 5}}title={page===0? "Not a Player? Join Today!":"Already a Player? Sign in!"} onPress={()=>page===0?toggle(1):toggle(0)}/>
        </View>:
        <Play ref={user}/>
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