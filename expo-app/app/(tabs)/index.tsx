import { Text, View, StyleSheet, FlatList, Pressable, GestureResponderEvent } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import React from 'react';
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
  onPress: (event: GestureResponderEvent) => void;
}

const AccountItem = (props: AccountItemProps) => {
  const { name, accountDevices } = props.account;

  return (
    <Pressable style={styles.item} onPress={props.onPress}>
      <Text style={styles.header}>{name}</Text>
      {accountDevices.map((device) => (
        <div style={styles.accountdevice}>
          <Text style={styles.subheader}>Serial Number: {device.serial_number}</Text>
          <Text style={styles.subheader}>Model: {device.model}</Text>
        </div>
      ))}
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
        <AccountItem key={item.id} account={item} onPress={() => console.log({item})} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  )

}
