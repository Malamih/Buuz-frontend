import Image from "next/image";

type props = {
    title: string;
    thumbnail: string;
}

export const Project = ({ title, thumbnail }: props) => {
    return (
        <div className="project">
            <div className="thumbnail">
                <Image src={thumbnail} alt="thumbnail" width={215} height={226} />
            </div>
            <h1 className="text-center text-xl">{title}</h1>
        </div>
    )
}