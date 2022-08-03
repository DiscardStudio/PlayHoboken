import { useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function Play(props) {
    const [page, toggle] = useState(0);
    return (
        <View style={styles.container}>
            
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