
# 🛠 Unreal Engine Blueprint Návod

Tento návod popisuje základní práci s Blueprints v Unreal Engine, tvorbu objektů, eventů, UI a nastavení GameMode pro jednoduchý herní projekt.

---

## 🔴 Základy Blueprintů

- **Události (Events)**:  
  Např. při stisknutí levého tlačítka myši → navazuje např. přehrání animace apod.

- **Tvorba eventu pro klávesu**:
  ```
  Pravým klikem → keyboard F → vytvoří se event note na stisk F
  ```

- **Pomůcky**:
  - `Print String` – výpis zprávy
  - `Alt + Click` – odstranění propojení
  - `Ctrl + D` – duplikace

---

## 🎯 Tvorba Blueprint Objektů

1. **Vytvoření Blueprintu**:
   - `Content → FirstPerson → pravý klik → Blueprint Class → Actor`
   - Pojmenovat např. `BP_Target`

2. **Vytvoření Static Mesh**:
   - Označit objekty → `Ctrl + klik` → `Convert actors to static mesh`
   - Pojmenovat např. `SM_Target`
   - Původní objekty lze odstranit

3. **Přidání Mesh do Blueprintu**:
   - Otevřít `BP_Target`
   - Přetáhnout `SM_Target` do `Components`

4. **Umístění do scény**:
   - Přetáhnout blueprint do scény
   - `Alt + táhnutí` → kopírování

---

## ⚙️ Event Graph a Kolize

- V `EventGraph` lze přidávat eventy (např. kliknutím v `Viewportu`)
- Nastavit kolizi (`Sphere → Collision`)
- V `BP_FirstPersonProjectile` přidat kontrolu kolize s targetem

---

## 🧩 GameMode Nastavení

1. **Vytvořit GameMode Blueprint**:
   - `Blueprint Class → GameModeBase → např. GM_TargetGame`
   - Nastavit `Default Pawn` na `BP_FirstPersonCharacter`

2. **World Settings**:
   - `Window → World Settings`
   - `GameMode Override` → zvolit `GM_TargetGame`

3. **HUD**:
   - `Blueprint Class → HUD → FirstPerson_HUD`
   - V `GM_TargetGame` nastavit `HUD` na `FirstPerson_HUD`

---

## 🎯 Scoring Logika

1. **Proměnné**:
   - Např. `CurrentScore`, `MaxScore`, `IsHit?`

2. **Kontrola zásahu**:
   - Použít `Branch` a `Boolean`
   - Pokud `IsHit == false`, nastavit na `true` a provést logiku

---

## 🖼 Uživatelské Rozhraní (UI)

1. **Vytvoření UI**:
   - `User Interface → Widget Blueprint → WBP_UI`
   - Přidat `Canvas Panel` a `Text`
   - `ScoreText` nastavit jako proměnnou (`Is Variable`)

2. **Zobrazení Widgetu**:
   - `Event BeginPlay` → `Create Widget (WBP_UI)` → `Add to Viewport`

3. **UpdateScore Event**:
   - `Custom Event: UpdateScore`
   - `SetText` pro `ScoreText` podle `CurrentScore`
   - Využít `Append` (A: "Score: ", B: aktuální skóre)

---

## ✅ Ukončení hry

1. **End Screen**:
   - `User Interface → Widget Blueprint → WBP_EndScreen`
   - Přidat `Text` a `Button` (pojmenovat `RestartButton`)

2. **Logika**:
   - `OnClicked` → `OpenLevel (FirstPersonMap)`
   - Přidat `BackgroundBlur` pro efekt

---

## 🔄 Animace a pohyb

- Např. `Move Component To` → pro plynulý pohyb objektu
- `Delay` → čekání mezi akcemi

---

## 📝 Poznámky

- Pro počítání skóre využít Blueprint propojení mezi `BP_Target` a `GM_TargetGame`
- Všechny proměnné nastavovat pečlivě jako `Editable` nebo `Expose on Spawn` dle potřeby
- Testovat každý krok v rámci vývoje pro správné napojení
