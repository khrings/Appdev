import { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, resetLogin } from '../../app/reducers/auth';
import { SCREENS } from '../../utils/routes';
import IMAGES from '../../utils/image';

const Login = () => {
  const navigation = useNavigation();
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { isLoading, isError, errorMessage } = useSelector(state => state.auth);

  // Reset loading state on mount to fix stuck loading
  useEffect(() => {
    console.log('🟡 Login screen mounted - resetting login state');
    dispatch(resetLogin());
  }, []);

  // Handle error state
  useEffect(() => {
    if (isError) {
      const errorMsg = errorMessage || 'Login failed. Please check your credentials.';
      
      // Check if it's an account not found error
      if (errorMsg.toLowerCase().includes('not found') || 
          errorMsg.toLowerCase().includes('invalid') ||
          errorMsg.toLowerCase().includes('401')) {
        Alert.alert(
          'Account Not Found',
          'This account is not registered. Please register first or check your email and password.',
          [
            { text: 'Register', onPress: () => navigation.navigate(SCREENS.REGISTER) },
            { text: 'Try Again', onPress: () => dispatch(resetLogin()), style: 'cancel' }
          ]
        );
      } else {
        Alert.alert(
          'Login Failed',
          errorMsg,
          [{ text: 'OK', onPress: () => dispatch(resetLogin()) }]
        );
      }
    }
  }, [isError, errorMessage]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    console.log('🟢 Login button clicked!');
    console.log('🟢 Current loading state:', isLoading);
    console.log('🟢 Email:', emailAdd, 'Password:', password);
    
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
      console.log('🔴 Validation errors:', newErrors);
      setErrors(newErrors);
      return;
    }

    setErrors({});

    console.log('🟢 Dispatching login action...');
    // Dispatch Redux action to login diri mo set ka data
    dispatch(
      userLogin({
        email: emailAdd,
        password: password,
      })
    );
    console.log('🟢 Login action dispatched!');
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
              source={IMAGES.LOGO} 
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
            loading={isLoading}
          />

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate(SCREENS.REGISTER)}>
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
    backgroundColor: '#dbeafe',
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
    borderRadius: 16,
    padding: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 8,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 320,
    height: 320,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 30,
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
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
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
    color: '#2563eb',
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