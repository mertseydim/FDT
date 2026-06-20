# Mobil Frontend Dokümantasyonu

**Mobil Uygulama Teknolojisi:** React Native (Expo)
**Test Cihazı:** Gerçek cihaz — iPhone (Expo Go)
**Bağlandığı API:** https://fdt-five.vercel.app

**Kanıt Videosu:** [Mobil Frontend kanıt videosu buraya eklenecek](https://youtu.be/VIDEO_ID)

---

## Görev Dağılımı

Proje tek kişilik (Grup: TSM) olduğundan tüm mobil frontend ekranları **Mert Seydim** tarafından geliştirilmiştir.

| # | Gereksinim (Ekran) | Açıklama |
|---|---|---|
| 1 | Kayıt Ol | Kullanıcı adı, e-posta ve şifre ile hesap oluşturma. |
| 2 | Giriş Yap | E-posta ve şifre ile giriş; başarılı girişte JWT token alınır. |
| 3 | Forum Akışı (Feed) | Tüm gönderilerin listelendiği, yeni gönderi oluşturulabilen ekran. |
| 4 | Gönderi Beğenme | Bir gönderiyi beğenme / beğeniyi geri alma. |
| 5 | Yorum Yapma | Gönderiye yorum ekleme ve yorumları görüntüleme. |
| 6 | Profil Görüntüleme | E-posta, biyografi, takipçi/takip sayısının görüntülenmesi. |
| 7 | Profil Güncelleme | Kendi profilinin biyografisini güncelleme. |
| 8 | Takip Et / Takipten Çık | Başka bir kullanıcıyı takip etme / takibi bırakma. |

---

## Kullanılan Teknolojiler

- **React Native (Expo SDK 54):** Çapraz platform mobil geliştirme.
- **React Navigation (Native Stack):** Ekranlar arası geçiş.
- **Axios:** REST API isteklerinin yönetimi.
- **React Context:** Oturum (token, kullanıcı) durumunun yönetimi.

## Ekran Akışı

Giriş Yap → Forum Akışı (Feed) → (gönderi oluştur / beğen / yorumla) → Profil

Uygulama, kullanıcının yaptığı her işlemi `https://fdt-five.vercel.app` üzerindeki REST API'ye iletir; istekler gerçek cihaz (iPhone) üzerinden gönderilir.