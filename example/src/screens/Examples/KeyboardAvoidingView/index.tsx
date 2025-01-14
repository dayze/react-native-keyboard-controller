import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { StackScreenProps } from '@react-navigation/stack';
import { ExamplesStackParamList } from '../../../navigation/ExamplesStack';
import styles from './styles';

type Props = StackScreenProps<ExamplesStackParamList>;

export default function KeyboardAvoidingViewExample({ navigation }: Props) {
  const [isPackageImplementation, setPackageImplementation] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          style={styles.header}
          onPress={() => setPackageImplementation((value) => !value)}
        >
          {isPackageImplementation ? 'Package' : 'RN'}
        </Text>
      ),
    });
  }, [isPackageImplementation]);

  const Container = isPackageImplementation
    ? KeyboardAvoidingView
    : RNKeyboardAvoidingView;

  return (
    <Container
      behavior="padding"
      contentContainerStyle={styles.container}
      keyboardVerticalOffset={100}
      style={styles.content}
    >
      <View style={styles.inner}>
        <Text style={styles.heading}>Header</Text>
        <View>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#7C7C7C"
            style={styles.textInput}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#7C7C7C"
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
