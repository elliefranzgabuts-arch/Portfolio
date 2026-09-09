import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Section from "./components/Section";

function App() {

    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        document.title = "Ellie Franz | Portfolio";
    }, []);

    return (
        <>
            <Navbar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            <Home />

            <About name="Ellie Franz" />

            <Skills
                skills={["HTML", "CSS", "JavaScript", "React"]}
            />

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

            <Section title="Test Section">
                <p>Hello from children!</p>
            </Section>
        </>
    );
}

export default App;