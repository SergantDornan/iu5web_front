import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux' // Импортируем Provider
import { store } from './store/store'  // Импортируем store (убедись, что путь верный)

import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

// --- PWA Registration ---
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Доступна новая версия приложения. Обновить?')) {
      updateSW(true)
    }
  },
})
// ------------------------

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Оборачиваем App в Provider, чтобы Redux работал во всем приложении */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
