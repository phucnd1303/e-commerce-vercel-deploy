import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { PageLayout } from './components/layout';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <PageLayout>
                  <HomePage />
                </PageLayout>
              }
            />
            <Route
              path="/products"
              element={
                <PageLayout>
                  <ProductListPage />
                </PageLayout>
              }
            />
            <Route
              path="/products/:id"
              element={
                <PageLayout>
                  <ProductDetailPage />
                </PageLayout>
              }
            />
            <Route
              path="/cart"
              element={
                <PageLayout>
                  <CartPage />
                </PageLayout>
              }
            />
            <Route
              path="/login"
              element={
                <PageLayout showHeader={false} showFooter={false}>
                  <LoginPage />
                </PageLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <PageLayout showHeader={false} showFooter={false}>
                  <SignupPage />
                </PageLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <PageLayout>
                  <ProfilePage />
                </PageLayout>
              }
            />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
