# Gad Mohamed - Academic Portfolio

A modern, gothic-themed academic portfolio website built with Vue 3, featuring privacy-preserving Wi-Fi sensing research, federated learning, and differential privacy work.

## 🎨 Design Philosophy

- **Visual Direction**: Gothic, calm, confident aesthetic
- **Color Palette**: Dark base (ink/charcoal) with soft sage accent
- **Typography**: UnifrakturMaguntia for gothic display, Spectral for serene body text
- **Micro-interactions**: Ultra-subtle GSAP animations (150-250ms ease-out)

## 🚀 Features

- **Native CV Page**: Interactive, living CV with downloadable PDF
- **Research Showcase**: Dynamic project cards with progress tracking
- **Publications Hub**: Filterable by year, venue, and topic with BibTeX export
- **Teaching Portfolio**: Course materials and student testimonials
- **Accessibility**: Full keyboard navigation, high contrast support
- **Performance**: Lazy-loaded routes, optimized animations

## 🛠 Tech Stack

- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom SCSS
- **Animations**: GSAP with ScrollTrigger
- **Routing**: Vue Router
- **Data**: JSON-based data model

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗 Project Structure

```
gadm21.github.io/
├── src/
│   ├── components/      # Reusable Vue components
│   │   ├── NavBar.vue
│   │   └── Footer.vue
│   ├── views/           # Page components
│   │   ├── Home.vue
│   │   ├── Research.vue
│   │   ├── Publications.vue
│   │   ├── Teaching.vue
│   │   ├── CV.vue
│   │   └── Contact.vue
│   ├── data/            # JSON data files
│   │   ├── cv/
│   │   │   ├── profile.json
│   │   │   ├── experience.json
│   │   │   ├── education.json
│   │   │   ├── skills.json
│   │   │   └── awards.json
│   │   └── publications.json
│   ├── styles/          # Global styles
│   │   ├── main.css     # Tailwind imports
│   │   └── gothic.scss  # Custom gothic styles
│   ├── composables/     # Vue composables
│   │   └── useData.js
│   ├── router/          # Vue Router config
│   │   └── index.js
│   ├── App.vue          # Root component
│   └── main.js          # App entry point
├── public/              # Static assets
├── index-vue.html       # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Dependencies
```

## 🎯 Key Features Implementation

### Gothic Design System
- Custom blackletter fonts (UnifrakturMaguntia, UnifrakturCook)
- Dark color scheme with sage green accents
- Drop-cap initials with fade-in animations
- Section dividers with gothic symbols

### Wi-Fi Ripple Animation
- Subtle idle animation on homepage
- Interactive on hover
- Represents wireless sensing research theme

### Publications System
- Dynamic filtering by year, venue, and topic
- Inline BibTeX modal with copy/download
- Citation counts linking to Google Scholar
- Venue badges for quick identification

### CV Page Features
- Real-time stats (h-index, publications, teaching years)
- Skills cloud with categorization
- Experience timeline with outcome bullets
- Copy bio functionality (short/full versions)
- Print-optimized styles

## 🚀 Deployment

The site can be deployed to GitHub Pages or any static hosting service:

```bash
# Build for production
npm run build

# The 'dist' folder contains the production build
# For GitHub Pages, rename index-vue.html to index.html
```

## 📝 Customization

1. **Update personal data**: Edit JSON files in `src/data/`
2. **Modify colors**: Update `tailwind.config.js`
3. **Change fonts**: Edit Google Fonts import in `src/main.js`
4. **Add pages**: Create new Vue components in `src/views/` and update router

## ♿ Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus visible states
- Reduced motion support
- High contrast mode compatibility

## 📄 License

© 2024 Gad Mohamed. All rights reserved.

## 🤝 Contact

- Email: ggad@uwo.ca
- GitHub: [@gadm21](https://github.com/gadm21)
- Google Scholar: [Profile](https://scholar.google.com/citations?user=bZRYJuAAAAAJ&hl=en)
