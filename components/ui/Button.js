import { Pressable, Text, StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function Button({ children, onPress, mode = 'filled', style }) {
  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          mode === 'outlined' && styles.outlined,
          pressed && styles.pressed,
        ]}
        android_ripple={{ color: '#ccc' }}
      >
        <Text style={[styles.text, mode === 'outlined' && styles.outlinedText]}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: GlobalStyles.colors.primary700,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'transparent',
  },
  text: {
    color: GlobalStyles.colors.primary50,
    fontWeight: 'bold',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderColor: GlobalStyles.colors.primary50,
  },
  outlinedText: {
    color: GlobalStyles.colors.primary50,
  },
  pressed: {
    opacity: 0.75,
  },
});
