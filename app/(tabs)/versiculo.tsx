import AppContainer from '@/components/AppContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import versiculosLocais from '../../assets/versiculos.json';

type Versiculo = {
  id: string;
  texto: string;
  referencia: string;
  data: string;
};

export default function VersiculoScreen() {
  const [versiculos, setVersiculos] = useState<Versiculo[]>([]);
  const [carregando, setCarregando] = useState(true);

  const hoje = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const carregarVersiculos = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem('versiculos');
        let lista: Versiculo[] = dadosSalvos ? JSON.parse(dadosSalvos) : [];

        let versiculoHoje = lista.find(v => v.data === hoje);

        if (!versiculoHoje) {
          const aleatorio = versiculosLocais[Math.floor(Math.random() * versiculosLocais.length)];
          versiculoHoje = {
            id: Date.now().toString(),
            texto: aleatorio.texto,
            referencia: aleatorio.referencia,
            data: hoje,
          };
          lista = [versiculoHoje, ...lista];
        }

        lista.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

        setVersiculos(lista);
        await AsyncStorage.setItem('versiculos', JSON.stringify(lista));
      } catch (error) {
        console.error('Erro ao carregar versículos:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarVersiculos();
  }, []);

  if (carregando) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <AppContainer>
      <Text style={styles.titulo}>Versículo Diário</Text>
      <FlatList
        data={versiculos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, item.data === hoje && styles.cardHoje]}>
            <Text style={styles.texto}>"{item.texto}"</Text>
            <Text style={styles.referencia}>— {item.referencia}</Text>
            <Text style={styles.data}>{item.data}</Text>
          </View>
        )}
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    backgroundColor: '#E8D9B3',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  cardHoje: {
    backgroundColor: '#d1e7dd', 
    borderWidth: 1,
    borderColor: '#0f5132',
  },
  texto: { fontSize: 16 },
  referencia: { fontSize: 14, fontStyle: 'italic', marginTop: 5 },
  data: { fontSize: 12, color: 'gray', marginTop: 5 },
});
