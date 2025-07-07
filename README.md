# Booking Form App

built with React, Vite, Material UI, react-hook-form.


## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or newer recommended, I use v22)
- npm

### Installation

copy repository

```bash
npm install
```

### Running the Application (Development)

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Running Unit Tests
```bash
npm run test
```

### Running E2E Tests
```bash
npm run test:e2e
```

---

## 🏗️ Architecture & Design Decisions

In a real-life scenario, I probably wouldn't need to render a 100-item list all at once - I'd use infinite scroll or pagination to show just part of it. But since the requirements suggested optimizing performance with other tips, I assumed the challenge was about that. I focused on the INP metric, trying to keep it under 200ms when interacting with a 100-item list. For this, I used some performance hooks from React 18, like `startTransition` and `useDeferredValue` as well as suggested hook useFieldArray, memoization, lazy loading. 

For the UI, I used existing booking websites as a reference, and the UI is mobile-friendly. Nothing fancy though. 

I mocked API calls by adding some delay to the services. I also imagined the logic for deriving the “Arrival Station” from the “Destination Station” and mocked that in my stationService.

I used react-day-picker instead of MUI’s date picker since it's lighter and saved me dozens of ms on the INP metric.
  
---

## ⚠️ Known Limitations & Areas for Improvement

- **Validation**: Currently uses only built-in validation from `react-hook-form`. Schema-based validation (e.g., with `yup`) could be added for more complex rules.
- **No Backend/API**: All data is mocked or handled in-memory. Adding BE would require additional error handling and processing responses, error messages etc.
- **State Management**: No dedicated state management library is used, as the app is a single form with local state. If the application grows, a state management solution (e.g., Redux, Zustand, React Context, React Query) is required. 
- **Testing Coverage**: Only core flow is tested. More edge cases and negative scenarios could be covered.
- **Error Handling**: More error handling is required.
- **Inline Styles**: Some components use inline CSS for quick styling. 
- **Accessibility**: Would be nice to go throw app and test it separately in terms of accessibility.
- **Code Formatting**: No Prettier is set up, so styles and formatting aren’t consistent across files. 
- **Emojis Usage**: I just used emojis instead of proper, cross-browser icons.


