// app/(tabs)/avisos.tsx
import AppContainer from '@/components/AppContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import avisosLocais from '../../assets/avisos.json'; // JSON local

type Aviso = {
  mensagem: string;
  remetente: string;
  data: string;
};

export default function AvisosScreen() {
  const [avisos, setAvisos] = useState<Aviso[]>([]);

  useEffect(() => {
    const carregarAvisos = async () => {
      try {
        // 1️⃣ pega avisos do AsyncStorage
        const dadosSalvos = await AsyncStorage.getItem('avisos');
        let lista: Aviso[] = [];

        if (dadosSalvos) {
          lista = JSON.parse(dadosSalvos);
        }

        // 2️⃣ adiciona os avisos do JSON local que ainda não estão na lista
        avisosLocais.forEach(aviso => {
          if (!lista.some(a => a.mensagem === aviso.mensagem && a.data === aviso.data)) {
            lista.push(aviso);
          }
        });

        // ordena por data decrescente
        lista.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

        // salva no estado e no AsyncStorage
        setAvisos(lista);
        await AsyncStorage.setItem('avisos', JSON.stringify(lista));
      } catch (error) {
        console.error("Erro ao carregar avisos:", error);
      }
    };

    carregarAvisos();
  }, []);

  return (
    <AppContainer>
      <Text style={styles.titulo}>Avisos</Text>
      <FlatList
        data={avisos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.aviso}>
            <Text style={styles.mensagem}>{item.mensagem}</Text>
            <Text style={styles.remetente}>— {item.remetente}</Text>
            <Text style={styles.data}>{item.data}</Text>
          </View>
        )}
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  aviso: { marginBottom: 15, padding: 10, backgroundColor: '#E8D9B3', borderRadius: 8 },
  mensagem: { fontSize: 16 },
  remetente: { fontSize: 14, fontStyle: 'italic' },
  data: { fontSize: 12, color: 'gray' },
});
