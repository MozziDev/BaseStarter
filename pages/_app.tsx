import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {theme} from "../src/lib/MateralUI";
import {ThemeProvider} from "@mui/material";
import Layout from '../src/components/Layout';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux'
import store, {persistor} from "../src/lib/ReduxStore/store";
import ProtectedRoute from "../src/helpers/ProtectedRoute";

export default function App({Component, pageProps}: AppProps) {
    return <>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <Layout>
                        <ProtectedRoute>
                            <Component {...pageProps} />
                        </ProtectedRoute>
                    </Layout>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </>
}
