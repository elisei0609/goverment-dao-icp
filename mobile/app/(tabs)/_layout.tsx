import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { TouchableHighlight, Image, StyleSheet } from 'react-native';

const bottomTabsStyle = StyleSheet.create({
   tabButton: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

const screenRouteIcons = {
  assets: require('../../assets/icons/assets-icon.png'),
  daos: require('../../assets/icons/daos-icon.png'),
  daoVotings: require('../../assets/icons/votings-icon.png'),
  settings: require('../../assets/icons/settings-icon.png'),
};

export const getRouteOptions = (title: 'assets' | 'daos' | 'daoVotings' | 'settings', onPressTabButton: () => void) => ({
  title,
  header: () => <></>,
  tabBarButton: () => screenRouteIcons[title] ? (
    <TouchableHighlight style={bottomTabsStyle.tabButton} onPress={onPressTabButton}>
      <Image
        style={{
          width: 20,
          height: 20,
        }}
        source={screenRouteIcons[title]}
      />
    </TouchableHighlight>
  ) : <></>,
});

export default function TabLayout() {
  const { push } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      push('/(tabs)/auth');
    }, 1000);
  }, [push]);
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="assets"
        options={getRouteOptions('assets', () => {
          push('/(tabs)/assets')
        })}
      />
      <Tabs.Screen
        name="[dao]"
        options={{
          header: () => <></>,
          tabBarButton: () => <></>,
        }}
      /> 
      <Tabs.Screen
        name="daos"
        options={getRouteOptions('daos', () => {
          push('/(tabs)/daos')
        })}
      />
      <Tabs.Screen
        name="auth"
        options={{
          header: () => <></>,
          tabBarButton: () => <></>,
        }}
      />
    </Tabs>
  );
}
