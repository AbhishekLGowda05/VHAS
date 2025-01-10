// Profile Screen (Page 01)
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./../../../app/app";

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Profile">;

const ProfileScreen = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
  return (
    <View style={styles.container}>
      {/* Weather Card */}
      <View style={styles.weatherCard}>
        <View style={styles.weatherInfo}>
          <Text style={styles.weatherTemp}>22°</Text>
          <Text style={styles.weatherDate}>Jan 10, 2025</Text>
          <Text style={styles.weatherLocation}>Bangalore, India</Text>
        </View>
        <Ionicons name="partly-sunny" size={32} color="#1E88E5" style={styles.weatherIcon} />
      </View>

      {/* Car Information */}
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>RedByte's Car</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>License No: KA 05 LU 7183</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>Community score: 98</Text>
      </View>

      {/* Badges Section */}
      <View style={styles.badgesCard}>
        <Text style={styles.badgesTitle}>Pro</Text>
        <Text style={styles.badgesSubtitle}>Badges earned: 2</Text>
        <View style={styles.badgesRow}>
          <Image
            source={require('../../../assets/images/drive.png')}
            style={styles.badgeImage}
          />
          <Image
            source={require('../../../assets/images/driver.png')}
            style={styles.badgeImage}
          />
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="home" size={28} color="#1E88E5" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Maps")}>
          <Ionicons name="map" size={28} color="#AAA" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3f2ff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  weatherCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  weatherInfo: {
    justifyContent: 'center',
  },
  weatherTemp: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E88E5',
  },
  weatherDate: {
    fontSize: 14,
    color: '#666',
  },
  weatherLocation: {
    fontSize: 16,
    color: '#333',
  },
  weatherIcon: {
    alignSelf: 'center',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  badgesCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    marginBottom: 90,
  },
  badgesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  badgesSubtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  badgesRow: {
    flexDirection: 'row',
  },
  badgeImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 30,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default ProfileScreen;

