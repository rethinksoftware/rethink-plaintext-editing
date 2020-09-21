import React from 'react'
import "react-mde/lib/styles/css/react-mde-all.css";
import '../MarkdownEditor/style.css'
import '../components/PlaintextEditor/style.css'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}