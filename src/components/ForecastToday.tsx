import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNLocation from 'react-native-location';

import { ApiContext } from './ApiProvider';

const ForecastToday = () =>  {
    const { dados, loading, loadForecastToday, latitudeUser, longitudeUser, setLatitudeUser, setLongitudeUser } = useContext(ApiContext);

    // Configurações para exibição a partir do clima
    let icon: any;
    let colorIcon: string;

    //Teste para outras Cidades
    // var latitude1 = 2.5661769;
    // var longitude1 = -72.6383571;
    
    // Carregar os dados da API

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
        icon = 'sunny-outline';
        colorIcon = 'yellow'; 
    } else if (dados.idWeather > 800) {
        icon = "partly-sunny-outline";
        colorIcon = "white";
    } else if (dados.idWeather >= 300 && dados.idWeather <= 531) {
        icon = "rainy-outline";
        colorIcon = "gray";
    } else if (dados.idWeather >= 200 && dados.idWeather <= 232) {
        icon = "thunderstorm-outline";
        colorIcon = "black";
    }

    return(
        
        <View >

                {/* Verificação para carregar os dados na tela */}
                { loading ?
                    <View  style={styles.viewWeather}>
                        <View style={styles.loading}>
                                <ActivityIndicator size="small" color="blue" />
                        </View>
                    </View>
                :
                    <View  style={styles.viewWeather}>

                        <Text style={styles.textLocal}>{dados.cidade}</Text>
                        
                        <View style={styles.infoWeather}>
                            <Ionicons name={icon} color={colorIcon} size={50} />
                            <Text style={styles.textTemp}>{ parseInt(dados.temperatura) }º</Text>
                            <Text style={styles.textTempInfoDescription}>{ dados.descricao }</Text>
                        </View>

                        <View style={styles.temps}>
                            <View>
                                <Text style={styles.textTempInfo}>Min:  { parseInt(dados.minima) }º</Text>
                                <Text style={styles.textTempInfo}>Max: { parseInt(dados.maxima) }º</Text>
                            </View>

                            <View style={styles.tempsPressaoHumidade}>
                                <Text style={styles.textTempInfo}>Pressão:  { parseInt(dados.pressao) } hPa</Text>
                                <Text style={styles.textTempInfo}>Humidade: { parseInt(dados.humidade) }%</Text>
                            </View>  

                        </View> 
                    </View>
                }
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
        padding: 10,
        backgroundColor: "#ffffff97",
        height: 160,
        width: "95%",
        marginLeft: 10,
        marginTop: 40,
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    infoWeather: {
        flex: 1,
        flexDirection: 'row'
    },
    textTemp: {
        fontSize: 25,
        marginTop: 12,
    },
    textLocal: {
        textAlign: 'center',
        fontSize: 18
    },
    textTempInfo: {
        fontSize: 15,
    },
    temps: {
        marginLeft: 20,
        flex: 1,
        flexDirection: 'row'
    },
    tempsPressaoHumidade : {
        marginLeft: 50
    },
    textTempInfoDescription: {
        fontSize: 22,
        marginTop: 15,
        marginLeft: 50
    },
    loading: {
        marginTop: 60
    }
});

export default ForecastToday;