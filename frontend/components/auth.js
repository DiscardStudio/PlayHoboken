import {Component, useState} from 'react';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';

export function Auth(props) {
    const [passhash, setPassHash] = useState("");
    const [email, setEmail] = useState("");

    return <View/>;
}

export function Signup(props) {
    const [passhash, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setFirst] = useState("");
    const [last_name, setLast] = useState("");

    const cyrb53 = function(str, seed = 0) {
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
        h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
        return 4294967296 * (2097151 & h2) + (h1>>>0);
    };

    const SubmitForm = async () => {
        if(undefined === typeof email)
            setTimeout(() => console.log("Loading state"), 1000);
        var seed = 1;
        for(var x=0;x<email.length(); x++) {
            seed *= email.charCodeAt(x);
        }

        //setPass(cyrb53(passhash), seed);
        console.log(passhash);
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder="Email" 
                onChange={e => setEmail(e.target.value)}
            />
            <TextInput 
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
                onChange={e=> setPass(e.target.value)}
            />
            <Button
                title="Submit"
                onPress={SubmitForm}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
    input: {
        backgroundColor: "white",
        height: 50,
        width: 300,
        marginBottom: 15.
    },
  });