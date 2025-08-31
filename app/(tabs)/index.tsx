import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import avisosLocais from '../../assets/avisos.json';
import eventosLocais from '../../assets/eventos.json';
import versiculosLocais from '../../assets/versiculos.json';

export default function HomeScreen() {
  const [ultimoAviso, setUltimoAviso] = useState<any>(null);
  const [proximoEvento, setProximoEvento] = useState<any>(null);
  const [versiculoHoje, setVersiculoHoje] = useState<any>(null);

  const hoje = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const carregarDados = async () => {
      const avisosSalvos = await AsyncStorage.getItem('avisos');
      const listaAvisos = avisosSalvos ? JSON.parse(avisosSalvos) : avisosLocais;
      listaAvisos.sort((a: any, b: any) => new Date(b.data).getTime() - new Date(a.data).getTime());
      setUltimoAviso(listaAvisos[0]);

      const eventosSalvos = await AsyncStorage.getItem('eventos');
      const listaEventos = eventosSalvos ? JSON.parse(eventosSalvos) : eventosLocais;
      const futuros = listaEventos.filter((e: any) => new Date(e.data) >= new Date());
      futuros.sort((a: any, b: any) => new Date(a.data).getTime() - new Date(b.data).getTime());
      setProximoEvento(futuros[0]);

      const versiculosSalvos = await AsyncStorage.getItem('versiculos');
      const listaVersiculos = versiculosSalvos ? JSON.parse(versiculosSalvos) : versiculosLocais;
      const hojeVersiculo = listaVersiculos.find((v: any) => v.data === hoje) || listaVersiculos[Math.floor(Math.random() * listaVersiculos.length)];
      setVersiculoHoje(hojeVersiculo);
    };

    carregarDados();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bem-vindo à Conecta Efatá!</Text>
        <Link href="/sobre" asChild>
          <TouchableOpacity style={styles.sobreButton}>
            <MaterialIcons name="info-outline" size={28} color="#966E30" />
          </TouchableOpacity>
        </Link>
      </View>

      {ultimoAviso && (
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Último Aviso</Text>
          <Text style={styles.cardTexto}>{ultimoAviso.mensagem}</Text>
          <Link href="/avisos" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Ver todos os avisos</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}

      {proximoEvento && (
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Próximo Evento</Text>
          <Text style={styles.cardTexto}>{proximoEvento.titulo} — {proximoEvento.data}</Text>
          <Link href="/agenda" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Ver todos os eventos</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}

      {versiculoHoje && (
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Versículo do Dia</Text>
          <Text style={styles.cardTexto}>"{versiculoHoje.texto}"</Text>
          <Text style={styles.cardReferencia}>— {versiculoHoje.referencia}</Text>
          <Link href="/versiculo" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Ver versículos</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF6DF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  title: { fontSize: 26, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  sobreButton: { padding: 5 },
  card: { backgroundColor: '#E8D9B3', padding: 15, marginBottom: 20, borderRadius: 10 },
  cardTitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  cardTexto: { fontSize: 16, marginBottom: 5 },
  cardReferencia: { fontSize: 14, fontStyle: 'italic', color: 'gray', marginBottom: 10 },
  button: { backgroundColor: '#08415C', paddingVertical: 10, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});
