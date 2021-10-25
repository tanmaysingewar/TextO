import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image, ActivityIndicator , TextInput, Dimensions} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Google from 'expo-google-app-auth';
import { api_url } from '../api';
import icon from '../icon/icon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit_profile = ({navigation}) => {
    const [loading, setloading] = useState(false)
    const [text, settext] = useState("")
    const [statusMessage, setstatusMessage] = useState(true)
    const [pageLoading, setpageLoading] = useState(false)
    const [bio, setbio] = useState("")

    const buttonClick = async () => {
        setloading(true)
        checkUsername()
    }

    const setDefaults = async() => {
        const value = await AsyncStorage.getItem('user_data')
        settext(JSON.parse(value).username)
        setbio(JSON.parse(value).bio)
    }

    useEffect(() => {
        setDefaults()
    }, [])



    const UpdateUser = async (data) => {
        const value = await AsyncStorage.getItem('user_data')
        await fetch(`${api_url}/user?uid_=${JSON.parse(value)._id}&token=${JSON.parse(value).token}`,{
            method: "PATCH",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then( async res =>{
            console.log(res)
            setpageLoading(false)
            const jsonValue = JSON.stringify(res)
            console.log(jsonValue , "Updated Data")
            await AsyncStorage.setItem('user_data', jsonValue)
            return navigation.goBack()
            // return res.json()
        })
        .catch(err => {
            setpageLoading(false)
            console.log(err)
        })
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
                    UpdateUser({name : name , profile_pic : newPhotoUrl, username : text , bio : bio});
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

    const checkUsername = async () => {
        setstatusMessage(true)
        return await fetch(`${api_url}/checkusername?username=${text}`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json.available)
            if (!json.available) {
                setloading(false)
                return setstatusMessage(false)
            }else{
                setpageLoading(true)
                setstatusMessage(true)
                handleGoogleLogin()
            }
        })
        .catch((error) => {
        console.error(error);
        });
    }
    return (
        <SafeAreaView>
            <View style={{flexDirection : "row", marginHorizontal : 15,alignItems : "center", marginTop : 10}} onTouchEnd={() => navigation.goBack()}>
                <Image source={icon.back_icon} style={{height : 25 , width : 25, tintColor : "#000"}}/>
                <Text style={{fontFamily : "Poppins_400Regular",fontSize : 21, marginLeft : 10, marginBottom : -3}}>Edit Profile</Text>
            </View>
            
            <View style={{marginTop : Dimensions.get("window").height / 3.5, marginHorizontal : 20}}>
                <Text style={{fontFamily : "Poppins_400Regular"}}>Enter username want to update</Text>
            <View style={{ marginBottom : 20}}>
            <View style={{flexDirection : "row"}}>
                <TextInput style={{borderColor : "#ccc", height : 35, borderWidth : 1,fontSize : 15, fontFamily : "Poppins_400Regular", paddingHorizontal : 10, borderRadius : 5, width : "100%"}} placeholder={"Enter Username"} keyboardType={"default"} autoCapitalize={'none'} onChangeText={text => settext(text)} defaultValue={text} />
            </View>
            <Text style={{alignSelf : "center", width : "100%",fontFamily : "Poppins_500Medium",color : "red", marginBottom : 20, fontSize : 13}}>{ statusMessage ? ` ` : `  Username is already taken, try another`}</Text>
            <Text style={{fontFamily : "Poppins_400Regular"}}>Enter bio</Text>
            <TextInput 
                multiline  
                style={{borderColor : "#ccc", height : 35, borderWidth : 1,fontSize : 15, fontFamily : "Poppins_400Regular", paddingHorizontal : 10, borderRadius : 5, marginRight : 10, height : 50, textAlignVertical : "top", paddingTop : 10}} 
                placeholder={"Write Post Title"} 
                keyboardType={"default"} 
                autoCapitalize={'none'} 
                onChangeText={text => setbio(text)}
                defaultValue={bio}
                numberOfLines={2} />
            
            </View>
            </View>
            <View style={{ alignContent : "center", alignItems : "center"}}>
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

            
        </SafeAreaView>
    )
}

export default Edit_profile

const styles = StyleSheet.create({})
