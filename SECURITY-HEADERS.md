# Configuration des headers de securite

Ces headers HTTP doivent etre configures sur le serveur web / CDN / hebergeur.
Ils ne peuvent pas etre definis via des balises `<meta>` et necessitent une configuration serveur.

## Headers requis

### Strict-Transport-Security (HSTS)
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
```
Force HTTPS pendant 1 an. Activer uniquement apres avoir confirme que HTTPS fonctionne.

### X-Frame-Options
```
X-Frame-Options: SAMEORIGIN
```
Empeche le site d'etre integre dans des iframes sur d'autres domaines (protection clickjacking).

### Permissions-Policy
```
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
```
Desactive les API navigateur non utilisees par le site.

---

## Configurations par plateforme

### Netlify (fichier `_headers` a la racine)
```
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Referrer-Policy: strict-origin-when-cross-origin
```

### Vercel (`vercel.json`)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), payment=()" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

### Apache (`.htaccess`)
```apache
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
```

### Nginx
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```
