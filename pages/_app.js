
import React, { useEffect } from "react";
import { AuthProvider } from "../Firebase/FirebaseAuth";

import { useRouter } from 'next/router'

import Nav from "../components/Nav"
import Footer from "../components/Footer"


import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";

import "../style.css"


export default function MyApp(props) {
  const { Component, pageProps } = props;

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);


  return (
    
    
    <React.Fragment>
      

      <ThemeProvider theme={theme}>
      <CssBaseline />
        <AuthProvider>
          <Nav />
            <Component {...pageProps} />
          <Footer />
        </AuthProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
