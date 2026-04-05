# REST API Dokümantasyonu

**API Domain:** https://fdt-five.vercel.app

---

1. **Kullanıcı Kaydı**
   - **API Metodu:** `POST /api/auth/register`
   - **Request Body:**
```json
     {
       "username": "string",
       "email": "string",
       "password": "string"
     }
```

2. **Kullanıcı Girişi**
   - **API Metodu:** `POST /api/auth/login`
   - **Request Body:**
```json
     {
       "email": "string",
       "password": "string"
     }
```

3. **Şifre Yenileme**
   - **API Metodu:** `POST /api/auth/reset-password`
   - **Request Body:**
```json
     {
       "email": "string",
       "newPassword": "string"
     }
```

4. **Kullanıcı Çıkışı**
   - **API Metodu:** `POST /api/auth/logout`
   - **Header:** `Authorization: Bearer <token>`

5. **Profil Görüntüleme**
   - **API Metodu:** `GET /api/user/:id/profile`

6. **Profil Güncelleme**
   - **API Metodu:** `PUT /api/user/:id/profile`
   - **Header:** `Authorization: Bearer <token>`
   - **Request Body:**
```json
     {
       "bio": "string",
       "profileImageUrl": "string"
     }
```

7. **Kullanıcı Takip Etme**
   - **API Metodu:** `POST /api/user/:id/follow`
   - **Header:** `Authorization: Bearer <token>`

8. **Bildirimler**
   - **API Metodu:** `GET /api/user/notifications`
   - **Header:** `Authorization: Bearer <token>`

9. **Gönderi Oluşturma**
   - **API Metodu:** `POST /api/post/create`
   - **Header:** `Authorization: Bearer <token>`
   - **Request Body:**
```json
     {
       "title": "string",
       "content": "string",
       "category": "string"
     }
```

10. **Gönderi Listeleme**
    - **API Metodu:** `GET /api/post/feed`

11. **Gönderi Beğenme**
    - **API Metodu:** `POST /api/post/:id/like`
    - **Header:** `Authorization: Bearer <token>`

12. **Yorum Yapma**
    - **API Metodu:** `POST /api/post/:id/comment`
    - **Header:** `Authorization: Bearer <token>`
    - **Request Body:**
```json
      {
        "content": "string"
      }
```