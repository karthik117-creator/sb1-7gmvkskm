import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { MapPin, Plus } from 'lucide-react-native';
import * as Location from 'expo-location';

interface LocationRule {
  id: string;
  name: string;
  address: string;
  mode: 'normal' | 'vibrate' | 'silent';
  radius: number;
}

export default function LocationsScreen() {
  const [locationRules, setLocationRules] = useState<LocationRule[]>([
    {
      id: '1',
      name: 'Home',
      address: '123 Main St',
      mode: 'normal',
      radius: 100,
    },
    {
      id: '2',
      name: 'Office',
      address: '456 Business Ave',
      mode: 'vibrate',
      radius: 50,
    },
    {
      id: '3',
      name: 'Library',
      address: '789 Knowledge Rd',
      mode: 'silent',
      radius: 30,
    },
  ]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Locations</Text>
        <Text style={styles.subtitle}>Location-based sound rules</Text>
      </View>

      <ScrollView style={styles.content}>
        {locationRules.map((rule) => (
          <View key={rule.id} style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <MapPin size={24} color="#007AFF" />
              <Text style={styles.locationName}>{rule.name}</Text>
            </View>
            
            <View style={styles.locationDetails}>
              <Text style={styles.locationAddress}>{rule.address}</Text>
              <Text style={styles.locationMode}>
                Mode: {rule.mode.charAt(0).toUpperCase() + rule.mode.slice(1)}
              </Text>
              <Text style={styles.locationRadius}>
                Radius: {rule.radius}m
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Plus size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 17,
    color: '#666',
    marginTop: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  locationCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationName: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 12,
    color: '#000',
  },
  locationDetails: {
    marginLeft: 36,
  },
  locationAddress: {
    fontSize: 15,
    color: '#666',
    marginBottom: 4,
  },
  locationMode: {
    fontSize: 15,
    color: '#666',
    marginBottom: 4,
  },
  locationRadius: {
    fontSize: 15,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
});