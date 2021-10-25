import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View, Modal , ActivityIndicator, TouchableWithoutFeedback} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import icon from '../icon/icon';
import LottieView from 'lottie-react-native';
import { useFonts,
    Poppins_400Regular, 
    Poppins_600SemiBold, 
    Poppins_500Medium,
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_900Black,
    Poppins_200ExtraLight,
    Poppins_800ExtraBold} from '@expo-google-fonts/poppins'
import { DancingScript_700Bold ,
    DancingScript_600SemiBold,
    DancingScript_400Regular,
    DancingScript_500Medium,} from '@expo-google-fonts/dancing-script'
import * as Google from 'expo-google-app-auth';
import { api_url } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
const [loading, setloading] = useState(false)
    const [fontLoading] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold, 
        Poppins_500Medium,
        Poppins_100Thin,
        Poppins_300Light,
        Poppins_900Black,
        Poppins_200ExtraLight,
        Poppins_800ExtraBold,
        DancingScript_700Bold,
        DancingScript_600SemiBold,
        DancingScript_400Regular,
        DancingScript_500Medium,
    })
    if(!fontLoading){
        return <View></View>
    } 

    const buttonClick = () => {
        setloading(true)
        handleGoogleLogin()
    }
    const checkUser = async ({name , email , photoUrl}) =>{
        await fetch(`${api_url}/user`,{
            method: "POST",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email})
        })
        .then((response) => response.json())
        .then( async res =>{
            console.log(res,"user")
            if (res?.status === "new_user") {
                return navigation.replace("UserName",{
                    name,
                    email,
                    photoUrl
               })
            }else{
                console.log("Come to Local storage system")
                const jsonValue = JSON.stringify(res)
                await AsyncStorage.setItem('user_data', jsonValue)
                return navigation.replace("Home")
            }
            
        })
        .catch(err => console.log(err))
    } 

    const handleGoogleLogin =  () => {
        console.log("Google Button Clicked")
        const config = {
            iosClientId : `816627490518-uvs4k14colu010n9e4t1sfe2eh3mrpq9.apps.googleusercontent.com`,
            androidClientId : `816627490518-mlkt3vgb2opcfjkbah096l0ggic3t6s0.apps.googleusercontent.com`,
            scopes: ['profile','email',]
        }
        Google.logInAsync(config)
        .then((result) => {
            const {type , user} = result;

            if(type === "success"){
                const {name , email , photoUrl} = user;
                const newUrl = photoUrl.split('=');
                const newPhotoUrl = newUrl[0]
                console.log(user)
                if(user){
                    checkUser({name : name , email: email , photoUrl : newPhotoUrl});
                }
            }else{
                console.log("User Cancel Glogin")
                setloading(false)
            }

        })
        .catch((err) => {
            console.log(err)
            setloading(false)
        })
    }

    return (
        <SafeAreaView>
            <View >
                <LottieView 
                style={{
                    height : 150, 
                    width : 150,
                    alignSelf : "center",
                    marginTop : 40,
                    marginBottom : 20
                }}
                source={require("../icon/lotti/logo.json")}
                autoPlay={true}
                loop={true}
              />
                <Text style={{alignSelf : "center", fontFamily : "DancingScript_700Bold", fontSize : 42}}>TextO</Text>
                <View style={{alignSelf : "center", marginTop : 30}}>
                    <Text style={{textAlign : "center", marginHorizontal : 20, fontFamily : "Poppins_500Medium"}}> The best and most beautiful things in the world cannot be seen or even touched – they must be felt with the heart.</Text>
                </View>
                <View style={{alignItems : "center", marginTop : Dimensions.get("window").height /4}}>
                <Text style={{textAlign : "center", marginHorizontal : 20, fontFamily : "Poppins_500Medium", fontSize : 12, color : "#000"}}>Continue with Google</Text>
                {
                    loading ? 
                    <ActivityIndicator size="large" color="#0000ff" />
                    :
                    <TouchableWithoutFeedback onPress={() => buttonClick()}>
                        <View style={{padding : 8, backgroundColor : "#000", paddingHorizontal : 10, alignContent : "center", flexDirection : "row", alignItems : "center", borderRadius : 5}} >
                            <Image source={icon.glogo} style={{height : 25, width : 25}}/>
                            <Text style={{color : "#fff", fontSize : 16, fontFamily : "Poppins_400Regular", marginLeft : 5}}>Sign in with Google</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                    
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({})
