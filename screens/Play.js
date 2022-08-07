import { useState, useLayoutEffect, forwardRef } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Find from './Find.js';
import Home from './Home.js';
import Profile from './Profile.js';

const Play = (props,ref) => {
    const [page, toggle] = useState(0);
    return (

        <View style={styles.play}>
           {page === 0? <Home/>: (page === 1? <Find/>: <Profile ref={ref}/>)}
           <View style={styles.nav}>
                <Button style={styles.navButtons} title="Home" onPress={e => toggle(0)}/>
                <Button style={styles.navButtons} title="Find Session" onPress={e => toggle(1)}/>
                <Button style={styles.navButtons} title="Profile" onPress={e => toggle(2)}/>
           </View>
        </View>
    );
}

const styles = StyleSheet.create({
    play: {
        position: 'absolute',
        flex: 1,
        backgroundColor: '#fff',
        margin: 0,
        padding: 0,
        height: '100%',
        width: '100%',
    },
    nav: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'orange',
        shadowOffset: 10,
        shadowColor: 'black',
        shadowRadius: 10,
        elevation: 40,
        width: '100%',
        height: 70,
    },
    navButtons: {
        position: 'relative',
        height: 30,
        width: 75,
        top: 5,
        margin: 15,
    },
  });

export default forwardRef(Play);