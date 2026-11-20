import { Children } from "react";
import { PageWrapper } from "./components/PageWrapper";
import { Container } from "./components/Container";
import { Header } from "./components/Header";

const tech = 'React, Tailwind and Vite'


export function App() {
    return (
        // Creating components to maintain clean code
        <PageWrapper>
            {/* Max width container */}
            <Container>

                <Header />

                {/* .... */}

            </Container>

        </PageWrapper>
    );
}