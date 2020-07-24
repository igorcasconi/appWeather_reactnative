import React, { useState, useEffect, useContext } from 'react';
import ApiWeather from '../services/ApiWeather';
import { View, StyleSheet, Text, FlatList, ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNLocation from 'react-native-location';
import { Card } from 'react-native-elements';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { ApiContext } from './ApiProvider';

const ForecastWeek = () =>  {

    const { dadosWeek, loadForecastWeek, loading, latitudeUser, longitudeUser, setLatitudeUser, setLongitudeUser } = useContext(ApiContext);

    // Configurações para exibição a partir do clima
    let icon: any;
    let colorIcon: string;
     
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
                loadForecastWeek(latitude, longitude);
              }
            });
          }
    }

    useEffect(() => {
        localizacao();
    }, []);

    // Renderização da lista
    const renderItem = ({item}) => {
        let i: number;

        i = 0

        if(item.weather[i]['id'] === 800 ) {
            icon = "sunny-outline";
            colorIcon = "yellow";
        } else if (item.weather[i]['id'] > 800) {
            icon = "partly-sunny-outline";
            colorIcon = "white";
        } else if (item.weather[i]['id'] >= 300 && item.weather[i]['id'] <= 531) {
            icon = "rainy-outline";
            colorIcon = "gray";
        } else if (item.weather[i]['id'] >= 200 && item.weather[i]['id'] <= 232) {
            icon = "thunderstorm-outline";
            colorIcon = "black";
        }
       
        return(
            <Card containerStyle={styles.cardConfig}>
                <Text style={styles.textDay}>{ format(parseISO(item.dt_txt), 'EEEE, dd/MM', { locale: pt }) }</Text>
                <Text style={styles.textDay}>{ format(parseISO(item.dt_txt), ' HH:mm', { locale: pt }) }</Text>
                <View style={styles.itemIcon}>
                    <Ionicons name={icon} color={colorIcon} size={45} />
                    <Text>{ item.weather[i]['description'] }</Text>
                    <Text>Min: { parseInt(item.main.temp_min) }º  Max: { parseInt(item.main.temp_max) }º</Text>
                </View>
            </Card>);

        i++;
}
    // Elementos da Página
    return(
        <View >
                <View  style={styles.viewWeather}>
                    <Text style={styles.textLocal}>Previsão dos próximos 5 dias a cada 3hrs</Text>
                    <View style={styles.infoWeather}>
                    {/* Verificação para carregar os dados na tela */}
                    { loading ?
                        <View style={styles.loading}>
                            <ActivityIndicator size="small" color="blue" />
                        </View>
                    :
                        <FlatList data={dadosWeek} horizontal keyExtractor={item => item.dt} renderItem={renderItem}/>  
                    }
                        
                    </View> 
                </View>
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
        height: 240,
        width: "95%",
        marginLeft: 10,
        marginTop: 20,
        borderRadius: 10,
        paddingLeft: 1,
        paddingRight: 20,
    },
    infoWeather: {
        // flex: 1,
        // flexDirection: 'column'
    },
    textLocal: {
        textAlign: 'center',
        fontSize: 18
    },
    cardConfig: {
        marginRight: -10,
        borderRadius: 10,
        backgroundColor: "#ababab60"
    },
    itemIcon: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textDay: {
        textAlign: 'center'
    },
    loading: {
        marginTop: 80,
        marginLeft: 20
    }
});

export default ForecastWeek;