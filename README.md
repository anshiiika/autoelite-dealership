# 🚗 AutoElite - Premium Car Dealership Platform

A modern, full-featured car dealership website built with Next.js 15, featuring a premium glassmorphism design, dynamic car catalog, test drive booking system, and car comparison functionality.

![AutoElite Preview](https://via.placeholder.com/800x400/1a1a2e/ffffff?text=AutoElite+Car+Dealership)

## ✨ Features

### 🎨 **Premium Design**

- **Glassmorphism UI**: Modern glass-effect cards with backdrop blur
- **Dark Theme**: Elegant dark gradient backgrounds with premium styling
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Hover effects, transitions, and micro-interactions

### 🚙 **Car Catalog System**

- **Dynamic Car Database**: 12+ premium car models with detailed specifications
- **Advanced Filtering**: Filter by brand, price range, year, and body type
- **Smart Sorting**: Sort by price (low to high/high to low) and year (newest/oldest)
- **Interactive Cards**: Hover effects with detailed car information modals

### 🔍 **Car Comparison Tool**

- **Side-by-Side Comparison**: Compare two cars with detailed specifications
- **Visual Indicators**: Color-coded comparison (green for better, red for lower values)
- **Comprehensive Specs**: Engine, fuel type, transmission, mileage, and more
- **Smart Selection**: Easy car selection with dropdown menus

### 📅 **Test Drive Booking**

- **Hierarchical Location Selection**: Country → State → City dropdown system
- **Dynamic Location API**: Real-time Indian cities from external API
- **Form Validation**: Client-side and server-side validation
- **Booking Management**: In-memory booking storage with unique references
- **Interactive Map**: Google Maps integration showing selected location

### 🌍 **Location Services**

- **Multi-Level Selection**: Country, state, and city selection
- **API Integration**: CountriesNow API for real-time location data
- **Caching System**: 24-hour cache for optimal performance
- **Fallback Support**: Graceful degradation with preset Indian cities

## 🛠️ Tech Stack

### **Frontend**

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Modern icon library

### **Backend**

- **Next.js API Routes** - Serverless API endpoints
- **In-Memory Storage** - Booking and caching system
- **External APIs** - CountriesNow for location data

### **Development**

- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **Git** - Version control

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ (or 20+)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/autoelite-dealership.git
cd autoelite-dealership
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables** (Optional)

```bash
# Create .env.local file
echo "API_NINJAS_KEY=your_api_key_here" > .env.local
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
autoelite-dealership/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Authentication pages
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── api/                 # API routes
│   │   │   ├── cars/           # Car data endpoint
│   │   │   ├── car-models/     # External car models API
│   │   │   ├── locations/      # Location hierarchy API
│   │   │   └── schedule/       # Booking management API
│   │   ├── components/         # Reusable components
│   │   ├── about/              # About page
│   │   ├── comparison/         # Car comparison page
│   │   ├── products/           # Car catalog
│   │   ├── schedule/           # Test drive booking
│   │   └── layout.tsx          # Root layout
│   └── globals.css             # Global styles
├── public/
│   ├── data/
│   │   └── cars.json           # Car database
│   └── images/                 # Car images
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🎯 Key Pages

### **Home Page** (`/`)

- Hero section with featured cars
- Call-to-action buttons
- Premium glassmorphism design

### **Car Catalog** (`/products/1`)

- Dynamic car grid with filtering
- Advanced sorting options
- Interactive car cards with modals

### **Car Comparison** (`/comparison`)

- Side-by-side car comparison
- Visual comparison indicators
- Comprehensive specifications

### **Test Drive Booking** (`/schedule`)

- Multi-step location selection
- Form validation and submission
- Interactive map integration

### **About Page** (`/about`)

- Company information and values
- Timeline and statistics
- Premium presentation

## 🔧 API Endpoints

### **GET `/api/cars`**

Returns the complete car database from JSON file.

### **GET `/api/locations?level=countries`**

Returns list of countries.

### **GET `/api/locations?level=states&country=India`**

Returns states for a specific country.

### **GET `/api/locations?level=cities&country=India&state=Maharashtra`**

Returns cities for a specific state.

### **POST `/api/schedule`**

Creates a new test drive booking.

### **GET `/api/schedule`**

Returns all bookings (for demo purposes).

## 🎨 Design System

### **Color Palette**

- **Primary**: Blue gradients (`from-blue-600 to-indigo-600`)
- **Background**: Dark radial gradients (`from-gray-900 via-gray-950 to-black`)
- **Glass**: White with opacity (`bg-white/10`, `border-white/10`)
- **Text**: White and gray variants for hierarchy

### **Components**

- **Cards**: Glassmorphism with backdrop blur
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Glass inputs with focus states
- **Modals**: Full-screen overlays with glass content

## 🚀 Deployment

### **Vercel (Recommended)**

```bash
npm run build
# Deploy to Vercel
```

### **Other Platforms**

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Anshika Shukla**

- GitHub: [@anshikashukla](https://github.com/anshikashukla)
- LinkedIn: [Anshika Shukla](https://linkedin.com/in/anshikashukla)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Lucide React](https://lucide.dev/) for the beautiful icons
- [CountriesNow API](https://countriesnow.space/) for location data
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

---

⭐ **Star this repository if you found it helpful!**
