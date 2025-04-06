import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Clock, Plus } from 'lucide-react-native';

interface TimeRule {
  id: string;
  startTime: string;
  endTime: string;
  mode: 'normal' | 'vibrate' | 'silent';
  days: string[];
}

export default function ScheduleScreen() {
  const [timeRules, setTimeRules] = useState<TimeRule[]>([
    {
      id: '1',
      startTime: '22:00',
      endTime: '07:00',
      mode: 'silent',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    },
    {
      id: '2',
      startTime: '09:00',
      endTime: '17:00',
      mode: 'vibrate',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
        <Text style={styles.subtitle}>Time-based sound rules</Text>
      </View>

      <ScrollView style={styles.content}>
        {timeRules.map((rule) => (
          <View key={rule.id} style={styles.ruleCard}>
            <View style={styles.ruleHeader}>
              <Clock size={24} color="#007AFF" />
              <Text style={styles.ruleTime}>
                {rule.startTime} - {rule.endTime}
              </Text>
            </View>
            
            <View style={styles.ruleDetails}>
              <Text style={styles.ruleMode}>
                Mode: {rule.mode.charAt(0).toUpperCase() + rule.mode.slice(1)}
              </Text>
              <Text style={styles.ruleDays}>
                {rule.days.join(', ')}
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
  ruleCard: {
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
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ruleTime: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 12,
    color: '#000',
  },
  ruleDetails: {
    marginLeft: 36,
  },
  ruleMode: {
    fontSize: 15,
    color: '#666',
    marginBottom: 4,
  },
  ruleDays: {
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