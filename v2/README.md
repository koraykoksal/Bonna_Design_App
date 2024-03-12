
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.
You have yo add firebase project config file to project.

##### Login and Register:`VITE_API_BASE_URL`
##### Firebase config:`VITE_apiKey`
##### Firebase config:`VITE_authDomain`
##### Firebase config:`VITE_projectId`
##### Firebase config:`VITE_storageBucket`
##### Firebase config:`VITE_messagingSenderId`
##### Firebase config:`VITE_appId`


## Site Map

```bash
 ▼ v2
▼ src
 ▼ app
  ▷ store.jsx
 ▼ assets
  ◇ img
 ▼ auth
  ▷ firebase.js
 ▼ components
  ◇ delete
   ▷ DeleteModal.jsx
  ◇ modals
   ▷ ImageDetail_Modal.jsx
   ▷ ImageEdit_Modal.jsx
   ▷ Users_Modal.jsx
  ◇ tables
   ▷ DesignData_Table.jsx
   ▷ UsersData_Table.jsx
  ▷ Images.jsx
  ▷ Search.jsx
 ▼ db
  ▷ firebase_db.js
 ▼ features
  ▷ authSlice.jsx
  ▷ bonnaDesignSlice.jsx
 ▼ helper
  ▷ data.js
  ▷ postTextSchema.js
  ▷ ToastNotify.js
 ▼ hooks
  ▷ useAuthCall.jsx
  ▷ useBonnaDesign.jsx
 ▼ pages
  ▷ Dashboard.jsx
  ▷ Home.jsx
  ▷ ImageUpload.jsx
  ▷ Login.jsx
  ▷ NotFound.jsx
  ▷ Users.jsx
  ▷ Settings.jsx
 ▼ router
  ▷ AppRouter.jsx
  ▷ PrivateRouter.jsx
 ▼ styles
  ▷ globalStyle.js
 App.css
 App.jsx
 index.css
 main.jsx
▶︎ .gitignore
▶︎ index.html
▶︎ package.json
▶︎ README.MD
▶︎ vite.config.js
```


