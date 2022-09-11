import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { TabStackParamList } from '../navigator/TabNavigator';
import { RootStackParamList } from '../navigator/RootNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { useTailwind } from 'tailwind-rn/dist';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useOrders } from '../hooks/useOrders';
import { Button, Image } from '@rneui/themed';
import OrderCard from '../components/OrderCard';

export type OrdersScreenNavigationProp = CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList, 'Orders'>, NativeStackNavigationProp<RootStackParamList>>;

const OrderScreen = () => {

    const tw = useTailwind()
    const navigation = useNavigation<OrdersScreenNavigationProp>()
    const { loading, error, orders } = useOrders();
    const [asc, setAsc] = useState<boolean>( false )


    useLayoutEffect( () => {
        navigation.setOptions( {
            headerShown: false,
            // tabBarLabel: ( { focused, color } ) => (
            //     <Text style={{ color: focused ? "#EB6A7C" : color, fontSize: 10 }}>Orders</Text>
            // ),
        } );
    }, [] )

    return (
        <ScrollView style={{ backgroundColor: '#EB6A7C' }}>
            <Image
                source={{ uri: "https://links.papareact.com/m51" }}
                containerStyle={tw( 'w-full h-64' )}
                PlaceholderContent={<ActivityIndicator />}
            />
            <View>
                <Button
                    color='pink'
                    titleStyle={{ color: 'gray', fontWeight: "400" }}
                    style={tw( 'py-2 px-5' )}
                    onPress={() => setAsc( !asc )}
                >
                    {asc ? "Showing: Oldest First" : "Showing: Most Recent First"}
                </Button>

                {orders?.sort( ( a, b ) => {
                    if ( asc ) {
                        return new Date( a.createdAt ) > new Date( b.createdAt ) ? 1 : -1
                    } else {
                        return new Date( a.createdAt ) > new Date( b.createdAt ) ? -1 : 1
                    }
                } ).map( order => <OrderCard key={order.trackingId} item={order} /> )}
            </View>
        </ScrollView>
    )
}

export default OrderScreen
