import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Início', path: '/' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Agendar', path: '/agendamento' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass backdrop-blur-xl' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-gold-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-2xl font-display font-bold text-gradient-primary">
              Maude Beauty
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-rose-600 border-b-2 border-rose-600'
                    : 'text-neutral-700 hover:text-rose-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/agendamento"
              className="btn-primary text-sm"
            >
              Agendar Agora
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 relative">
              <span className={`block absolute h-0.5 w-6 bg-neutral-900 transform transition duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'
              }`}></span>
              <span className={`block absolute h-0.5 w-6 bg-neutral-900 transform transition duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              } translate-y-2`}></span>
              <span className={`block absolute h-0.5 w-6 bg-neutral-900 transform transition duration-300 ${
                isMenuOpen ? '-rotate-45 translate-y-2' : 'translate-y-4'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 glass rounded-2xl mt-2">
            <div className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-rose-600'
                      : 'text-neutral-700 hover:text-rose-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/agendamento"
                className="btn-primary text-sm w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Agendar Agora
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-gold-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-2xl font-display font-bold text-gradient-primary">
                Maude Beauty
              </span>
            </div>
            <p className="text-neutral-300 mb-4">
              Especialistas em cabelos e beleza, oferecendo serviços premium com qualidade excepcional.
            </p>
            <a
              href="https://linktr.ee/maudebeauty"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-rose-400 hover:text-rose-300 transition-colors"
            >
              <span>🔗 Linktree</span>
            </a>
          </div>

          {/* Horários */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Horários de Atendimento</h3>
            <div className="space-y-2 text-neutral-300">
              <p>Segunda a Sexta: 10h às 19h</p>
              <p>Sábado: 9h às 14h</p>
              <p>Domingo: Fechado</p>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-2 text-neutral-300">
              <p>📧 contato@maudebeauty.com</p>
              <p>📱 (11) 99999-9999</p>
              <p>📍 São Paulo, SP</p>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
          <p>&copy; 2025 Maude Beauty. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

// Home Page Component
const Home = () => {
  useEffect(() => {
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
            <span className="text-gradient-primary">Maude</span>
            <br />
            <span className="text-gradient-gold">Beauty</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light animate-slide-up">
            Especialistas em cabelos humanos, fibra humana e fibra orgânica
          </p>
          <p className="text-lg mb-12 opacity-90 animate-slide-up">
            Transforme sua beleza com nossos serviços premium e personalizados
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-scale-in">
            <Link to="/agendamento" className="btn-primary text-lg">
              Agende seu Horário
            </Link>
            <Link to="/servicos" className="btn-glass text-lg">
              Conheça os Serviços
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-float">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Role para baixo</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
              Nossos Serviços
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Oferecemos uma gama completa de serviços de beleza capilar com a mais alta qualidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Aplicação de Cabelo',
                description: 'Aplicação profissional de cabelos humanos e fibras premium',
                image: 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0',
                price: 'A partir de R$ 200'
              },
              {
                title: 'Peruca Personalizada',
                description: 'Perucas sob medida com cabelos naturais de alta qualidade',
                image: 'https://images.unsplash.com/photo-1712481697233-83850fd0ca32',
                price: 'A partir de R$ 800'
              },
              {
                title: 'Consultoria Capilar',
                description: 'Consultoria especializada para cuidados e tratamentos capilares',
                image: 'https://images.pexels.com/photos/6923241/pexels-photo-6923241.jpeg',
                price: 'A partir de R$ 150'
              }
            ].map((service, index) => (
              <div key={index} className="glass rounded-3xl p-6 hover:shadow-premium transition-all duration-300 transform hover:scale-105 animate-on-scroll">
                <div className="h-48 mb-6 rounded-2xl overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-2xl font-semibold text-neutral-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {service.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-rose-600 font-semibold text-lg">
                    {service.price}
                  </span>
                  <Link to="/agendamento" className="text-rose-600 hover:text-rose-700 font-medium">
                    Agendar →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-gold-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
              Clientes Satisfeitas
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Veja o que nossas clientes dizem sobre nossos serviços
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'Maria Silva',
                text: 'Simplesmente perfeito! A aplicação ficou muito natural e o atendimento foi excepcional.',
                image: 'https://images.unsplash.com/photo-1554519934-e32b1629d9ee'
              },
              {
                name: 'Ana Santos',
                text: 'Minha peruca personalizada superou todas as expectativas. Recomendo muito!',
                image: 'https://images.pexels.com/photos/32651791/pexels-photo-32651791.jpeg'
              }
            ].map((testimonial, index) => (
              <div key={index} className="glass rounded-3xl p-8 animate-on-scroll">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">{testimonial.name}</h4>
                    <div className="flex text-gold-500">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-neutral-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-rose-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-on-scroll">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Pronta para Transformar sua Beleza?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Agende agora seu horário e descubra por que somos referência em beleza capilar
          </p>
          <Link to="/agendamento" className="btn-secondary text-lg">
            Agendar Consulta Grátis
          </Link>
        </div>
      </section>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<div className="pt-20 min-h-screen flex items-center justify-center"><h1 className="text-4xl">Serviços - Em Construção</h1></div>} />
          <Route path="/agendamento" element={<div className="pt-20 min-h-screen flex items-center justify-center"><h1 className="text-4xl">Agendamento - Em Construção</h1></div>} />
          <Route path="/admin" element={<div className="pt-20 min-h-screen flex items-center justify-center"><h1 className="text-4xl">Admin - Em Construção</h1></div>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}