// Imports nécessaires pour créer un thème personnalisé Chakra UI
import {
  extendTheme,        // Fonction pour étendre le thème par défaut
  ColorMode,          // Type pour le mode de couleur (light/dark)
  ChakraTheme,        // Type du thème Chakra
  ThemeComponentProps, // Props pour les composants du thème
} from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools' // Utilitaire pour gérer light/dark mode

// Interface pour définir les modes de couleur disponibles
interface IThemeMode {
  Light: ColorMode
  Dark: ColorMode
}

// Export des modes de couleur pour utilisation dans l'app
export const ThemeMode: IThemeMode = {
  Light: 'light',
  Dark: 'dark',
}

// Définit quelles tailles d'écran sont considérées comme "mobile"
// base = très petit, md = tablette, lg = laptop, xl = desktop
export const mobileBreakpointsMap = {
  base: true,   // Mobile
  md: true,     // Tablette
  lg: true,     // Laptop set to true for tablet mode below 1370px
  xl: false,    // Desktop (pas mobile)
}

// Configuration du thème
const config = {
  initialColorMode: ThemeMode.Light,  // Mode par défaut au chargement
  useSystemColorMode: false,         // Ne pas suivre les préférences système
}

// Palette de couleurs personnalisées
// Vous pouvez utiliser ces couleurs partout avec : color="gold.400" ou bg="luxury.darkBg"
const colors = {
  black: '#0a0a0a',  // Noir personnalisé

  // Palette dorée : du plus clair (50) au plus foncé (900)
  gold: {
    50: '#fffbeb',   // Presque blanc doré
    100: '#fef3c7',  // Très clair
    200: '#fde68a',  // Clair
    300: '#fcd34d',  // Moyen clair
    400: '#fbbf24',  // Moyen - ⭐ Souvent utilisé
    500: '#f59e0b',  // Standard
    600: '#d97706',  // Moyen foncé - ⭐ Souvent utilisé
    700: '#b45309',  // Foncé
    800: '#92400e',  // Très foncé
    900: '#78350f',  // Presque marron
  },

  // Couleurs premium pour un look luxueux
  luxury: {
    darkBg: '#0f0f0f',      // Fond noir profond
    lightBg: '#fafafa',     // Fond gris très clair
    accent: '#d4af37',      // Or classique (couleur signature)
    accentLight: '#f4e4c1', // Or clair
    accentDark: '#b8941f',  // Or foncé
  },
}

// Points de rupture personnalisés
const breakpoints = {
  base: '0em',
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '85.625em', // 1370px
  '2xl': '96em',
}

// Styles globaux appliqués à toute l'application
const styles = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  global: (props: any) => ({
    // Styles du body (page entière)
    body: {
      // mode() = fonction qui choisit entre light et dark
      // mode('couleur_light', 'couleur_dark')(props)
      color: mode('gray.800', 'gray.100')(props),  // Couleur du texte
      bg: mode('#fafafa', '#0f0f0f')(props),       // Couleur de fond
    },

    // Style quand on sélectionne du texte avec la souris
    '*::selection': {
      bg: mode('gold.200', 'gold.700')(props),     // Fond de la sélection
      color: mode('gray.900', 'white')(props),     // Couleur du texte sélectionné
    },

    // Animation shimmer (effet de brillance qui se déplace)
    // Utilisée pour les titres avec effet doré animé
    '@keyframes shimmer': {
      '0%': { backgroundPosition: '-200% 0' },   // Position de départ
      '100%': { backgroundPosition: '200% 0' },  // Position finale
    },
  }),
}

// Variantes de texte réutilisables
// Utilisez-les avec : <Text variant="emphasis">Mon texte</Text>
const textVariants = {
  // Style "emphasis" = texte important avec gradient doré
  emphasis: (props: ThemeComponentProps<ChakraTheme>) => ({
    bgGradient: mode(
      'linear(to-r, gold.600, gold.400)',  // Light mode : gradient foncé
      'linear(to-r, gold.400, gold.200)'   // Dark mode : gradient clair
    )(props),
    bgClip: 'text',        // Applique le gradient sur le texte
    fontWeight: 'bold',    // Texte en gras
    textShadow: mode('none', '0 0 20px rgba(212, 175, 55, 0.3)')(props), // Glow en dark mode
  }),

  // Style "description" = texte secondaire/descriptif
  description: (props: ThemeComponentProps<ChakraTheme>) => ({
    color: mode('gray.600', 'gray.400')(props),  // Gris moyen
    lineHeight: '1.8',                            // Espacement entre les lignes
  }),

  // Style "accent" = texte avec accent subtil
  accent: (props: ThemeComponentProps<ChakraTheme>) => ({
    color: mode('gray.700', 'gray.300')(props),
    letterSpacing: '0.05em',  // Espacement entre les lettres
  }),

  // Style alternatif
  accentAlternative: (props: ThemeComponentProps<ChakraTheme>) => ({
    color: mode('gray.500', 'gray.500')(props),  // Même couleur en light/dark
  }),
}

// Création du thème final en étendant le thème par défaut de Chakra UI
const theme = extendTheme({
  config,  // Configuration (dark mode par défaut)
  breakpoints, // Points de rupture personnalisés

  // Polices utilisées dans toute l'app
  fonts: {
    body: 'Poppins',     // Police pour le texte normal
    heading: 'Poppins',  // Police pour les titres
  },

  colors,  // Palette de couleurs personnalisées
  styles,  // Styles globaux

  // Personnalisation des composants Chakra UI
  components: {

    // ========== LIENS (Link) ==========
    Link: {
      // Style de base pour tous les liens
      baseStyle: (props: ThemeComponentProps<ChakraTheme>) => ({
        color: mode('gray.800', 'gray.200')(props),
        textDecoration: 'none',  // Pas de soulignement par défaut
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',  // Animation fluide

        // Pseudo-élément _after = ligne qui apparaît sous le lien au hover
        _after: {
          content: '""',
          position: 'absolute',
          bottom: '-2px',
          left: '0',
          width: '0%',           // Largeur 0 par défaut (invisible)
          height: '2px',
          bgGradient: mode(
            'linear(to-r, gold.600, gold.400)',
            'linear(to-r, gold.400, gold.200)'
          )(props),
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },

        // Au survol (_hover)
        _hover: {
          color: mode('gold.600', 'gold.400')(props),  // Couleur dorée
          _after: {
            width: '100%',  // La ligne se déploie à 100%
          },
        },
      }),

      // Variantes de liens
      variants: {
        ...textVariants,  // Hérite des variantes de texte
        description: (props: ThemeComponentProps<ChakraTheme>) => ({
          color: mode('gray.600', 'gray.400')(props),
          textDecoration: 'none',
          _hover: {
            color: mode('gold.600', 'gold.400')(props),
          },
        }),
      },
    },

    // ========== TEXTE (Text) ==========
    Text: {
      variants: textVariants,  // Utilise les variantes définies plus haut
    },

    // ========== TITRES (Heading) ==========
    Heading: {
      variants: textVariants,  // Utilise les mêmes variantes que Text
    },

    // ========== BOUTONS (Button) ==========
    Button: {
      variants: {
        // Variante "outline" = bouton avec bordure dorée
        outline: (props: ThemeComponentProps<ChakraTheme>) => ({
          borderWidth: '2px',
          borderRadius: 'lg',
          borderColor: mode('gold.500', 'gold.400')(props),
          color: mode('gold.600', 'gold.400')(props),
          bg: 'transparent',  // Fond transparent
          fontWeight: '600',
          letterSpacing: '0.05em',
          position: 'relative',
          overflow: 'hidden',

          // Pseudo-élément _before = fond doré qui glisse au hover
          _before: {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '-100%',      // Commence hors de vue à gauche
            width: '100%',
            height: '100%',
            bgGradient: mode(
              'linear(to-r, gold.500, gold.400)',
              'linear(to-r, gold.400, gold.300)'
            )(props),
            transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: -1,
          },

          // Au survol
          _hover: {
            color: mode('white', 'gray.900')(props),  // Texte devient blanc/noir
            borderColor: mode('gold.600', 'gold.300')(props),
            boxShadow: mode(
              '0 10px 40px -10px rgba(212, 175, 55, 0.5)',
              '0 10px 40px -10px rgba(212, 175, 55, 0.7)'
            )(props),
            transform: 'translateY(-2px)',  // Légère levée du bouton
            _before: {
              left: '0',  // Le fond doré glisse et remplit le bouton
            },
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }),

        // Variante alternative avec effet de verre
        outlineAlternative: (props: ThemeComponentProps<ChakraTheme>) => ({
          borderWidth: '1px',
          borderRadius: 'lg',
          borderColor: mode('gray.300', 'whiteAlpha.300')(props),
          bg: mode('whiteAlpha.500', 'whiteAlpha.50')(props),
          backdropFilter: 'blur(10px)',  // Effet de flou (glassmorphism)
          _hover: {
            borderColor: mode('gold.400', 'gold.400')(props),
            bg: mode('whiteAlpha.700', 'whiteAlpha.100')(props),
            transform: 'translateY(-2px)',
            boxShadow: mode(
              '0 8px 30px -8px rgba(0, 0, 0, 0.1)',
              '0 8px 30px -8px rgba(212, 175, 55, 0.2)'
            )(props),
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }),
      },
    },

    // ========== ICÔNES (Icon) ==========
    Icon: {
      variants: {
        accent: (props: ThemeComponentProps<ChakraTheme>) => ({
          borderColor: mode('gray.800', 'gray.400')(props),
        }),
      },
    },

    // ========== SÉPARATEURS (Divider) ==========
    Divider: {
      variants: {
        solid: (props: ThemeComponentProps<ChakraTheme>) => ({
          borderColor: mode('gray.800', 'gray.400')(props),
          marginLeft: 'auto',   // Centré horizontalement
          marginRight: 'auto',
        }),
      },
    },
  },
})

// Export du thème pour utilisation dans _app.tsx
export default theme
