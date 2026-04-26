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
  keyboardType = 'default',
  value,
  onChangeText,
  error,
  onBlur,
  ...props
}) {
  const inputRef = useRef();

  return (
    <View style={styles.formField}>
      <TouchableOpacity onPress={() => inputRef.current.focus()}>
        <Text style={[styles.label, error && styles.labelError]}>{label}</Text>
      </TouchableOpacity>

      <TextInput
        ref={inputRef}
        keyboardType={keyboardType}
        style={[
          styles.input,
          props.multiline && styles.inputMultiline,
          error && styles.inputError,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        {...props}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default FormField;

const styles = StyleSheet.create({
  formField: {
    marginBottom: 16,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  labelError: {
    color: GlobalStyles.colors.error500,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 4,
    color: GlobalStyles.colors.primary700,
    fontWeight: 'bold',
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
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
