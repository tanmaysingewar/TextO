import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View, Image, KeyboardAvoidingView} from 'react-native'
import icon from '../icon/icon'
import LottieView from 'lottie-react-native';
import { api_url } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const textColor = "#000"

const Cards = ({navigation, commentSec , isComment, data,local}) => {
    const animation = React.useRef(null)
    const isFirstRun = React.useRef(true)
    const [userData, setuserData] = useState(data)
    const [like, setlike] = useState(userData.isliked)
    const [lastTap, setlastTap] = useState("")
    const [likeCount, setlikeCount] = useState(userData.likes)
    const [isDeleted, setisDeleted] = useState(false)
    const [deletedConform, setdeletedConform] = useState(false)

    
    useEffect(() => {
        if (!commentSec) {
            if (isFirstRun.current) {
                if(like){
                    animation.current.play(66,66)
                }else{
                    animation.current.play(19,19)
                }
                isFirstRun.current = false
            } else if(like){
                animation.current.play(32,50)
            }else{
                animation.current.play(0, 19)
            }
        }
    }, [userData.likes, like])


    const sendLike= async () => {
        const value = await AsyncStorage.getItem('user_data')
        console.log(JSON.parse(value).token)
        await fetch(`${api_url}/post?like=true&token=${JSON.parse(value).token}`,{
            method : "POST",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "p_id" : data._id,
                "u_id" : JSON.parse(value)._id
            })
        })
        .then((response) => response.json())
        .then(json => {
            console.log(json)
            setlikeCount(json.like)
            setlike(json.isliked)
        })
    }

    const handleDoubleTap = () => {
        if(commentSec){
            return null
        }
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            if(like === false){
                clickOnLike()
            }
            setlike(true);
            animation.current.play(32,50)
        } else {
            setlastTap(now);
        }
      }
    const clickOnLike = async () => {
        sendLike(!like)
        await setlike(!like)
        if(like){
            animation.current.play(32,50)
            setlikeCount(likeCount - 1) 
        }else{
            animation.current.play(0, 19)
            setlikeCount(likeCount + 1)
        }
    }

    const deletePost = async () => {
        setisDeleted(true)
    }

    const ondeletCancle = () => {
        setisDeleted(false)
    }

    const conformDelet = async () => {
        setdeletedConform(true)
        const value = await AsyncStorage.getItem('user_data')
        return fetch(`${api_url}/post?p_id=${userData._id}&u_id=${userData.user._id}&token=${JSON.parse(value).token}`,{
            method: "DELETE",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then( async res =>{
        })
    }

    const redirectToProfile = async (item) => {
        const value = await AsyncStorage.getItem('user_data')
        if (item._id === JSON.parse(value)._id) {
          return navigation.navigate("Profile")
        }
        return navigation.navigate("ProfileO",{item : item})
      }

    if (deletedConform) {
        return <View></View>
    }

    if (isDeleted) {
        return <View>
            <View style={{marginHorizontal : 30, flexDirection : "row", justifyContent : "space-between"}}>
                <Text style={{fontSize : 13, fontFamily : "Poppins_400Regular", color : textColor, alignSelf : "center"}}>
                    Are you sure you want to delete? 
                </Text>
                <View style={{paddingHorizontal : 5, justifyContent : "center", flexDirection : "row"}}>
                    <View style={{justifyContent : "center", marginRight : 10}} onTouchEnd={() => ondeletCancle()}>
                        <Text style={{fontSize : 13, fontFamily : "Poppins_400Regular", color : "#000"}}>Cancle</Text>
                    </View>
                    <View style={{backgroundColor : "#000", paddingHorizontal : 13,paddingVertical : 5, borderRadius : 5}} onTouchEnd={() => conformDelet()}>
                        <Text style={{fontSize : 13, fontFamily : "Poppins_400Regular", color : "#fff"}}>Ok</Text>
                    </View>
                </View>  
            </View>
        </View>
    }
    return (
        <View style={{margin : 20, marginTop : 0}}>
            <KeyboardAvoidingView behavior={"height"}>
            <View style={{flexDirection : "row"}}>
                <View>
                    <Image source={{uri : data.user.pic_url}} style={{height : 45 , width : 45 , borderRadius : 50}} onTouchEnd={() =>{redirectToProfile(data.user)}}/>
                </View>
                <View style={{justifyContent : "center" , paddingLeft : 15 }}>
                    <View style={{flexDirection : "row"}}>
                    <Text style={{color : textColor,fontFamily : "Poppins_500Medium", fontSize : 15, lineHeight : 23}}>{userData.user.username}</Text>
                    <Image source={icon.verified_icon} style={{height : 13, width : 13, alignSelf : "center", marginLeft : 3, tintColor : "#faa5c9"}}/>
                    </View>
                    <Text style={{color : textColor, fontFamily : "Poppins_300Light", fontSize : 12, lineHeight : 13}}>{userData.user.name}</Text>
                </View>
            </View>
            
            <View style={{marginTop : 10}} onTouchEnd={() => handleDoubleTap()}>
                <View>
                    <Text style={{fontFamily : "Poppins_600SemiBold", fontSize : 13, color : textColor}}>
                    {userData.title}
                    </Text>
                </View>
                <View>
                    <Text style={{fontSize : 13, fontFamily : "Poppins_400Regular", color : textColor}}>
                        {userData.post}
                    </Text>
                </View>
            </View>
            {!commentSec ?
            <View style={{flexDirection : "row",  marginLeft : - 15, justifyContent : "space-between"}}>
                <View style={{flexDirection : "row"}}>
                    <View style={{flexDirection : "row", justifyContent : "center"}}>
                        <LottieView 
                        ref={animation}
                        style={{
                            height : 50, 
                            width : 50,
                        }}
                        source={require("../icon/lotti/like.json")}
                        autoPlay={true}
                        loop={false}
                        onTouchEnd={() => clickOnLike()}
                        />
                        <View style={{justifyContent : "center"}}>
                        <Text style={{fontSize : 13, fontFamily: "Poppins_400Regular" ,color : textColor,marginLeft : -5}}>{likeCount}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection : "row", marginLeft : 15 , alignItems : "center"}} onTouchEnd={() => !commentSec ? navigation.navigate('Comment',{
                        userData : userData
                    }): {}}>
                        <Image source={icon.comment_icon} style={{height : 20 , width : 20, tintColor : "#0C0908"}} />
                        <View style={{justifyContent : "center"}}>
                        <Text style={{fontSize : 13, fontFamily: "Poppins_400Regular" ,color : textColor, marginLeft : 10}}>{userData.comments}</Text>
                        </View>
                    </View>
                </View>
                {
                    local._id === userData.user._id ? 
                    <View style={{alignItems : "center", justifyContent : "center"}} onTouchEnd={() => deletePost()}>
                        <Image source={icon.delete_icon} style={{height : 20, width : 20,tintColor : "#0C0908"}} />
                    </View> :
                    <View></View>
                }
                </View> : <View></View>
            }
            </KeyboardAvoidingView>
        </View>
        )
    }
export default Cards

const styles = StyleSheet.create({})
