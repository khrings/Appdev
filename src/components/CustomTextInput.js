import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const CustomTextInput = ({
  placeholder,
  label,
  labelStyle,
  value,
  onChangeText,
  containerStyle,
  textStyle,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}) => {
  return (
    <View style={containerStyle}>
      {label && <Text style={labelStyle}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        placeholderTextColor="#999"
        style={[
          textStyle,
          {
            width: '100%',
            borderWidth: 1,
            borderColor: '#d1d5db',
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 14,
            backgroundColor: 'white',
            color: '#333',
            fontSize: 15,
          },
        ]}
      />
    </View>
  );
};

export default CustomTextInput;