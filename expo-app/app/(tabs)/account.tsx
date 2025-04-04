import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import styles from '../styles';
import React, { useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      id
      name
    }
  }
`;

export default function AccountScreen() {
  const [name, setName] = React.useState('');
  const [ createAccount, { data, error } ] = useMutation(CREATE_ACCOUNT_MUTATION);

  useEffect(() => {
    if (data) {
      setName('');
    }
  }, [data, error]);

  const onSubmit = () => {
    if (name === '')
      return false;
    createAccount({
      variables: {
        input: {
          name,
        },
      }
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name</Text>
      <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder=""
      />
      <View style={styles.buttonview}>
        <Button title='Create Account' onPress={() => onSubmit()} />
      </View>
    </View>
  );
}

