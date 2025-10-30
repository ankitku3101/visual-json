# JSON Tree Visualizer

A sleek and interactive web application built with Next.js and React Flow that allows you to paste, upload, or edit JSON data and instantly visualize it as a hierarchical tree diagram. Includes features like JSON path search, node highlighting, click-to-copy-path, and image export.

![JSON Tree Visualizer Screenshot](https://github.com/ankitku3101/visual-json/blob/main/screenshot.png)

---

## Key Features

* **Interactive Visualization:** Renders any valid JSON into an interactive node-based tree using **React Flow**.
* **Pan & Zoom:** Easily navigate large JSON structures with panning and zooming controls.
* **JSON Path Search:** Search for specific nodes using standard JSON path notation (e.g., `$.user.name` or `$.items[1].price`).
* **Node Highlighting:** Automatically highlights and focuses on the searched node for easy identification.
* **Click-to-Copy Path:** Click any node on the canvas to instantly copy its full JSON path to your clipboard.
* **Node Details on Hover:** Hover over a node to see its full path and value in a tooltip.
* **Export to Image:** Download your current tree visualization as a high-quality PNG image.
* **Real-time Editing:** Paste or edit JSON data in the text area and click "Visualize" to update the tree.
* **File Upload:** Upload a `.json` file directly from your computer.
* **Dark/Light Mode:** Includes a theme toggle, built with `next-themes` and `shadcn/ui`.
* **Error Handling:** Provides clear feedback for invalid JSON syntax.

---

## Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (v16 App Router)
* **Visualization:** [React Flow (@xyflow/react)](https://reactflow.dev/)
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Image Export:** [html-to-image](https://github.com/bubkoo/html-to-image)
* **Notifications:** [react-hot-toast](https://react-hot-toast.com/)
* **Utilities:** `clsx`, `tailwind-merge`

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) (v20+) and `npm` (or `yarn`/`pnpm`) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/visual-json.git](https://github.com/your-username/visual-json.git)
    cd visual-json
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```
    *(or `yarn install` / `pnpm install`)*

3.  **Run the development server:**
    ```sh
    npm run dev
    ```

4.  **Open the application:**
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the running application.

---

## How to Use

1.  **Paste or Upload JSON:**
    * Paste your JSON data into the text area on the left sidebar.
    * Alternatively, click the file input to upload a `.json` file from your device.

2.  **Visualize:**
    * Click the **"Visualize Tree"** button. The tree diagram will render on the right-hand canvas.
    * A default sample JSON is loaded on initialization.

3.  **Explore the Tree:**
    * **Drag** the canvas to pan.
    * Use your mouse **scroll wheel** or the on-screen controls to zoom in and out.
    * Click **"Fit View"** (in the controls) to reset the viewport.

4.  **Search for Nodes:**
    * In the "Search by JSON Path" input, type a valid path (e.g., `$.user.address.city`).
    * The matching node will be highlighted in yellow.
    * A message will confirm if a match was "Found" or "Not found."

5.  **Interact with Nodes:**
    * **Click** any node to copy its complete JSON path (e.g., `$.items[0]`) to your clipboard.
    * **Hover** over a node to see its path and value (if it's a primitive).

6.  **Export:**
    * Click the **"Export as Image"** button to download a PNG of the current visualization.

7.  **Clear:**
    * Click **"Clear All"** to reset the JSON input and search bar.

---

## Project Structure

Here is a brief overview of the key files and directories in this project:
```sh
visual-json/
├── app/
│   └── page.tsx                # Main page component — defines the overall layout and structure
│
├── components/
│   ├── CanvasArea.tsx          # Core React Flow logic — renders JSON as a node graph, handles interactions & highlighting
│   ├── JsonInput.tsx           # JSON input component with support for manual entry and file upload
│   ├── SearchBar.tsx           # Input field for JSON path search functionality
│   ├── Sidebar.tsx             # Left-hand sidebar containing input, search, and action buttons
│   ├── ThemeToggle.tsx         # Light/Dark mode toggle using next-themes
│   └── ui/                     # Reusable shadcn/ui components (Button, Input, Textarea, etc.)
│
├── lib/
│   └── jsonUtils.ts            # Utility logic to convert JSON into React Flow nodes and edges
│
└── package.json                # Project dependencies, scripts, and metadata
```

## TODO

* Improve the Export feature with better customisations.
* Make it ready-to-use for mobile-screens.
* Add more interactivity in Canvas.
* Give option for user-custom themes. 
* Give option for user-defined tree layout: vertical/horizontal or any other custom defined.