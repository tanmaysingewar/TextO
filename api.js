export const api_url =  "https://text-os-erver.vercel.app/api"// "http://192.168.0.102:3001/api" 

export const renderMainFrame = () => {
    return(
        <View id={"00000"}>
        <View >
        <View style={{paddingLeft : 12, flexDirection :"row", justifyContent : "flex-start" ,marginTop  : 10}} onTouchStart={() => navigation.navigate('Home')}>
            <Image source={icon.back_icon} style={{width : 23 , height : 23, tintColor : "#000", alignSelf :"auto", marginTop : 1}} />
          {!fontLoading ? <View></View> : <Text style={{fontSize : 22  , color : "#000" , fontFamily : "Poppins_400Regular", marginLeft : 10}}>Comment</Text>}
        </View>
        <Cards commentSec={true} data={{
      id: "58694a0f-3ea1-471f-bd96-145571e29d72",
      title: "Third Item",
      like : false
    }} />
        <View style={{margin : 20, marginTop : -10}}>
        <View style={{flexDirection : "row", marginBottom : 20 }}>
            <TextInput style={{borderColor : "#ccc", height : 35, borderWidth : 1,fontSize : 15, fontFamily : "Poppins_400Regular", paddingHorizontal : 10, borderRadius : 5, width : "85%", marginRight : 10}} placeholder="Add Comment here" />
            <View style={{height : 35, backgroundColor : "#000",justifyContent : "center", borderRadius : 5}}>
                <Text style={{fontFamily : "Poppins_500Medium", color : "#fff", paddingHorizontal : 10}}>GO</Text>
            </View>
        </View>
        <Text style={{fontFamily : "Poppins_500Medium", }}>All Comment</Text>
        </View>
        </View>
            <FlatList 
            renderItem={renderItems}
            data={DATA}
            style={{marginBottom : 50}}
            />
        </View>
    )
}