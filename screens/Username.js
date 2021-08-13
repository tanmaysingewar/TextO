import React from 'react'
import { StyleSheet, Text, View,Image, TextInput ,Keyboard, Platform, Dimensions} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFonts,
    Poppins_400Regular, 
    Poppins_600SemiBold, 
    Poppins_500Medium,
    Poppins_100Thin,
    Poppins_300Light} from '@expo-google-fonts/poppins'
const Username = ({navigation}) => {
    const [fontLoading] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold, 
        Poppins_500Medium,
        Poppins_100Thin,
        Poppins_300Light,
    })
    if(!fontLoading){
        return <View></View>
    }
    return (
        <SafeAreaView onTouchStart={() => Keyboard.dismiss()} style={{flex : 1}}>
            <View style={{alignItems : "center", marginTop : 40}}>
                <Image source={{uri : "https://organicthemes.com/demo/profile/files/2018/05/profile-pic.jpg"}} style={{height : 100 , width : 100, borderRadius : 50}} />
                <Text style={{fontFamily : "Poppins_500Medium", fontSize : 15, marginTop : 20}} >Tanmay Singewar</Text>
                <Text style={{fontFamily : "Poppins_500Medium", fontSize : 15,color : "#ccc"}} >singewartanmay@gmail.com</Text>
            </View>
            <View style={{alignItems : "center", margin : 10, marginTop : Dimensions.get("window").height / 5}}>
                <View style={{flexDirection : "row",marginTop : 10}}>
                    <TextInput style={{borderColor : "#ccc", height : 35, borderWidth : 1,fontSize : 15, fontFamily : "Poppins_400Regular", paddingHorizontal : 10, borderRadius : 5, width : "65%", marginRight : 10}} placeholder={"Enter Username"} keyboardType={"default"} autoCapitalize={'none'}  />
                    <View style={{height : 35, backgroundColor : "#000",justifyContent : "center", borderRadius : 5}} onTouchEnd={() => navigation.navigate("Welcome")}>
                        <Text style={{fontFamily : "Poppins_500Medium", color : "#fff", paddingHorizontal : 15}}>GO</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Username

const styles = StyleSheet.create({})