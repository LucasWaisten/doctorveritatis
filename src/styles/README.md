# Sistema de Diseño - Doctor Veritatis

Este documento describe el sistema de diseño unificado para la aplicación Doctor Veritatis.

## Arquitectura

### Design Tokens
Los design tokens están definidos en `design-tokens.css` y proporcionan:
- **Colores**: Paleta de colores consistente con variantes primarias, secundarias y semánticas
- **Tipografía**: Sistema de fuentes y tamaños escalables
- **Espaciado**: Sistema de espaciado basado en múltiplos de 4px
- **Bordes**: Radio de bordes consistente
- **Sombras**: Sistema de elevación
- **Transiciones**: Duración y easing estándar
- **Z-index**: Capas de apilamiento organizadas

### Componentes Base

#### Typography
Componente unificado para toda la tipografía:
```tsx
<Typography variant="h1" color="primary" weight="bold">
  Título Principal
</Typography>
```

Variantes disponibles:
- `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- `body`, `body-sm`, `caption`, `lead`

#### Button
Sistema de botones consistente:
```tsx
<Button variant="primary" size="md" href="/ruta">
  Texto del botón
</Button>
```

Variantes: `primary`, `secondary`, `outline`, `ghost`, `danger`, `success`
Tamaños: `xs`, `sm`, `md`, `lg`, `xl`

#### Card
Sistema de tarjetas modular:
```tsx
<Card variant="elevated" padding="lg">
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descripción</CardDescription>
  </CardHeader>
  <CardContent>
    Contenido
  </CardContent>
</Card>
```

#### Container
Contenedor responsivo:
```tsx
<Container size="lg" padding="md">
  Contenido
</Container>
```

### Hooks Personalizados

#### useSidebar
Hook para manejar el estado del sidebar:
```tsx
const { isOpen, isMobile, toggle, open, close } = useSidebar({
  defaultOpen: true,
  mobileDefaultOpen: false,
  breakpoint: 768
});
```

## Principios de Diseño

### 1. Consistencia
- Todos los componentes siguen el mismo sistema de tokens
- Comportamiento predecible en toda la aplicación
- API consistente entre componentes similares

### 2. Accesibilidad
- Contraste adecuado en todos los colores
- Navegación por teclado
- Roles ARIA apropiados
- Texto alternativo en imágenes

### 3. Responsividad
- Diseño mobile-first
- Breakpoints consistentes
- Componentes que se adaptan al contenido

### 4. Performance
- Componentes ligeros
- Transiciones optimizadas
- Lazy loading cuando es apropiado

## Uso

### Importación
```tsx
import { Button, Typography, Card } from '@/components/ui';
```

### Personalización
Los componentes aceptan `className` para personalización adicional:
```tsx
<Button className="custom-styles" variant="primary">
  Botón personalizado
</Button>
```

### Temas
El sistema soporta temas claro/oscuro a través de CSS custom properties:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #3b82f6;
  }
}
```

## Mejores Prácticas

1. **Usa los componentes base** en lugar de crear estilos desde cero
2. **Mantén la consistencia** usando las variantes predefinidas
3. **Prioriza la accesibilidad** en todas las implementaciones
4. **Documenta las variaciones** cuando crees nuevos componentes
5. **Testa en diferentes dispositivos** para asegurar responsividad
