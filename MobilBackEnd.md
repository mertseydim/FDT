# Mobil Backend (REST API Bağlantısı) Dokümantasyonu

**REST API Adresi:** https://fdt-five.vercel.app
**Mobil Uygulama:** React Native (Expo), gerçek cihaz (iPhone)

**Kanıt Videosu:** [Mobil Backend kanıt videosu buraya eklenecek](https://youtu.be/VIDEO_ID)

> Videoda, mobil uygulamadan REST API'ye isteğin gittiği ve işlemin veritabanında (MongoDB Atlas) gerçekleştiği net olarak gösterilir.

---

## Görev Dağılımı

Proje tek kişilik olduğundan tüm mobil backend (REST API bağlantısı) işlemleri **Mert Seydim** tarafından yapılmıştır.

## Bağlanılan REST API Endpoint'leri

Mobil uygulama, aşağıdaki endpoint'leri kullanarak REST API ile haberleşir. Kimlik doğrulama gerektiren isteklerde `Authorization: Bearer {token}` başlığı gönderilir.

| Gereksinim | HTTP Metodu | Endpoint |
|---|---|---|
| Kayıt Olma | POST | `/api/auth/register` |
| Giriş Yapma | POST | `/api/auth/login` |
| Gönderi Listeleme (Feed) | GET | `/api/post/feed` |
| Gönderi Oluşturma | POST | `/api/post/create` |
| Gönderi Beğenme | POST | `/api/post/:id/like` |
| Yorum Yapma | POST | `/api/post/:id/comment` |
| Profil Görüntüleme | GET | `/api/user/:id/profile` |
| Profil Güncelleme | PUT | `/api/user/:id/profile` |
| Takip Et / Çık | POST | `/api/user/:id/follow` |

## HTTP İstemci Yapılandırması

- **Base URL:** `https://fdt-five.vercel.app`
- **İstemci:** Axios
- **Content-Type:** `application/json`
- **Kimlik doğrulama:** Giriş sonrası alınan JWT token, korumalı isteklerde `Authorization: Bearer {token}` başlığında gönderilir.

## İşleyiş

Kullanıcı mobil uygulamada bir işlem yaptığında (örn. gönderi oluşturma), uygulama ilgili endpoint'e bir HTTP isteği gönderir. REST API isteği işler ve sonucu MongoDB Atlas veritabanına yazar/okur. Kanıt videosunda bu akış (mobil → REST API → veritabanı) adım adım gösterilir.