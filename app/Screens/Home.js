import React,{useState,useEffect} from 'react'
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Avatar, Button, Card, Title, Paragraph, Chip, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Home = () => {

    const [apiData, setApiData] = useState()

    const fetchData = async() => {
        let jsonResponse = await fetch('https://career-finder.aaratechnologies.in/job/api/all_job');

        let result = await jsonResponse.json();
        setApiData(result.data)
    }

    useEffect(() => {
        fetchData()
    },[])

    const renderFlatlistItem = ({item}) => {
        return(
            <Card style={{marginTop:5}}>
                <Card.Content>
                <Title>{item.designation}</Title>
                <Paragraph>AaraTechnologies</Paragraph>
                <View style={{flexDirection:"row",marginTop:10}}>
                    <Chip icon="briefcase-variant-outline" style={{width:120,marginRight:10}}>{item.exp}</Chip>
                    <Chip icon="map-marker" style={{width:120}}>{item.job_location}</Chip>
                </View>
                <View style={{flexDirection:"row",marginTop:10, alignItems:"center"}}>
                    <Icon name="alert-circle-outline" size={18} color="#000" />
                    <Paragraph style={{marginLeft:5}}>{item.specialization}</Paragraph>
                </View>
                </Card.Content>
            </Card>
        )
    }

    return (
        <View>
            <LinearGradient style={styles.header} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4a00e0','#8e2de2']}>
                <View>
                    <Icon name="menu" size={30} color="#fff" />
                </View>
                <View style={{flexDirection:"row"}}>
                    <Icon name="magnify" size={30} color="#fff" />
                    <Icon name="filter-outline" size={30} color="#fff" />
                </View>
            </LinearGradient>
            <View style={{padding:10}}>
                <FlatList
                    data={apiData}
                    renderItem={renderFlatlistItem}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        height:80,
        backgroundColor:"red",
        padding:10,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    }
})

export default Home
