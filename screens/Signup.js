import { forwardRef, useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import useHash from "../components/useHash";

const Signup = (props, ref) => {
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [hash, setHash] = useHash();
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
            };
            props.render({
                email: email,
                first_name: fname,
                last_name: lname
            });
        }, err=> console.error(err)).catch(err => console.error(err));
    }

    useEffect(()=> {
        if(pass !== confirm)
            console.error("Passwords must match");
    });

    return (
        <View>
            <TextInput style={styles.inputs} onChangeText={e=>{
                e.preventDefault();
                setFName(e.target.value);
                }} placeholder="First Name"/>
            <TextInput style={styles.inputs} onChangeText={e=>{
                e.preventDefault();
                setLName(e.target.value);
                }} placeholder="Last Name"/>
            <TextInput style={styles.inputs} onChangeText={e=>{
                e.preventDefault();
                setEmail(e.target.value);
                }} placeholder="Email"/>
            <TextInput secureTextEntry={true} style={styles.inputs} onChangeText={e=>{
                e.preventDefault();
                setPass(e.target.value);
                e.target.value===confirm? setHash(e.target.value):console.error("Passwords must match")
                }} placeholder="Password"/>
            <TextInput secureTextEntry={true} style={styles.inputs} onChangeText={e=>{
                e.preventDefault();
                setConfirm(e.target.value);
                e.target.value===pass? setHash(e.target.value):console.error("Passwords must match")
                }} placeholder="Confirm Password"/>
            <Button title="Submit" onPress={e=>{e.preventDefault(); fetch_signup();}}/>
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