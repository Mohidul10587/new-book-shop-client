import { createContext, useState } from "react";
import Layout from "@/components/Layout";
import "@/styles/globals.css";

export const ThemeContext = createContext();

export default function App({ Component, pageProps }) {
  const [admin, setAdmin] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="bg-white text-black">
      <ThemeContext.Provider
        value={{ admin, setAdmin, searchText, setSearchText }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeContext.Provider>
    </div>
  );
}
