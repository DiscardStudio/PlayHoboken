import { forwardRef, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

const Login = (props, ref) => {
    const [email, setEmail] = useState("");
    const [hash, setPass] = useState(0);
    
    function hashAlgo(password) {
        var hash = 0, i, chr;
        if (pass.length === 0) return hash;
        for (i = 0; i < pass.length; i++) {
            chr   = pass.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        setPass(hash);
        console.log(hash);
    }     

    async function fetch_login(e) {
        e.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://play-hoboken.herokuapp.com/login", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            email: email,
            passhash: hash
        }));
    }

    return (
        <View>
            <TextInput style={styles.inputs} onChange={setEmail} placeholder="Email"/>
            <TextInput style={styles.inputs} onChange={hashAlgo} placeholder="Password" />
            <Button title="Submit" onPress={async e=>{fetch_login}}/>
        </View>
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

export default forwardRef(Login);