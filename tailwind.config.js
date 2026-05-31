/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#030712',
        midnight: '#0B1329',
        ember: '#F26419',
        electric: '#33658A',
        plasma: '#52D3D8',
        bone: '#F8FAFC',
        glass: {
          surface: 'rgba(8, 12, 24, 0.58)',
          border: 'rgba(248, 250, 252, 0.12)',
          highlight: 'rgba(248, 250, 252, 0.08)',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'SFMono-Regular',
          'Cascadia Code',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        glow: '0 0 70px rgba(51, 101, 138, 0.34)',
        ember: '0 0 54px rgba(242, 100, 25, 0.32)',
        glass:
          'inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 24px 88px rgba(0, 0, 0, 0.34)',
      },
      backgroundImage: {
        'panel-gradient':
          'linear-gradient(135deg, rgba(248,250,252,0.09), rgba(248,250,252,0.03))',
        'edge-light':
          'linear-gradient(135deg, rgba(242,100,25,0.58), rgba(82,211,216,0.45), rgba(248,250,252,0.14))',
        'glass-sheen':
          'linear-gradient(135deg, rgba(248,250,252,0.09), rgba(248,250,252,0.03))',
        'glass-edge':
          'linear-gradient(135deg, rgba(242,100,25,0.7), rgba(82,211,216,0.35), rgba(248,250,252,0.12))',
      },
      backdropBlur: {
        glass: '18px',
      },
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [],
};
