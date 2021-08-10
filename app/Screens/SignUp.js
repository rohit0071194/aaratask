import React,{useState} from 'react'
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Text, RadioButton, TextInput } from 'react-native-paper';
import GradientButton from 'react-native-gradient-buttons';

const SignUp = ({navigation}) => {

    const [checked, setChecked] = useState('first');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [keyboardAvoid,setKeyboardAvoid] = useState(false)

    const doRegistration = async() => {
        if(!email == "" && !name == "" && !number == "" && !password == ""){

           try{
            let dataToSend = {
                type:"seeker",
                email: email.trim().toLocaleLowerCase(),
                name: name.trim(),
                mno: number.trim(),
                ps: password.trim(),
              };
              let formBody = [];
              for (let key in dataToSend) {
                formBody.push(key + '=' + dataToSend[key]);
              }
              formBody = formBody.join('&');

            let fetchResponse = await fetch('https://career-finder.aaratechnologies.in/job/api/signUp', {
                method: 'POST',
                body: formBody,
                headers: {
                  //Header Defination
                  'Content-Type':
                  'application/x-www-form-urlencoded;charset=UTF-8',
                },
              })
           let jsonResponse = await fetchResponse.json()

           if(jsonResponse.staus == 'true'){
               alert("Successfully Registered !! Please Login to continue")
               setEmail("")
               setName("")
               setNumber("")
               setPassword("")
           }else{
               alert(jsonResponse.message)
           }
           }catch(err){
               alert("Something Went Wrong")
           }
            
        }else{
            alert("All fields are required");
            return;
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="position" enabled={keyboardAvoid}>
            <Text style={styles.heading}>SignUp</Text>
            <View style={styles.radioBtnContainer}>
                <View style={styles.radioContainer}>
                    <RadioButton
                        value="first"
                        color="rgb(92,124,229)"
                        status={ checked === 'first' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('first')}
                    />
                    <Text style={styles.radioBtnLabel}>Seeker</Text>
                </View>
                <View style={styles.radioContainer}>
                    <RadioButton
                        value="second"
                        color="rgb(92,124,229)"
                        status={ checked === 'second' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('second')}
                    />
                    <Text style={styles.radioBtnLabel}>Recruiter</Text>
                </View>
            </View>
            <View style={styles.textInputContainer}>
                <TextInput
                    label="Your email"
                    mode="flat"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    underlineColor="black"
                    keyboardType="email-address"
                    onFocus={() => setKeyboardAvoid(false)}
                    style={{backgroundColor:"transparent"}}
                />
                <TextInput
                    label="Your Name"
                    mode="flat"
                    value={name}
                    onChangeText={text => setName(text)}
                    onFocus={() => setKeyboardAvoid(false)}
                    style={{backgroundColor:"transparent"}}
                />
                <TextInput
                    label="Your Number"
                    mode="flat"
                    value={number}
                    maxLength={10}
                    keyboardType="number-pad"
                    onChangeText={text => setNumber(text)}
                    onFocus={() => setKeyboardAvoid(false)}
                    style={{backgroundColor:"transparent"}}
                />
                <TextInput
                    label="Password"
                    mode="flat"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    onFocus={() => setKeyboardAvoid(true)}
                    style={{backgroundColor:"transparent"}}
                />
                <GradientButton 
                    text="Sign Up" 
                    width='60%'
                    height={55}
                    radius={50} 
                    purpleViolet 
                    impact 
                    style={styles.signupBtnStyle}
                    onPressAction={() => doRegistration()}
                />
            </View>
            <View style={styles.linkBtn}>
                <Text style={styles.linkBtnText}>Already have an account ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}> 
                    <Text style={styles.btnLink}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20
    },
    heading:{
        textAlign:"center",
        fontSize:30,
        color:"rgb(92,124,229)",
        marginTop:30,
        fontWeight:"bold"
    },
    textInputContainer:{
        marginTop:10
    },  
    radioBtnContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:30,
    },
    radioContainer:{
        flexDirection:"row",
        alignItems:"center"
    },
    radioBtnLabel:{
        fontSize:20,
        color:"rgb(92,124,229)"
    },
    signupBtnStyle:{
        alignSelf:"center",
        marginTop:30
    },
    linkBtn:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop:30
    },
    linkBtnText:{
        fontSize:16
    },
    btnLink:{
        color:"rgb(92,124,229)",
        fontSize:16
    }
})

export default SignUp
