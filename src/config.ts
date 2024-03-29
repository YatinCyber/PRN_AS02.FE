// types
// import { DefaultConfigProps } from '@/types/config';

import i18n from "./utils/lang/i18n";

export const drawerWidth = 250;

export const twitterColor = "#1DA1F2";
export const facebookColor = "#3b5998";
export const linkedInColor = "#0e76a8";

export const FIREBASE_API = {
  apiKey: "",
  authDomain: "mantis-4040b.firebaseapp.com",
  projectId: "mantis-4040b",
  storageBucket: "mantis-4040b.appspot.com",
  messagingSenderId: "1073498457348",
  appId: "1:1073498457348:web:268210e18c8f2cab30fc51",
  measurementId: "G-7SP8EXFS48",
};

export const AWS_API = {
  poolId: "us-east-1_AOfOTXLvD",
  appClientId: "3eau2osduslvb7vks3vsh9t7b0",
};

export const JWT_API = {
  secret: "SECRET-KEY",
  timeout: "1 days",
};

export const AUTH0_API = {
  client_id: "7T4IlWis4DKHSbG8JAye4Ipk0rvXkH9V",
  domain: "dev-w0-vxep3.us.auth0.com",
};

// ==============================|| THEME CONFIG  ||============================== //

const config = {
  defaultPath: "/sample-page",
  // fontFamily: `'Public Sans', sans-serif`,
  fontFamily: `'Inter', sans-serif`,
  i18n: i18n.language,
  miniDrawer: false,
  container: false,
  mode: "light",
  presetColor: "default",
  themeDirection: "ltr",
};

export default config;
