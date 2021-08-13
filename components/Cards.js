import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, Dimensions ,} from 'react-native'
import icon from '../icon/icon'
import LottieView from 'lottie-react-native';
const textColor = "#000"

const Cards = ({navigation, commentSec , isComment, data}) => {
    const animation = React.useRef(null)
    const isFirstRun = React.useRef(true)
    const [like, setlike] = useState(data.like)
    const [lastTap, setlastTap] = useState("")
    useEffect(() => {
        if (!isComment) {
        if (isFirstRun.current) {
            if(like){
                animation.current.play(66,66)
            }else{
                animation.current.play(19,19)
            }
            isFirstRun.current = false
        } else if(like){
            animation.current.play(19, 50)
        }else{
            animation.current.play(0, 19)
        }}
    }, [like])

    const sendLike= (data) => {
        console.log(data)
    }

    const handleDoubleTap = () => {
        if(isComment){
            return null
        }
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            if(like === false){
                sendLike(true)
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
            animation.current.play(19, 50)
        }else{
            animation.current.play(0, 19)
        }
    }
    return (
        <View style={{margin : 20}}>
            <KeyboardAvoidingView behavior={"height"}>
            <View style={{flexDirection : "row"}}>
                <View>
                    <Image source={{uri : "https://organicthemes.com/demo/profile/files/2018/05/profile-pic.jpg"}} style={{height : 45 , width : 45 , borderRadius : 50}} />
                </View>
                <View style={{justifyContent : "center" , paddingLeft : 15 }}>
                    <View style={{flexDirection : "row"}}>
                    <Text style={{color : textColor,fontFamily : "Poppins_500Medium", fontSize : 15, lineHeight : 23}}>thetanmaysingewar</Text>
                    <Image source={icon.verified_icon} style={{height : 13, width : 13, alignSelf : "center", marginLeft : 3, tintColor : "#34B7F1"}}/>
                    </View>
                    <Text style={{color : textColor, fontFamily : "Poppins_300Light", fontSize : 12, lineHeight : 13}}>Tanmay Singewar</Text>
                </View>
            </View>
            
            <View style={{marginTop : 10}} onTouchEnd={() => handleDoubleTap()}>
                <View>
                    <Text style={{fontFamily : "Poppins_600SemiBold", fontSize : 13, color : textColor}}>
                    AppLoading has been extracted from the expo package in SDK 40
                    </Text>
                </View>
                <View>
                    <Text style={{fontSize : 13, fontFamily : "Poppins_400Regular", color : textColor}}>
                        If you want to use this component, you should run expo install expo-app-loading and import AppLoading from its own package: import AppLoading from 'expo-app-loading';. This is part of an ongoing effort to make the expo package as lightweight as possible.
                    </Text>
                </View>
            </View>
            {
                !isComment ?
            <View style={{flexDirection : "row", marginTop : 5, marginLeft : - 10}}>
                <View style={{flexDirection : "row", justifyContent : "center"}}>
                    {/* <Image source={icon.like_icon} style={{height : 20 , width : 20, tintColor : data.like ? "#FF0000" : "#ccc"}} /> */}
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
                    <Text style={{fontSize : 13, fontFamily: "Poppins_400Regular" ,color : textColor,marginLeft : -5}}>24</Text>
                    </View>
                </View>
                <View style={{flexDirection : "row", marginLeft : 15 , alignItems : "center"}} onTouchEnd={() => !commentSec ? navigation.navigate('Comment'): {}}>
                    <Image source={icon.comment_icon} style={{height : 20 , width : 20, tintColor : "#0C0908"}} />
                    <View style={{justifyContent : "center"}}>
                    <Text style={{fontSize : 13, fontFamily: "Poppins_400Regular" ,color : textColor, marginLeft : 10}}>4</Text>
                    </View>
                </View>
            </View> :
            <View>
            <View style={{flexDirection : "row",marginTop : 10}}>
                <TextInput style={{borderColor : "#ccc", height : 35, borderWidth : 1,fontSize : 15, fontFamily : "Poppins_400Regular", paddingHorizontal : 10, borderRadius : 5, width : "85%", marginRight : 10}} placeholder="Reply"  />
                <View style={{height : 35, backgroundColor : "#000",justifyContent : "center", borderRadius : 5}}>
                    <Text style={{fontFamily : "Poppins_500Medium", color : "#fff", paddingHorizontal : 10}}>GO</Text>
                </View>
            </View>
        </View>
            }
        </KeyboardAvoidingView>
        </View>
        )
    }
export default Cards

const styles = StyleSheet.create({})
