import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "font-awesome/css/font-awesome.min.css";
import "./style.css";

import { config as configFA } from "@fortawesome/fontawesome-svg-core";
configFA.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>KVS</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default MyApp;
