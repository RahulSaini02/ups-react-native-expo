import { ActivityIndicator, SafeAreaView, ScrollView, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TabStackParamList } from '../navigator/TabNavigator'
import { RootStackParamList } from '../navigator/RootNavigator'
import { Image, Input } from '@rneui/themed'
import CustomerCard from '../components/CustomerCard'
import { useCustomers } from '../hooks/useCustomers'


export type CustomerScreenNavigationProp = CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList, 'Customers'>, NativeStackNavigationProp<RootStackParamList>>;

const CustomerScreen = () => {

    const tw = useTailwind()
    const navigation = useNavigation<CustomerScreenNavigationProp>()

    useLayoutEffect( () => {
        navigation.setOptions( {
            headerShown: false
        } )
    }, [] )

    const [input, setInput] = useState<string>( "" )

    const { loading, error, customers } = useCustomers();

    return (
        <ScrollView style={{ backgroundColor: "#59C1CC" }}>
            <Image
                source={{ uri: "https://links.papareact.com/3jc" }}
                containerStyle={tw( "w-full h-64" )}
                PlaceholderContent={<ActivityIndicator />}
            />

            <Input
                placeholder='Search by Customer'
                value={input}
                onChangeText={setInput}
                containerStyle={tw( 'bg-white pt-5 pb-0 px-10' )}
            />
            {
                customers?.filter( ( customer: CustomerList ) => customer.value.name.includes( input ) ).map( ( { name: ID, value: { name, email } }: CustomerResponse ) => <CustomerCard key={ID} name={name} email={email} userId={ID} /> )
            }
        </ScrollView>
    )
}


export default CustomerScreen