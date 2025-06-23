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

// Services Page Component
const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Aplicação de Cabelo',
      description: 'Aplicação profissional de cabelos humanos, fibra humana e fibra orgânica com técnicas avançadas para um resultado natural e duradouro.',
      image: 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0',
      price: 'A partir de R$ 200',
      duration: '2-3 horas',
      features: [
        'Cabelos 100% humanos',
        'Fibra humana premium',
        'Fibra orgânica de qualidade',
        'Técnicas modernas de aplicação',
        'Resultado natural',
        'Duração de 3-6 meses'
      ]
    },
    {
      id: 2,
      title: 'Peruca Personalizada',
      description: 'Perucas sob medida feitas com cabelos naturais de alta qualidade, personalizadas para seu formato de rosto e estilo pessoal.',
      image: 'https://images.unsplash.com/photo-1712481697233-83850fd0ca32',
      price: 'A partir de R$ 800',
      duration: '1-2 semanas para confecção',
      features: [
        'Medidas personalizadas',
        'Cabelos naturais premium',
        'Corte e cor sob medida',
        'Base confortável',
        'Acabamento profissional',
        'Manutenção inclusa'
      ]
    },
    {
      id: 3,
      title: 'Consultoria Capilar',
      description: 'Consultoria especializada para cuidados capilares, análise do couro cabeludo e recomendações personalizadas para seus cabelos.',
      image: 'https://images.pexels.com/photos/6923241/pexels-photo-6923241.jpeg',
      price: 'A partir de R$ 150',
      duration: '1 hora',
      features: [
        'Análise completa do couro cabeludo',
        'Diagnóstico capilar',
        'Recomendações personalizadas',
        'Plano de tratamento',
        'Orientações de cuidados',
        'Acompanhamento mensal'
      ]
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-pattern">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-rose-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Nossos Serviços
          </h1>
          <p className="text-xl opacity-90">
            Serviços premium de beleza capilar com qualidade excepcional
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="h-96 rounded-3xl overflow-hidden shadow-premium">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="glass rounded-3xl p-8">
                    <h2 className="font-display text-3xl font-bold text-gradient-primary mb-4">
                      {service.title}
                    </h2>
                    <p className="text-neutral-600 mb-6 text-lg">
                      {service.description}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-rose-50 rounded-2xl p-4">
                        <span className="text-rose-600 font-semibold text-2xl">
                          {service.price}
                        </span>
                      </div>
                      <div className="bg-gold-50 rounded-2xl p-4">
                        <span className="text-gold-600 font-medium">
                          ⏱️ {service.duration}
                        </span>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="font-semibold text-neutral-900 mb-4">Inclui:</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-neutral-600">
                            <span className="text-rose-500 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link to="/agendamento" className="btn-primary w-full text-center">
                      Agendar {service.title}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-rose-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold mb-6">
            Tem Dúvidas Sobre Nossos Serviços?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Entre em contato conosco para uma consulta personalizada
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/agendamento" className="btn-secondary text-lg">
              Agendar Consulta
            </Link>
            <a 
              href="https://linktr.ee/maudebeauty" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-glass text-lg"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// Booking Page Component
const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    'Aplicação de Cabelo',
    'Peruca Personalizada', 
    'Consultoria Capilar'
  ];

  const timeSlots = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30'
  ];

  const saturdaySlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getAvailableTimeSlots = () => {
    if (!formData.date) return [];
    
    const selectedDate = new Date(formData.date);
    const dayOfWeek = selectedDate.getDay();
    
    // Sunday = 0, Monday = 1, ..., Saturday = 6
    if (dayOfWeek === 0) return []; // Domingo fechado
    if (dayOfWeek === 6) return saturdaySlots; // Sábado 9h-14h
    return timeSlots; // Segunda a sexta 10h-19h
  };

  const validateForm = () => {
    if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
      alert('Por favor, preencha todos os campos.');
      return false;
    }
    
    const selectedDate = new Date(formData.date);
    const today = new Date();
    const dayOfWeek = selectedDate.getDay();
    
    if (selectedDate < today) {
      alert('Por favor, selecione uma data futura.');
      return false;
    }
    
    if (dayOfWeek === 0) {
      alert('Desculpe, não atendemos aos domingos.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission
      setIsSubmitted(true);
      console.log('Agendamento:', formData);
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-20 min-h-screen bg-pattern flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-12">
            <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-white text-4xl">✓</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-gradient-primary mb-6">
              Agendamento Confirmado!
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              Obrigado, <strong>{formData.name}</strong>! 
              Seu agendamento para <strong>{formData.service}</strong> em {formData.date} às {formData.time} foi confirmado.
            </p>
            <p className="text-neutral-600 mb-8">
              Entraremos em contato em breve para confirmar os detalhes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/" className="btn-primary">
                Voltar ao Início
              </Link>
              <Link to="/servicos" className="btn-secondary">
                Ver Outros Serviços
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-pattern">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-rose-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Agendar Serviço
          </h1>
          <p className="text-xl opacity-90">
            Preencha o formulário abaixo para agendar seu horário
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div>
                <label className="block text-neutral-700 font-semibold mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all duration-200"
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-neutral-700 font-semibold mb-2">
                  Telefone/WhatsApp *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all duration-200"
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>

              {/* Serviço */}
              <div>
                <label className="block text-neutral-700 font-semibold mb-2">
                  Serviço Desejado *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all duration-200"
                  required
                >
                  <option value="">Selecione um serviço</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Data */}
              <div>
                <label className="block text-neutral-700 font-semibold mb-2">
                  Data Desejada *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all duration-200"
                  required
                />
              </div>

              {/* Horário */}
              <div>
                <label className="block text-neutral-700 font-semibold mb-2">
                  Horário Desejado *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all duration-200"
                  required
                  disabled={!formData.date}
                >
                  <option value="">
                    {formData.date ? 'Selecione um horário' : 'Primeiro selecione uma data'}
                  </option>
                  {getAvailableTimeSlots().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {formData.date && (
                  <p className="text-sm text-neutral-500 mt-2">
                    {new Date(formData.date).getDay() === 6 
                      ? 'Sábado: 9h às 14h' 
                      : 'Segunda a Sexta: 10h às 19h'
                    }
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary w-full text-lg"
              >
                Confirmar Agendamento
              </button>
            </form>
          </div>

          {/* Business Hours Info */}
          <div className="mt-12 glass rounded-3xl p-8">
            <h3 className="font-display text-2xl font-bold text-gradient-primary mb-4">
              Horários de Funcionamento
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-rose-50 rounded-2xl p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">Segunda a Sexta</h4>
                <p className="text-rose-600 font-medium">10h às 19h</p>
              </div>
              <div className="bg-gold-50 rounded-2xl p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">Sábado</h4>
                <p className="text-gold-600 font-medium">9h às 14h</p>
              </div>
              <div className="bg-neutral-100 rounded-2xl p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">Domingo</h4>
                <p className="text-neutral-500 font-medium">Fechado</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Admin Page Component
const Admin = () => {
  const [appointments] = useState([
    {
      id: 1,
      name: 'Maria Silva',
      phone: '(11) 99999-1234',
      service: 'Aplicação de Cabelo',
      date: '2025-06-15',
      time: '14:00',
      status: 'Confirmado'
    },
    {
      id: 2,
      name: 'Ana Santos',
      phone: '(11) 99999-5678',
      service: 'Peruca Personalizada',
      date: '2025-06-16',
      time: '10:30',
      status: 'Pendente'
    },
    {
      id: 3,
      name: 'Carla Oliveira',
      phone: '(11) 99999-9012',
      service: 'Consultoria Capilar',
      date: '2025-06-17',
      time: '16:00',
      status: 'Confirmado'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmado':
        return 'bg-green-100 text-green-800';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-pattern">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-rose-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Área Administrativa
          </h1>
          <p className="text-xl opacity-90">
            Gerenciamento de agendamentos e serviços
          </p>
        </div>
      </section>

      {/* Dashboard Stats */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="glass rounded-3xl p-6 text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">12</div>
              <div className="text-neutral-600">Agendamentos Hoje</div>
            </div>
            <div className="glass rounded-3xl p-6 text-center">
              <div className="text-3xl font-bold text-gold-600 mb-2">45</div>
              <div className="text-neutral-600">Esta Semana</div>
            </div>
            <div className="glass rounded-3xl p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">8</div>
              <div className="text-neutral-600">Confirmados</div>
            </div>
            <div className="glass rounded-3xl p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">4</div>
              <div className="text-neutral-600">Pendentes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointments Table */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8">
            <h2 className="font-display text-3xl font-bold text-gradient-primary mb-8">
              Agendamentos Recentes
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-4 px-4 font-semibold text-neutral-700">Cliente</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-700">Telefone</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-700">Serviço</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-700">Data</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-700">Horário</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-700">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-4 px-4 font-medium text-neutral-900">
                        {appointment.name}
                      </td>
                      <td className="py-4 px-4 text-neutral-600">
                        {appointment.phone}
                      </td>
                      <td className="py-4 px-4 text-neutral-600">
                        {appointment.service}
                      </td>
                      <td className="py-4 px-4 text-neutral-600">
                        {new Date(appointment.date).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-4 px-4 text-neutral-600">
                        {appointment.time}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                            Confirmar
                          </button>
                          <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                            Cancelar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {appointments.length === 0 && (
              <div className="text-center py-12">
                <div className="text-neutral-400 text-lg">
                  Nenhum agendamento encontrado
                </div>
              </div>
            )}
          </div>
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
          <Route path="/servicos" element={<Services />} />
          <Route path="/agendamento" element={<Booking />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}