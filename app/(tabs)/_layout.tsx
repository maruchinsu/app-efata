import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#08415C',
        tabBarInactiveTintColor: '#966E30',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 0,        
          // borderTopLeftRadius: 20,  
          // borderTopRightRadius: 20, 
          overflow: 'hidden',
          height: 100,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="avisos"
        options={{
          title: 'Avisos',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="notifications" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="agenda"
        options={{
          title: 'Agenda',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="event" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="versiculo"
        options={{
          title: 'Versículo',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="menu-book" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="info" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
