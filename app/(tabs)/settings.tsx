import { View, Text, StyleSheet, Switch, Platform, ScrollView } from 'react-native';
import { useState } from 'react';

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    emergencyOverride: true,
    spamDetection: true,
    learningEnabled: true,
    notifications: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Configure app behavior</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Call Settings</Text>
          
          <View style={styles.setting}>
            <View>
              <Text style={styles.settingTitle}>Emergency Override</Text>
              <Text style={styles.settingDescription}>
                Allow emergency contacts to bypass silent mode
              </Text>
            </View>
            <Switch
              value={settings.emergencyOverride}
              onValueChange={() => toggleSetting('emergencyOverride')}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={settings.emergencyOverride ? '#007AFF' : '#f4f3f4'}
            />
          </View>

          <View style={styles.setting}>
            <View>
              <Text style={styles.settingTitle}>Spam Detection</Text>
              <Text style={styles.settingDescription}>
                Automatically silence suspected spam calls
              </Text>
            </View>
            <Switch
              value={settings.spamDetection}
              onValueChange={() => toggleSetting('spamDetection')}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={settings.spamDetection ? '#007AFF' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Features</Text>
          
          <View style={styles.setting}>
            <View>
              <Text style={styles.settingTitle}>Learning</Text>
              <Text style={styles.settingDescription}>
                Allow app to learn from your behavior
              </Text>
            </View>
            <Switch
              value={settings.learningEnabled}
              onValueChange={() => toggleSetting('learningEnabled')}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={settings.learningEnabled ? '#007AFF' : '#f4f3f4'}
            />
          </View>

          <View style={styles.setting}>
            <View>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingDescription}>
                Receive AI suggestions for mode changes
              </Text>
            </View>
            <Switch
              value={settings.notifications}
              onValueChange={() => toggleSetting('notifications')}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={settings.notifications ? '#007AFF' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </ScrollView>
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
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  settingTitle: {
    fontSize: 17,
    color: '#000',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
    maxWidth: '80%',
  },
  version: {
    fontSize: 15,
    color: '#666',
    paddingHorizontal: 20,
  },
});