import React,{useState} from 'react'
import { StyleSheet, Text, View ,Image} from 'react-native'
import icon from '../icon/icon';
const textColor = "#000";

const CommentsCards = ({data}) => {
    const [userData, setuserData] = useState(data)
    console.log(userData)
    return (
        <View style={{margin : 20, marginTop : 0}}>
            <View style={{flexDirection : "row"}}>
                <View>
                    <Image source={{uri : data.user.pic_url}} style={{height : 45 , width : 45 , borderRadius : 50}} />
                </View>
                <View style={{justifyContent : "center" , paddingLeft : 15 }}>
                    <View style={{flexDirection : "row"}}>
                    <Text style={{color : textColor,fontFamily : "Poppins_500Medium", fontSize : 15, lineHeight : 23}}>{userData.user.username}</Text>
                    <Image source={icon.verified_icon} style={{height : 13, width : 13, alignSelf : "center", marginLeft : 3, tintColor : "#faa5c9"}}/>
                    </View>
                    <Text style={{color : textColor, fontFamily : "Poppins_300Light", fontSize : 12, lineHeight : 13}}>{userData.user.name}</Text>
                </View>
            </View>
            
            <View style={{marginTop : 10}}>
                <View>
                    <Text style={{fontFamily : "Poppins_400Regular", fontSize : 13, color : textColor}}>
                    {userData.comments}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default CommentsCards

const styles = StyleSheet.create({})
