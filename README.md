# Vajeda Multani — Developer Portfolio

A modern, premium, fully responsive single-page developer portfolio for **Vajeda Multani**, a Full Stack PHP & WordPress Developer. Built with **HTML5, CSS3, and vanilla JavaScript (ES6+)** — no frameworks, no build tools. Deploys directly to **GitHub Pages**.

🔗 **Live site:** https://vazz01.github.io/vajeda-portfolio/

---

## ✨ Features

- **Dark & Light themes** with preference saved in `localStorage`
- **Aurora + animated grid + blob backgrounds** and lightweight floating particles
- **Glassmorphism** cards with gradient borders and soft shadows
- **Hero** with typing animation, glowing orbit and floating tech icons
- **Animated skill bars** and count-up statistics
- **Vertical timelines** for Experience & Education
- **Project cards** with animated gradient borders and hover effects
- **Contact form** with client-side validation
- **Micro-interactions:** custom cursor, mouse glow, mouse parallax, card tilt, button ripple
- **Scroll progress bar**, scroll reveal, sticky glass navigation with active-section indicator
- **Premium loading screen** and back-to-top button
- **Accessibility:** semantic HTML, ARIA labels, keyboard support, `prefers-reduced-motion`
- **SEO:** meta tags, Open Graph, Twitter cards, JSON-LD structured data, favicon
- **Print-friendly** resume styles

## 🛠 Tech Stack

- HTML5 (semantic)
- CSS3 (custom properties, grid/flexbox, animations)
- Vanilla JavaScript (ES6+, modular functions, `IntersectionObserver`)
- Google Fonts: Poppins & Inter

## 📁 Project Structure

```
vajeda-portfolio/
├── index.html          # Markup + SEO/OG/JSON-LD
├── style.css           # Themes, layout, animations, responsive
├── script.js           # Modular vanilla JS
├── README.md
└── assets/
    ├── images/         # Illustration, project & OG images (SVG)
    ├── icons/          # Technology icons (SVG)
    ├── favicon/        # favicon.svg
    └── resume/         # Vajeda-Multani-Resume.pdf (placeholder)
```

## 🚀 Run Locally

No build step needed. Either open `index.html` directly, or serve it:

```bash
# Python
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🌐 Deploy to GitHub Pages

1. Push this repo to GitHub (public).
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source: Deploy from a branch**.
4. Choose branch **`main`** and folder **`/ (root)`**, then **Save**.
5. Your site publishes at `https://<username>.github.io/<repo>/`.

## ✏️ Customize

Everything is easy to swap:

- **Social / resume links** — search `vazz01`, `multanivajeda@gmail.com`, and `vajeda-multani` in `index.html`.
- **Resume** — replace `assets/resume/Vajeda-Multani-Resume.pdf`.
- **Illustration** — replace `assets/images/developer.svg`.
- **Colors** — edit the CSS variables at the top of `style.css`.
- **Contact form** — the form validates client-side and simulates success. To actually receive messages, connect it to a service like Formspree/EmailJS or a backend endpoint (see the comment in `initContactForm` in `script.js`).

## 📄 License

Personal portfolio © Vajeda Multani. Feel free to use as a reference.

---

Built with HTML, CSS & JavaScript · Made with ❤️
