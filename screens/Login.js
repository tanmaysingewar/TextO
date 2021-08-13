import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import icon from '../icon/icon'
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
const Login = ({navigation}) => {
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
    const handleGoogleLogin = () => {
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
                const {name , email , photourl} = user;
                console.log(user)
                if(user){
                    return navigation.push("UserName")
                }
            }else{
                console.log("User Cancel Glogin")
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        <SafeAreaView>
            <View >
                <Image source={icon.logo_icon} style={{height : 100 , width :100, alignSelf : "center", marginTop : 40}} />
                <Text style={{alignSelf : "center", fontFamily : "DancingScript_700Bold", fontSize : 42}}>TextO</Text>
                <View style={{alignSelf : "center", marginTop : 30}}>
                    <Text style={{textAlign : "center", marginHorizontal : 20, fontFamily : "Poppins_500Medium"}}> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>
                </View>
                <View style={{alignItems : "center", marginTop : Dimensions.get("window").height /4}}>
                <Text style={{textAlign : "center", marginHorizontal : 20, fontFamily : "Poppins_500Medium", fontSize : 12}}>Continue with Google</Text>
                    <View style={{padding : 10, backgroundColor : "skyblue", paddingHorizontal : 80, alignContent : "center"}} onTouchEnd={() => navigation.push("Home")}>
                        <Text>Google</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({})
