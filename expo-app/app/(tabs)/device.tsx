import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import styles from '../styles';
import React, { useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { gql, useMutation, useQuery } from '@apollo/client';
import AppLoading from 'expo-app-loading';
import { Account } from '@/models/Account';

const ACCOUNTS_QUERY = gql`
  query GetAccounts {
    accounts {
      count
      items {
        id
        name
      }
    }
  }
`;

const CREATE_DEVICE_MUTATION = gql`
  mutation CreateDevice($input: CreateDeviceInput!, $accountId: ID) {
    createDevice(input: $input, accountId: $accountId) {
      id
      serial_number
      model
    }
  }
`;

export default function DeviceScreen() {
  const [serialNumber, setSerialNumber] = React.useState('');
  const [model, setModel] = React.useState('');
  const [accountId, setAccountId] = React.useState(null);
  const { data: accountsData, loading: accountsLoading } = useQuery(ACCOUNTS_QUERY);
  const [ createDevice, { data, error } ] = useMutation(CREATE_DEVICE_MUTATION);

  useEffect(() => {
    if (data) {
      setSerialNumber('');
      setModel('');
      setAccountId(null);
    }
  }, [data, error]);

  const onSubmit = () => {
    if (serialNumber === '' || model === '')
      return false;
    createDevice({
      variables: {
        input: {
          serial_number: serialNumber,
          model,
        },
        accountId,
      }
    });
  }

  if (accountsLoading) {
    return <AppLoading />
  }

  const options = accountsData?.accounts?.items.map((account: Account) => {
    return {
      label: account.name,
      value: account.id,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Serial Number</Text>
      <TextInput
          style={styles.input}
          onChangeText={setSerialNumber}
          value={serialNumber}
          placeholder=""
      />
      <Text style={styles.text}>Model</Text>
      <TextInput
          style={styles.input}
          onChangeText={setModel}
          value={model}
          placeholder=""
      />
      <Text style={styles.text}>Owner</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={options}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select account"
        searchPlaceholder="Search..."
        value={accountId}
        onChange={item => {
          setAccountId(item.value);
        }}
      />
      <View style={styles.buttonview}>
        <Button title='Create Device' onPress={() => onSubmit()} />
      </View>
    </View>
  );
}

