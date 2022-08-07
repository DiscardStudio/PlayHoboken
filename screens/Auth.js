import { useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Play from './Play.js';
import Signup from './Signup.js';
import Login from './Login.js';

export default Auth = (props) => {
    const [page, toggle] = useState(2);
    const user = useRef({
        first_name: "mike",
        last_name: "sanchez"
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