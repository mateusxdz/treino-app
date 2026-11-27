// ============================================================================
// PLANO DE HIPERTROFIA - DADOS PADRÃO EXTRAÍDOS DO PDF
// ============================================================================

const STORAGE_KEY = 'hipertrofia_app_state_v1';

const SUPABASE_URL = 'https://coerhvmmfifmecqlwros.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_t4sEVMZH9pQnsAC715-bmA_uWkarbxW';

let supabaseClient = null;
let currentUser = null;

const DEFAULT_PLAN = {
  segunda: {
    key: 'segunda',
    shortName: 'Seg',
    fullName: 'Segunda-feira',
    title: 'Superior A - Peito, costas, ombros e braços',
    objective: 'Desenvolver peitoral, dorsais, largura dos ombros e braços.',
    note: 'Priorize boa técnica e mantenha 2–3 repetições em reserva (RIR) nas primeiras semanas.',
    isRest: false,
    exercises: [
      {
        id: 'seg-1',
        name: 'Supino reto com barra',
        muscle: 'Peitoral',
        initialSets: '2',
        adaptedSets: '3',
        reps: '6–10',
        restSeconds: 150,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+supino+reto+com+barra+execucao+correta',
        notes: 'Mantenha escápulas retraídas e pés firmes no chão.'
      },
      {
        id: 'seg-2',
        name: 'Supino inclinado com halteres',
        muscle: 'Peitoral',
        initialSets: '1',
        adaptedSets: '2',
        reps: '8–12',
        restSeconds: 150,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+supino+inclinado+com+halteres+execucao',
        notes: 'Banco entre 30° e 45°; desça controlando o movimento.'
      },
      {
        id: 'seg-3',
        name: 'Puxada alta',
        muscle: 'Costas',
        initialSets: '2',
        adaptedSets: '3',
        reps: '8–12',
        restSeconds: 150,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+puxada+alta+frente+costas+execucao',
        notes: 'Inicie deprimindo as escápulas e puxando os cotovelos para baixo.'
      },
      {
        id: 'seg-4',
        name: 'Remada baixa',
        muscle: 'Costas',
        initialSets: '2',
        adaptedSets: '2',
        reps: '8–12',
        restSeconds: 150,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+remada+baixa+polia+triangulo+execucao',
        notes: 'Mantenha o tronco estável sem balanço excessivo da lombar.'
      },
      {
        id: 'seg-5',
        name: 'Elevação lateral',
        muscle: 'Deltoide lateral',
        initialSets: '2',
        adaptedSets: '3',
        reps: '12–20',
        restSeconds: 90,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+elevacao+lateral+com+halteres+execucao',
        notes: 'Eleve no plano da escápula até a linha dos ombros, sem impulso.'
      },
      {
        id: 'seg-6',
        name: 'Crucifixo inverso',
        muscle: 'Deltoide posterior',
        initialSets: '1',
        adaptedSets: '2',
        reps: '12–20',
        restSeconds: 90,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+crucifixo+inverso+maquina+ou+halteres',
        notes: 'Foco no deltoide posterior.'
      },
      {
        id: 'seg-7',
        name: 'Rosca direta',
        muscle: 'Bíceps',
        initialSets: '1–2',
        adaptedSets: '3',
        reps: '8–12',
        restSeconds: 90,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+rosca+direta+barra+ou+halteres+execucao',
        notes: 'Cotovelos fixos ao lado do tronco durante toda a execução.'
      },
      {
        id: 'seg-8',
        name: 'Tríceps na polia',
        muscle: 'Tríceps',
        initialSets: '1–2',
        adaptedSets: '3',
        reps: '10–15',
        restSeconds: 90,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+triceps+na+polia+barra+ou+corda+execucao',
        notes: 'Estenda completamente os cotovelos sem mover os ombros.'
      }
    ]
  },
  terca: {
    key: 'terca',
    shortName: 'Ter',
    fullName: 'Terça-feira',
    title: 'Inferior A - Quadríceps, posteriores e abdômen',
    objective: 'Desenvolver quadríceps, posteriores de coxa e panturrilhas, sem negligenciar a cadeia posterior.',
    note: 'TÉCNICA: No stiff, mantenha a coluna estável e utilize amplitude confortável.',
    isRest: false,
    exercises: [
      {
        id: 'ter-1',
        name: 'Hack squat',
        muscle: 'Quadríceps',
        initialSets: '2',
        adaptedSets: '3',
        reps: '8–12',
        restSeconds: 180,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+agachamento+hack+squat+execucao',
        notes: 'Lombar totalmente apoiada no encosto.'
      },
      {
        id: 'ter-2',
        name: 'Leg press',
        muscle: 'Quadríceps',
        initialSets: '1',
        adaptedSets: '2',
        reps: '10–15',
        restSeconds: 150,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+leg+press+45+execucao+correta',
        notes: 'Não retire o quadril do banco na parte inferior do movimento.'
      },
      {
        id: 'ter-3',
        name: 'Stiff com halteres ou barra',
        muscle: 'Posteriores',
        initialSets: '2',
        adaptedSets: '3',
        reps: '8–12',
        restSeconds: 150,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+stiff+com+barra+ou+halteres+execucao',
        notes: 'Empurre o quadril para trás mantendo a coluna neutra.'
      },
      {
        id: 'ter-4',
        name: 'Mesa flexora',
        muscle: 'Posteriores',
        initialSets: '2',
        adaptedSets: '2',
        reps: '10–15',
        restSeconds: 90,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+mesa+flexora+execucao+correta',
        notes: 'Mantenha o quadril pressionado contra o banco.'
      },
      {
        id: 'ter-5',
        name: 'Panturrilha em pé',
        muscle: 'Panturrilhas',
        initialSets: '2',
        adaptedSets: '3',
        reps: '10–15',
        restSeconds: 90,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+panturrilha+em+pe+maquina+execucao',
        notes: 'Pausa de 1 segundo no alongamento máximo e no topo.'
      },
      {
        id: 'ter-6',
        name: 'Abdominal na polia',
        muscle: 'Abdômen',
        initialSets: '2',
        adaptedSets: '2',
        reps: '10–15',
        restSeconds: 90,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+abdominal+na+polia+alta+ajoelhado',
        notes: 'Flexione a coluna aproximando as costelas da pelve.'
      }
    ]
  },
  quarta: {
    key: 'quarta',
    shortName: 'Qua',
    fullName: 'Quarta-feira',
    title: 'Descanso & Recuperação',
    objective: 'Permitir recuperação muscular e síntese proteica.',
    note: 'Aproveite para manter caminhada leve e boa noite de sono.',
    isRest: true,
    exercises: []
  },
  quinta: {
    key: 'quinta',
    shortName: 'Qui',
    fullName: 'Quinta-feira',
    title: 'Superior B - Peito, costas, ombros e braços',
    objective: 'Complementar o desenvolvimento do peitoral, costas, braços e deltoides.',
    note: 'Execute a puxada e a remada com controle, sem balanço do tronco.',
    isRest: false,
    exercises: [
      {
        id: 'qui-1',
        name: 'Supino inclinado na máquina',
        muscle: 'Peitoral',
        initialSets: '2',
        adaptedSets: '3',
        reps: '8–12',
        restSeconds: 150,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+supino+inclinado+na+maquina+articulado',
        notes: 'Pegada alinhada à porção superior do peito.'
      },
      {
        id: 'qui-2',
        name: 'Peck deck',
        muscle: 'Peitoral',
        initialSets: '1',
        adaptedSets: '2',
        reps: '10–15',
        restSeconds: 90,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+peck+deck+voador+peitoral+execucao',
        notes: 'Controle a abertura mantendo o peito alto.'
      },
      {
        id: 'qui-3',
        name: 'Remada com apoio no peito',
        muscle: 'Costas',
        initialSets: '2',
        adaptedSets: '3',
        reps: '8–12',
        restSeconds: 150,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+remada+maquina+com+apoio+no+peito',
        notes: 'Peito firme no apoio; esmague as escápulas no final.'
      },
      {
        id: 'qui-4',
        name: 'Puxada alta pegada neutra',
        muscle: 'Costas',
        initialSets: '2',
        adaptedSets: '2',
        reps: '8–12',
        restSeconds: 150,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+puxada+alta+pegada+neutra+triangulo',
        notes: 'Traga o puxador em direção à parte superior do peito.'
      },
      {
        id: 'qui-5',
        name: 'Elevação lateral',
        muscle: 'Deltoide lateral',
        initialSets: '2',
        adaptedSets: '3',
        reps: '12–20',
        restSeconds: 90,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+elevacao+lateral+halteres+ou+polia',
        notes: 'Movimento constante e controlado.'
      },
      {
        id: 'qui-6',
        name: 'Crucifixo inverso',
        muscle: 'Deltoide posterior',
        initialSets: '1',
        adaptedSets: '2',
        reps: '12–20',
        restSeconds: 90,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+crucifixo+inverso+maquina+posterior+ombro',
        notes: 'Cotovelos levemente semiflexionados.'
      },
      {
        id: 'qui-7',
        name: 'Rosca Scott',
        muscle: 'Bíceps',
        initialSets: '1–2',
        adaptedSets: '2',
        reps: '8–12',
        restSeconds: 90,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+rosca+scott+maquina+ou+barra+w',
        notes: 'Braços apoiados no banco Scott; desça com controle.'
      },
      {
        id: 'qui-8',
        name: 'Rosca martelo',
        muscle: 'Bíceps',
        initialSets: '1',
        adaptedSets: '2',
        reps: '10–15',
        restSeconds: 90,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+rosca+martelo+com+halteres+execucao',
        notes: 'Pegada neutra focando em braquial e antebraço.'
      },
      {
        id: 'qui-9',
        name: 'Tríceps francês na polia',
        muscle: 'Tríceps',
        initialSets: '1–2',
        adaptedSets: '3',
        reps: '10–15',
        restSeconds: 90,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+triceps+frances+na+polia+com+corda',
        notes: 'Ênfase na cabeça longa do tríceps.'
      }
    ]
  },
  sexta: {
    key: 'sexta',
    shortName: 'Sex',
    fullName: 'Sexta-feira',
    title: 'Descanso & Recuperação',
    objective: 'Recuperação para o treino Inferior B de sábado.',
    note: 'Mantenha boa hidratação e sono regular.',
    isRest: true,
    exercises: []
  },
  sabado: {
    key: 'sabado',
    shortName: 'Sáb',
    fullName: 'Sábado',
    title: 'Inferior B - Pernas e abdômen',
    objective: 'Complementar quadríceps e posteriores, com estímulo para glúteos, panturrilhas e abdômen.',
    note: 'Capriche na estabilidade no agachamento búlgaro e na contração no hip thrust.',
    isRest: false,
    exercises: [
      {
        id: 'sab-1',
        name: 'Agachamento búlgaro',
        muscle: 'Quadríceps / Glúteos',
        initialSets: '1–2',
        adaptedSets: '2',
        reps: '8–12',
        restSeconds: 150,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+agachamento+bulgaro+com+halteres+execucao',
        notes: 'Desça mantendo o joelho da frente alinhado com o pé.'
      },
      {
        id: 'sab-2',
        name: 'Cadeira extensora',
        muscle: 'Quadríceps',
        initialSets: '1',
        adaptedSets: '2',
        reps: '10–15',
        restSeconds: 90,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+cadeira+extensora+execucao+correta',
        notes: 'Segure 1 segundo no topo da extensão.'
      },
      {
        id: 'sab-3',
        name: 'Mesa flexora',
        muscle: 'Posteriores',
        initialSets: '2',
        adaptedSets: '3',
        reps: '10–15',
        restSeconds: 90,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+mesa+flexora+posterior+de+coxa',
        notes: 'Controle toda a fase excêntrica.'
      },
      {
        id: 'sab-4',
        name: 'Hip thrust',
        muscle: 'Glúteos',
        initialSets: '1–2',
        adaptedSets: '2',
        reps: '8–12',
        restSeconds: 150,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+hip+thrust+elevacao+pelvica+barra',
        notes: 'Estenda o quadril completamente contraindo glúteos.'
      },
      {
        id: 'sab-5',
        name: 'Panturrilha sentado',
        muscle: 'Panturrilhas',
        initialSets: '2',
        adaptedSets: '3',
        reps: '10–15',
        restSeconds: 90,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+panturrilha+sentado+maquina+gemeos',
        notes: 'Amplitude máxima no tornozelo.'
      },
      {
        id: 'sab-6',
        name: 'Elevação de pernas',
        muscle: 'Abdômen',
        initialSets: '2',
        adaptedSets: '2',
        reps: '10–15',
        restSeconds: 90,
        youtubeUrl: 'https://www.youtube.com/results?search_query=como+fazer+elevacao+de+pernas+abdominal+infra',
        notes: 'Enrole a pelve no final do movimento.'
      }
    ]
  },
  domingo: {
    key: 'domingo',
    shortName: 'Dom',
    fullName: 'Domingo',
    title: 'Descanso & Recuperação',
    objective: 'Fechamento da semana e recuperação para Segunda-feira.',
    note: '',
    isRest: true,
    exercises: []
  }
};

const DAY_ORDER = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
const RESTORE_MIGRATION_KEY = 'hipertrofia_restore_removed_v2';

let state = loadState();
let activeDayKey = getTodayDayKey();
let pendingDeleteExId = null;
let pendingDeleteTimer = null;

// Cronômetro com Timestamp real (não pausa quando a tela do iPhone desliga)
const TIMER_STORAGE_KEY = 'hipertrofia_active_timer_v1';
let timerTotalSeconds = 90;
let timerRemainingSeconds = 90;
let timerEndTimeMs = null;
let timerInterval = null;
let isTimerRunning = false;
let wakeLockSentinel = null;
let swRegistration = null;

function getTodayDateStr() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getTodayDayKey() {
  const dayIndex = new Date().getDay();
  const map = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
  return map[dayIndex] || 'segunda';
}

function restoreMissingDefaultExercises(plan) {
  let restoredNames = [];
  DAY_ORDER.forEach(dayKey => {
    const defaultExs = DEFAULT_PLAN[dayKey].exercises;
    const currentExs = plan[dayKey]?.exercises || [];
    defaultExs.forEach((defEx, defIdx) => {
      if (!currentExs.some(e => e.id === defEx.id)) {
        const insertAt = Math.min(defIdx, currentExs.length);
        currentExs.splice(insertAt, 0, JSON.parse(JSON.stringify(defEx)));
        restoredNames.push(defEx.name);
      }
    });
  });
  return restoredNames;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const loadedState = {
        plan: parsed.plan || JSON.parse(JSON.stringify(DEFAULT_PLAN)),
        dailyProgress: parsed.dailyProgress || {},
        exerciseLogs: parsed.exerciseLogs || {},
        weightHistory: parsed.weightHistory || []
      };

      if (!localStorage.getItem(RESTORE_MIGRATION_KEY)) {
        const restored = restoreMissingDefaultExercises(loadedState.plan);
        localStorage.setItem(RESTORE_MIGRATION_KEY, 'done');
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loadedState));
        if (restored.length > 0) {
          setTimeout(() => {
            showToast(`Exercício restaurado: ${restored.join(', ')}`);
          }, 400);
        }
      }

      return loadedState;
    }
  } catch (e) {
    console.error('Erro ao carregar estado:', e);
  }
  localStorage.setItem(RESTORE_MIGRATION_KEY, 'done');
  return {
    plan: JSON.parse(JSON.stringify(DEFAULT_PLAN)),
    dailyProgress: {},
    exerciseLogs: {},
    weightHistory: []
  };
}

function saveState(skipCloud = false) {
  state.updatedAt = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (!skipCloud) {
    scheduleCloudSync();
  }
}

// ============================================================================
// AUTENTICAÇÃO E SINCRONIZAÇÃO SEGURA (SUPABASE AUTH + RLS)
// ============================================================================

let cloudSyncTimeout = null;

function initSupabaseClient() {
  if (!supabaseClient && window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
  }
  return supabaseClient;
}

function setCloudStatusUI(status, label) {
  const dot = document.getElementById('cloudDot');
  const txt = document.getElementById('cloudStatusText');
  if (!dot || !txt) return;
  dot.className = `cloud-dot ${status}`;
  txt.textContent = label;
}

function setAppLockedState(isLocked, statusMessage = '') {
  const gate = document.getElementById('authGateScreen');
  const appWrap = document.getElementById('privateAppContent');
  const msg = document.getElementById('gateStatusMsg');

  if (msg) msg.textContent = statusMessage;

  if (isLocked) {
    if (gate) gate.style.display = 'flex';
    if (appWrap) appWrap.style.display = 'none';
  } else {
    if (gate) gate.style.display = 'none';
    if (appWrap) appWrap.style.display = 'block';
    restoreTimerFromStorage();
    renderWeekSelector();
    renderDayWorkout();
    updateTimerDisplay();
  }
}

async function handleGateAuthSubmit(event) {
  event.preventDefault();
  const sb = initSupabaseClient();
  if (!sb) {
    showToast('SDK do Supabase não carregado.');
    return;
  }

  const email = document.getElementById('gateEmailInput').value.trim();
  const password = document.getElementById('gatePasswordInput').value;
  if (!email || !password) return;

  const btn = document.getElementById('btnGateSignIn');
  btn.disabled = true;
  btn.textContent = 'Autenticando...';

  try {
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;

    currentUser = data.user;
    setAppLockedState(false);
    updateAuthModalViews();
    showToast('Bem-vindo! Sincronizando seus dados...');
    await syncWithAuthenticatedCloud(true);
  } catch (err) {
    showToast(err.message === 'Invalid login credentials'
      ? 'E-mail ou senha inválidos.'
      : `Erro: ${err.message}`);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Entrar na Minha Conta';
  }
}

function updateAuthModalViews() {
  const outView = document.getElementById('authLoggedOutView');
  const inView = document.getElementById('authLoggedInView');
  const emailDisplay = document.getElementById('authUserEmailDisplay');

  if (!outView || !inView) return;
  if (currentUser) {
    outView.style.display = 'none';
    inView.style.display = 'block';
    if (emailDisplay) emailDisplay.textContent = currentUser.email;
  } else {
    outView.style.display = 'block';
    inView.style.display = 'none';
  }
}

function openCloudModal() {
  updateAuthModalViews();
  document.getElementById('cloudModal').style.display = 'flex';
}

function closeCloudModal() {
  document.getElementById('cloudModal').style.display = 'none';
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  const sb = initSupabaseClient();
  if (!sb) {
    showToast('SDK do Supabase não carregado.');
    return;
  }

  const email = document.getElementById('authEmailInput').value.trim();
  const password = document.getElementById('authPasswordInput').value;
  if (!email || !password) return;

  const btn = document.getElementById('btnSignIn');
  btn.disabled = true;
  btn.textContent = 'Entrando...';

  try {
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;

    currentUser = data.user;
    updateAuthModalViews();
    closeCloudModal();
    showToast('Login realizado com sucesso!');
    await syncWithAuthenticatedCloud(true);
  } catch (err) {
    showToast(err.message === 'Invalid login credentials'
      ? 'E-mail ou senha incorretos (ou clique em Criar Conta se for seu 1º acesso).'
      : `Erro: ${err.message}`);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Entrar';
  }
}

async function handleSignUpClick() {
  const sb = initSupabaseClient();
  if (!sb) return;

  const email = document.getElementById('authEmailInput').value.trim();
  const password = document.getElementById('authPasswordInput').value;
  if (!email || !password || password.length < 6) {
    showToast('Preencha seu e-mail e uma senha de pelo menos 6 caracteres.');
    return;
  }

  const btn = document.getElementById('btnSignUp');
  btn.disabled = true;
  btn.textContent = 'Criando...';

  try {
    const { data, error } = await sb.auth.signUp({ email, password });
    if (error) throw error;

    if (data.session && data.user) {
      currentUser = data.user;
      updateAuthModalViews();
      closeCloudModal();
      showToast('Conta criada e conectada com sucesso!');
      await syncWithAuthenticatedCloud(true);
    } else {
      showToast('Conta criada! Verifique seu e-mail para confirmar (ou desative "Confirm email" no painel Auth do Supabase).');
    }
  } catch (err) {
    showToast(`Erro ao criar conta: ${err.message}`);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Criar Conta';
  }
}

async function handleSignOut() {
  const sb = initSupabaseClient();
  if (sb) {
    await sb.auth.signOut();
  }
  currentUser = null;
  // Limpa os dados locais do navegador ao sair para que ninguém veja nada sem login
  localStorage.removeItem(STORAGE_KEY);
  state = {
    plan: JSON.parse(JSON.stringify(DEFAULT_PLAN)),
    dailyProgress: {},
    exerciseLogs: {},
    weightHistory: []
  };
  setCloudStatusUI('', 'Entrar');
  updateAuthModalViews();
  closeCloudModal();
  setAppLockedState(true, 'Sessão encerrada. Faça login para acessar.');
  showToast('Você saiu da sua conta.');
}

function scheduleCloudSync() {
  if (!currentUser) return;
  setCloudStatusUI('syncing', 'Salvando...');
  clearTimeout(cloudSyncTimeout);
  cloudSyncTimeout = setTimeout(() => {
    pushStateToCloud();
  }, 600);
}

async function pushStateToCloud() {
  const sb = initSupabaseClient();
  if (!sb || !currentUser) return;

  try {
    setCloudStatusUI('syncing', 'Sincronizando...');
    const { error } = await sb
      .from('user_workout_state')
      .upsert({
        user_id: currentUser.id,
        data: state,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (error) throw error;
    setCloudStatusUI('synced', 'Salvo na Nuvem');
  } catch (err) {
    console.warn('Falha ao salvar no Supabase:', err);
    setCloudStatusUI('error', 'Erro Nuvem');
  }
}

async function initCloudSync() {
  const sb = initSupabaseClient();
  if (!sb) {
    setAppLockedState(true, 'Digite seu e-mail e senha para entrar.');
    return;
  }

  try {
    const { data: { session } } = await sb.auth.getSession();
    if (session && session.user) {
      currentUser = session.user;
      setAppLockedState(false);
      await syncWithAuthenticatedCloud(false);
    } else {
      currentUser = null;
      setAppLockedState(true, 'Acesso protegido por autenticação Supabase.');
    }
  } catch (e) {
    setAppLockedState(true, 'Digite seu e-mail e senha para entrar.');
  }
}

async function syncWithAuthenticatedCloud(showFeedback = false) {
  const sb = initSupabaseClient();
  if (!sb || !currentUser) return;

  try {
    setCloudStatusUI('syncing', 'Sincronizando...');
    const { data: rows, error } = await sb
      .from('user_workout_state')
      .select('data, updated_at')
      .eq('user_id', currentUser.id)
      .limit(1);

    if (error) throw error;

    if (rows && rows.length > 0 && rows[0].data) {
      const cloudData = rows[0].data;
      const cloudTime = cloudData.updatedAt || 0;
      const localTime = state.updatedAt || 0;
      const localHasLogs = Object.keys(state.exerciseLogs || {}).length > 0 || (state.weightHistory || []).length > 0;

      if (cloudTime >= localTime || !localHasLogs) {
        state = {
          plan: cloudData.plan || state.plan,
          dailyProgress: cloudData.dailyProgress || {},
          exerciseLogs: cloudData.exerciseLogs || {},
          weightHistory: cloudData.weightHistory || [],
          updatedAt: cloudTime
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        renderWeekSelector();
        renderDayWorkout();
        if (showFeedback) showToast('Seus dados foram sincronizados da nuvem!');
      } else {
        await pushStateToCloud();
      }
      setCloudStatusUI('synced', 'Salvo na Nuvem');
    } else {
      await pushStateToCloud();
      if (showFeedback) showToast('Dados iniciais salvos na sua conta!');
    }
  } catch (err) {
    console.warn('Erro ao sincronizar dados autenticados:', err);
    setCloudStatusUI('error', 'Erro Nuvem');
    if (showFeedback) showToast(`Erro de sincronização: ${err.message}`);
  }
}

async function forcePullFromCloud() {
  if (!currentUser) {
    showToast('Faça login primeiro.');
    return;
  }
  state.updatedAt = 0;
  await syncWithAuthenticatedCloud(true);
  closeCloudModal();
}

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initServiceWorkerAndNotifications();
  const dateInput = document.getElementById('weightDateInput');
  if (dateInput) {
    dateInput.value = getTodayDateStr();
  }
  initCloudSync();

  // Quando o usuário desbloqueia a tela do iPhone ou volta para o navegador,
  // ressincroniza imediatamente pelo relógio real
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      syncTimerWithWallClock();
      if (isTimerRunning) {
        requestScreenWakeLock();
      }
    }
  });
});

// ============================================================================
// NAVEGAÇÃO
// ============================================================================

function switchMainTab(tabName) {
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `tab-${tabName}`);
  });

  if (tabName === 'progressao') {
    populateProgressionSelect();
    renderProgressionTab();
  } else if (tabName === 'peso') {
    renderWeightTab();
  }
}

function selectDay(dayKey) {
  activeDayKey = dayKey;
  renderWeekSelector();
  renderDayWorkout();
}

// ============================================================================
// RENDERIZAÇÃO DO TREINO DO DIA (SIMPLIFICADO E MOBILE-FRIENDLY)
// ============================================================================

function getDaySessionProgress(dayKey) {
  const today = getTodayDateStr();
  const key = `${today}_${dayKey}`;
  if (!state.dailyProgress[key]) {
    state.dailyProgress[key] = { completedExercises: {} };
  }
  return state.dailyProgress[key];
}

function renderWeekSelector() {
  const container = document.getElementById('weekSelector');
  const todayKey = getTodayDayKey();

  container.innerHTML = DAY_ORDER.map(dayKey => {
    const day = state.plan[dayKey];
    const isActive = dayKey === activeDayKey;
    const isToday = dayKey === todayKey;
    const session = getDaySessionProgress(dayKey);

    const totalEx = day.exercises.length;
    const doneEx = day.exercises.filter(ex => session.completedExercises[ex.id]).length;
    const pct = totalEx > 0 ? Math.round((doneEx / totalEx) * 100) : (day.isRest ? 100 : 0);

    return `
      <button class="day-pill ${isActive ? 'active' : ''}" onclick="selectDay('${dayKey}')">
        <div class="day-pill-header">
          <span class="day-pill-name">${day.shortName}</span>
          ${isToday ? '<span class="day-today-tag">HOJE</span>' : ''}
        </div>
        <div class="day-pill-title">${escapeHtml(day.title)}</div>
        <div class="day-pill-progress">
          <div class="day-pill-progress-bar" style="width: ${pct}%"></div>
        </div>
      </button>
    `;
  }).join('');
}

function renderDayWorkout() {
  const day = state.plan[activeDayKey];
  const session = getDaySessionProgress(activeDayKey);

  const totalEx = day.exercises.length;
  const doneEx = day.exercises.filter(ex => session.completedExercises[ex.id]).length;
  const pill = document.getElementById('headerProgressPill');
  if (pill) {
    pill.textContent = day.isRest && totalEx === 0 ? 'Descanso' : `${doneEx}/${totalEx} concluídos`;
  }

  const headerCard = document.getElementById('dayHeaderCard');
  headerCard.innerHTML = `
    <div class="day-header-top">
      <div>
        <h2>${escapeHtml(day.fullName)} • ${escapeHtml(day.title)}</h2>
        ${day.objective ? `<p class="day-objective">${escapeHtml(day.objective)}</p>` : ''}
      </div>
      <div class="day-actions">
        ${doneEx > 0 ? `<button class="btn btn-outline btn-sm" onclick="resetDaySession('${day.key}')">Desmarcar Hoje</button>` : ''}
        <button class="btn btn-outline btn-sm" onclick="openDayInfoModal('${day.key}')">Editar Dia</button>
        <button class="btn btn-primary btn-sm" onclick="openExerciseModal('${day.key}')">+ Exercício</button>
      </div>
    </div>
    ${day.note ? `<div class="day-note-box">${escapeHtml(day.note)}</div>` : ''}
  `;

  const exContainer = document.getElementById('exercisesContainer');

  if (day.isRest && day.exercises.length === 0) {
    exContainer.innerHTML = `
      <div class="card" style="text-align:center; padding: 32px 16px;">
        <h3 style="margin-bottom: 6px; font-size: 16px;">Dia de Descanso</h3>
        <p class="text-muted text-sm" style="margin-bottom: 14px;">
          Aproveite para descansar e recuperar a musculatura.
        </p>
        <button class="btn btn-outline btn-sm" onclick="openExerciseModal('${day.key}')">+ Adicionar Exercício</button>
      </div>
    `;
  } else if (day.exercises.length === 0) {
    exContainer.innerHTML = `
      <div class="card" style="text-align:center; padding: 28px 16px;">
        <p class="text-muted text-sm" style="margin-bottom: 12px;">Nenhum exercício cadastrado neste dia.</p>
        <button class="btn btn-primary btn-sm" onclick="openExerciseModal('${day.key}')">+ Adicionar Exercício</button>
      </div>
    `;
  } else {
    exContainer.innerHTML = day.exercises.map((ex, idx) => renderExerciseCard(ex, idx, day.key, session)).join('');
  }
}

function renderExerciseCard(ex, idx, dayKey, session) {
  const isCompleted = !!session.completedExercises[ex.id];
  const entries = state.exerciseLogs[ex.id]?.entries || [];
  const currentLog = entries.length > 0 ? entries[entries.length - 1] : null;
  const prevLog = entries.length > 1 ? entries[entries.length - 2] : null;

  const currentWeightVal = currentLog ? currentLog.maxWeight : '';
  let historyText = '';
  if (prevLog) {
    historyText = `Anterior: ${prevLog.maxWeight}kg (${formatDateShort(prevLog.date)})`;
  } else if (currentLog) {
    historyText = `Salvo em ${formatDateShort(currentLog.date)}`;
  }

  return `
    <div class="exercise-card ${isCompleted ? 'completed' : ''}">
      <div class="exercise-top">
        <div class="exercise-check-wrap">
          <input
            type="checkbox"
            class="ex-checkbox"
            ${isCompleted ? 'checked' : ''}
            onchange="toggleExerciseCompleted('${dayKey}', '${ex.id}', this.checked)"
          />
          <div class="exercise-info">
            <h3>
              <span>${idx + 1}. ${escapeHtml(ex.name)}</span>
              <span class="muscle-badge">${escapeHtml(ex.muscle)}</span>
            </h3>
            <div class="exercise-meta">
              <span class="meta-item">Séries Inic/Adap: <strong>${escapeHtml(ex.initialSets)} → ${escapeHtml(ex.adaptedSets)}</strong></span>
              <span class="meta-item">Reps: <strong>${escapeHtml(ex.reps)}</strong></span>
              <span class="meta-item">Descanso: <strong>${ex.restSeconds}s</strong></span>
            </div>
            ${ex.notes ? `<p class="ex-note">${escapeHtml(ex.notes)}</p>` : ''}
          </div>
        </div>
      </div>

      <div class="exercise-bottom">
        <div class="load-quick-box">
          <div style="display:flex; align-items:center; gap:6px;">
            <span class="load-label">Carga atual:</span>
            <div class="load-input-wrap">
              <input
                type="number"
                step="0.5"
                min="0"
                inputmode="decimal"
                placeholder="--"
                id="load-input-${ex.id}"
                class="load-input"
                value="${currentWeightVal}"
                onchange="saveQuickLoad('${ex.id}', this.value)"
              />
              <span class="load-unit">kg</span>
            </div>
            <button class="btn btn-outline btn-sm" onclick="saveQuickLoad('${ex.id}', document.getElementById('load-input-${ex.id}').value, true)">Salvar</button>
          </div>
          ${historyText ? `<span class="prev-load-hint">${escapeHtml(historyText)}</span>` : ''}
        </div>

        <div class="exercise-actions">
          <a href="${escapeHtml(ex.youtubeUrl)}" target="_blank" rel="noopener noreferrer" class="yt-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6a3 3 0 0 0-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
            Vídeo
          </a>
          <button class="btn-icon" onclick="startQuickRest(${ex.restSeconds})" title="Iniciar descanso de ${ex.restSeconds}s">⏱</button>
          <button class="btn-icon" onclick="moveExercise('${dayKey}', '${ex.id}', -1)" title="Subir">↑</button>
          <button class="btn-icon" onclick="moveExercise('${dayKey}', '${ex.id}', 1)" title="Descer">↓</button>
          <button class="btn-icon" onclick="openExerciseModal('${dayKey}', '${ex.id}')" title="Editar">✎</button>
          <button
            class="btn-icon ${pendingDeleteExId === ex.id ? 'confirm-delete' : ''}"
            onclick="deleteExercise('${dayKey}', '${ex.id}')"
            title="${pendingDeleteExId === ex.id ? 'Toque novamente para confirmar exclusão' : 'Remover'}"
          >${pendingDeleteExId === ex.id ? 'Confirmar?' : '🗑'}</button>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// REGISTRO SIMPLIFICADO DE CARGA E CHECKLIST
// ============================================================================

function toggleExerciseCompleted(dayKey, exId, isChecked) {
  const session = getDaySessionProgress(dayKey);
  session.completedExercises[exId] = isChecked;
  saveState();
  renderWeekSelector();
  renderDayWorkout();
}

function saveQuickLoad(exId, rawVal, forceNewEntry = false) {
  const weight = parseFloat(rawVal);
  if (isNaN(weight) || weight <= 0) {
    if (forceNewEntry) showToast('Informe um valor em kg válido.');
    return;
  }

  const ex = findExerciseById(exId);
  if (!state.exerciseLogs[exId]) {
    state.exerciseLogs[exId] = {
      name: ex ? ex.name : exId,
      entries: []
    };
  } else if (ex) {
    state.exerciseLogs[exId].name = ex.name;
  }

  const entries = state.exerciseLogs[exId].entries;
  const lastEntry = entries.length > 0 ? entries[entries.length - 1] : null;
  const today = getTodayDateStr();

  // Se o valor não mudou em relação ao último registro, não duplica à toa
  if (lastEntry && lastEntry.maxWeight === weight && lastEntry.date === today) {
    if (forceNewEntry) showToast(`Carga de ${weight} kg já está salva.`);
    return;
  }

  const todayIdx = entries.findIndex(e => e.date === today);
  const newRecord = {
    date: today,
    maxWeight: weight
  };

  if (todayIdx >= 0) {
    entries[todayIdx] = newRecord;
  } else {
    entries.push(newRecord);
    entries.sort((a, b) => a.date.localeCompare(b.date));
  }

  saveState();
  renderDayWorkout();
  showToast(`Carga atualizada: ${weight} kg!`);
}

function startQuickRest(seconds) {
  setTimerPreset(seconds || 90);
  startTimer();
  showToast(`Cronômetro de ${seconds || 90}s iniciado!`);
}

function findExerciseById(exId) {
  for (const dayKey of DAY_ORDER) {
    const found = state.plan[dayKey].exercises.find(e => e.id === exId);
    if (found) return found;
  }
  return null;
}

function resetDaySession(dayKey) {
  const today = getTodayDateStr();
  const key = `${today}_${dayKey}`;
  delete state.dailyProgress[key];
  saveState();
  renderWeekSelector();
  renderDayWorkout();
  showToast('Exercícios de hoje desmarcados.');
}

// ============================================================================
// CRUD DE EXERCÍCIOS E DIA
// ============================================================================

function openExerciseModal(dayKey, exId = null) {
  document.getElementById('exModalDayKey').value = dayKey;
  const modalTitle = document.getElementById('exerciseModalTitle');

  if (exId) {
    const ex = state.plan[dayKey].exercises.find(e => e.id === exId);
    if (!ex) return;
    modalTitle.textContent = 'Editar Exercício';
    document.getElementById('exModalId').value = ex.id;
    document.getElementById('exNameInput').value = ex.name;
    document.getElementById('exMuscleInput').value = ex.muscle;
    document.getElementById('exRestInput').value = ex.restSeconds || 120;
    document.getElementById('exInitialSetsInput').value = ex.initialSets;
    document.getElementById('exAdaptedSetsInput').value = ex.adaptedSets;
    document.getElementById('exRepsInput').value = ex.reps;
    document.getElementById('exYoutubeInput').value = ex.youtubeUrl;
    document.getElementById('exNotesInput').value = ex.notes || '';
  } else {
    modalTitle.textContent = 'Adicionar Exercício';
    document.getElementById('exModalId').value = '';
    document.getElementById('exerciseForm').reset();
    document.getElementById('exRestInput').value = 120;
    document.getElementById('exInitialSetsInput').value = '2';
    document.getElementById('exAdaptedSetsInput').value = '3';
    document.getElementById('exRepsInput').value = '8–12';
  }

  document.getElementById('exerciseModal').style.display = 'flex';
}

function closeExerciseModal() {
  document.getElementById('exerciseModal').style.display = 'none';
}

function handleExerciseSave(event) {
  event.preventDefault();
  const dayKey = document.getElementById('exModalDayKey').value;
  const exId = document.getElementById('exModalId').value;

  const exData = {
    id: exId || `ex-${Date.now()}`,
    name: document.getElementById('exNameInput').value.trim(),
    muscle: document.getElementById('exMuscleInput').value.trim(),
    restSeconds: parseInt(document.getElementById('exRestInput').value, 10) || 120,
    initialSets: document.getElementById('exInitialSetsInput').value.trim(),
    adaptedSets: document.getElementById('exAdaptedSetsInput').value.trim(),
    reps: document.getElementById('exRepsInput').value.trim(),
    youtubeUrl: document.getElementById('exYoutubeInput').value.trim(),
    notes: document.getElementById('exNotesInput').value.trim()
  };

  const day = state.plan[dayKey];
  if (exId) {
    const idx = day.exercises.findIndex(e => e.id === exId);
    if (idx >= 0) day.exercises[idx] = exData;
    showToast('Exercício atualizado!');
  } else {
    day.exercises.push(exData);
    day.isRest = false;
    showToast('Exercício adicionado!');
  }

  saveState();
  closeExerciseModal();
  renderWeekSelector();
  renderDayWorkout();
}

function deleteExercise(dayKey, exId) {
  const day = state.plan[dayKey];
  const ex = day.exercises.find(e => e.id === exId);
  if (!ex) return;

  // Confirmação dupla no próprio botão: 1º clique pede confirmação, 2º clique remove
  if (pendingDeleteExId !== exId) {
    pendingDeleteExId = exId;
    clearTimeout(pendingDeleteTimer);
    pendingDeleteTimer = setTimeout(() => {
      pendingDeleteExId = null;
      renderDayWorkout();
    }, 3500);
    renderDayWorkout();
    showToast(`Toque em "Confirmar?" para remover "${ex.name}".`);
    return;
  }

  clearTimeout(pendingDeleteTimer);
  pendingDeleteExId = null;
  day.exercises = day.exercises.filter(e => e.id !== exId);
  saveState();
  renderWeekSelector();
  renderDayWorkout();
  showToast(`"${ex.name}" removido.`);
}

function moveExercise(dayKey, exId, direction) {
  const list = state.plan[dayKey].exercises;
  const idx = list.findIndex(e => e.id === exId);
  if (idx < 0) return;
  const targetIdx = idx + direction;
  if (targetIdx < 0 || targetIdx >= list.length) return;

  const temp = list[idx];
  list[idx] = list[targetIdx];
  list[targetIdx] = temp;

  saveState();
  renderDayWorkout();
}

function openDayInfoModal(dayKey) {
  const day = state.plan[dayKey];
  document.getElementById('dayModalKey').value = dayKey;
  document.getElementById('dayTitleInput').value = day.title;
  document.getElementById('dayObjectiveInput').value = day.objective || '';
  document.getElementById('dayIsRestInput').checked = !!day.isRest;
  document.getElementById('dayInfoModal').style.display = 'flex';
}

function closeDayInfoModal() {
  document.getElementById('dayInfoModal').style.display = 'none';
}

function handleDayInfoSave(event) {
  event.preventDefault();
  const dayKey = document.getElementById('dayModalKey').value;
  const day = state.plan[dayKey];
  day.title = document.getElementById('dayTitleInput').value.trim();
  day.objective = document.getElementById('dayObjectiveInput').value.trim();
  day.isRest = document.getElementById('dayIsRestInput').checked;

  saveState();
  closeDayInfoModal();
  renderWeekSelector();
  renderDayWorkout();
  showToast('Dia atualizado!');
}

// ============================================================================
// CRONÔMETRO DE DESCANSO (WALL-CLOCK + WAKE LOCK + NOTIFICAÇÃO iOS/PWA)
// ============================================================================

async function initServiceWorkerAndNotifications() {
  if ('serviceWorker' in navigator) {
    try {
      swRegistration = await navigator.serviceWorker.register('./sw.js');
    } catch (e) {
      // Ignorar caso aberto via file://
    }
  }
  updateNotificationButtonUI();
}

function updateNotificationButtonUI() {
  const btn = document.getElementById('btnNotifyToggle');
  if (!btn) return;

  if (!('Notification' in window)) {
    btn.textContent = '📱 No iPhone: Compartilhar → "Adicionar à Tela de Início" p/ notificações';
    return;
  }

  if (Notification.permission === 'granted') {
    btn.textContent = '🔔 Notificações Ativas';
    btn.classList.add('enabled');
  } else if (Notification.permission === 'denied') {
    btn.textContent = '🔕 Notificação bloqueada nos Ajustes do navegador';
  } else {
    btn.textContent = '🔔 Ativar Notificação de Fim de Descanso';
    btn.classList.remove('enabled');
  }
}

async function enableNotifications() {
  // Desbloqueia o canal de áudio do iOS no toque do usuário
  unlockiOSAudio();

  if (!('Notification' in window)) {
    showToast('No iPhone (iOS 16.4+), toque em Compartilhar no Safari e "Adicionar à Tela de Início" para liberar notificações nativas.');
    return;
  }

  try {
    const permission = await Notification.requestPermission();
    updateNotificationButtonUI();
    if (permission === 'granted') {
      showToast('Notificações ativadas! Você será avisado quando o descanso acabar.');
      sendRestFinishedNotification(true);
    } else {
      showToast('Permissão de notificação não concedida.');
    }
  } catch (e) {
    showToast('No iPhone, adicione o app à Tela de Início para receber notificações.');
  }
}

async function requestScreenWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      wakeLockSentinel = await navigator.wakeLock.request('screen');
      const badge = document.getElementById('wakeLockBadge');
      if (badge) badge.textContent = 'Tela mantida acesa durante o descanso';
      wakeLockSentinel.addEventListener('release', () => {
        const b = document.getElementById('wakeLockBadge');
        if (b) b.textContent = 'Contagem real ativa (mesmo com tela bloqueada)';
      });
    } catch (e) {
      // Fallback silencioso para wall-clock
    }
  }
}

async function releaseScreenWakeLock() {
  if (wakeLockSentinel) {
    try {
      await wakeLockSentinel.release();
      wakeLockSentinel = null;
    } catch (e) {}
  }
}

function saveTimerToStorage() {
  localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify({
    totalSeconds: timerTotalSeconds,
    remainingSeconds: timerRemainingSeconds,
    endTimeMs: timerEndTimeMs,
    isRunning: isTimerRunning
  }));
}

function restoreTimerFromStorage() {
  try {
    const raw = localStorage.getItem(TIMER_STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    timerTotalSeconds = saved.totalSeconds || 90;
    timerRemainingSeconds = saved.remainingSeconds ?? 90;
    timerEndTimeMs = saved.endTimeMs || null;
    isTimerRunning = !!saved.isRunning;

    if (isTimerRunning && timerEndTimeMs) {
      syncTimerWithWallClock();
      if (isTimerRunning) {
        runTimerLoop();
      }
    }
  } catch (e) {}
}

function setTimerPreset(seconds) {
  pauseTimer();
  timerTotalSeconds = seconds;
  timerRemainingSeconds = seconds;
  timerEndTimeMs = null;
  saveTimerToStorage();
  document.querySelectorAll('.preset-btn').forEach(btn => {
    const [m, s] = btn.textContent.split(':').map(Number);
    btn.classList.toggle('active', m * 60 + s === seconds);
  });
  updateTimerDisplay();
}

function adjustTimerSeconds(delta) {
  if (isTimerRunning && timerEndTimeMs) {
    timerEndTimeMs += delta * 1000;
    const diffSec = Math.ceil((timerEndTimeMs - Date.now()) / 1000);
    timerRemainingSeconds = Math.max(1, diffSec);
    if (diffSec < 1) {
      timerEndTimeMs = Date.now() + 1000;
    }
  } else {
    timerRemainingSeconds = Math.max(5, timerRemainingSeconds + delta);
  }
  timerTotalSeconds = Math.max(timerTotalSeconds, timerRemainingSeconds);
  saveTimerToStorage();
  updateTimerDisplay();
}

function toggleTimer() {
  if (isTimerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  unlockiOSAudio();
  if (timerRemainingSeconds <= 0) {
    timerRemainingSeconds = timerTotalSeconds;
  }
  isTimerRunning = true;
  timerEndTimeMs = Date.now() + timerRemainingSeconds * 1000;
  saveTimerToStorage();

  document.getElementById('timerStartPauseBtn').textContent = 'Pausar';
  const badge = document.getElementById('timerStatusBadge');
  badge.textContent = 'Ativo';
  badge.className = 'timer-status running';

  requestScreenWakeLock();
  runTimerLoop();
}

function runTimerLoop() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    syncTimerWithWallClock();
  }, 250);
}

function syncTimerWithWallClock() {
  if (!isTimerRunning || !timerEndTimeMs) return;

  const remainingMs = timerEndTimeMs - Date.now();
  if (remainingMs <= 0) {
    timerRemainingSeconds = 0;
    updateTimerDisplay();
    handleTimerCompleted();
  } else {
    timerRemainingSeconds = Math.ceil(remainingMs / 1000);
    updateTimerDisplay();
  }
}

function handleTimerCompleted() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  timerEndTimeMs = null;
  saveTimerToStorage();
  releaseScreenWakeLock();

  document.getElementById('timerStartPauseBtn').textContent = 'Iniciar';
  const badge = document.getElementById('timerStatusBadge');
  badge.textContent = 'Pronto!';
  badge.className = 'timer-status finished';

  playBeepSound();
  if (navigator.vibrate) {
    navigator.vibrate([250, 120, 250]);
  }
  sendRestFinishedNotification(false);
  showToast('Descanso finalizado! Hora da próxima série.');
}

function pauseTimer() {
  if (isTimerRunning && timerEndTimeMs) {
    timerRemainingSeconds = Math.max(0, Math.ceil((timerEndTimeMs - Date.now()) / 1000));
  }
  clearInterval(timerInterval);
  isTimerRunning = false;
  timerEndTimeMs = null;
  saveTimerToStorage();
  releaseScreenWakeLock();

  document.getElementById('timerStartPauseBtn').textContent = 'Iniciar';
  const badge = document.getElementById('timerStatusBadge');
  badge.textContent = 'Pausado';
  badge.className = 'timer-status';
  updateTimerDisplay();
}

function resetTimer() {
  pauseTimer();
  timerRemainingSeconds = timerTotalSeconds;
  saveTimerToStorage();
  const badge = document.getElementById('timerStatusBadge');
  badge.textContent = 'Pronto';
  badge.className = 'timer-status';
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const mins = Math.floor(timerRemainingSeconds / 60);
  const secs = timerRemainingSeconds % 60;
  const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  document.getElementById('timerDisplay').textContent = formatted;

  if (isTimerRunning) {
    document.title = `(${formatted}) Descanso • Treino`;
  } else {
    document.title = 'Plano de Hipertrofia • Gestão de Treino';
  }
}

let sharedAudioCtx = null;
function unlockiOSAudio() {
  try {
    if (!sharedAudioCtx) {
      sharedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume();
    }
  } catch (e) {}
}

function playBeepSound() {
  try {
    unlockiOSAudio();
    const ctx = sharedAudioCtx || new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.22, 0.44].forEach(delay => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime + delay);
      gain.gain.setValueAtTime(0.22, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.18);
    });
  } catch (e) {}
}

function sendRestFinishedNotification(isTest = false) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  const title = isTest ? 'Notificações Ativadas!' : '⏱ Descanso Finalizado!';
  const options = {
    body: isTest
      ? 'Você receberá um alerta assim quando o intervalo entre séries terminar.'
      : 'O tempo de descanso acabou. Prepare-se para a próxima série!',
    icon: './icon.svg',
    badge: './icon.svg',
    tag: 'rest-timer-notification',
    renotify: true
  };

  if (swRegistration && swRegistration.showNotification) {
    swRegistration.showNotification(title, options);
  } else {
    try {
      new Notification(title, options);
    } catch (e) {}
  }
}

// ============================================================================
// ABA 2: PROGRESSÃO DE CARGAS
// ============================================================================

function getAllExercisesMap() {
  const map = new Map();
  DAY_ORDER.forEach(dayKey => {
    const day = state.plan[dayKey];
    day.exercises.forEach(ex => {
      map.set(ex.id, { ...ex, dayName: day.shortName });
    });
  });
  Object.keys(state.exerciseLogs).forEach(exId => {
    if (!map.has(exId)) {
      map.set(exId, {
        id: exId,
        name: state.exerciseLogs[exId].name || exId,
        muscle: 'Histórico',
        dayName: 'Extra'
      });
    }
  });
  return map;
}

function populateProgressionSelect() {
  const select = document.getElementById('progressionExerciseSelect');
  const currentVal = select.value;
  const map = getAllExercisesMap();

  const options = [];
  map.forEach(ex => {
    const logCount = state.exerciseLogs[ex.id]?.entries?.length || 0;
    options.push(
      `<option value="${ex.id}">[${ex.dayName}] ${escapeHtml(ex.name)} ${logCount > 0 ? `(${logCount})` : ''}</option>`
    );
  });

  select.innerHTML = options.join('');
  if (currentVal && map.has(currentVal)) {
    select.value = currentVal;
  }
}

function renderProgressionTab() {
  const select = document.getElementById('progressionExerciseSelect');
  const exId = select.value;
  const chartContainer = document.getElementById('progressionChartContainer');
  const tableWrap = document.getElementById('progressionHistoryTableWrap');
  const statsRow = document.getElementById('progStatsRow');

  const log = state.exerciseLogs[exId];
  const entries = log && log.entries ? log.entries : [];

  if (entries.length === 0) {
    statsRow.innerHTML = '';
    chartContainer.innerHTML = `
      <div style="text-align:center; color: var(--text-muted); padding: 24px 12px;">
        <p class="text-sm">Nenhuma carga salva para este exercício ainda.</p>
        <p class="text-sm" style="margin-top:4px;">Basta preencher o campo <strong>Carga atual (kg)</strong> no card do exercício.</p>
      </div>
    `;
    tableWrap.innerHTML = `<p class="text-muted text-sm">Sem histórico.</p>`;
    return;
  }

  const first = entries[0].maxWeight;
  const latest = entries[entries.length - 1].maxWeight;
  const best = Math.max(...entries.map(e => e.maxWeight));
  const diff = (latest - first).toFixed(1);
  const diffSign = diff > 0 ? `+${diff}` : diff;

  statsRow.innerHTML = `
    <div style="display:flex; gap:10px; font-size:12.5px; flex-wrap:wrap;">
      <span>Atual: <strong>${latest} kg</strong></span>
      <span>Máx: <strong>${best} kg</strong></span>
      <span>Evolução: <strong style="color: var(--primary)">${diffSign} kg</strong></span>
    </div>
  `;

  chartContainer.innerHTML = buildSvgLineChart(
    entries.map(e => ({ label: formatDateShort(e.date), value: e.maxWeight })),
    'kg'
  );

  const reversed = [...entries].reverse();
  tableWrap.innerHTML = `
    <table class="clean-table">
      <thead>
        <tr>
          <th>Data</th>
          <th>Carga Registrada</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${reversed.map(entry => `
          <tr>
            <td><strong>${formatDateBR(entry.date)}</strong></td>
            <td><span class="badge-Rule">${entry.maxWeight} kg</span></td>
            <td style="text-align:right">
              <button class="btn-danger-ghost" onclick="deleteProgressionEntry('${exId}', '${entry.date}')">Excluir</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function deleteProgressionEntry(exId, dateStr) {
  if (!state.exerciseLogs[exId]) return;
  state.exerciseLogs[exId].entries = state.exerciseLogs[exId].entries.filter(e => e.date !== dateStr);
  saveState();
  renderProgressionTab();
  renderDayWorkout();
  showToast('Registro removido.');
}

// ============================================================================
// ABA 3: PESO CORPORAL DIÁRIO
// ============================================================================

function handleWeightSubmit(event) {
  event.preventDefault();
  const date = document.getElementById('weightDateInput').value;
  const weight = parseFloat(document.getElementById('weightValueInput').value);

  if (!date || isNaN(weight)) return;

  const existingIdx = state.weightHistory.findIndex(w => w.date === date);
  if (existingIdx >= 0) {
    state.weightHistory[existingIdx] = { date, weight };
  } else {
    state.weightHistory.push({ date, weight });
    state.weightHistory.sort((a, b) => a.date.localeCompare(b.date));
  }

  saveState();
  document.getElementById('weightValueInput').value = '';
  renderWeightTab();
  showToast(`Peso de ${weight} kg salvo!`);
}

function calculateMovingAverages(history) {
  return history.map((item, idx) => {
    const start = Math.max(0, idx - 6);
    const slice = history.slice(start, idx + 1);
    const avg = slice.reduce((acc, cur) => acc + cur.weight, 0) / slice.length;
    return {
      ...item,
      avg7d: Number(avg.toFixed(2))
    };
  });
}

function renderWeightTab() {
  const history = calculateMovingAverages(state.weightHistory);
  const kpiContainer = document.getElementById('weightKpis');
  const chartContainer = document.getElementById('weightChartContainer');
  const tableWrap = document.getElementById('weightHistoryTableWrap');

  if (history.length === 0) {
    kpiContainer.innerHTML = '';
    chartContainer.innerHTML = `
      <div style="text-align:center; color: var(--text-muted); padding: 24px 12px;">
        <p class="text-sm">Nenhuma pesagem registrada ainda.</p>
      </div>
    `;
    tableWrap.innerHTML = `<p class="text-muted text-sm">Sem pesagens registradas.</p>`;
    return;
  }

  const initial = history[0].weight;
  const current = history[history.length - 1].weight;
  const currentAvg = history[history.length - 1].avg7d;
  const totalGain = (current - initial).toFixed(2);
  const gainSign = totalGain > 0 ? `+${totalGain}` : totalGain;

  kpiContainer.innerHTML = `
    <div class="stat-box">
      <div class="stat-label">Inicial</div>
      <div class="stat-value">${initial} kg</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Atual</div>
      <div class="stat-value">${current} kg</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Média 7 Dias</div>
      <div class="stat-value" style="color: var(--primary)">${currentAvg} kg</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Variação</div>
      <div class="stat-value" style="color: ${totalGain >= 0 ? 'var(--success)' : 'var(--warning)'}">${gainSign} kg</div>
    </div>
  `;

  chartContainer.innerHTML = buildWeightSvgChart(history);

  const reversed = [...history].reverse();
  tableWrap.innerHTML = `
    <table class="clean-table">
      <thead>
        <tr>
          <th>Data</th>
          <th>Peso</th>
          <th>Média 7d</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${reversed.map(item => `
          <tr>
            <td><strong>${formatDateBR(item.date)}</strong></td>
            <td>${item.weight.toFixed(1)} kg</td>
            <td><span class="badge-Rule">${item.avg7d.toFixed(2)} kg</span></td>
            <td style="text-align:right">
              <button class="btn-danger-ghost" onclick="deleteWeightEntry('${item.date}')">Excluir</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function deleteWeightEntry(dateStr) {
  state.weightHistory = state.weightHistory.filter(w => w.date !== dateStr);
  saveState();
  renderWeightTab();
  showToast('Pesagem removida.');
}

// ============================================================================
// GRÁFICOS SVG
// ============================================================================

function buildSvgLineChart(points, unit = 'kg') {
  const width = 560;
  const height = 200;
  const padL = 42;
  const padR = 20;
  const padT = 24;
  const padB = 30;

  const vals = points.map(p => p.value);
  let minVal = Math.min(...vals);
  let maxVal = Math.max(...vals);
  if (minVal === maxVal) {
    minVal -= 2;
    maxVal += 2;
  } else {
    const margin = (maxVal - minVal) * 0.15;
    minVal = Math.max(0, minVal - margin);
    maxVal = maxVal + margin;
  }

  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const getX = idx => points.length === 1 ? padL + plotW / 2 : padL + (idx / (points.length - 1)) * plotW;
  const getY = val => padT + plotH - ((val - minVal) / (maxVal - minVal)) * plotH;

  const coords = points.map((p, i) => ({ x: getX(i), y: getY(p.value), ...p }));
  const polylinePoints = coords.map(c => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');

  const gridLines = [0, 0.5, 1].map(t => {
    const val = minVal + t * (maxVal - minVal);
    const y = getY(val);
    return `
      <line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" stroke="#e2e8f0" stroke-dasharray="3,3" />
      <text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="#64748b">${val.toFixed(1)}</text>
    `;
  }).join('');

  return `
    <svg viewBox="0 0 ${width} ${height}" width="100%" height="190">
      ${gridLines}
      <polyline fill="none" stroke="#0f766e" stroke-width="2.5" points="${polylinePoints}" />
      ${coords.map(c => `
        <circle cx="${c.x}" cy="${c.y}" r="4.5" fill="#ffffff" stroke="#0f766e" stroke-width="2.5" />
        <text x="${c.x}" y="${c.y - 9}" text-anchor="middle" font-size="11" font-weight="600" fill="#0f172a">${c.value}${unit}</text>
        <text x="${c.x}" y="${height - 8}" text-anchor="middle" font-size="10.5" fill="#64748b">${c.label}</text>
      `).join('')}
    </svg>
  `;
}

function buildWeightSvgChart(history) {
  const points = history.slice(-20);
  const width = 560;
  const height = 200;
  const padL = 44;
  const padR = 20;
  const padT = 24;
  const padB = 30;

  const allVals = points.flatMap(p => [p.weight, p.avg7d]);
  let minVal = Math.min(...allVals);
  let maxVal = Math.max(...allVals);
  if (minVal === maxVal) {
    minVal -= 1;
    maxVal += 1;
  } else {
    const margin = (maxVal - minVal) * 0.2;
    minVal -= margin;
    maxVal += margin;
  }

  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const getX = i => points.length === 1 ? padL + plotW / 2 : padL + (i / (points.length - 1)) * plotW;
  const getY = v => padT + plotH - ((v - minVal) / (maxVal - minVal)) * plotH;

  const dailyCoords = points.map((p, i) => ({ x: getX(i), y: getY(p.weight), label: formatDateShort(p.date), val: p.weight }));
  const avgCoords = points.map((p, i) => ({ x: getX(i), y: getY(p.avg7d), val: p.avg7d }));

  const dailyLine = dailyCoords.map(c => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
  const avgLine = avgCoords.map(c => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');

  const gridLines = [0, 0.5, 1].map(t => {
    const val = minVal + t * (maxVal - minVal);
    const y = getY(val);
    return `
      <line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" stroke="#e2e8f0" stroke-dasharray="3,3" />
      <text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="#64748b">${val.toFixed(1)}</text>
    `;
  }).join('');

  return `
    <svg viewBox="0 0 ${width} ${height}" width="100%" height="190">
      ${gridLines}
      <polyline fill="none" stroke="#94a3b8" stroke-width="1.8" points="${dailyLine}" />
      <polyline fill="none" stroke="#0f766e" stroke-width="2.5" stroke-dasharray="5,3" points="${avgLine}" />
      ${dailyCoords.map((c, idx) => `
        <circle cx="${c.x}" cy="${c.y}" r="3.5" fill="#ffffff" stroke="#64748b" stroke-width="2" />
        ${idx % Math.ceil(points.length / 7) === 0 || idx === points.length - 1 ? `
          <text x="${c.x}" y="${c.y - 8}" text-anchor="middle" font-size="10.5" font-weight="600" fill="#0f172a">${c.val.toFixed(1)}</text>
          <text x="${c.x}" y="${height - 8}" text-anchor="middle" font-size="10" fill="#64748b">${c.label}</text>
        ` : ''}
      `).join('')}
    </svg>
  `;
}

// ============================================================================
// UTILITÁRIOS
// ============================================================================

function formatDateBR(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

function formatDateShort(dateStr) {
  if (!dateStr) return '';
  const [, m, d] = dateStr.split('-');
  return `${d}/${m}`;
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2600);
}
