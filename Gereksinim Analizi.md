# Gereksinim Analizi

---

1. **Kullanıcı Kaydı**
   - **API Metodu:** `POST /api/auth/register`
   - **Açıklama:** Yeni kullanıcıların kullanıcı adı, e-posta ve şifre ile sisteme dahil olması.

2. **Kullanıcı Girişi**
   - **API Metodu:** `POST /api/auth/login`
   - **Açıklama:** Kayıtlı kullanıcıların e-posta ve şifre ile sisteme giriş yapması. Başarılı girişte JWT token üretilir ve kullanıcıya döndürülür.

3. **Şifre Yenileme**
   - **API Metodu:** `POST /api/auth/reset-password`
   - **Açıklama:** Güvenlik amacıyla veya unutma durumunda mevcut şifrenin güncellenmesi.

4. **Kullanıcı Profili Görüntüleme**
   - **API Metodu:** `GET /api/user/:id/profile`
   - **Açıklama:** Herhangi bir kullanıcının herkese açık profil bilgilerinin görüntülenmesi.

5. **Kullanıcı Profili Güncelleme**
   - **API Metodu:** `PUT /api/user/:id/profile`
   - **Açıklama:** Oturum açmış kullanıcının kendi profil bilgilerini güncelleyebilmesi.

6. **Gönderi Oluşturma**
   - **API Metodu:** `POST /api/post/create`
   - **Açıklama:** Giriş yapmış kullanıcının metin ve/veya medya içerikli yeni bir forum gönderisi oluşturması.

7. **Gönderi Listeleme / Akış**
   - **API Metodu:** `GET /api/post/feed`
   - **Açıklama:** Platformdaki gönderilerin zaman damgasına veya popülerliğe göre sıralanarak listelenmesi.

8. **Gönderi Beğenme**
   - **API Metodu:** `POST /api/post/:id/like`
   - **Açıklama:** Giriş yapmış kullanıcının bir gönderiyi beğenmesi veya beğeniyi geri alması.

9. **Yorum Yapma**
   - **API Metodu:** `POST /api/post/:id/comment`
   - **Açıklama:** Kullanıcıların bir forum gönderisine yorum yazabilmesi.

10. **Kullanıcı Takip Etme**
    - **API Metodu:** `POST /api/user/:id/follow`
    - **Açıklama:** Kullanıcıların birbirini takip edebilmesi ve takipten çıkabilmesi.

11. **Bildirim Sistemi**
    - **API Metodu:** `GET /api/user/notifications`
    - **Açıklama:** Kullanıcının beğeni, yorum ve takip gibi etkileşimlerine ait bildirimlerin listelenmesi.

12. **Kullanıcı Çıkışı**
    - **API Metodu:** `POST /api/auth/logout`
    - **Açıklama:** Oturum açmış kullanıcının sistemden güvenli çıkış yapması.
