// main.js - Shared Script for UNIPREPARA HTML Files

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Set Current Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Header is fixed with consistent styling across all pages (no scroll toggle)

  // Mark active page nav link (excludes logo wrapper and CTA buttons)
  document.querySelectorAll('nav a').forEach(a => {
    const el = a;
    const isLogoLink = el.closest('.shrink-0') !== null || el.classList.contains('shrink-0');
    const isButton = el.classList.contains('btn-primary') || el.classList.contains('btn-ghost');
    if (!isLogoLink && !isButton && el.href === window.location.href) {
      el.classList.add('text-primary', 'border-b-2', 'border-primary', 'pb-1');
      el.classList.remove('hover:text-primary');
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  let isMenuOpen = false;

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      isMenuOpen = !isMenuOpen;
      if (isMenuOpen) {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-7 h-7"></i>';
      } else {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-7 h-7"></i>';
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  }

  // ─── UNIGUIA Assistant Widget ─────────────────────────────────────────────
  const toggleAssistant = document.getElementById('toggle-assistant');
  const closeAssistant = document.getElementById('close-assistant');
  const bubble = document.getElementById('assistant-bubble');
  const assistantIcon = document.getElementById('assistant-icon');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');
  let isAssistantOpen = false;

  // Predefined responses for the bot
  const botResponses = [
    "Olá! Para saber os requisitos de uma universidade específica, visita a página de Universidades e filtra por tipo.",
    "Boa pergunta! Os documentos necessários para o exame de acesso variam por instituição. Podes consultar o catálogo completo.",
    "O módulo Preparatório tem guias para as disciplinas-chave como Matemática, Física e Língua Portuguesa. Visita a página Preparatório!",
    "Para se cadastrar e acompanhar as tuas universidades favoritas, clica em 'Criar Conta' no menu.",
    "Obrigado pela tua pergunta! Para mais detalhes, recomendo verificar diretamente no site da instituição que te interessa."
  ];
  let responseIndex = 0;

  function addMessage(text, isUser = false) {
    if (!chatMessages) return;
    const msg = document.createElement('div');
    msg.className = isUser
      ? 'flex justify-end'
      : 'flex justify-start';
    msg.innerHTML = isUser
      ? `<div class="bg-primary text-white text-sm font-medium px-4 py-2 max-w-[80%]">${text}</div>`
      : `<div class="bg-background border-2 border-border text-foreground text-sm font-medium px-4 py-2 max-w-[80%]">${text}</div>`;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function sendMessage() {
    if (!chatInput || chatInput.value.trim() === '') return;
    const userText = chatInput.value.trim();
    addMessage(userText, true);
    chatInput.value = '';

    setTimeout(() => {
      const reply = botResponses[responseIndex % botResponses.length];
      responseIndex++;
      addMessage(reply, false);
    }, 700);
  }

  function setAssistantState(state) {
    isAssistantOpen = state;
    if (isAssistantOpen) {
      bubble.classList.remove('scale-0', 'opacity-0', 'pointer-events-none');
      bubble.classList.add('scale-100', 'opacity-100');
      assistantIcon.setAttribute('data-lucide', 'x');
    } else {
      bubble.classList.add('scale-0', 'opacity-0', 'pointer-events-none');
      bubble.classList.remove('scale-100', 'opacity-100');
      assistantIcon.setAttribute('data-lucide', 'message-square');
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  if (toggleAssistant && bubble) {
    toggleAssistant.addEventListener('click', () => setAssistantState(!isAssistantOpen));
  }
  if (closeAssistant) {
    closeAssistant.addEventListener('click', () => setAssistantState(false));
  }
  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }
});
