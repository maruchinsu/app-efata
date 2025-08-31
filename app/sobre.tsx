import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SobreScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Sobre',
          headerStyle: { backgroundColor: '#966E30' },
          headerTintColor: '#FFF', 
        }}
      />

      
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Endereço</Text>
          <Text style={styles.cardTexto}>Rua Exemplo, 123</Text>
          <Text style={styles.cardTexto}>Bairro Centro, Cidade/UF</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Contato</Text>
          <Text style={styles.cardTexto}>Telefone: (00) 1234-5678</Text>
          <Text style={styles.cardTexto}>Email: contato@conectaefata.org</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Cultos</Text>
          <Text style={styles.cardTexto}>Segundas, Quartas, Sextas e Domingos: 19h - 21h</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#FFF6DF', flexGrow: 1 },
  card: { backgroundColor: '#f0f0f0', padding: 15, borderRadius: 10, marginBottom: 15 },
  cardTitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  cardTexto: { fontSize: 16, marginBottom: 2 },
});
