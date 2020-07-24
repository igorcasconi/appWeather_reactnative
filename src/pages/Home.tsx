import React, {  useEffect, useContext } from 'react';
import { View, ImageBackground, StyleSheet, StatusBar, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ForecastToday from '../components/ForecastToday';
import ForecastWeek from '../components/ForecastWeek';
import { format } from 'date-fns';
import { ApiContext } from '../components/ApiProvider';
import RNLocation from 'react-native-location';

const Home = () => {

    const { dados, loadForecastToday, loading, latitudeUser, longitudeUser, setLatitudeUser, setLongitudeUser} = useContext(ApiContext);

    let backgroundImage: any;

    //Teste para outras Cidades
    var latitude1 = 2.5661769;
    var longitude1 = -72.6383571;

    async function localizacao() {

        const granted = await RNLocation.requestPermission({
            ios: 'whenInUse',
            android: {
              detail: 'coarse',
            },
          });
    
          if (granted) {
            RNLocation.subscribeToLocationUpdates(locations => {
              if (locations.length > 0) {
                const {latitude, longitude} = locations[0];
                setLatitudeUser(latitude);
                setLongitudeUser(longitude);
                loadForecastToday(latitude, longitude);
              }
            });
          }
    }

    useEffect(() => {

        localizacao();

    }, []);

    // A partir dos dados da API dependendo do clima troca itens do layout
    if (dados.idWeather === 800) {
        backgroundImage = require(`../assets/ceulimpo.jpg`);
        StatusBar.setBackgroundColor('#4ea3fb');
    } else if (dados.idWeather > 800) {
        backgroundImage = require(`../assets/nublado.jpg`);
        StatusBar.setBackgroundColor('gray');
    } else if ( dados.idWeather >= 300 && dados.idWeather <= 531) {
        backgroundImage = require(`../assets/chuva.jpg`);
        StatusBar.setBackgroundColor('black');
    } else if ( dados.idWeather >= 200 && dados.idWeather <= 232) {
        backgroundImage = require(`../assets/raio.jpg`);
        StatusBar.setBackgroundColor('black');   
    }


    return(

        <View style={styles.container}>
            
            <ImageBackground source={backgroundImage} style={styles.image} >
                <ScrollView>
                <View style={styles.titlePage} >
                    <Text style={styles.logo}>AppWeather</Text>
                    
                    <TouchableOpacity onPress={() => { loadForecastToday(latitudeUser,longitudeUser) }}><Ionicons name="sync" size={30}  color="#07d011"/></TouchableOpacity>
                
                </View>
                
                <View >

                    <ForecastToday />

                    <View style={styles.viewWeather}>
                   
                        {/* Verificação para carregar os dados na tela */}
                        {loading ?
                            <View>
                                <ActivityIndicator size="small" color="blue" />
                            </View>
                        :   
                            <View style={styles.sunHour}>
                                <Text style={styles.textSunrise}><Ionicons name="sunny-outline" size={20}/> Nascer do Sol: { format(new Date(dados.sunrise * 1000), 'HH:mm')}</Text>
                                <Text><Ionicons name="moon-outline" size={20}/> Por do Sol: { format(new Date(dados.sunset * 1000), 'HH:mm')}</Text>
                            </View>
                        }
                    </View>

                    <ForecastWeek />

                </View>
                </ScrollView>
            </ImageBackground>
        </View>
        
    );
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        padding: 20,
    },
    viewWeather : {
        padding: 15,
        backgroundColor: "#ffffff97",
        height: 50,
        width: "95%",
        marginLeft: 10,
        marginTop: 20,
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
        
    },
    textLocal: {
        textAlign: 'center',
        fontSize: 18
    },
    logo: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        flex: 1,
        marginRight: -30
    },
    textSunrise: {
        marginRight: 20
    },
    sunHour: {
        flexDirection: 'row'
    },
    titlePage: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Home;