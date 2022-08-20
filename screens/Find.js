import { forwardRef, useLayoutEffect, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import DropdownComponent from "../components/DropdownComponent";

const Find = (props, ref) => {
    const createSession = useRef("");
    const [sessions, setSession] = useState([
        <View key={0} style={styles.find}>
            <Text>Loading...</Text>
        </View>
    ]);

    useEffect(() => {
        return fetch('https://play-hoboken.herokuapp.com/find-session')
        .then(res => {return {status: res.status, data: res.json()}})
        .then(data => 
            data.status !== 200 ?
            setSession([
                <View key={0} style={styles.find}>
                    <Text>{data.rows}</Text>
                </View>
            ]):
            setSession(data.rows.map(x=>
                <View key={x.session_time} style={styles.find}>
                    <Text>{x.first_name+" "+x.last_name+" started playing "+x.game+" at "+x.session_time}</Text>
                </View>
            )))
        .catch(err => console.error(err)).done();            
    });

    const sessionCreation = () => {
        return fetch('https://play-hoboken.herokuapp.com/create-session', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: ref.email,
                game: createSession.current
            })
        })
        .then(res => res.status === 200? setSession([
            <View key={0} style={styles.find}>
                <Text>Loading...</Text>
            </View>
        ]):console.error("Error creating session"))
        .catch(err => console.error(err)).done();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header1}>Who's Playing?</Text>
            {sessions}
            <View style={styles.break}/>
            <Text style={styles.header2}>Nobody Playing Your Game?</Text>
            <Text style={styles.header3}>Start Your Own Session!</Text>
            <Text />
            <DropdownComponent ref={createSession}/>
            <Button title="Make Session" onPress={e => sessionCreation()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    header1: {
        position: 'relative',
        top: 25,
        fontSize: 32,
        margin: 10,
        marginBottom: 20,
    },
    header2: {
        position: 'relative',
        top: 25,
        fontSize: 25,
        margin: 10,
        marginTop: 25,
    },
    header3: {
        position: 'relative',
        top: 25,
        fontSize: 15,
        marginBottom: 10,
    },
    find: {
        top: 15,
        position: 'relative',
        backgroundColor: '#fff',
        elevation: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 3,
        width: 350,
        height: 50,
        margin: 15,
    },
    break: {
        top: 15,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        width: 375,
        height: 0,
        margin: 15,
    }
});

export default forwardRef(Find);