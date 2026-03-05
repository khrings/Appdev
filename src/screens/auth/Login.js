import { useState } from 'react';
import { Alert, StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../utils/routes';

const Login = () => {
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    const newErrors = {};

    // Validate email
    if (!emailAdd.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(emailAdd)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // TODO: Replace with actual authentication API call
    // For now, we'll do a simple check
    if (emailAdd && password) {
      // Simulate successful login
      navigation.navigate(SCREENS.HOME);
    } else {
      Alert.alert('Login Failed', 'Incorrect credentials. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/images/logo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Admin Login</Text>
          <Text style={styles.subtitle}>Welcome back! Please login to your account.</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <CustomTextInput
              placeholder={'admin@divino.com'}
              value={emailAdd}
              onChangeText={(val) => {
                setEmailAdd(val);
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              containerStyle={styles.input}
              textStyle={styles.textInput}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <CustomTextInput
              placeholder={'Enter your password'}
              value={password}
              onChangeText={(val) => {
                setPassword(val);
                if (errors.password) setErrors({ ...errors, password: null });
              }}
              containerStyle={styles.input}
              textStyle={styles.textInput}
              secureTextEntry={true}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          <TouchableOpacity 
            style={styles.rememberMeContainer}
            onPress={() => setRememberMe(!rememberMe)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.rememberMeText}>Remember me</Text>
          </TouchableOpacity>

          <CustomButton 
            label={'Sign In'} 
            onPress={handleLogin}
            buttonStyle={styles.loginButton}
          />

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => Alert.alert('Register', 'Registration page coming soon!')}>
              <Text style={styles.registerLink}>Register here</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.copyright}>© 2026 Divino. All rights reserved.</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  logoImage: {
    width: 260,
    height: 260,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'left',
  },
  textInput: {
    fontSize: 15,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 13,
    marginTop: 5,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    width: '100%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  checkboxChecked: {
    backgroundColor: '#4169E1',
    borderColor: '#4169E1',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rememberMeText: {
    fontSize: 14,
    color: '#333',
  },
  loginButton: {
    marginTop: 5,
    marginBottom: 20,
    width: '100%',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
    width: '100%',
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    fontSize: 14,
    color: '#4169E1',
    fontWeight: '600',
  },
  copyright: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
    width: '100%',
  },
});

export default Login;