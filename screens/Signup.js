import { forwardRef, useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

const Signup = (props, ref) => {
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [hash, setHash] = useState(0);
    const [xhr, setXhr] = useState(new XMLHttpRequest());

    async function fetch_signup() {
        fetch('https://play-hoboken.herokuapp.com/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                passhash: hash,
                first_name: fname,
                last_name: lname
            })
        }).then(json => {
            ref.current = {
                email: email,
                first_name: fname,
                last_name: lname
            }
        }).catch(err => console.error(err));
    }

    useEffect(()=> {
        if(pass !== confirm)
            console.error("Passwords must match");
    });

    async function hashAlgo(e) {
        e.preventDefault();
        var hash = 0, i, chr;
        if (pass.length === 0) return hash;
        for (i = 0; i < pass.length; i++) {
            chr   = pass.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        await setHash(hash);
        await fetch_signup();
    } 

    return (
        <View>
            <TextInput style={styles.inputs} onChange={setFName} placeholder="First Name"/>
            <TextInput style={styles.inputs} onChange={setLName} placeholder="Last Name"/>
            <TextInput style={styles.inputs} onChange={setEmail} placeholder="Email"/>
            <TextInput secureTextEntry={true} style={styles.inputs} onChange={setPass} placeholder="Password"/>
            <TextInput secureTextEntry={true} style={styles.inputs} onChange={setConfirm} placeholder="Confirm Password"/>
            <Button title="Submit" onPress={hashAlgo}/>
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

export default forwardRef(Signup);