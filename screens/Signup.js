import { forwardRef, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

const Signup = (props, ref) => {
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [hash, setHash] = useState(0);

    function hashAlgo() {
        var hash = 0, i, chr;
        if (this.length === 0) return hash;
        for (i = 0; i < this.length; i++) {
            chr   = this.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        setHash(hash);
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