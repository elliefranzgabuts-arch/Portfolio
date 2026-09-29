import { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Analytics from "./components/Analytics";

function Portfolio() {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        document.title = "Ellie Franz | Portfolio";
    }, []);

    useEffect(() => {
        const sections = document.querySelectorAll("section[id]");

        if (!sections.length) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    );

                if (visibleSections.length > 0) {
                    setActiveSection(visibleSections[0].target.id);
                }
            },
            {
                threshold: [0.2, 0.3, 0.5, 0.7],
                rootMargin: "-10% 0px -45% 0px",
            }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <Navbar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            <main>
                <Home />

                <About
                    name="Ellie Franz"
                />

                <Skills />

                <Projects
                    project="Our Little World"
                />

                <Journey
                    experience="an IT student"
                />

                <Certificates
                    certificate1="..."
                    certificate2="..."
                />

                <Contact
                    email="elliefranzm.gabutin@gmail.com"
                    phone="09953216734"
                />
            </main>

            <Footer />

            <Link
                to="/admin"
                aria-label="Admin"
                className="fixed bottom-2 right-2 z-[100] flex h-7 w-7 items-center justify-center rounded-full text-white/10 opacity-0 transition-all duration-300 hover:opacity-40"
            >
                <span className="text-[10px]">
                    ◈
                </span>
            </Link>
        </>
    );
}

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Portfolio />}
            />

            <Route
                path="/admin"
                element={<Analytics />}
            />
        </Routes>
    );
}

export default App;
