import { Component, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Home from "@/pages/Home";
import Matriculas from "@/pages/Matriculas";
import Galeria from "@/pages/Galeria";
import Pagamentos from "@/pages/Pagamentos";
import Graduacoes from "@/pages/Graduacoes";
import Eventos from "@/pages/Eventos";
import Login from "@/pages/Login";
import AreaDoAluno from "@/pages/AreaDoAluno";
import Admin from "@/pages/Admin";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Protected = ({ children, adminOnly }) => {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-onyx">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-tiger">Carregando...</p>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace state={{ from: pathname }} />;
  if (adminOnly && user.role !== "admin") {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-onyx px-4 text-center">
        <p className="font-display text-4xl uppercase text-zinc-100">Acesso restrito</p>
        <a href="/" className="bg-tiger px-6 py-3 text-xs font-bold uppercase tracking-wider text-onyx">
          Voltar ao início
        </a>
      </div>
    );
  }
  return children;
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { err: false };
  }
  static getDerivedStateFromError() {
    return { err: true };
  }
  render() {
    if (this.state.err) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-onyx text-center">
          <p className="font-display text-5xl uppercase text-zinc-100">Trocamos de round</p>
          <p className="text-sm text-zinc-400">Algo deu errado nesta tela.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-tiger px-6 py-3 text-xs font-bold uppercase tracking-wider text-onyx"
          >
            Recarregar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const Site = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-onyx">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matriculas" element={<Matriculas />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/graduacoes" element={<Graduacoes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pagamentos" element={<Pagamentos />} />
        <Route
          path="/area-do-aluno"
          element={
            <Protected>
              <AreaDoAluno />
            </Protected>
          }
        />
        <Route
          path="/admin"
          element={
            <Protected adminOnly>
              <Admin />
            </Protected>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </main>
    <Footer />
    <WhatsAppFloat />
  </>
);

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Site />
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
