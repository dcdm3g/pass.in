import { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

export default {
  content: ['src/app/**/*.tsx', 'src/components/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [forms({ strategy: 'class' })],
} satisfies Config
