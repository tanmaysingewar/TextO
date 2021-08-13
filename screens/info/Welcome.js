import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const Welcome = ({navigation}) => {
    return (
        <SafeAreaView style={{margin : 25, flex : 1,}}>
            <View style={{ marginTop : 30}}>
                <Text style={{fontFamily : "DancingScript_700Bold", fontSize : 50, textAlign : "center"}}>Welcome</Text>
                <Text style={{fontFamily : "Poppins_400Regular" , fontSize : 18, marginTop : 20, textAlign : "center"}}>To TextO a simple text sharing application</Text>
                <Text style={{fontSize : 14, marginTop : 20 , fontFamily : "Poppins_400Regular" }}>
                This is one of my hobby projects,  hope everyone likes it. It's a kind of mixture of Instagram and tweeter. Ui will feel like Instagram and due to text sharing, you will get the vibes of the tweeter. I haven't added any special features here, please don't accept too much it's just a simple application.  Hope everyone will support it 😇 
                </Text>
                <View style={{marginTop : 20}}>
                    <Text style={{textAlign : "left", fontFamily : "Poppins_600SemiBold", fontSize : 15}}>
                        ~ Tanmay Singewar
                    </Text>
                    <Text style={{fontFamily : "Poppins_500Medium", fontSize : 12, color : "#808080"}}>Full-stack Developer and  </Text>
                    <Text style={{fontFamily : "Poppins_500Medium", fontSize : 12, color : "#808080"}}>hybrid application developer</Text>
                </View>
            </View>
            <View style={{justifyContent: 'flex-end',marginBottom: 36, flex : 1}} >
                <View style={{backgroundColor : "#000", padding : 8, alignItems : "center", borderRadius : 5 }} onTouchEnd={() => navigation.navigate("Creator")}>
                    <Text style={{fontFamily : "Poppins_500Medium", fontSize : 15,color : "#fff"}}>Continue</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Welcome

const styles = StyleSheet.create({})
