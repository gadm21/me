import { ref, computed } from 'vue'

// Supported languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'zh', name: '中文', flag: '🇨🇳', dir: 'ltr' }
]

// Translation strings
const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      research: 'Research',
      publications: 'Publications',
      contact: 'Contact'
    },
    // Home page
    home: {
      aboutTitle: 'About Me',
      aboutP1: 'I am a Computer Science Ph.D. student at Western University. My work focuses on creating intelligent privacy-preserving sensing systems.',
      aboutP2: 'Initially I wanted to learn everything, but I realized I am not cool enough, so instead I am exploring these areas: Integrated Sensing and Communication (ISAC), AI, federated learning, differential privacy, and quantum networks.',
      myResume: 'My Resume',
      researchFocus: 'Research Focus',
      learnMore: 'Learn more about my research',
      isac: 'ISAC',
      isacDesc: 'Integrated Sensing and Communication for next-gen wireless systems',
      flDp: 'FL + DP',
      flDpDesc: 'Federated Learning with Differential Privacy guarantees',
      quantum: 'Quantum Networks',
      quantumDesc: 'Quantum Key Distribution (QKD) and Quantum Federated Learning (QFL)'
    },
    // Research page
    research: {
      title: 'Research',
      subtitle: 'Exploring the intersection of wireless sensing and privacy-preserving machine learning',
      keyContributions: 'Key Contributions',
      relatedPubs: 'Related Publications',
      visitThothcraft: 'Visit ThothCraft'
    },
    // Publications page
    publications: {
      title: 'Publications',
      subtitle: 'Academic contributions to the field',
      filterAll: 'All',
      filterJournal: 'Journal',
      filterConference: 'Conference',
      citations: 'citations',
      viewPaper: 'View Paper'
    },
    // Contact page
    contact: {
      title: 'Contact',
      subtitle: "Let's connect and explore the possibilities of collaboration",
      email: 'Email',
      location: 'Location',
      social: 'Social',
      sendMessage: 'Send a Message',
      name: 'Name',
      message: 'Message',
      github: 'GitHub',
      googleScholar: 'Google Scholar',
      viewProfile: 'View Profile',
      emailDesc: 'Research collaborations & academic inquiries',
      githubDesc: 'Open source projects & research code',
      scholarDesc: 'Publications & citations',
      subject: 'Subject',
      researchCollab: 'Research Collaboration',
      teachingInquiry: 'Teaching Inquiry',
      other: 'Other',
      sending: 'Sending...',
      successMsg: "Message sent successfully! I'll get back to you soon.",
      errorMsg: 'Something went wrong. Please try again or email me directly.',
      yourName: 'Your name',
      yourEmail: 'your@email.com',
      yourMessage: 'Your message...'
    },
    // Common
    common: {
      viewGithub: 'View GitHub Profile'
    },
    // Chatbot
    chat: {
      welcome: 'Welcome to Thoth',
      subtitle: "Gad's intelligent assistant",
      askAbout: 'Ask about Gad',
      saveMemory: 'Save to memory',
      sendSms: 'Send SMS to Gad',
      placeholder: 'Ask about Gad, save info, or send SMS...',
      publications: 'Publications',
      thothcraft: 'ThothCraft',
      contactBtn: 'Contact'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      research: 'Recherche',
      publications: 'Publications',
      contact: 'Contact'
    },
    home: {
      aboutTitle: 'À Propos',
      aboutP1: 'Je suis doctorant en informatique à l\'Université Western. Mon travail se concentre sur la création de systèmes de détection intelligents préservant la vie privée.',
      aboutP2: 'Au départ, je voulais tout apprendre, mais j\'ai réalisé que je n\'étais pas assez cool, alors j\'explore ces domaines : Communication et Détection Intégrées (ISAC), IA, apprentissage fédéré, confidentialité différentielle et réseaux quantiques.',
      myResume: 'Mon CV',
      researchFocus: 'Axes de Recherche',
      learnMore: 'En savoir plus sur ma recherche',
      isac: 'ISAC',
      isacDesc: 'Communication et Détection Intégrées pour les systèmes sans fil de nouvelle génération',
      flDp: 'FL + DP',
      flDpDesc: 'Apprentissage Fédéré avec garanties de Confidentialité Différentielle',
      quantum: 'Réseaux Quantiques',
      quantumDesc: 'Distribution de Clés Quantiques (QKD) et Apprentissage Fédéré Quantique (QFL)'
    },
    research: {
      title: 'Recherche',
      subtitle: 'Explorer l\'intersection de la détection sans fil et de l\'apprentissage automatique préservant la vie privée',
      keyContributions: 'Contributions Clés',
      relatedPubs: 'Publications Associées',
      visitThothcraft: 'Visiter ThothCraft'
    },
    publications: {
      title: 'Publications',
      subtitle: 'Contributions académiques au domaine',
      filterAll: 'Tout',
      filterJournal: 'Journal',
      filterConference: 'Conférence',
      citations: 'citations',
      viewPaper: 'Voir l\'article'
    },
    contact: {
      title: 'Contact',
      subtitle: 'Connectons-nous et explorons les possibilités de collaboration',
      email: 'Email',
      location: 'Localisation',
      social: 'Réseaux Sociaux',
      sendMessage: 'Envoyer un Message',
      name: 'Nom',
      message: 'Message',
      github: 'GitHub',
      googleScholar: 'Google Scholar',
      viewProfile: 'Voir le Profil',
      emailDesc: 'Collaborations de recherche et demandes académiques',
      githubDesc: 'Projets open source et code de recherche',
      scholarDesc: 'Publications et citations',
      subject: 'Sujet',
      researchCollab: 'Collaboration de Recherche',
      teachingInquiry: 'Demande d\'Enseignement',
      other: 'Autre',
      sending: 'Envoi en cours...',
      successMsg: 'Message envoyé avec succès ! Je vous répondrai bientôt.',
      errorMsg: 'Une erreur s\'est produite. Veuillez réessayer ou m\'envoyer un email directement.',
      yourName: 'Votre nom',
      yourEmail: 'votre@email.com',
      yourMessage: 'Votre message...'
    },
    common: {
      viewGithub: 'Voir le Profil GitHub'
    },
    chat: {
      welcome: 'Bienvenue sur Thoth',
      subtitle: 'L\'assistant intelligent de Gad',
      askAbout: 'Poser une question sur Gad',
      saveMemory: 'Sauvegarder en mémoire',
      sendSms: 'Envoyer un SMS à Gad',
      placeholder: 'Posez une question sur Gad, sauvegardez des infos, ou envoyez un SMS...',
      publications: 'Publications',
      thothcraft: 'ThothCraft',
      contactBtn: 'Contact'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      research: 'البحث',
      publications: 'المنشورات',
      contact: 'اتصل بنا'
    },
    home: {
      aboutTitle: 'نبذة عني',
      aboutP1: 'أنا طالب دكتوراه في علوم الحاسوب في جامعة ويسترن. يركز عملي على إنشاء أنظمة استشعار ذكية تحافظ على الخصوصية.',
      aboutP2: 'في البداية أردت تعلم كل شيء، لكنني أدركت أنني لست رائعاً بما يكفي، لذلك أستكشف هذه المجالات: الاستشعار والاتصالات المتكاملة (ISAC)، الذكاء الاصطناعي، التعلم الموحد، الخصوصية التفاضلية، والشبكات الكمية.',
      myResume: 'سيرتي الذاتية',
      researchFocus: 'محاور البحث',
      learnMore: 'اعرف المزيد عن بحثي',
      isac: 'ISAC',
      isacDesc: 'الاستشعار والاتصالات المتكاملة لأنظمة الاتصال اللاسلكي من الجيل التالي',
      flDp: 'FL + DP',
      flDpDesc: 'التعلم الموحد مع ضمانات الخصوصية التفاضلية',
      quantum: 'الشبكات الكمية',
      quantumDesc: 'توزيع المفاتيح الكمية (QKD) والتعلم الموحد الكمي (QFL)'
    },
    research: {
      title: 'البحث',
      subtitle: 'استكشاف تقاطع الاستشعار اللاسلكي والتعلم الآلي الذي يحافظ على الخصوصية',
      keyContributions: 'المساهمات الرئيسية',
      relatedPubs: 'المنشورات ذات الصلة',
      visitThothcraft: 'زيارة ThothCraft'
    },
    publications: {
      title: 'المنشورات',
      subtitle: 'المساهمات الأكاديمية في المجال',
      filterAll: 'الكل',
      filterJournal: 'مجلة',
      filterConference: 'مؤتمر',
      citations: 'اقتباسات',
      viewPaper: 'عرض الورقة'
    },
    contact: {
      title: 'اتصل بنا',
      subtitle: 'دعنا نتواصل ونستكشف إمكانيات التعاون',
      email: 'البريد الإلكتروني',
      location: 'الموقع',
      social: 'التواصل الاجتماعي',
      sendMessage: 'إرسال رسالة',
      name: 'الاسم',
      message: 'الرسالة',
      github: 'GitHub',
      googleScholar: 'Google Scholar',
      viewProfile: 'عرض الملف الشخصي',
      emailDesc: 'التعاون البحثي والاستفسارات الأكاديمية',
      githubDesc: 'مشاريع مفتوحة المصدر وكود البحث',
      scholarDesc: 'المنشورات والاقتباسات',
      subject: 'الموضوع',
      researchCollab: 'تعاون بحثي',
      teachingInquiry: 'استفسار تعليمي',
      other: 'أخرى',
      sending: 'جاري الإرسال...',
      successMsg: 'تم إرسال الرسالة بنجاح! سأرد عليك قريباً.',
      errorMsg: 'حدث خطأ ما. يرجى المحاولة مرة أخرى أو مراسلتي مباشرة.',
      yourName: 'اسمك',
      yourEmail: 'بريدك@email.com',
      yourMessage: 'رسالتك...'
    },
    common: {
      viewGithub: 'عرض ملف GitHub'
    },
    chat: {
      welcome: 'مرحباً بك في تحوت',
      subtitle: 'المساعد الذكي لجاد',
      askAbout: 'اسأل عن جاد',
      saveMemory: 'حفظ في الذاكرة',
      sendSms: 'إرسال رسالة نصية لجاد',
      placeholder: 'اسأل عن جاد، احفظ معلومات، أو أرسل رسالة نصية...',
      publications: 'المنشورات',
      thothcraft: 'ThothCraft',
      contactBtn: 'اتصل'
    }
  },
  zh: {
    nav: {
      home: '首页',
      research: '研究',
      publications: '发表论文',
      contact: '联系方式'
    },
    home: {
      aboutTitle: '关于我',
      aboutP1: '我是西安大略大学计算机科学博士生。我的工作专注于创建智能隐私保护感知系统。',
      aboutP2: '起初我想学习一切，但我意识到我还不够酷，所以我正在探索这些领域：集成感知与通信（ISAC）、人工智能、联邦学习、差分隐私和量子网络。',
      myResume: '我的简历',
      researchFocus: '研究方向',
      learnMore: '了解更多关于我的研究',
      isac: 'ISAC',
      isacDesc: '面向下一代无线系统的集成感知与通信',
      flDp: 'FL + DP',
      flDpDesc: '具有差分隐私保证的联邦学习',
      quantum: '量子网络',
      quantumDesc: '量子密钥分发（QKD）和量子联邦学习（QFL）'
    },
    research: {
      title: '研究',
      subtitle: '探索无线感知与隐私保护机器学习的交叉领域',
      keyContributions: '主要贡献',
      relatedPubs: '相关发表',
      visitThothcraft: '访问 ThothCraft'
    },
    publications: {
      title: '发表论文',
      subtitle: '学术领域贡献',
      filterAll: '全部',
      filterJournal: '期刊',
      filterConference: '会议',
      citations: '引用',
      viewPaper: '查看论文'
    },
    contact: {
      title: '联系方式',
      subtitle: '让我们联系并探索合作的可能性',
      email: '邮箱',
      location: '位置',
      social: '社交媒体',
      sendMessage: '发送消息',
      name: '姓名',
      message: '消息',
      github: 'GitHub',
      googleScholar: 'Google Scholar',
      viewProfile: '查看资料',
      emailDesc: '研究合作与学术咨询',
      githubDesc: '开源项目与研究代码',
      scholarDesc: '发表论文与引用',
      subject: '主题',
      researchCollab: '研究合作',
      teachingInquiry: '教学咨询',
      other: '其他',
      sending: '发送中...',
      successMsg: '消息发送成功！我会尽快回复您。',
      errorMsg: '出现错误，请重试或直接发送邮件给我。',
      yourName: '您的姓名',
      yourEmail: 'your@email.com',
      yourMessage: '您的消息...'
    },
    common: {
      viewGithub: '查看GitHub资料'
    },
    chat: {
      welcome: '欢迎来到托特',
      subtitle: 'Gad的智能助手',
      askAbout: '询问关于Gad',
      saveMemory: '保存到记忆',
      sendSms: '发送短信给Gad',
      placeholder: '询问关于Gad、保存信息或发送短信...',
      publications: '论文',
      thothcraft: 'ThothCraft',
      contactBtn: '联系'
    }
  }
}

// Storage key
const LANGUAGE_STORAGE_KEY = 'website_language'

// Current language state (shared across components)
const currentLanguage = ref(
  typeof localStorage !== 'undefined' 
    ? localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en'
    : 'en'
)

// Get current language config
export const getCurrentLanguageConfig = () => {
  return SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage.value) || SUPPORTED_LANGUAGES[0]
}

// Set language
export const setLanguage = (langCode) => {
  currentLanguage.value = langCode
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, langCode)
  }
  
  // Update document direction for RTL languages
  const config = SUPPORTED_LANGUAGES.find(l => l.code === langCode)
  if (config) {
    document.documentElement.dir = config.dir
    document.documentElement.lang = langCode
  }
}

// Translation function
export const t = (key) => {
  const keys = key.split('.')
  let value = translations[currentLanguage.value]
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k]
    } else {
      // Fallback to English
      value = translations.en
      for (const k2 of keys) {
        if (value && typeof value === 'object') {
          value = value[k2]
        }
      }
      break
    }
  }
  
  return value || key
}

// Composable hook
export function useI18n() {
  const lang = computed(() => currentLanguage.value)
  const langConfig = computed(() => getCurrentLanguageConfig())
  const isRTL = computed(() => langConfig.value.dir === 'rtl')
  
  // Reactive translation function
  const translate = (key) => {
    // Access currentLanguage.value to make it reactive
    const _ = currentLanguage.value
    return t(key)
  }
  
  return {
    currentLanguage: lang,
    langConfig,
    isRTL,
    t: translate,
    setLanguage,
    SUPPORTED_LANGUAGES
  }
}

export default useI18n
