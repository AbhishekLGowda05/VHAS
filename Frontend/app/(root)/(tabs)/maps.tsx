import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./../../../app/app";
import { Ionicons } from '@expo/vector-icons';

type MapsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Maps">;

const MapsScreen = () => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation<MapsScreenNavigationProp>();

  const carACoordinate = { latitude: 12.971800, longitude: 77.594766 };

  return (
    <View style={styles.container}>
      {/* Weather and AQI Information */}
      <View style={styles.weatherInfo}>
        <View style={styles.weatherTextContainer}>
          <Text style={styles.temperature}>22°</Text>
          <Text style={styles.aqi}>111 NAQI</Text>
        </View>
        <FontAwesome5 name="cloud-sun" size={24} color="#1E88E5" />
      </View>

      {/* Map View */}
      <MapView
        style={{ width, height: height * 0.65 }}
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
          coordinate={{ latitude: 12.971800, longitude: 77.594766 }}
          title="Car A"
          description="1 min ago"
          
        />
        <Marker
          coordinate={{ latitude: 12.971400, longitude: 77.593166 }}
          title="Car B"
          description='30 sec ago'
        />
        <Marker
          coordinate={{ latitude: 12.973198, longitude: 77.594866 }}
          title="Road Construction "
          description='Take deviation'
        />

        {/* Circle Around Car A */}
        <Circle
          center={carACoordinate}
          radius={200}  // Set the radius of the circle in meters
          strokeWidth={1}
          strokeColor="#1E88E5"  // Color of the border of the circle
          fillColor="rgba(30, 136, 229, 0.2)"  // Translucent fill color
        />
      </MapView>

      <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Ionicons name="home" size={28} color="#AAA" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Maps")}>
        <Ionicons name="map" size={28} color="#1E88E5" />
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
    backgroundColor: '#d3f2ff',
  },
  weatherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#ffffff',
    elevation: 3,
  },
  weatherTextContainer: {
    flexDirection: 'column',
  },
  temperature: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E88E5',
  },
  aqi: {
    fontSize: 12,
    color: 'black',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default MapsScreen;
