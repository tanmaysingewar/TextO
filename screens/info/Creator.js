import React from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import icon from '../../icon/icon'

const Creator = ({navigation}) => {
    return (
        <SafeAreaView style={{marginTop : 50, margin : 25, flex : 1}}>
            <Image source={icon.me} style={{height : 183, width : 164, alignSelf : "center"}} />
            <View style={{marginTop : 20, alignSelf : "center"}}>
                <Text style={{textAlign : "left", fontFamily : "Poppins_600SemiBold", fontSize : 18 , alignSelf : "center"}}>
                    ~ Tanmay Singewar
                </Text>
                <Text style={{fontFamily : "Poppins_400Regular", fontSize : 13, color : "#808080", alignSelf : "center"}}>Full-stack Developer and hybrid </Text>
                <Text style={{fontFamily : "Poppins_400Regular", fontSize : 13, color : "#808080", alignSelf : "center"}}> application developer</Text>
            </View>
            <View style={{marginTop : 40}}>
                <Text style={{fontFamily : "Poppins_600SemiBold", fontSize : 15, color : "#0F0C08",  textAlign : "left"}}> 
                Hello everyone,  
                </Text>
                <Text style={{fontFamily : "Poppins_400Regular", fontSize : 14, color : "#0F0C08",  alignSelf : "center"}}> 
My name is Tanmay Singewar, I am Full-stack Developer and hybrid application developer. I develop programs using javascript, almost having experience of 2 years. I usually work with ReactJS, React Native, and the MERN (MongoDB, Express, ReactJs, Node) stack for Web applications. 
                </Text>
            </View>
            <View style={{justifyContent: 'flex-end',marginBottom: 36, flex : 1}} >
                <View style={{backgroundColor : "#000", padding : 8, alignItems : "center", borderRadius : 5 }} onTouchEnd={() => navigation.navigate("Home")}>
                    <Text style={{fontFamily : "Poppins_500Medium", fontSize : 15,color : "#fff"}}>Continue</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Creator

const styles = StyleSheet.create({})
