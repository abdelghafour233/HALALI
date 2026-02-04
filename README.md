# متجر المغرب الإلكتروني (Morocco E-Shop)

هذا موقع هبوط (Landing Page) بسيط وسريع للتجارة الإلكترونية موجه للسوق المغربي. تم بناؤه باستخدام React و Tailwind CSS.

## المميزات
- تصميم متجاوب (Responsive) للهواتف والحواسيب.
- دعم كامل للغة العربية (RTL).
- عملة الدرهم المغربي (MAD).
- نموذج طلب بسيط (الاسم، الهاتف، المدينة) لزيادة معدل التحويل.
- لا يتطلب تسجيل دخول.

## طريقة التشغيل محلياً

1. تأكد من تثبيت Node.js.
2. ثبت الحزم: `npm install`
3. شغل السيرفر: `npm run dev`

## طريقة الرفع على GitHub

1. أنشئ مستودع جديد (Repository) على GitHub.
2. في مجلد المشروع، نفذ الأوامر التالية:
   ```bash
   git init
   git add .
   git commit -m "First commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

## طريقة النشر على Vercel

1. اذهب إلى [Vercel.com](https://vercel.com) وسجل الدخول.
2. اضغط على **"Add New"** ثم **"Project"**.
3. اختر **"Import Git Repository"** واختر المستودع الذي رفعته للتو على GitHub.
4. اترك الإعدادات الافتراضية (Framework Preset: Vite أو Create React App سيعمل تلقائياً).
5. اضغط **"Deploy"**.

مبروك! موقعك الآن يعمل أونلاين.

## تعديل البيانات
يمكنك تعديل معلومات المنتج (الاسم، السعر، الصور) بسهولة من خلال ملف:
`constants.ts`
