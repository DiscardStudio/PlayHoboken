import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import useHash from "../components/useHash";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [hash, setHash] = useHash();

    function fetch_login() {
        var fetching = fetch('https://play-hoboken.herokuapp.com/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                passhash: hash
            })
        })
        .then(json => {
            console.log(json, email, hash);
            if(json.email === undefined)
                return console.error("Error Logging in");
            else {
                console.log(json, email, hash);
                props.render({
                    email: email,
                    first_name: json.first_name,
                    last_name: json.last_name
                });
        }
        }, err=> console.error(err))
        .catch(err => console.error(err)).done();
    }
    
    return (
        <View>
            <TextInput style={styles.inputs} onChangeText={e => {setEmail(e)}} placeholder="Email"/>
            <TextInput secureTextEntry={true} style={styles.inputs} onChangeText={e => {setHash(e)}} placeholder="Password" />
            <Button title="Submit" onPress={e => {fetch_login()}}/>
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

export default Login;