import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { Card, Divider, Icon } from '@rneui/themed'
import MapView, { Marker } from 'react-native-maps'

type Props = {
    order: Order,
    fullwidth?: boolean
}

const DeliveryCard = ( { order, fullwidth }: Props ) => {
    const tw = useTailwind()
    const [totalPrice, setTotalPrice] = useState<number>( 0 )
    useEffect( () => {
        let price = 0;
        order.trackingItems.items.map( item => {
            price = price + item.price * item.quantity
        } )
        setTotalPrice( price + order.shippingCost )
    }, [] )
    return (
        <Card containerStyle={[tw( `my-2 ${ fullwidth ? 'rounded-none m-0' : "rounded-lg " }` ), {
            padding: 0,
            paddingTop: 16,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            backgroundColor: fullwidth ? '#EB6A7C' : '#59C1CC'
        }]}>
            <View style={fullwidth && { height: "100%" }}>
                <Icon name='box' type='entypo' color='white' size={50} />
                <View style={tw( 'items-start p-5 -mt-3' )}>
                    <View style={tw( 'mx-auto' )}>
                        <Text style={tw( 'text-xs text-center uppercase text-white font-bold' )}>
                            {order.carrier} - {order.trackingId}
                        </Text>
                        <Text style={tw( 'text-center text-white text-lg font-bold' )}>Expected Delivery: {new Date( order.createdAt ).toLocaleDateString()}</Text>
                        <Divider color='white' />
                    </View>

                    <View style={tw( 'mx-auto pb-5' )}>
                        <Text style={tw( 'text-base text-center text-white font-bold' )}>Address</Text>
                        <Text style={tw( 'text-sm text-center text-white' )}>{order.Address} - {order.City}</Text>
                        <Text style={tw( 'text-sm text-center text-white italic' )}>Shipping Cost: ${order.shippingCost}</Text>
                    </View>
                </View>
                <Divider color='white' />
                <View style={tw( 'p-5' )}>
                    {
                        order.trackingItems.items.map( item => (
                            <View key={item.item_id} style={tw( 'flex-row justify-between items-center' )}>
                                <Text style={tw( 'text-sm text-white italic' )}>{item.name}</Text>
                                <Text style={tw( 'text-xl text-white' )}>x {item.quantity}</Text>
                            </View>
                        ) )
                    }
                    <Text style={tw( 'text-xl text-center text-white' )}>Total Price: ${totalPrice}</Text>
                </View>

                <MapView
                    initialRegion={{ latitude: order.Lat, longitude: order.Lng, latitudeDelta: 0.005, longitudeDelta: 0.005 }}
                    style={[tw( 'w-full' ), { flexGrow: 1 }, !fullwidth && { height: 200 }]}
                    scrollEnabled={false}
                >
                    {order.Lat && order.Lng && (
                        <Marker
                            coordinate={{
                                latitude: order.Lat, longitude: order.Lng,
                            }}
                            title="Delivery Location"
                            description={order.Address}
                            identifier="destination"
                        />
                    )}
                </MapView>
            </View>
        </Card >
    )
}

export default DeliveryCard