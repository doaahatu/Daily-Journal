# 📔 Daily Journal

![App Screenshot](/images/home.png)
![App Screenshot](/images/journal.png)

A beautiful, responsive daily journal web application with elegant design and full CRUD functionality.

## ✨ Features

- 🌸 **Aesthetic Design** - Soft pink color scheme with glassmorphism effects
- 📝 **Journal Entries** - Create, read, update, and delete entries
- 🔍 **Instant Search** - Find entries by title or content
- 💾 **Local Storage** - Entries persist after browser closes
- 📱 **Responsive** - Works on all device sizes
- 🎨 **Custom Fonts** - Elegant typography with Playfair Display

## 🚀 Live Demo

[View Live on GitHub Pages](https://doaahatu.github.io/Daily-Journal/html/home.html)

## 🛠️ Technologies Used

| Frontend       | Details                          |
|----------------|----------------------------------|
| **HTML5**      | Semantic markup                  |
| **CSS3**       | Flexbox, Grid, custom properties |
| **JavaScript** | ES6, Local Storage API           |
| **Fonts**      | Google Fonts (Playfair Display)  |

## 📦 Project Structure
Daily-Journal/
├── html/
│ ├── home.html # Landing page with pink background
│ └── journal.html # Main journal interface
├── css/
│ ├── home.css # Homepage styles
│ └── journal.css # Journal app styles
├── js/
│ └── app.js # All journal functionality
├── images/
│ ├── pink.jpg # Background image
│ └── home.png # App screenshot
│ └── journal.png # App screenshot
└── README.md # This file


## 🏁 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge)
- Git (optional)

### Installation
#### 1. Clone the repository:

git clone https://github.com/doaahatu/Daily-Journal.git

#### 2. Open in browser:

cd Daily-Journal
open html/home.html  # On Mac
### or
start html/home.html # On Windows

## 🎨 Design Highlights
/* Glassmorphism container effect */
.journal-container {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px); /* Safari support */
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
}

/* Typography styles */
h1 {
  font-family: 'Playfair Display', serif;
  color: #d48a8e; /* Dusty pink */
  font-weight: 700;
  letter-spacing: 0.5px;
}
