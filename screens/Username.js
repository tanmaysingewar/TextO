import React,{useState} from 'react'
import { StyleSheet, Text, View,Image, TextInput ,Keyboard, Platform, Dimensions, ActivityIndicator} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFonts,
    Poppins_400Regular, 
    Poppins_600SemiBold, 
    Poppins_500Medium,
    Poppins_100Thin,
    Poppins_300Light} from '@expo-google-fonts/poppins'
import { api_url } from '../api'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Username = ({route ,navigation}) => {
    const [textInputData, settextInputData] = useState("")
    const [statusMessage, setstatusMessage] = useState(true)
    const [pageLoading, setPageLoading] = useState(false)
    const {name , email , photoUrl } = route.params;
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

    const createUser = async (user) =>{
        await fetch(`${api_url}/user`,{
            method: "POST",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then((response) => response.json())
        .then( async res =>{
            console.log(res)
            setPageLoading(false)
            const jsonValue = JSON.stringify(res)
            await AsyncStorage.setItem('user_data', jsonValue)
            return navigation.replace("Welcome")
            // return res.json()
        })
        .catch(err => console.log(err))
    } 

    const checkUsername = async () => {
        console.log("Nice")
        setstatusMessage(true)
        return await fetch(`${api_url}/checkusername?username=${textInputData}`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json.available)
            if (!json.available) {
                return setstatusMessage(false)
            }else{
                setstatusMessage(true)
                setPageLoading(true)
                createUser({
                    name: name,
                    username: textInputData,
                    email: email,
                    default_bio: `Hii! I am ${name}`,
                    profile_pic: photoUrl
                })
            }
        })
        .catch((error) => {
        console.error(error);
        });
    }
    return (
        <SafeAreaView onTouchStart={() => Keyboard.dismiss()} style={{flex : 1}}>
            <View style={{alignItems : "center", marginTop : 40}}>
                <Image source={{uri : photoUrl}} style={{height : 100 , width : 100, borderRadius : 50}} />
                <Text style={{fontFamily : "Poppins_500Medium", fontSize : 15, marginTop : 20}} >{name}</Text>
                <Text style={{fontFamily : "Poppins_500Medium", fontSize : 15,color : "#ccc"}} >{email}</Text>
            </View>
            <View style={{alignItems : "center", margin : 10, marginTop : Dimensions.get("window").height / 5}}>
            {pageLoading ? <ActivityIndicator size="large" color="#00ff00" /> :
                <>
                <Text style={{fontFamily : "Poppins_500Medium", width : "80%", fontSize : 12}}>Select your Username and press go </Text>
                    <View style={{flexDirection : "row"}}>
                        <TextInput style={{borderColor : "#ccc", height : 35, borderWidth : 1,fontSize : 15, fontFamily : "Poppins_400Regular", paddingHorizontal : 10, borderRadius : 5, width : "65%", marginRight : 10}} placeholder={"Enter Username"} keyboardType={"default"} autoCapitalize={'none'} onChangeText={text => settextInputData(text)} />
                        <View style={{height : 35, backgroundColor : "#000",justifyContent : "center", borderRadius : 5}} onTouchEnd={() => checkUsername()}>
                            <Text style={{fontFamily : "Poppins_500Medium", color : "#fff", paddingHorizontal : 15}}>GO</Text>
                        </View>
                    </View>
                    <Text style={{alignSelf : "center", width : "80%",fontFamily : "Poppins_500Medium",color : "red", marginTop : 5, fontSize : 13}}>{ statusMessage ? ` ` : `Username is already taken, try another`}</Text>
                </>
            }
             </View>
            
        </SafeAreaView>
    )
}

export default Username

const styles = StyleSheet.create({})