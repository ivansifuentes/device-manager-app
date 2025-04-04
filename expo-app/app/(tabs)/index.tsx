import { Text, View, FlatList, Pressable } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import styles from '../styles';
import { Account } from '@/models/Account';

const ACCOUNTS_QUERY = gql`
  query GetAccounts {
    accounts {
      count
      items {
        id
        name
        accountDevices {
          id
          model
          serial_number
        }
      }
    }
  }
`;

type AccountItemProps = {
  account: Account;
}

const AccountItem = (props: AccountItemProps) => {
  const { name, accountDevices } = props.account;
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <Pressable style={styles.item} onPress={() => setExpanded(!expanded)}>
      <Text style={styles.header}>{name}</Text>
      {expanded && (
        <View>
          {accountDevices.length < 1 && (
            <div style={styles.accountdevice}>
              <Text style={styles.subheader}>
                [No Linked Devices]
              </Text>
            </div>
          )}
          {accountDevices.map((device) => (
            <div key={device.id} style={styles.accountdevice}>
              <Text style={styles.subheader}>Serial Number: {device.serial_number}</Text>
              <Text style={styles.subheader}>Model: {device.model}</Text>
            </div>
          ))}
        </View>
      )}
    </Pressable>
  )
}

export default function Index() {
  const { data, loading } = useQuery(ACCOUNTS_QUERY);

  if (loading) {
    return <AppLoading />
  }

  return (
    <FlatList
      data={data?.accounts?.items}
      renderItem={({ item }) => (
        <AccountItem key={item.id} account={item} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  )

}
