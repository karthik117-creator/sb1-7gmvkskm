import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Bell, BellOff, BellRing } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue
} from 'react-native-reanimated';

type SoundMode = 'normal' | 'vibrate' | 'silent';

export default function SoundModeScreen() {
  const [currentMode, setCurrentMode] = useState<SoundMode>('normal');
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });

  const handleModeChange = (mode: SoundMode) => {
    scale.value = withSpring(1.1, {}, () => {
      scale.value = withSpring(1);
    });
    setCurrentMode(mode);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Smart Sound Switch</Text>
        <Text style={styles.subtitle}>Current Mode</Text>
      </View>

      <Animated.View style={[styles.modeContainer, animatedStyle]}>
        {currentMode === 'normal' && (
          <Bell size={64} color="#007AFF" />
        )}
        {currentMode === 'vibrate' && (
          <BellRing size={64} color="#FF9500" />
        )}
        {currentMode === 'silent' && (
          <BellOff size={64} color="#FF3B30" />
        )}
        <Text style={styles.modeText}>
          {currentMode.charAt(0).toUpperCase() + currentMode.slice(1)}
        </Text>
      </Animated.View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[
            styles.modeButton,
            currentMode === 'normal' && styles.activeButton
          ]}
          onPress={() => handleModeChange('normal')}>
          <Bell size={24} color={currentMode === 'normal' ? '#fff' : '#007AFF'} />
          <Text style={[
            styles.buttonText,
            currentMode === 'normal' && styles.activeButtonText
          ]}>Normal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.modeButton,
            currentMode === 'vibrate' && styles.activeButton
          ]}
          onPress={() => handleModeChange('vibrate')}>
          <BellRing size={24} color={currentMode === 'vibrate' ? '#fff' : '#FF9500'} />
          <Text style={[
            styles.buttonText,
            currentMode === 'vibrate' && styles.activeButtonText
          ]}>Vibrate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.modeButton,
            currentMode === 'silent' && styles.activeButton
          ]}
          onPress={() => handleModeChange('silent')}>
          <BellOff size={24} color={currentMode === 'silent' ? '#fff' : '#FF3B30'} />
          <Text style={[
            styles.buttonText,
            currentMode === 'silent' && styles.activeButtonText
          ]}>Silent</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>AI Prediction</Text>
        <Text style={styles.infoText}>
          Based on your current location and time, we recommend using Silent mode.
        </Text>
      </View>
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
  modeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#fff',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  modeText: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 16,
    color: '#000',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  modeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    marginTop: 8,
    fontSize: 13,
    color: '#000',
  },
  activeButtonText: {
    color: '#fff',
  },
  infoContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 20,
  },
});