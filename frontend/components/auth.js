import {Component} from 'react';
import {Text, View} from 'react-native';
import { Picker } from '@react-native-picker/picker';
const md6 = require('md6-hash');

export function Auth(props) {
    const [passhash, setPassHash] = useState("");
    const [email, setEmail] = useState("");

    return <div />;
}

export function Signup(props) {
    const [passhash, setPassHash] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setFirst] = useState("");
    const [last_name, setLast] = useState("");



    return (
        <View>
            <TextInput 
                placeholder="Email" />
            <TextInput
                secureTextEntry={true}
                placeholder="Password"
            />
            <Picker
                selectedValue={currency}
                onValueChange={currentCurrency => setCurrency(currentCurrency)}>
                <Picker.Item label="USD" value="US Dollars" />
                <Picker.Item label="EUR" value="Euro" />
                <Picker.Item label="NGN" value="Naira" />
            </Picker>
            <Text>
                Selected: {currency}
            </Text>
        </View>
    );
}