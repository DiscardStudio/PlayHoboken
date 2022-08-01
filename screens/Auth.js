import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useQuery } from '../hooks/useQuery';
import { useHash } from "../hooks/useHash";

const Login = (props) => {
    const [result, callQuery] = useQuery("https://www.discardsoftware.com/login");

    const [email, setEmail] = useState("");
    const [hash, setPass] = useHash();

    return (
        <View style={styles.container}>
            <TextInput style={styles.inputs} onBlur={e=>setEmail(e.target.value)}/>
            <TextInput style={styles.inputs} onBlur={e=>setPass(e.target.value)}/>
            <Button />
        </View>
    );
}

const Signup = (props) => {
    const [result, callQuery] = useQuery("https://www.discardsoftware.com/signup");
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");


    return (
        <View style={styles.container}>

        </View>
    );
}

export default Auth = (props) => {
    return props.login === 0 ? <Login/>:<Signup/>;
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputs: {

    },
  });