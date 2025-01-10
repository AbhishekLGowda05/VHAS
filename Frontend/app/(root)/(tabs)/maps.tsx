import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./../../../app/app";
import { Ionicons } from '@expo/vector-icons';

type MapsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Maps">;

const MapsScreen = () => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation<MapsScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Weather and AQI Information */}
      <View style={styles.weatherInfo}>
        <View style={styles.weatherTextContainer}>
          <Text style={styles.temperature}>22°</Text>
          <Text style={styles.aqi}>111 NAQI</Text>
        </View>
        <FontAwesome5 name="cloud-sun" size={24} color="black" />
      </View>

      {/* Map View */}
      <MapView
        style={{ width, height: height * 0.85 }}
        initialRegion={{
          latitude: 12.971598,
          longitude: 77.594566,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        customMapStyle={mapStyle}
      >
        {/* Markers */}
        <Marker
          coordinate={{ latitude: 12.971698, longitude: 77.594766 }}
          title="BMS Institute of Technology"
          description="Recently viewed"
        />
        <Marker
          coordinate={{ latitude: 12.970598, longitude: 77.593566 }}
          title="GAIL Gas CNG Station"
        />
        <Marker
          coordinate={{ latitude: 12.972898, longitude: 77.595866 }}
          title="Traffic Alert"
        />
      </MapView>

       {/* Footer Navigation */}
       <View style={styles.footerNav}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="home" size={28} color="#FF4A4A" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Maps")}>
          <Ionicons name="map" size={28} color="#AAA" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8ec3b9',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1a3646',
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  weatherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    elevation: 3,
  },
  weatherTextContainer: {
    flexDirection: 'column',
  },
  temperature: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  aqi: {
    fontSize: 12,
    color: 'gray',
  },
  footerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 3,
  },
});

export default MapsScreen;
