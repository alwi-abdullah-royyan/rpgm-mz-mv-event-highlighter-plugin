# ✨ RPG Maker MV/MZ Event Highlighter Plugin

This plugin visually highlights all triggerable events on the map in **RPG Maker MV/MZ**.

---

## 🎯 Purpose

Makes it easier to **spot interactable events** on a map by rendering a **highlight behind each**:

- 🔶 Yellow = General interactable (Action Button / Touch)
- 🟦 Cyan = Events with "Show Picture" (likely cutscenes or visual cues)

Ideal for:
- Debugging
- Modding
- Accessibility
- Exploration-heavy games

---

## 🔧 Installation

1. Place the `.js` file in your project's `js/plugins` folder.
2. Open **Plugin Manager**.
3. Click **"Add"**, choose this plugin, and click **"ON"**.
4. Done!

---

## 💡 How it works

- Hooks into the `Spriteset_Map` lifecycle
- Highlights any event page that:
  - Has trigger `Action Button`, `Player Touch`, or `Event Touch`
  - Contains any event commands
- Updates highlight positions every frame
- Refreshes highlights on map load

---

## 🔍 Visual Behavior

| Highlight Color | Meaning                          |
|-----------------|----------------------------------|
| 🟡 Yellow       | Basic interactable event         |
| 🟦 Cyan         | Event includes "Show Picture"    |

---

## 📦 Compatibility

- ✅ RPG Maker MV
- ✅ RPG Maker MZ  
- 🔄 Should work with most maps and event setups

> ⚠️ May conflict with custom map renderers or tilemap replacements. Test accordingly.

---

## 📜 License

MIT — Free to use, modify, and distribute.

---

## 🙋 Suggestions / Issues?

Feel free to open an issue or fork it for your own project.
