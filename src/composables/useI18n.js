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
      contact: 'Contact',
      cv: 'CV',
      teaching: 'Teaching',
      awards: 'Awards',
      projects: 'Projects',
      blog: 'Blog',
      books: 'Books'
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
      viewPaper: 'View Paper',
      allYears: 'All Years',
      allVenues: 'All Venues',
      allTopics: 'All Topics',
      hIndex: 'h-index',
      bibtex: 'BibTeX',
      bibtexCitation: 'BibTeX Citation',
      copyClipboard: 'Copy to Clipboard',
      downloadBib: 'Download .bib',
      viewPdf: 'View PDF',
      noResults: 'No publications found matching your filters.'
    },
    // CV page
    cv: {
      title: 'Curriculum Vitae',
      phdStudent: 'Ph.D. Student in Computer Science',
      yearsTeaching: 'Years Teaching',
      publications: 'Publications',
      venues: 'Venues',
      skillsExpertise: 'Skills & Expertise',
      experience: 'Experience',
      education: 'Education',
      recentPubs: 'Recent Publications',
      viewAllPubs: 'View all publications →',
      awardsGrants: 'Awards & Grants',
      teaching: 'Teaching',
      viewTeaching: 'View teaching portfolio →',
      downloadPdf: 'Download PDF',
      copyShortBio: 'Copy Short Bio',
      copyFullBio: 'Copy Full Bio',
      thesis: 'Thesis'
    },
    // Teaching page
    teaching: {
      title: 'Teaching',
      researchMentor: 'Research Mentor',
      volunteer: 'Volunteer',
      instructor: 'Instructor',
      teachingAssistant: 'Teaching Assistant',
      present: 'Present',
      studentFeedback: 'Student Feedback →',
      rating: 'Rating'
    },
    // Awards page
    awards: {
      title: 'Awards & Recognition',
      achievementTimeline: 'Achievement Timeline',
      all: 'All',
      academic: 'Academic',
      certifications: 'Certifications',
      grantsScholarships: 'Grants & Scholarships'
    },
    // Projects page
    projects: {
      title: 'Project Portfolio',
      subtitle: 'A collection of research projects, implementations, and experiments across various domains',
      viewDetails: 'View Details →',
      description: 'Description',
      technologies: 'Technologies',
      viewCode: 'View Code',
      liveDemo: 'Live Demo',
      readPaper: 'Read Paper',
      completed: 'completed',
      inProgress: 'in progress'
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
    // Blog page
    blog: {
      title: 'Thoughts',
      featured: 'Featured',
      continueReading: 'Continue reading →',
      readMore: 'Read more →',
      loadMore: 'Load More Posts',
      stayConnected: 'Stay Connected',
      subscribeText: 'Subscribe to receive updates on new research, publications, and insights',
      subscribe: 'Subscribe',
      minRead: 'min read'
    },
    // Books page
    books: {
      title: 'Literary Journey',
      subtitle: 'Books that have shaped my perspective and understanding',
      readingStats: 'Reading Statistics',
      booksRead: 'Books Read',
      favoriteAuthor: 'Favorite Author',
      categories: 'Categories',
      readingPhilosophy: 'Reading Philosophy',
      philosophyText: '"A reader lives a thousand lives before he dies. The man who never reads lives only one." These books have been companions in my intellectual journey, each offering unique perspectives on technology, philosophy, human nature, and the complexities of our world.'
    },
    // Common
    common: {
      viewGithub: 'View GitHub Profile',
      close: 'Close',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success'
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
      contact: 'Contact',
      cv: 'CV',
      teaching: 'Enseignement',
      awards: 'Prix',
      projects: 'Projets',
      blog: 'Blog',
      books: 'Livres'
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
      viewPaper: 'Voir l\'article',
      allYears: 'Toutes les années',
      allVenues: 'Tous les lieux',
      allTopics: 'Tous les sujets',
      hIndex: 'indice h',
      bibtex: 'BibTeX',
      bibtexCitation: 'Citation BibTeX',
      copyClipboard: 'Copier dans le presse-papiers',
      downloadBib: 'Télécharger .bib',
      viewPdf: 'Voir le PDF',
      noResults: 'Aucune publication trouvée correspondant à vos filtres.'
    },
    cv: {
      title: 'Curriculum Vitae',
      phdStudent: 'Doctorant en Informatique',
      yearsTeaching: 'Années d\'Enseignement',
      publications: 'Publications',
      venues: 'Lieux',
      skillsExpertise: 'Compétences et Expertise',
      experience: 'Expérience',
      education: 'Formation',
      recentPubs: 'Publications Récentes',
      viewAllPubs: 'Voir toutes les publications →',
      awardsGrants: 'Prix et Subventions',
      teaching: 'Enseignement',
      viewTeaching: 'Voir le portfolio d\'enseignement →',
      downloadPdf: 'Télécharger PDF',
      copyShortBio: 'Copier Bio Courte',
      copyFullBio: 'Copier Bio Complète',
      thesis: 'Thèse'
    },
    teaching: {
      title: 'Enseignement',
      researchMentor: 'Mentor de Recherche',
      volunteer: 'Bénévole',
      instructor: 'Instructeur',
      teachingAssistant: 'Assistant d\'Enseignement',
      present: 'Présent',
      studentFeedback: 'Retours des Étudiants →',
      rating: 'Note'
    },
    awards: {
      title: 'Prix et Reconnaissances',
      achievementTimeline: 'Chronologie des Réalisations',
      all: 'Tout',
      academic: 'Académique',
      certifications: 'Certifications',
      grantsScholarships: 'Subventions et Bourses'
    },
    projects: {
      title: 'Portfolio de Projets',
      subtitle: 'Une collection de projets de recherche, implémentations et expériences dans divers domaines',
      viewDetails: 'Voir les Détails →',
      description: 'Description',
      technologies: 'Technologies',
      viewCode: 'Voir le Code',
      liveDemo: 'Démo en Direct',
      readPaper: 'Lire l\'Article',
      completed: 'terminé',
      inProgress: 'en cours'
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
    blog: {
      title: 'Réflexions',
      featured: 'À la une',
      continueReading: 'Continuer la lecture →',
      readMore: 'Lire la suite →',
      loadMore: 'Charger plus d\'articles',
      stayConnected: 'Restez Connecté',
      subscribeText: 'Abonnez-vous pour recevoir les mises à jour sur les nouvelles recherches, publications et perspectives',
      subscribe: 'S\'abonner',
      minRead: 'min de lecture'
    },
    books: {
      title: 'Voyage Littéraire',
      subtitle: 'Livres qui ont façonné ma perspective et ma compréhension',
      readingStats: 'Statistiques de Lecture',
      booksRead: 'Livres Lus',
      favoriteAuthor: 'Auteur Préféré',
      categories: 'Catégories',
      readingPhilosophy: 'Philosophie de Lecture',
      philosophyText: '"Un lecteur vit mille vies avant de mourir. L\'homme qui ne lit jamais n\'en vit qu\'une." Ces livres ont été des compagnons dans mon parcours intellectuel.'
    },
    common: {
      viewGithub: 'Voir le Profil GitHub',
      close: 'Fermer',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès'
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
      contact: 'اتصل بنا',
      cv: 'السيرة الذاتية',
      teaching: 'التدريس',
      awards: 'الجوائز',
      projects: 'المشاريع',
      blog: 'المدونة',
      books: 'الكتب'
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
      viewPaper: 'عرض الورقة',
      allYears: 'جميع السنوات',
      allVenues: 'جميع الأماكن',
      allTopics: 'جميع المواضيع',
      hIndex: 'مؤشر h',
      bibtex: 'BibTeX',
      bibtexCitation: 'اقتباس BibTeX',
      copyClipboard: 'نسخ إلى الحافظة',
      downloadBib: 'تحميل .bib',
      viewPdf: 'عرض PDF',
      noResults: 'لم يتم العثور على منشورات تطابق معايير البحث.'
    },
    cv: {
      title: 'السيرة الذاتية',
      phdStudent: 'طالب دكتوراه في علوم الحاسوب',
      yearsTeaching: 'سنوات التدريس',
      publications: 'المنشورات',
      venues: 'الأماكن',
      skillsExpertise: 'المهارات والخبرات',
      experience: 'الخبرة',
      education: 'التعليم',
      recentPubs: 'المنشورات الحديثة',
      viewAllPubs: 'عرض جميع المنشورات ←',
      awardsGrants: 'الجوائز والمنح',
      teaching: 'التدريس',
      viewTeaching: 'عرض ملف التدريس ←',
      downloadPdf: 'تحميل PDF',
      copyShortBio: 'نسخ السيرة المختصرة',
      copyFullBio: 'نسخ السيرة الكاملة',
      thesis: 'الأطروحة'
    },
    teaching: {
      title: 'التدريس',
      researchMentor: 'مرشد بحثي',
      volunteer: 'متطوع',
      instructor: 'مدرس',
      teachingAssistant: 'مساعد تدريس',
      present: 'الحالي',
      studentFeedback: 'آراء الطلاب ←',
      rating: 'التقييم'
    },
    awards: {
      title: 'الجوائز والتقدير',
      achievementTimeline: 'الجدول الزمني للإنجازات',
      all: 'الكل',
      academic: 'أكاديمي',
      certifications: 'الشهادات',
      grantsScholarships: 'المنح والبعثات'
    },
    projects: {
      title: 'ملف المشاريع',
      subtitle: 'مجموعة من مشاريع البحث والتنفيذ والتجارب في مجالات متنوعة',
      viewDetails: 'عرض التفاصيل ←',
      description: 'الوصف',
      technologies: 'التقنيات',
      viewCode: 'عرض الكود',
      liveDemo: 'عرض مباشر',
      readPaper: 'قراءة الورقة',
      completed: 'مكتمل',
      inProgress: 'قيد التنفيذ'
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
    blog: {
      title: 'أفكار',
      featured: 'مميز',
      continueReading: 'متابعة القراءة ←',
      readMore: 'اقرأ المزيد ←',
      loadMore: 'تحميل المزيد',
      stayConnected: 'ابق على تواصل',
      subscribeText: 'اشترك لتلقي التحديثات حول الأبحاث والمنشورات الجديدة',
      subscribe: 'اشتراك',
      minRead: 'دقيقة قراءة'
    },
    books: {
      title: 'رحلة أدبية',
      subtitle: 'كتب شكلت منظوري وفهمي',
      readingStats: 'إحصائيات القراءة',
      booksRead: 'الكتب المقروءة',
      favoriteAuthor: 'المؤلف المفضل',
      categories: 'التصنيفات',
      readingPhilosophy: 'فلسفة القراءة',
      philosophyText: '"القارئ يعيش ألف حياة قبل أن يموت. الرجل الذي لا يقرأ أبداً يعيش حياة واحدة فقط." هذه الكتب كانت رفاق في رحلتي الفكرية.'
    },
    common: {
      viewGithub: 'عرض ملف GitHub',
      close: 'إغلاق',
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجاح'
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
      contact: '联系方式',
      cv: '简历',
      teaching: '教学',
      awards: '奖项',
      projects: '项目',
      blog: '博客',
      books: '书籍'
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
      viewPaper: '查看论文',
      allYears: '所有年份',
      allVenues: '所有场所',
      allTopics: '所有主题',
      hIndex: 'h指数',
      bibtex: 'BibTeX',
      bibtexCitation: 'BibTeX引用',
      copyClipboard: '复制到剪贴板',
      downloadBib: '下载 .bib',
      viewPdf: '查看PDF',
      noResults: '未找到符合筛选条件的论文。'
    },
    cv: {
      title: '个人简历',
      phdStudent: '计算机科学博士生',
      yearsTeaching: '教学年限',
      publications: '发表论文',
      venues: '发表场所',
      skillsExpertise: '技能与专长',
      experience: '工作经历',
      education: '教育背景',
      recentPubs: '近期发表',
      viewAllPubs: '查看所有论文 →',
      awardsGrants: '奖项与资助',
      teaching: '教学',
      viewTeaching: '查看教学档案 →',
      downloadPdf: '下载PDF',
      copyShortBio: '复制简短简介',
      copyFullBio: '复制完整简介',
      thesis: '论文'
    },
    teaching: {
      title: '教学',
      researchMentor: '研究导师',
      volunteer: '志愿者',
      instructor: '讲师',
      teachingAssistant: '助教',
      present: '至今',
      studentFeedback: '学生反馈 →',
      rating: '评分'
    },
    awards: {
      title: '奖项与荣誉',
      achievementTimeline: '成就时间线',
      all: '全部',
      academic: '学术',
      certifications: '证书',
      grantsScholarships: '资助与奖学金'
    },
    projects: {
      title: '项目作品集',
      subtitle: '涵盖多个领域的研究项目、实现和实验集合',
      viewDetails: '查看详情 →',
      description: '描述',
      technologies: '技术',
      viewCode: '查看代码',
      liveDemo: '在线演示',
      readPaper: '阅读论文',
      completed: '已完成',
      inProgress: '进行中'
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
    blog: {
      title: '思考',
      featured: '精选',
      continueReading: '继续阅读 →',
      readMore: '阅读更多 →',
      loadMore: '加载更多文章',
      stayConnected: '保持联系',
      subscribeText: '订阅以接收新研究、发表和见解的更新',
      subscribe: '订阅',
      minRead: '分钟阅读'
    },
    books: {
      title: '文学之旅',
      subtitle: '塑造我视角和理解的书籍',
      readingStats: '阅读统计',
      booksRead: '已读书籍',
      favoriteAuthor: '最喜欢的作者',
      categories: '分类',
      readingPhilosophy: '阅读哲学',
      philosophyText: '"读者在死亡之前会经历一千种人生。不读书的人只能活一种人生。"这些书籍是我智识之旅的伴侣。'
    },
    common: {
      viewGithub: '查看GitHub资料',
      close: '关闭',
      loading: '加载中...',
      error: '错误',
      success: '成功'
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
