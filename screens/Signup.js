import { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import useHash from "../components/useHash";

const Signup = (props) => {
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useHash("");
    const [confirm, setConfirm] = useHash("");

    async function fetch_signup() {
        if(pass === confirm){
            var f = await fetch('https://play-hoboken.herokuapp.com/signup', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.toLowerCase(),
                    passhash: pass,
                    first_name: fname,
                    last_name: lname
                })
            })
            .then(res => res.status)
            .catch(err => console.error(err)).done();
            props.toggle(0);
            if(f === 200)
                props.render({
                    email: email.toLowerCase(),
                    first_name: fname,
                    last_name: lname
                })
        }
        else
            console.error("Passwords Must Match");
    }

    return (
        <View>
            <TextInput style={styles.inputs} onChangeText={e=>{
                setFName(e);
                }} placeholder="First Name"/>
            <TextInput style={styles.inputs} onChangeText={e=>{
                setLName(e);
                }} placeholder="Last Name"/>
            <TextInput style={styles.inputs} onChangeText={e=>{
                setEmail(e);
                }} placeholder="Email"/>
            <TextInput secureTextEntry={true} style={styles.inputs} onChangeText={e=>{
                setPass(e);
                }} placeholder="Password"/>
            <TextInput secureTextEntry={true} style={styles.inputs} onChangeText={e=>{
                setConfirm(e);
                }} placeholder="Confirm Password"/>
            <Button title="Submit" onPress={e=>fetch_signup()}/>
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

export default Signup;