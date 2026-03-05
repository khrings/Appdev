import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomButton = ({ label, onPress, buttonStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle]}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4169E1',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;