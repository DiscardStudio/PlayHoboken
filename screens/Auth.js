import { useState, useLayoutEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import Play from './Play.js';
import Signup from './Signup.js';
import Login from './Login.js';

export default Auth = (props) => {
    const [user, render] = useState({
        email: null,
        first_name: null,
        last_name: null
    });
    const [page, toggle] = useState(0);

    function logout() {
        render({
            email: null,
            first_name: null,
            last_name: null
        });
        toggle(0);
    }

    useLayoutEffect(() => {
        if(user.email != null)
            toggle(2);
    });

    return (
        page < 2?
        <View style={styles.container}>
            {page === 0 ? <Login login={user} render={render}/>:<Signup login={user} render={render}/>}
            <Button style={{position: 'relative',margin: 5}}title={page===0? "Not a Player? Join Today!":"Already a Player? Sign in!"} onPress={()=>page===0?toggle(1):toggle(0)}/>
        </View>:
        <Play login={user} render={logout}/>
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