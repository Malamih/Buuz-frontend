import { Projects } from "../components/Projects"
import { Services } from "../components/Services"
import { Value } from "../components/Value"
import { Hero } from "./components/Hero"

const ServicesPage = () => {
    return (
        <>
            <Hero />
            <Services classes="bg-onBackground text-background" title={false} />
            <Projects />
            <Value />
        </>
    )
}

export default ServicesPage