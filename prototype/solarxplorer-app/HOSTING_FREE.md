# Public hosting mien phi

Web nay la static client-side app: Three.js, animation, click hanh tinh va tien do hoc
van chay binh thuong trong trinh duyet. Static khong co nghia la giao dien dung yen.
App khong co dang nhap, Firebase Auth, backend hay database.

Nguoi xem chi can mo URL public. Chi chu website dang nhap dich vu hosting luc deploy.

## Phuong an Google: Firebase Hosting

Firebase Hosting phu hop neu muon dung Google Cloud. File `firebase.json` da cau hinh
de publish thu muc `dist/` va cache texture lon.

Lan dau deploy:

```powershell
Set-Location D:\BotMedical\s32k144-learning-universe\prototype\solarxplorer-app
npm run build
npx firebase-tools login
npx firebase-tools use --add
npx firebase-tools deploy --only hosting
```

Sau khi deploy, Firebase cap URL dang `https://<project-id>.web.app`. Bat ky ai co
URL deu xem duoc, khong can tai khoan.

Firebase Hosting Spark hien co 10 GB storage va 10 GB data transfer moi thang.
Neu vuot quota data transfer, site co the bi vo hieu hoa den dau chu ky tiep theo.

Tai lieu chinh thuc:

- https://firebase.google.com/docs/hosting
- https://firebase.google.com/docs/hosting/quickstart
- https://firebase.google.com/docs/hosting/usage-quotas-pricing

Khong nen dung Google Cloud Storage truc tiep cho site nay neu can custom domain +
HTTPS: Google yeu cau external Application Load Balancer va cac thanh phan co tinh phi.

- https://docs.cloud.google.com/storage/docs/hosting-static-website

## Khuyen nghi cho texture nang: Cloudflare Pages

Ban build hien tai co khoang 14.61 MiB texture; file lon nhat la `8k_earth.jpg`
khoang 4.35 MiB. Cloudflare Pages Free cho static asset request mien phi, khong gioi
han bandwidth theo tai lieu hien tai, nen de chiu hon Firebase neu co nhieu nguoi xem.

Git deployment:

| Truong | Gia tri |
|---|---|
| Root directory | `s32k144-learning-universe/prototype/solarxplorer-app` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 20 hoac 22 |

Direct Upload:

```powershell
Set-Location D:\BotMedical\s32k144-learning-universe\prototype\solarxplorer-app
npm run build
npx wrangler pages deploy .\dist --project-name s32k144-neon-universe
```

Cloudflare cung chi yeu cau chu web dang nhap luc deploy; khach xem khong dang nhap.

Tai lieu chinh thuc:

- https://developers.cloudflare.com/pages/platform/limits/
- https://developers.cloudflare.com/pages/functions/pricing/#static-asset-requests

## Cache texture

`public/_headers` duoc copy vao build cho Cloudflare. `firebase.json` cung dat cache
7 ngay cho `/textures/**`. HTML luon revalidate de bai hoc moi duoc cap nhat som.
