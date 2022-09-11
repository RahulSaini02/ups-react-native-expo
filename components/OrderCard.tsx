import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { useNavigation } from '@react-navigation/native'
import { Card, Icon } from '@rneui/themed'
import { OrdersScreenNavigationProp } from '../Screens/OrderScreen'

interface Props {
    item: Order
}


const OrderCard = ( { item }: Props ) => {

    const tw = useTailwind()
    const navigation = useNavigation<OrdersScreenNavigationProp>();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate( "Order", { order: item } )}
        >
            <Card containerStyle={tw( 'px-5 rounded-lg' )}>
                <View style={tw( 'flex-row justify-between items-center' )}>
                    <View style={tw( '' )}>
                        <Icon
                            name="truck-delivery"
                            color={"#EB6A7C"}
                            type="material-community"
                        />
                        <Text style={{ fontSize: 10 }}>{new Date( item.createdAt ).toDateString()}</Text>
                    </View>
                    <View style={tw( 'items-center' )}>
                        <Text style={tw( 'text-gray-400 text-xs' )}>{item.carrier} - {item.trackingId}</Text>
                        <Text style={tw( 'text-gray-500 text-xl' )}>{item.trackingItems.customer.name}</Text>
                    </View>
                    <View style={tw( 'flex-row items-center' )}>
                        <Text style={[tw( 'text-sm' ), { color: "#EB6A7C" }]}>{item.trackingItems.items.length} x</Text>
                        <Icon
                            name="box"
                            style={tw( "ml-2" )}
                            type="feather"
                        />
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    )
}

export default OrderCard