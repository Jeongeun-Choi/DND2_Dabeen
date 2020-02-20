import React from "react";
import Document, { Main, NextScript } from "next/document";
import Helmet from "react-helmet";
import { ServerStyleSheet, createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=fallback');
       html, body {
            height: 100%;
            overflow: auto;
            font-family: "Noto Sans KR", sans-serif;
          }
          #__next {
            height: 100%;
          }
`;
class MyDocument extends Document {
  static getInitialProps(context) {
    const sheet = new ServerStyleSheet();
    const page = context.renderPage(App => props =>
      sheet.collectStyles(
        <>
          <GlobalStyles />
          <App {...props} />
        </>
      )
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, helmet: Helmet.renderStatic(), styleTags };
  }
  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();
    return (
      <html {...htmlAttrs}>
        <head>
          {this.props.styleTags}
          {Object.values(helmet).map(el => el.toComponent())}
        </head>
        <body {...bodyAttrs}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
