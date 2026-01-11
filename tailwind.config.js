module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mob: "375px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px",
      laptopl: "1440px",
    },
    extend: {
      colors: {
        // Primary accent colors
        primary: {
          DEFAULT: '#3b82f6', // blue-500
          hover: '#2563eb',   // blue-600
          light: '#60a5fa',   // blue-400
          dark: '#1e40af',    // blue-800
        },
        // Background surface colors
        surface: {
          DEFAULT: '#030712', // gray-950
          elevated: '#111827', // gray-900
          border: '#1f2937',  // gray-800
          muted: '#374151',   // gray-700
        },
        // Category accent colors for skills
        accent: {
          bitcoin: '#fb923c',  // orange-400
          nostr: '#c084fc',    // purple-400
          crypto: '#facc15',   // yellow-400
          education: '#4ade80', // green-400
          enterprise: '#818cf8', // indigo-400
        },
      },
    },
  },
  plugins: [],
};
