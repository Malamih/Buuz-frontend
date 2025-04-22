import { Projects } from "./components/Projects"
import { Player } from "./components/Player"

const PortfolioPage = () => {
    return (
        <main className="bg-background text-onBackground">
            <Player />
            <Projects />
        </main>
    )
}

export default PortfolioPage