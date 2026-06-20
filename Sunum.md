# Video Sunum

## Sunum Videosu

> > **Video Linki:** [Final sunum videosu](https://youtu.be/am_QFz4K_ng)

> Not: Docker + CI/CD ve Redis bireysel olarak gerçekleştirilmiştir. RabbitMQ/Kafka bu projede kullanılmamıştır.

---

## Ekip ve Gereksinim Sunumu

**Grup Adı:** TSM
**Ekip Üyesi:** Mert Seydim

### Mert Seydim
**Kişisel Tanıtım:** İsim: Mert Seydim — Rol: Tüm proje (Backend, Web Frontend, Mobil, Docker/CI-CD)

**Sorumlu Olunan Gereksinimler:**

1. Üye Olma (Kayıt) — `POST /api/auth/register`
2. Giriş Yapma — `POST /api/auth/login`
3. Şifre Yenileme — `POST /api/auth/reset-password`
4. Çıkış Yapma — `POST /api/auth/logout`
5. Profil Görüntüleme — `GET /api/user/:id/profile`
6. Profil Güncelleme — `PUT /api/user/:id/profile`
7. Takip Et / Çık — `POST /api/user/:id/follow`
8. Bildirimler — `GET /api/user/notifications`
9. Gönderi Oluşturma — `POST /api/post/create`
10. Gönderi Listeleme — `GET /api/post/feed`
11. Beğeni — `POST /api/post/:id/like`
12. Yorum — `POST /api/post/:id/comment`