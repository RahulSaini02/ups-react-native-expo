import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { Icon } from '@rneui/themed'
import { useTailwind } from 'tailwind-rn/dist'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeliveryCard from '../components/DeliveryCard';
import { useCustomerOrders } from '../hooks/useCustomerOrders';

type ModalScreenNavigationProp = CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList>, NativeStackNavigationProp<RootStackParamList, 'MyModal'>>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, 'MyModal'>;


const ModalScreen = () => {
    const tw = useTailwind()
    const navigation = useNavigation<ModalScreenNavigationProp>();
    const { params: { name, userId } } = useRoute<ModalScreenRouteProp>()

    const { orders } = useCustomerOrders( userId );

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={navigation.goBack} style={[tw( 'absolute right-5 z-10' ), { top: StatusBar?.currentHeight }]}>
                <Icon
                    name='closecircle'
                    type='antdesign'
                />
            </TouchableOpacity>

            <View style={{ marginTop: 10 }}>
                <View style={[tw( 'py-5 border-b' ), { borderColor: "#59C1CC" }]}>
                    <Text style={[tw( 'text-center text-xl font-bold' ), { color: "#59C1CC" }]}>{name}</Text>
                    <Text style={[tw( 'text-center italic text-sm' )]}>deliveries</Text>
                </View>
            </View>
            {
                orders.length > 0 ? (
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 200 }}
                        data={orders}
                        keyExtractor={order => order.trackingId}
                        renderItem={( { item: order } ) => <DeliveryCard order={order} />}
                    />
                ) : <Text style={tw( 'text-2xl text-center text-black mt-10' )}>No deliveries!</Text>
            }
        </SafeAreaView>
    )
}

export default ModalScreen