import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useCustomerOrders } from '../hooks/useCustomerOrders'
import { useTailwind } from 'tailwind-rn/dist'
import { useNavigation } from '@react-navigation/native'
import { CustomerScreenNavigationProp } from '../Screens/CustomerScreen'
import { Card, Icon } from '@rneui/themed'

interface Props {
    userId: string,
    name: string,
    email: string
}

const CustomerCard = ( { userId, name, email }: Props ) => {

    const { loading, error, orders } = useCustomerOrders( userId )
    const tw = useTailwind()
    const navigation = useNavigation<CustomerScreenNavigationProp>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate( 'MyModal', { name: name, userId: userId } )}>
            <Card containerStyle={tw( 'p-5 rounded-lg' )}>
                <View>
                    <View style={tw( 'flex-row justify-between' )}>
                        <View>
                            <Text style={tw( 'text-2xl font-bold' )}>{name}</Text>
                            <Text style={tw( 'text-sm' )}>ID: <Text style={[tw( 'text-sm' ), { color: "#59C1CC" }]}>{userId}</Text></Text>
                        </View>
                        <View style={tw( 'flex-row items-center justify-end' )}>
                            <Text style={{ color: "#59C1CC" }}>{loading ? "loading..." : `${ orders.length } x`}</Text>
                            <Icon
                                style={tw( "ml-auto mb-5" )}
                                name="box"
                                type="entypo"
                                color="#59C1CC"
                                size={50}
                            />
                        </View>
                    </View>
                </View>
                <Card.Divider />
                <Text>
                    {email}
                </Text>
            </Card>
        </TouchableOpacity>
    )
}

export default CustomerCard