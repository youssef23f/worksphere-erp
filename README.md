<div align="center">

# 🚀 WorkSphere ERP

### **Enterprise-Grade Human Capital & Operations Management System**

نظام إدارة الموارد البشرية والمشاريع المتكامل للمؤسسات والشركات الناشئة
تصميم عصري • لوحة تحكم ذكية • نظام إدارة حالات ودعم ثيم احترافي

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-Latest-F59E0B?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev/)
[![Status](https://img.shields.io/badge/Status-Production_Ready-10B981?style=for-the-badge)]()

---

</div>

## 📌 نبذة عن المشروع (Overview)

**WorkSphere ERP** هو نظام إدارة متكامل لإدارة القوى العاملة والمشاريع والمهام (SaaS Dashboard). تم تصميمه برؤية بصرية عصرية تضاهي أنظمة الشركات العالمية الكبرى، مع مراعاة أعلى معايير الـ UI/UX لدعم اللغة العربية بالكامل (RTL Support) مع إمكانية التبديل بين الوضع المظلم والفاتح (Dark/Light Mode).

---

## 📊 معماريّة النظام والتفق (System Architecture Flow)

```mermaid
graph TD
    %% Node Styling %%
    classDef main fill:#4F46E5,stroke:#312E81,stroke-width:2px,color:#fff;
    classDef context fill:#0284C7,stroke:#075985,stroke-width:2px,color:#fff;
    classDef module fill:#0F172A,stroke:#334155,stroke-width:2px,color:#fff;
    
    Root[📱 App Root] :::main --> Provider[🌐 Data Context Provider] :::context

    Provider --> Dashboard[📊 Dashboard / لوحة التحكم] :::module
    Provider --> Employees[👥 Employees / الموظفين] :::module
    Provider --> Attendance[⏱️ Attendance / الحضور والغياب] :::module
    Provider --> Payroll[💰 Payroll / مسير الرواتب] :::module
    Provider --> Leaves[🌴 Leaves / الإجازات] :::module
    Provider --> Projects[💼 Projects / المشاريع] :::module
    Provider --> Tasks[📋 Tasks / لوحة المهام Agile] :::module

⚡ المميزات الرئيسية (Key Features)الموديولالوصف الإداري والتقني📊 لوحة التحكم الرئيسيةعرض إحصائيات لحظية (KPIs)، مؤشرات الأداء، وملخص للأنشطة الأخيرة.👥 إدارة الموظفينإضافة، تعديل، فلترة، وعرض الموظفين بحالات مرنة ودعم البحث اللحظي.⏱️ الحضور والغيابتتبع أوقات الحضور والنصراف، الساعات الإضافية، ونسب التأخير تلقائياً.💰 مسير الرواتباحتساب صافي الرواتب، الخصومات، المكافآت، وطباعة تفاصيل الراتب (Payslip).🌴 إدارة الإجازاتدورة اعتماد الطلبات (قبول/رفض) وحساب تلقائي لأيام الإجازة المطلوبة.💼 متابعة المشاريعمتابعة ونسب إنجاز المشاريع الحية، الفرق الموكلة، والتسليمات.📋 لوحة المهام (Kanban)إدارة مهام أسلوب Agile مع إمكانية سحب/تحريك المهام بين الحالات المختلفة.

📈 التدفق الإداري لمعالجة البيانات (Data Management Pipeline)
sequenceDiagram
    autonumber
    actor Admin as 👨‍💼 المدير / Admin
    participant Context as 🔄 Data Context State
    participant UI as 🖥️ UI View Module
    participant Storage as 💾 LocalStorage / Memory

    Admin->>UI: تفاعل مع واجهة المستخدم (إضافة/تعديل/حذف)
    UI->>Context: استدعاء Action Reducer / State Dispatch
    Context->>Storage: تحديث وتخزين البيانات لحظياً
    Storage-->>Context: إرجاع البيانات المحينة
    Context-->>UI: تحديث الواجهات بدون إعادة تحميل (Re-render)

🛠️ التقنيات المستخدمة (Tech Stack)
Core Framework: React 18 (Vite Build Tool)

Styling & Design System: Tailwind CSS

Iconography: Lucide React

State Management: React Context API & Custom Hooks

Typography: Cairo Arabic Font (Google Fonts)

📂 هيكلية المشروع (Project Directory Structure)
Plaintext
worksphere-erp/
├── public/                  # الأصول والموارد الثابتة
├── src/
│   ├── assets/              # الصور والوسائط
│   ├── components/          # المكونات المعاد استخدامها (Sidebar, Navbar, EmptyState, etc.)
│   ├── context/             # إدارة البيانات العامة (DataContext & ThemeContext)
│   ├── pages/               # صفحات التطبيق الرئيسية
│   │   ├── Dashboard/       # لوحة التحكم الرئيسية
│   │   ├── Employees/       # صفحة الموظفين
│   │   ├── Attendance/      # صفحة الحضور والغياب
│   │   ├── Payroll/         # صفحة مسير الرواتب
│   │   ├── Leaves/          # صفحة الإجازات
│   │   ├── Projects/        # صفحة المشاريع
│   │   └── Tasks/           # صفحة المهام (Kanban Board)
│   ├── App.jsx              # الهيكل الأساسي للتوجيه والمسارات
│   └── main.jsx             # نقطة الانطلاق الرئيسية
├── package.json
└── README.md

🚀 التشغيل المحلي (Local Setup & Installation)
للتشغيل والتجربة على جهازك الشخصي، اتبع الخطوات التالية:
    cd worksphere-erp

تثبيت الحزم والمكتبات (Install Dependencies):

npm install
تشغيل الخادم المحلي (Start Development Server):

npm run dev
قم بفتح الرابط http://localhost:5173 في المتصفح.

---

<div align="center">

### 💡 Designed & Developed with ❤️ by **Matthew**

</div>

____  _             _              _                  
  / __ \| |           (_)            | |                 
 | |  | | |      __ _  _   __ _   __| |  __ _  _ __  ___ 
 | |  | | |     / _` || | / _` | / _` | / _` || '__|/ __|
 | |__| | |____| (_| || || (_| || (_| || (_| || |   \__ \
  \____/|______|\__,_|| | \__,_| \__,_| \__,_||_|   |___/
                     _/ |                                
                    |__/
