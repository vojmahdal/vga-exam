
# GLSL Shader – Zvýraznění pohybujícího se objektu červeně

## Zadání

Napište kód vertex a/nebo fragment shaderu, které implementují následující chování:

- Jsou předány následující atributy vrcholů: **pozice** a **barva**.
- Jsou předány samostatně dvě matice:
  - **projekční matice** (`uProjection`)
  - **model-view matice** (`uModelView`)

Shader má:

- vykreslit objekt s jeho původní barvou, pokud je **statický**
- vykreslit objekt **červeně**, pokud se **posouvá** (nikoliv rotuje)

---

## Řešení

### Vertex shader

```glsl
attribute vec3 aPosition;
attribute vec3 aColor;

uniform mat4 uModelView;
uniform mat4 uProjection;

varying vec3 vColor;

void main() {
    gl_Position = uProjection * uModelView * vec4(aPosition, 1.0);
    vColor = aColor;
}
```

### Fragment shader

```glsl
precision mediump float;

varying vec3 vColor;

uniform bool uIsTranslating; // nastavuje CPU logika podle analýzy transformace

void main() {
    vec3 color = vColor;

    // Pokud se objekt posouvá (ale nerotuje), zobrazíme ho červeně
    if (uIsTranslating) {
        color = vec3(1.0, 0.0, 0.0);
    }

    gl_FragColor = vec4(color, 1.0);
}
```

---

## Vysvětlení

- **Transformace:** ve vertex shaderu se aplikují zvlášť `uModelView` a `uProjection`.
- **Barva:** předává se z vertex shaderu do fragment shaderu jako `varying`.
- **Pohyb detekuje CPU část aplikace** (např. porovnáním aktuální a předchozí transformační matice). Výsledek se předá do shaderu jako `uniform bool uIsTranslating`.
- **Barva:** pokud je `uIsTranslating == true`, pak je barva objektu nastavena na červenou.

---
