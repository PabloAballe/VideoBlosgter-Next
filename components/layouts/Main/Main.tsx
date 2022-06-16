import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import * as constants from "../../../constants";
import { NavBar } from "../../common/NavBar/NavBar";
import { MainStyles } from "./Main.styles";
import { useWindowSize } from "../../../utils/useWindowsSize";

interface MainProps {
  children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => {
  const size = useWindowSize();
  return (
    <MainStyles>
      <div data-theme="light">
        <Head>
          <title>{constants.site.name}</title>
          <meta name="description" content={constants.site.desc} />
          <link rel="icon" href={`/${constants.site.icon}`} />
        </Head>

        <main
          className={size.width > 768 ? "flex justify-start gap-4 p-4" : "p-4"}
        >
          <NavBar />
          <div className="main-container overflow-y-auto">{children}</div>
        </main>
      </div>
    </MainStyles>
  );
};

Main.propTypes = {};
