import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { store } from './store/store.js'
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import { ToastContainer } from 'react-toastify'
import AnimatedCursor from 'react-animated-cursor'
import CursorTrail from './components/CursorTrail.jsx'

let persistor = persistStore(store);

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-center p-4">Something went wrong. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ToastContainer position="top-right" autoClose={3000}/>
          {/* <AnimatedCursor
            innerSize={8}
            outerSize={35}
            innerScale={1}
            outerScale={1.7}
            outerAlpha={0}
            hasBlendMode={true}
            innerStyle={{
              backgroundColor: 'var(--cursor-color)'
            }}
            outerStyle={{
              border: '3px solid var(--cursor-color)'
            }}
          />           */}
          <App />
          <CursorTrail/>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
)
  