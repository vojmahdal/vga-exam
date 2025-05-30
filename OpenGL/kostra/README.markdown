# OpenGL Shadery pro barvení a transformace objektů

Tento repozitář obsahuje dva páry GLSL shaderů pro OpenGL (verze 300 es), které implementují následující funkcionality:
1. **Barvení objektů**: Statický objekt si zachovává svou barvu, pohybující se objekt (translací) je vykreslen červenou barvou.
2. **Průhlednost a ztmavení**: Při rotaci je objekt průhledný s modrým nádechem, při posunu je ztmavený, při kombinaci obojího se efekty kombinují.

## 🧱 Úkol 1: Barvení statických a pohybujících se objektů

### 🟦 Vertex Shader (`vertex1.glsl`)

Vertex shader přijímá pozici a barvu vrcholu, aplikuje projekční a modelview matici a na základě uniformní proměnné `u_isMoving` rozhoduje, zda použít červenou barvu (při pohybu) nebo původní barvu vrcholu.

```glsl
#version 300 es
precision mediump float;

in vec3 a_position;
in vec3 a_color;

uniform mat4 u_projectionMatrix;
uniform mat4 u_modelViewMatrix;
uniform bool u_isMoving; // Předáno z CPU: true, pokud se objekt posouvá

out vec3 v_color;

void main() {
    gl_Position = u_projectionMatrix * u_modelViewMatrix * vec4(a_position, 1.0);

    // Pokud se objekt posouvá, pošleme červenou
    if (u_isMoving) {
        v_color = vec3(1.0, 0.0, 0.0); // Červená
    } else {
        v_color = a_color; // Původní barva
    }
}
```

### 🟥 Fragment Shader (`fragment1.glsl`)

Fragment shader přijímá barvu z vertex shaderu a nastavuje ji jako výstupní barvu s plnou neprůhledností.

```glsl
#version 300 es
precision mediump float;

in vec3 v_color;
out vec4 outColor;

void main() {
    outColor = vec4(v_color, 1.0); // Neprůhledný
}
```

## 🧱 Úkol 2: Průhlednost při rotaci a ztmavení při posunu

### 🟦 Vertex Shader (`vertex2.glsl`)

Vertex shader aplikuje kompletní transformační matici na pozici vrcholu a předává původní barvu vrcholu do fragment shaderu.

```glsl
#version 300 es
precision mediump float;

in vec3 a_position;
in vec3 a_color;

uniform mat4 u_transform; // Kompletní transformace
out vec3 v_color;

void main() {
    gl_Position = u_transform * vec4(a_position, 1.0);
    v_color = a_color;
}
```

### 🟥 Fragment Shader (`fragment2.glsl`)

Fragment shader kombinuje efekty ztmavení (při posunu) a průhlednosti s modrým nádechem (při rotaci) na základě uniformních proměnných `u_isMoving` a `u_isRotating`.

```glsl
#version 300 es
precision mediump float;

in vec3 v_color;
out vec4 outColor;

uniform bool u_isRotating;
uniform bool u_isMoving;

void main() {
    vec3 color = v_color;

    if (u_isMoving) {
        color = mix(color, vec3(0.0), 0.3); // 30 % ztmavení
    }

    if (u_isRotating) {
        color = mix(color, vec3(0.0, 0.0, 1.0), 0.5); // 50 % modrá
        outColor = vec4(color, 0.5); // Průhlednost
    } else {
        outColor = vec4(color, 1.0); // Neprůhledné
    }
}
```

## 🧠 Informace pro zkoušku

### Jak poznáme rotaci nebo translaci?
- Rotace a translace jsou určeny na straně aplikace (CPU). Na základě změn transformační matice nebo detekce pohybu mezi snímky jsou předány uniformní proměnné `u_isMoving` a `u_isRotating` (typu `bool`).

### Proč se míchá barva v fragment shaderu?
- Fragment shader je ideální pro manipulaci s barvami a průhledností, protože ovlivňuje výstupní barvu každého fragmentu. Funkce `mix()` umožňuje plynulé kombinování barev (např. ztmavení nebo přidání modrého nádechu).

### Proč se v 1. úkolu řeší barva ve vertex shaderu?
- V prvním úkolu je barva určena na úrovni vrcholů a je jednoduchá (buď původní barva, nebo červená). Proto stačí rozhodnutí provést ve vertex shaderu, což je efektivnější, protože se provádí méněkrát než ve fragment shaderu.

## Použití
- **Atributy vrcholů**:
  - `a_position`: Pozice vrcholu (vec3)
  - `a_color`: Barva vrcholu (vec3)
- **Uniformní proměnné**:
  - Úkol 1: `u_projectionMatrix`, `u_modelViewMatrix`, `u_isMoving`
  - Úkol 2: `u_transform`, `u_isMoving`, `u_isRotating`
- **Kompatibilita**: OpenGL ES 3.0 (verze 300 es) a vyšší.
- **Poznámky**:
  - Aplikace musí aktualizovat uniformní proměnné `u_isMoving` a `u_isRotating` na základě analýzy transformační matice mezi snímky.
  - První shader je jednoduchý a optimalizovaný pro barvení, druhý shader přidává složitější efekty (průhlednost a ztmavení).