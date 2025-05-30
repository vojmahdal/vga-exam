# GLSL Shader + Vysvětlení: Vertex Buffer Object vs. Vertex Array Object

## 🧠 Co je to Vertex Buffer Object (VBO)?

**Vertex Buffer Object (VBO)** je objekt v OpenGL, který umožňuje uložit data vrcholů (např. pozice, normály, barvy) přímo do grafické paměti (GPU). Tím se výrazně zvyšuje efektivita vykreslování, protože se minimalizuje přenos dat mezi CPU a GPU.

## ✅ Výhody VBO oproti VAO:

| Feature                        | VBO (Vertex Buffer Object)                        | VAO (Vertex Array Object)                        |
|-------------------------------|---------------------------------------------------|--------------------------------------------------|
| **Účel**                      | Ukládá samotná data vrcholů                       | Ukládá konfiguraci VBO (ukládá *jak* číst data) |
| **Přenositelnost dat**       | Ano (do GPU paměti)                              | Ne (jen konfigurace)                            |
| **Výkon**                    | Umožňuje rychlý přístup k datům z GPU            | Zjednodušuje přepínání mezi sadami atributů     |
| **Používání**                | Vyžaduje ruční nastavení offsetů/atributů        | Ukládá nastavení, které jinak vyžaduje opakování |

V praxi se používají společně: VAO určuje *jak číst* data z VBO.

---

## 🖼️ GLSL Shader: zvýraznění pohybujícího se objektu červeně

### Zadání:

- Na vstupu: pozice a barva vrcholu
- Používají se matice: `uModelView` a `uProjection`
- Objekt se vykreslí vlastní barvou, pokud **stojí**
- Pokud se **posouvá**, vykreslí se **červeně**

---

### 🧱 Vertex Shader

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
### Fragment Shader
precision mediump float;

varying vec3 vColor;

uniform bool uIsTranslating;

void main() {
    vec3 color = uIsTranslating ? vec3(1.0, 0.0, 0.0) : vColor;
    gl_FragColor = vec4(color, 1.0);
}

### Jak to funguje?

    Vertex shader provádí transformaci vrcholů pomocí zadaných matic.

    Barva se interpoluje mezi vrcholy pomocí varying.

    Fragment shader kontroluje stav pohybu pomocí uIsTranslating:

        Pokud true, objekt je vykreslen červeně.

        Pokud false, používá se původní barva vrcholu.

    Stav uIsTranslating je určován logikou na CPU straně a přenášen do shaderu jako uniform.