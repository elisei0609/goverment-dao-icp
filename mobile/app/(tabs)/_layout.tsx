import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { TouchableHighlight, Image, StyleSheet } from 'react-native';

const bottomTabsStyle = StyleSheet.create({
   tabButton: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

const screenRouteIcons = {
  assets: require('../../assets/icons/assets-icon.png'),
  daos: require('../../assets/icons/daos-icon.png'),
  daoVotings: require('../../assets/icons/voting-icon.png'),
};

export const getRouteOptions = (title: 'assets' | 'daos' | 'daoVotings', onPressTabButton: () => void) => ({
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
      push('/(tabs)/daos');
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
        options={getRouteOptions('daoVotings', () => {
          push('/(tabs)/[dao]')
        })}
      />
      <Tabs.Screen
        name="daos"
        options={getRouteOptions('daos', () => {
          push('/(tabs)/daos')
        })}
      />
    </Tabs>
  );
}
