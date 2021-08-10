import React,{useState} from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, RadioButton, TextInput } from 'react-native-paper';
import GradientButton from 'react-native-gradient-buttons';

const Login = ({navigation}) => {

    const [checked, setChecked] = useState('first');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const doLogin = async() => {
        if(!email == "" && !password == ""){

            let dataToSend = {
                type:"seeker",
                email: email.trim().toLocaleLowerCase(),
                ps: password,
            };

            let formBody = [];

            for (let key in dataToSend) {
                formBody.push(key + '=' + dataToSend[key]);
            }

            formBody = formBody.join('&');

           try{
            let fetchResponse = await fetch('https://career-finder.aaratechnologies.in/job/api/login', {
                method: 'POST',
                body: formBody,
                headers: {
                  //Header Defination
                  'Content-Type':
                  'application/x-www-form-urlencoded;charset=UTF-8',
                },
            })

            let jsonResponse = await fetchResponse.json();
            
            if(jsonResponse.staus == 'true'){
                navigation.navigate("Home")
            }else{
                alert(jsonResponse.message);
            }
           }catch(err){
               alert("Something Went Wrong")
           }
        }else{
            alert("All Fields are required")
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Login</Text>
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
                    style={{backgroundColor:"transparent"}}
                />
                <TextInput
                    label="Password"
                    mode="flat"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    style={{backgroundColor:"transparent"}}
                />
                <GradientButton 
                    text="Login" 
                    width='60%'
                    height={55}
                    radius={50} 
                    purpleViolet 
                    impact 
                    style={styles.signupBtnStyle}
                    onPressAction={() => doLogin()}
                />
            </View>
            <View style={styles.linkBtn}>
                <Text style={styles.linkBtnText}>Don't have an account ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}> 
                    <Text style={styles.btnLink}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
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

export default Login
