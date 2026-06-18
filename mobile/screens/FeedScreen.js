import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { API } from '../api';
import { AuthContext } from '../context';

export default function FeedScreen({ navigation }) {
  const { auth } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const authHeader = { headers: { Authorization: `Bearer ${auth.token}` } };

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API}/api/post/feed`);
      setPosts(res.data.posts);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchPosts(); }, []);

  const createPost = async () => {
    try {
      await axios.post(`${API}/api/post/create`, { title, content, category }, authHeader);
      setTitle(''); setContent(''); setCategory('');
      setMessage('Gönderi oluşturuldu!');
      fetchPosts();
    } catch (err) { setMessage('Gönderi oluşturulamadı.'); }
  };

  const likePost = async (id) => {
    try {
      await axios.post(`${API}/api/post/${id}/like`, {}, authHeader);
      fetchPosts();
    } catch (err) { console.log(err); }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Merhaba, {auth.username}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { id: auth.userId })}>
          <Text style={styles.link}>Profilim</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Yeni Gönderi</Text>
        <TextInput style={styles.input} placeholder="Başlık" value={title} onChangeText={setTitle} />
        <TextInput style={[styles.input, { height: 80 }]} placeholder="İçerik" multiline value={content} onChangeText={setContent} />
        <TextInput style={styles.input} placeholder="Kategori" value={category} onChangeText={setCategory} />
        <TouchableOpacity style={styles.button} onPress={createPost}>
          <Text style={styles.buttonText}>Gönderi Oluştur</Text>
        </TouchableOpacity>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>

      {posts.map((post) => (
        <PostItem key={post._id} post={post} onLike={likePost} navigation={navigation} authHeader={authHeader} fetchPosts={fetchPosts} />
      ))}
    </ScrollView>
  );
}

function PostItem({ post, onLike, navigation, authHeader, fetchPosts }) {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const addComment = async () => {
    try {
      await axios.post(`${API}/api/post/${post._id}/comment`, { content: comment }, authHeader);
      setComment('');
      fetchPosts();
    } catch (err) { console.log(err); }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text>{post.content}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Profile', { id: post.author?._id })}>
        <Text style={styles.meta}>Kategori: {post.category} | Yazar: {post.author?.username}</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <TouchableOpacity style={styles.smallBtn} onPress={() => onLike(post._id)}>
          <Text>❤️ {post.likes.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallBtn} onPress={() => setShowComments(!showComments)}>
          <Text>💬 {post.comments.length}</Text>
        </TouchableOpacity>
      </View>
      {showComments && (
        <View style={{ marginTop: 8 }}>
          {post.comments.map((c, i) => (
            <Text key={i} style={styles.comment}>{c.content}</Text>
          ))}
          <View style={styles.row}>
            <TextInput style={[styles.input, { flex: 1, marginBottom: 0 }]} placeholder="Yorum yaz..." value={comment} onChangeText={setComment} />
            <TouchableOpacity style={styles.button} onPress={addComment}>
              <Text style={styles.buttonText}>Gönder</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 8 },
  welcome: { fontSize: 18, fontWeight: 'bold' },
  link: { color: '#007bff' },
  card: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12 },
  sectionTitle: { fontWeight: 'bold', marginBottom: 8 },
  postTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  meta: { color: 'gray', fontSize: 12, marginTop: 6 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  button: { backgroundColor: '#007bff', padding: 10, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  message: { color: 'green', marginTop: 8 },
  row: { flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 8 },
  smallBtn: { padding: 6, borderWidth: 1, borderColor: '#ccc', borderRadius: 6 },
  comment: { backgroundColor: '#f5f5f5', padding: 6, borderRadius: 4, marginVertical: 2 },
});