import AppContainer from '@/components/AppContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import eventosLocais from '../../assets/eventos.json';

type Evento = {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
};

export default function AgendaScreen() {
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    const carregarEventos = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem('eventos');
        let lista: Evento[] = dadosSalvos ? JSON.parse(dadosSalvos) : [];

        eventosLocais.forEach(ev => {
          if (!lista.some(e => e.id === ev.id)) {
            lista.push(ev);
          }
        });

        lista.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

        setEventos(lista);
        await AsyncStorage.setItem('eventos', JSON.stringify(lista));
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      }
    };

    carregarEventos();
  }, []);

  return (
    <AppContainer>
      <Text style={styles.titulo}>Agenda</Text>
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.evento}>
            <Text style={styles.tituloEvento}>{item.titulo}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
            <Text style={styles.data}>{item.data}</Text>
          </View>
        )}
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'left' },
  evento: { marginBottom: 15, padding: 15, backgroundColor: '#E8D9B3', borderRadius: 8 },
  tituloEvento: { fontSize: 16, fontWeight: 'bold' },
  descricao: { fontSize: 14, marginTop: 5 },
  data: { fontSize: 12, color: 'gray', marginTop: 5 },
});
