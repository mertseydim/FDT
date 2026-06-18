import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { API } from '../api';
import { AuthContext } from '../context';

export default function ProfileScreen({ route }) {
  const { auth } = useContext(AuthContext);
  const id = route.params?.id;
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');

  const authHeader = { headers: { Authorization: `Bearer ${auth.token}` } };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API}/api/user/${id}/profile`);
      setUser(res.data);
      setBio(res.data.bio || '');
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchProfile(); }, [id]);

  const updateProfile = async () => {
    try {
      await axios.put(`${API}/api/user/${id}/profile`, { bio }, authHeader);
      setMessage('Profil güncellendi!');
      fetchProfile();
    } catch (err) { setMessage('Güncelleme başarısız.'); }
  };

  const toggleFollow = async () => {
    try {
      const res = await axios.post(`${API}/api/user/${id}/follow`, {}, authHeader);
      setMessage(res.data.message);
      fetchProfile();
    } catch (err) { setMessage('Takip işlemi başarısız.'); }
  };

  if (!user) return <View style={styles.container}><Text>Yükleniyor...</Text></View>;

  const isOwnProfile = auth.userId === id;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{user.username}</Text>
      <Text style={styles.line}>E-posta: {user.email}</Text>
      <Text style={styles.line}>Biyografi: {user.bio || 'Biyografi yok'}</Text>
      <Text style={styles.line}>Takipçi: {user.followers?.length || 0}  •  Takip: {user.following?.length || 0}</Text>

      {!isOwnProfile && (
        <TouchableOpacity style={styles.button} onPress={toggleFollow}>
          <Text style={styles.buttonText}>Takip Et / Takipten Çık</Text>
        </TouchableOpacity>
      )}

      {isOwnProfile && (
        <View style={{ marginTop: 16 }}>
          <Text style={styles.sectionTitle}>Profili Güncelle</Text>
          <TextInput style={[styles.input, { height: 80 }]} placeholder="Biyografi" multiline value={bio} onChangeText={setBio} />
          <TouchableOpacity style={[styles.button, { backgroundColor: '#28a745' }]} onPress={updateProfile}>
            <Text style={styles.buttonText}>Güncelle</Text>
          </TouchableOpacity>
        </View>
      )}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  line: { fontSize: 16, marginBottom: 6 },
  sectionTitle: { fontWeight: 'bold', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  button: { backgroundColor: '#007bff', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  message: { marginTop: 12, color: 'green' },
});