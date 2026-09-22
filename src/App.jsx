import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

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

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.3,
        });

        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);

    return (
        <>
            <Navbar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            <Home />
            <About name="Ellie Franz" />
            <Skills skills={["HTML", "CSS", "JavaScript", "React"]} />
            <Projects project="Our Little World" />
            <Journey experience="an IT student" />
            <Certificates
                certificate1="..."
                certificate2="..."
            />
            <Contact
                email="elliefranzm.gabutin@gmail.com"
                phone="09953216734"
            />
            <Footer />
        </>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/admin" element={<Analytics />} />
        </Routes>
    );
}

export default App;
