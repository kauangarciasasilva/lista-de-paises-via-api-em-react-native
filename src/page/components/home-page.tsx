
import { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet} from "react-native";
import Entity from "../../entity/entity";
import { Image } from 'expo-image';


export default function HomePage() {
    const [countreis, setCountreis] = useState<Entity[]>([]);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',

        };
        var countryList: Entity[] = [];

        fetch("https://restcountries.com/v3.1/all", requestOptions)
            .then(response => response.json())
            .then(result => {
                result.map((item) => {
                    countryList.push({
                        id: item.name.common,
                        flagUrl: item.flags.svg,
                        name: item.name.common,
                        ptName: item.translations.por.common,
                        population: item.population
                    })

                })
            })

            .catch(error => console.log('error', error));

        setCountreis(countryList);

    }, []);

    return (

        <View style={styles.container}>

            <Text style={styles.title}>lista de paises</Text>

            <FlatList

                renderItem={(countreis) =>
                    <View style={styles.card} id={countreis.item.id}>
                        <View>
                            <Image style={styles.flag} source={{uri:countreis.item.flagUrl}} />
                        </View>

                        <View>
                            <Text style={{ fontSize: 20, fontWeight: '600' , marginTop:20,}}>{countreis.item.name}</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', opacity: 0.6,  }}>{countreis.item.ptName}</Text>
                            <Text >{countreis.item.population}</Text>
                        </View>
                    </View>
                }
                data={countreis}
                keyExtractor={(item) => item.id}
            >
            </FlatList>







        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202C33',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
       
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 30,
        marginHorizontal:110
    },
    card: {
        width:'90%',
        margin:5,
        aspectRatio: 2.5,
        backgroundColor: '#212529',
        elevation: 15,
        shadowColor: '#000',
        borderRadius: 20,
        justifyContent: 'flex-start',
        flexDirection:'row',
        marginTop:20
        
        
       

    },
    flag: {
        width: 70,
        height: 70,
        marginRight: 20,
        marginTop:20,
        marginHorizontal:20
        
    },
  
});