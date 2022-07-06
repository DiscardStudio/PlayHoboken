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

    const SubmitForm = () => {

    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder="Email" 
                onChange={setEmail}
            />
            <TextInput 
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
                onChange={setPass}
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