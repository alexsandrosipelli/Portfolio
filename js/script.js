// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    }, 800);
});

// Mobile Menu - VERSÃO CORRIGIDA
const mobileToggle = document.querySelector('.mobile-toggle');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const overlay = document.querySelector('.mobile-menu-overlay');

// Abrir/fechar menu
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navList.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navList.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');

        // Atualiza link ativo
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Fechar menu ao clicar no overlay
overlay.addEventListener('click', () => {
    mobileToggle.classList.remove('active');
    navList.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
});

// Typewriter Effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

const subtitle = document.querySelector('.hero-subtitle');
const texts = [
    'Full Stack Developer',
    'Java | Spring Boot',
    'JavaScript | Node.js',
    'HTML | CSS',
    'PostgreSQL | MySQL',
];
let currentIndex = 0;

function changeText() {
    typeWriter(subtitle, texts[currentIndex]);
    currentIndex = (currentIndex + 1) % texts.length;
    setTimeout(changeText, 3000);
}

// Inicia após 1s
setTimeout(() => {
    changeText();
}, 1000);

// Particles Background
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = window.innerWidth < 768 ? 30 : 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Posição aleatória
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Tamanho aleatório
        const size = Math.random() * 3 + 1;

        // Duração da animação
        const duration = Math.random() * 20 + 10;

        particle.style.cssText = `
            position: absolute;
            top: ${y}%;
            left: ${x}%;
            width: ${size}px;
            height: ${size}px;
            background: rgba(0, 255, 157, 0.3);
            border-radius: 50%;
            animation: float ${duration}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;

        container.appendChild(particle);
    }

    // Adiciona animação CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
    `;
    document.head.appendChild(style);
}

// Contador animado
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 20);
}

// Observador para animar elementos quando visíveis
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;

            // Anima contadores
            if (element.classList.contains('stat-number')) {
                animateCounter(element);
            }

            // Anima barras de skill
            if (element.classList.contains('skill-progress')) {
                const parent = element.closest('.skill-item');
                const width = parent.getAttribute('data-level') + '%';
                setTimeout(() => {
                    element.style.width = width;
                }, 300);
            }

            // Anima cards de projeto
            if (element.classList.contains('project-card')) {
                element.style.animationDelay = Math.random() * 0.5 + 's';
            }
        }
    });
}, { threshold: 0.2 });

// Observa elementos
document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));
document.querySelectorAll('.skill-progress').forEach(el => observer.observe(el));
document.querySelectorAll('.project-card').forEach(el => observer.observe(el));

// Filtro de projetos
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active de todos
        filterBtns.forEach(b => b.classList.remove('active'));
        // Adiciona active ao clicado
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filter === 'all' || category.includes(filter)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Modal de projetos
const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const projectDetailsBtns = document.querySelectorAll('.project-details');

const projectData = {
    acaoRapida: {
    title: 'Ação Rápida – Gerenciador de Tarefas',
    description: 'Aplicação web focada em produtividade e organização pessoal. Permite criar, concluir, filtrar e remover tarefas de forma rápida e intuitiva, com persistência local e foco total em UX.',
    tech: ['HTML', 'CSS', 'JavaScript', 'LocalStorage', 'UX'],
    features: [
        'Criação rápida de tarefas',
        'Marcação de tarefas como concluídas',
        'Filtro por tarefas: Todas, Pendentes e Concluídas',
        'Persistência de dados com LocalStorage',
        'Interface limpa e intuitiva',
        'Experiência otimizada para produtividade'
    ],
    links: {
        demo: 'https://alexsandrosipelli.github.io/acao-rapida/',
        github: 'https://github.com/alexsandrosipelli/acao-rapida'
    }
},


    erp: {
        title: 'ERP Light – Gestão Comercial',
        description: 'Sistema ERP corporativo completo com dashboard analítico, gestão de clientes, produtos, vendedores, pedidos, relatórios inteligentes e simulação de banco de dados via LocalStorage. Foco em UX, responsividade, acessibilidade e lógica de negócios real.',
        tech: ['HTML', 'CSS', 'JavaScript', 'LocalStorage', 'UX', 'Acessibilidade'],
        features: [
            'Dashboard com gráficos interativos e KPIs',
            'CRUD completo para clientes, produtos e vendedores',
            'Sistema de pedidos e vendas integrado',
            'Relatórios inteligentes em tempo real',
            'Simulação de banco de dados com LocalStorage',
            'Interface responsiva e acessível (WCAG)'
        ],
        links: {
            demo: 'https://alexsandrosipelli.github.io/-ERP-Corporativo/',
            github: 'https://github.com/alexsandrosipelli/-ERP-Corporativo'
        }
    },
    landing: {
        title: 'Smart Landing Creator',
        description: 'Ferramenta online para criar landing pages personalizadas de forma simples e intuitiva, com preview em tempo real, personalização de cores, imagens e exportação de página em PNG.',
        tech: ['HTML', 'CSS', 'JavaScript', 'UX'],
        features: [
            'Editor visual em tempo real',
            'Preview responsivo para diferentes dispositivos',
            'Paleta de cores personalizável',
            'Upload e ajuste de imagens',
            'Exportação de página como PNG',
            'Templates pré-prontos para diferentes nichos'
        ],
        links: {
            demo: 'https://alexsandrosipelli.github.io/Smart-Landing-Creator/',
            github: 'https://github.com/alexsandrosipelli/Smart-Landing-Creator'
        }
    },
    rotina: {
        title: 'Minha Rotina Fácil',
        description: 'Aplicação voltada para organização de rotina de idosos, com foco em acessibilidade, clareza visual, navegação simplificada e interface amigável.',
        tech: ['HTML', 'CSS', 'JavaScript', 'UX'],
        features: [
            'Interface otimizada para usuários idosos',
            'Contraste alto e fontes ampliadas',
            'Navegação simplificada por voz',
            'Lembretes de medicamentos e consultas',
            'Agenda visual com ícones intuitivos',
            'Modo noturno para conforto visual'
        ],
        links: {
            demo: 'https://alexsandrosipelli.github.io/-Minha-Rotina-Facil/',
            github: 'https://github.com/alexsandrosipelli/-Minha-Rotina-Facil'
        }
    },
    monitoramento: {
        title: 'Monitoramento de Parque de Impressoras',
        description: 'Painel interativo para visualização de status, consumo e alertas operacionais de impressoras em tempo real, com dashboard analítico e relatórios.',
        tech: ['JavaScript', 'Dashboards', 'UX'],
        features: [
            'Monitoramento em tempo real do status das impressoras',
            'Gráficos de consumo de toner e papel',
            'Sistema de alertas para manutenção preventiva',
            'Relatórios de uso por departamento',
            'Histórico de incidentes e resoluções',
            'Interface responsiva para diferentes dispositivos'
        ],
        links: {
            demo: 'https://alexsandrosipelli.github.io/Monitoramento-Parque-Impressoras/',
            github: 'https://github.com/alexsandrosipelli/Monitoramento-Parque-Impressoras'
        }
    },
    imagemPdf: {
        title: 'Imagem para PDF – Client Side',
        description: 'Conversão de imagens em PDF diretamente no navegador, sem back-end, com foco em rapidez, usabilidade e processamento local para maior segurança.',
        tech: ['JavaScript', 'UI', 'Performance'],
        features: [
            'Conversão totalmente no cliente (sem servidor)',
            'Suporte a múltiplos formatos de imagem',
            'Compressão inteligente para otimização',
            'Pré-visualização antes da conversão',
            'Download automático do PDF gerado',
            'Interface minimalista e intuitiva'
        ],
        links: {
            demo: 'https://alexsandrosipelli.github.io/Imagem-PDF-Client-Side-/',
            github: 'https://github.com/alexsandrosipelli/Imagem-PDF-Client-Side-'
        }
    },
    textoPdf: {
        title: 'Texto para PDF',
        description: 'Ferramenta online para gerar PDFs a partir de texto com fluxo simples, foco em produtividade e personalização básica do documento.',
        tech: ['JavaScript', 'Web Tool'],
        features: [
            'Editor de texto integrado',
            'Personalização de fonte e tamanho',
            'Inserção de cabeçalho e rodapé',
            'Margens personalizáveis',
            'Pré-visualização em tempo real',
            'Exportação rápida em alta qualidade'
        ],
        links: {
            demo: 'https://alexsandrosipelli.github.io/PDF-Texto-Conversor-Online/',
            github: 'https://github.com/alexsandrosipelli/PDF-Texto-Conversor-Online'
        }
    },
    jogosJava: {
        title: 'Jogos Clássicos em Java',
        description: 'Implementação de jogos clássicos utilizando orientação a objetos, princípios SOLID e regras de negócio bem definidas.',
        tech: ['Java', 'POO', 'Lógica'],
        features: [
            'Jogo da Velha com IA básica',
            'Batalha Naval com tabuleiro dinâmico',
            'Forca com sistema de dicas',
            'Arquitetura baseada em MVC',
            'Tratamento de exceções personalizado',
            'Interface console otimizada'
        ],
        links: {
            github: 'https://github.com/alexsandrosipelli/Projetos-2022'
        }
    },
    suprimentos: {
        title: 'Análise de Suprimentos',
        description: 'Automação de análise de consumo com geração de indicadores, visualização gráfica e comparação de dados de diferentes períodos.',
        tech: ['JavaScript', 'CSV', 'Dashboards'],
        features: [
            'Upload de arquivos CSV com dados de consumo',
            'Geração automática de indicadores (KPI)',
            'Gráficos comparativos entre períodos',
            'Identificação de outliers e anomalias',
            'Exportação de relatórios em PDF',
            'Dashboard interativo com filtros'
        ],
        links: {
            demo: 'https://alexsandrosipelli.github.io/CSV-COMPARE-ARKLOK/',
            github: 'https://github.com/alexsandrosipelli/CSV-COMPARE-ARKLOK'
        }
    },
    tarefas: {
        title: 'Sistema de Gerenciamento de Tarefas',
        description: 'Aplicação back-end com CRUD completo, regras de negócio, arquitetura em camadas e API REST documentada.',
        tech: ['Java', 'Spring Boot', 'API REST'],
        features: [
            'API REST com endpoints documentados',
            'CRUD completo de tarefas e usuários',
            'Sistema de prioridades e prazos',
            'Autenticação JWT',
            'Testes unitários com JUnit',
            'Documentação Swagger UI'
        ],
        links: {
            github: 'https://github.com/alexsandrosipelli/Gerenciamento-de-Tarefas'
        }
    },
    ecommerce: {
        title: 'E-commerce Tocada Quente',
        description: 'Sistema de e-commerce com back-end estruturado, persistência em banco de dados, regras de negócio complexas e fluxo completo de compra.',
        tech: ['Java', 'Spring Boot', 'MySQL'],
        features: [
            'Catálogo de produtos com categorias',
            'Carrinho de compras persistente',
            'Sistema de pedidos com rastreamento',
            'Painel administrativo completo',
            'Relatórios de vendas e estoque',
            'Integração com gateways de pagamento (simulado)'
        ],
        links: {
            github: 'https://github.com/alexsandrosipelli/e-commerce--Tocada-Quente'
        }
    },
    marmitando: {
        title: 'Aplicativo Delivery – Marmitando',
        description: 'Aplicativo mobile para delivery com foco em usabilidade, fluxo de compra intuitivo e experiência do usuário otimizada.',
        tech: ['React Native', 'JavaScript'],
        features: [
            'Catálogo de restaurantes com avaliações',
            'Carrinho de compras offline/online',
            'Rastreamento de entregas em tempo real',
            'Sistema de favoritos e histórico',
            'Pagamento integrado (simulado)',
            'Push notifications para promoções'
        ],
        links: {
            github: 'https://github.com/alexsandrosipelli/Marmitando'
        }
    },
    logs: {
        title: 'Analisador de Logs de Impressoras',
        description: 'Leitura e interpretação automatizada de logs técnicos com visualização gráfica, filtros avançados e dashboard de insights.',
        tech: ['JavaScript', 'Logs', 'Dashboards'],
        features: [
            'Upload e parsing automático de logs',
            'Identificação de padrões e anomalias',
            'Gráficos de frequência de erros',
            'Filtros por tipo de erro e período',
            'Relatórios de performance por impressora',
            'Exportação de análises em múltiplos formatos'
        ],
        links: {
            demo: 'https://alexsandrosipelli.github.io/ANALISAR-LOG-IMPRESSORAS/',
            github: 'https://github.com/alexsandrosipelli/ANALISAR-LOG-IMPRESSORAS'
        }
    }
};

projectDetailsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const projectId = btn.getAttribute('data-project');
        const data = projectData[projectId];

        if (data) {
            const modalBody = document.querySelector('.modal-body');

            let linksHTML = '';
            if (data.links.demo) {
                linksHTML += `<a href="${data.links.demo}" target="_blank" class="btn btn-primary" style="color: var(--text-primary);"><i class="fas fa-external-link-alt"></i> Ver Demo</a>`;
            }
            if (data.links.github) {
                linksHTML += `<a href="${data.links.github}" target="_blank" class="btn btn-outline" style="color: var(--primary);"><i class="fab fa-github"></i> Código Fonte</a>`;
            }

            modalBody.innerHTML = `
                <div class="modal-header">
                    <h2>${data.title}</h2>
                    <p class="modal-subtitle" style="color: var(--text-secondary);">${data.description}</p>
                </div>
                
                <div class="modal-tech">
                    <h3 style="color: var(--primary);"><i class="fas fa-code"></i> Tecnologias</h3>
                    <div class="tech-tags">
                        ${data.tech.map(tech => `<span style="background: rgba(0, 255, 157, 0.15); color: var(--primary); border: 1px solid rgba(0, 255, 157, 0.3);">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="modal-features">
                    <h3 style="color: var(--primary);"><i class="fas fa-list-check"></i> Funcionalidades</h3>
                    <ul>
                        ${data.features.map(feature => `<li style="color: var(--text-secondary);"><span style="color: var(--primary);">▸</span> ${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-links">
                    <h3 style="color: var(--primary);"><i class="fas fa-link"></i> Links</h3>
                    <div class="links-buttons" style="display: flex; gap: 1rem; margin-top: 1rem;">
                        ${linksHTML}
                    </div>
                </div>
            `;

            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Fecha modal
modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Função de notificação
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-card);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Formulário de contato
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Simula envio
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        // Redireciona para WhatsApp após 1.5s
        setTimeout(() => {
            const whatsappMessage = `Olá, Alexsandro!

Nome: ${name}
Email: ${email}
Assunto: ${subject}

Mensagem:
${message}`.trim();

            const phone = "5511948914961";
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;

            // Abre WhatsApp em nova aba
            window.open(whatsappURL, "_blank");

            // Reseta o formulário
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Mostra notificação
            showNotification('Redirecionando para WhatsApp...', 'success');
        }, 1500);
    });
}

// Back to top
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Atualiza link ativo na navegação
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
});

// Efeito parallax
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');

    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Inicializa tudo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    createParticles();

    // Adiciona classe de animação aos cards de projeto
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Adiciona tooltips simples
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = el.getAttribute('data-tooltip');

            const rect = el.getBoundingClientRect();
            tooltip.style.cssText = `
                position: fixed;
                top: ${rect.top - 40}px;
                left: ${rect.left + rect.width / 2}px;
                transform: translateX(-50%);
                background: var(--bg-card);
                color: var(--text-primary);
                padding: 0.5rem 1rem;
                border-radius: var(--radius);
                font-size: 0.9rem;
                z-index: 10000;
                border: 1px solid var(--border-color);
                box-shadow: var(--shadow);
                font-weight: 600;
            `;

            document.body.appendChild(tooltip);
        });

        el.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) tooltip.remove();
        });
    });
});

// Atualiza ano do copyright
document.querySelector('.footer-copyright').textContent =
    `© ${new Date().getFullYear()} Todos os direitos reservados`;

// Detecta tema do sistema
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
}

// Adiciona listener para mudança de tema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
});