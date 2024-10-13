"use client";

import './styles/global.css'; 
import { store } from '../store/store'; 
import { Provider } from 'react-redux';
import Header from './components/Header'
import { AntdRegistry } from '@ant-design/nextjs-registry';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Provider store={store}>
          <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="flex">
              <main className="flex-1 ml-0  p-8">
                <div className="flex justify-between items-center mb-6">
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <AntdRegistry>
                    {children}
                  </AntdRegistry>
                </div>
              </main>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
