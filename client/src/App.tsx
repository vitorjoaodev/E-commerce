import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "./pages/not-found";

import { useEffect, lazy, Suspense } from "react";
import Layout from "./components/layout/Layout";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Category = lazy(() => import("./pages/Category"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const OurStory = lazy(() => import("./pages/OurStory"));
const Checkout = lazy(() => import("./pages/Checkout"));

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark-gray flex items-center justify-center">Carregando...</div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/categoria/:slug" component={Category} />
        <Route path="/produto/:slug" component={ProductDetail} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/nossa-historia" component={OurStory} />
        <Route path="/checkout" component={Checkout} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  useEffect(() => {
    // Set page title for SEO
    document.title = "Piloto Inteligente - Loja Online de Acessórios de Aviação Vintage";
    
    // Add meta description for SEO
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Loja online de roupas e acessórios com estética de aviação vintage. Produtos exclusivos para aviadores e aviadoras.';
    document.head.appendChild(metaDescription);
    
    // Add Open Graph tags for better social sharing
    const ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.content = 'Piloto Inteligente - Loja Online de Acessórios de Aviação Vintage';
    document.head.appendChild(ogTitle);
    
    const ogDescription = document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.content = 'Descubra nossa coleção exclusiva de roupas e acessórios inspirados na era de ouro da aviação';
    document.head.appendChild(ogDescription);
    
    const ogType = document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.content = 'website';
    document.head.appendChild(ogType);

    return () => {
      document.head.removeChild(metaDescription);
      document.head.removeChild(ogTitle);
      document.head.removeChild(ogDescription);
      document.head.removeChild(ogType);
    };
  }, []);

  return (
    <Layout>
      <Router />
      <Toaster />
    </Layout>
  );
}

export default App;
