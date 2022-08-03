import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Play from './Play.js';

const Login = (props) => {
    function hashAlgo(password) {
        let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
        for (let i = 0, ch; i < password.length; i++) {
            ch = password.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
        h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
        setPass (4294967296 * (2097151 & h2) + (h1>>>0));
    } 

    const [email, setEmail] = useState("");
    const [hash, setPass] = useState(0);

    return (
        <View>
            <TextInput style={styles.inputs} onChange={setEmail} placeholder="Email"/>
            <TextInput style={styles.inputs} onChange={hashAlgo} placeholder="Password"/>
            <Button title="Submit" onPress={async e=>{await console.log(hash)}}/>
        </View>
    );
}

const Signup = (props) => {
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [hash, setHash] = useState(0);

    function hashAlgo() {
        if(pass!==confirm) {
            console.error("Passwords must match");
            return;
        }

        let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
        for (let i = 0, ch; i < pass.length; i++) {
            ch = pass.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
        h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
        setHash (4294967296 * (2097151 & h2) + (h1>>>0));
        console.log(hash);
    } 

    return (
        <View>
            <TextInput style={styles.inputs} onChange={setFName} placeholder="First Name"/>
            <TextInput style={styles.inputs} onChange={setLName} placeholder="Last Name"/>
            <TextInput style={styles.inputs} onChange={setEmail} placeholder="Email"/>
            <TextInput style={styles.inputs} onChange={setPass} placeholder="Password"/>
            <TextInput style={styles.inputs} onChange={setConfirm} placeholder="Confirm Password"/>
            <Button title="Submit" onPress={hashAlgo}/>
        </View>
    );
}

export default Auth = (props) => {
    const [page, toggle] = useState(2);
    return (
        page < 2?
        <View style={styles.container}>
            {page === 0 ? <Login/>:<Signup/>}
            <Button style={{margin: 5}}title={page===0? "Not a Player? Join Today!":"Already a Player? Sign in!"} onPress={()=>page===0?toggle(1):toggle(0)}/>
        </View>:
        <Play/>
        
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