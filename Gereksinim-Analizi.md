# Gereksinim Analizi
1. **Kullanıcı Kaydı**
- **API Metodu:** ` POST	/api/auth/register`
- **Açıklama:** Yeni kullanıcıların kullanıcı adı, e-posta ve şifre ile sisteme dahil olması.
     
2. **Konu Başlıklarını Listeleme**
- **API Metodu:** `GET	/api/titles`
- **Açıklama:**  Ana sayfada en son açılan veya en popüler film/dizi tartışma başlıklarını görüntüleme.

3. **Yeni Başlık Açma**
- **API Metodu:** ` POST	/api/titles`
- **Açıklama:** Kullanıcının belirli bir film veya dizi hakkında yeni bir tartışma konusu oluşturması.

4. **Yorumları Getirme**
- **API Metodu:** `GET	/api/titles/{id}/comments`
- **Açıklama:**  Belirli bir başlık altındaki tüm kullanıcı yorumlarını ve tartışmaları listeleme.

5. **Yorum Yapma**
- **API Metodu:** `POST	/api/comments`
- **Açıklama:**  Kullanıcının var olan bir başlığa kendi fikrini veya cevabını eklemesi.

6. **Yorum Güncelleme**
- **API Metodu:** `PUT	/api/comments/{id}`
- **Açıklama:** Kullanıcının yazdığı bir yorumdaki yazım hatasını düzeltmesi veya içeriği değiştirmesi.

7. **Yorum Silme**
- **API Metodu:** ` DELETE	/api/comments/{id}`
- **Açıklama:** Kullanıcının kendi yorumunu veya moderatörün uygunsuz bir içeriği kaldırması.
     
8. **Profil Güncelleme**
- **API Metodu:** `PUT	/api/user/profile`
- **Açıklama:** Kullanıcının biyografisini, profil fotoğrafını veya favori türlerini değiştirmesi.
     
9. **Şifre Yenileme**
- **API Metodu:** `POST	/api/user/reset-password`
- **Açıklama:** Güvenlik amacıyla veya unutma durumunda mevcut şifrenin güncellenmesi.

10. **Başlık Kaldırma**
- **API Metodu:** `DELETE	/api/titles/{id}`
- **Açıklama:** Açılan bir tartışma konusunun (yanlış kategori, kopya içerik vb.) sistemden tamamen silinmesi.
