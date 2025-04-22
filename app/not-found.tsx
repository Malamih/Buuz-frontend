import { Button } from "@/components/Button"
import Link from "next/link"

const NotFound = () => {
    return <div className="notFound w-full h-[calc(100vh-100px)] flex flex-col items-center justify-center">
        <h1 className="text-4xl mb-8 font-black w-full text-center mx-auto">Sorry, this page is <span className="text-primary">not found</span>.</h1>
        <Link href={"/"}>
            <Button content="Go back home" classes="border-black rounded-lg" iconClasses="bg-black" />
        </Link>
    </div>
}

export default NotFound