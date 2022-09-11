import { useEffect, useState } from 'react'
import { useQuery } from "@apollo/client"
import { GET_CUSTOMERS } from '../graphql/queries'

export const useCustomers = () => {

    const { loading, error, data } = useQuery( GET_CUSTOMERS )
    const [customers, setCustomers] = useState<CustomerResponse[]>( [] );

    useEffect( () => {
        if ( !data ) return;


        const customers: CustomerResponse[] = data?.getCustomers.map( ( { name: ID, value: { email, name } }: CustomerResponse ) => ( {
            name: ID,
            value: {
                name,
                email
            }
        } ) );

        setCustomers( customers )
    }, [data] )

    return { loading, error, customers }
}
