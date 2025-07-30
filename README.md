# Chatbot Flow Builder

A drag-and-drop based flow builder built with [React Flow](https://reactflow.dev/). This tool allows users to visually build message flows (e.g., for chatbot or automation workflows) by connecting and editing text message nodes in a simple and intuitive UI.

## Features

- **Visual Node Editing** – Edit message content via a settings panel.
- **Drag-and-Drop Node Creation** – Add message nodes from the side panel.
- **Connect Nodes** – Create connections by linking source and target handles.
- **Arrow Markers** – Visual arrows on edges for clarity.
- **Delete Nodes/Edges** – Select and press `Backspace` or `Delete` to remove.
- **Validation and Save** – Basic check before saving the flow.

## Deployment Link
https://chatbot-flow-builder-red.vercel.app/

## Project Structure

```bash
src/
├── App.js                # Main app layout and logic
├── components/
│   ├── FlowCanvas.js     # React Flow canvas with nodes and edges
│   ├── NodePanel.js      # Draggable node components
│   ├── SaveButton.js     # Save flow with basic validation
│   ├── SettingPanel.js   # Node property editor
│   └── nodes/
│       └── TextNode.js   # Custom node type
```

---

## Keyboard Shortcuts

| Action        | Key                     |
| ------------- | ----------------------- |
| Delete Node   | `Delete` / `Backspace`  |
| Deselect Node | Click outside on canvas |

---

## Dependencies

- [`react-flow`](https://reactflow.dev/)
- [`react-icons`](https://react-icons.github.io/react-icons/)
- [`react-toast`](https://www.npmjs.com/package/react-toast)

Install them if missing:

```bash
npm install reactflow react-icons react-toast
```

