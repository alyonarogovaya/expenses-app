import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { useRef } from 'react';

function FormField({
  label,
  placeholder,
  keyboardType,
  value,
  onChangeText,
  error,
  onBlur,
}) {
  const inputRef = useRef();

  return (
    <View style={styles.formField}>
      <TouchableOpacity onPress={() => inputRef.current.focus()}>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>

      <TextInput
        ref={inputRef}
        keyboardType={keyboardType}
        style={[styles.input, error && styles.inputError]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default FormField;

const styles = StyleSheet.create({
  formField: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary50,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary50,
    padding: 8,
    borderRadius: 4,
    color: GlobalStyles.colors.primary700,
    fontWeight: 'bold',
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    marginTop: 2,
  },
});
