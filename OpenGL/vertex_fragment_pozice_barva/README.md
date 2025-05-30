
# GLSL Shader – Dynamická úprava barvy podle transformace

## Zadání

Naprogramujte vertex a fragment shader, které budou:

- Vstupními atributy: pozice vrcholu a barva.
- Používat transformační matici k transformaci vrcholů.

Shader by měl vykreslit objekt s jeho původní barvou, ale s následujícím chováním:

- Pokud se **objekt otáčí**, bude **z 50 % průhledný** – jeho barva se smíchá s **modrou** v poměru 50:50.
- Pokud se **objekt posouvá**, bude **o 30 % tmavší** – barva se smíchá s **černou** v poměru 70:30.
- Pokud se objekt **otáčí i posouvá**, aplikují se obě operace kombinovaně.

---

## Řešení

### Vertex shader

```glsl
attribute vec3 aPosition;
attribute vec3 aColor;

uniform mat4 uTransform; // transformační matice (model-view-projection)

varying vec3 vColor;

void main() {
    gl_Position = uTransform * vec4(aPosition, 1.0);
    vColor = aColor;
}
```

### Fragment shader

```glsl
precision mediump float;

varying vec3 vColor;

uniform bool uIsRotating;
uniform bool uIsTranslating;

void main() {
    vec3 finalColor = vColor;

    // Pokud se objekt otáčí, smícháme barvu s modrou (50%)
    if (uIsRotating) {
        finalColor = mix(finalColor, vec3(0.0, 0.0, 1.0), 0.5);
    }

    // Pokud se objekt posouvá, smícháme barvu s černou (30%)
    if (uIsTranslating) {
        finalColor = mix(finalColor, vec3(0.0), 0.3);
    }

    // Nastavíme průhlednost pouze při rotaci
    float alpha = uIsRotating ? 0.5 : 1.0;

    gl_FragColor = vec4(finalColor, alpha);
}
```

---

## Vysvětlení

- **Transfomace pozice:** provádí se ve vertex shaderu pomocí `uTransform`.
- **Barva:** je předána z vertex shaderu do fragment shaderu přes `varying`.
- **Logika transformací:** Shader sám nepozná, zda dochází k posunu nebo rotaci – tyto informace jsou předány z CPU části aplikace (`JavaScript`/`C++`/`OpenGL` atd.) jako uniformy `uIsRotating` a `uIsTranslating`.
- **Modifikace barvy:**
  - `mix(a, b, f)` lineárně interpoluje mezi `a` a `b` s váhou `f`.
  - Pokud rotace: barva se míchá s **modrou** – vizuální náznak průhlednosti.
  - Pokud translace: barva se míchá s **černou** – objekt vypadá tmavší.
  - Obě operace lze kombinovat.

---

## Možné rozšíření

- Automatická detekce změny transformační matice na CPU straně a nastavení uniform `uIsRotating` a `uIsTranslating`.
- Přidání efektů pro škálování nebo jiné typy transformací.

---

## Autor

Vytvořeno jako cvičení na GLSL shader programování.
