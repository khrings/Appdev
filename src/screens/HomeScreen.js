import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import { IMG, ROUTES } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { resetLogin } from '../app/reducers/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { data: user } = useSelector(state => state.auth);

  const handleLogout = async () => {
    console.log('🔴 Logout button clicked!');
    try {
      console.log('🔴 Clearing AsyncStorage...');
      await AsyncStorage.multiRemove(['persist:root', 'persist:auth']);
      console.log('🔴 AsyncStorage cleared!');
      console.log('🔴 Dispatching resetLogin...');
      dispatch(resetLogin());
      console.log('🔴 resetLogin dispatched!');
    } catch (error) {
      console.error('🔴 Logout error:', error);
      dispatch(resetLogin());
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={IMG.LOGO}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.welcomeText}>Welcome back, {user?.name || 'User'}!</Text>
        <Text style={styles.emailText}>{user?.email}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Active Users</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>$0</Text>
            <Text style={styles.statLabel}>Revenue</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Products</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => {
            navigation.navigate(ROUTES.PROFILE);
          }}
        >
          <Text style={styles.profileButtonText}>View Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    backgroundColor: '#4169E1',
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4169E1',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  profileButton: {
    backgroundColor: '#4169E1',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  profileButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});

export default HomeScreen;
