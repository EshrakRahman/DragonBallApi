import ModelImg from '@/assets/model.png';
import {clsx} from "clsx";

type Props = {
    className: string;
}
export default function CtgCard({className}: Props) {
    return(
        <>
            <section className={clsx("ctg-card  bg-yellow-500 rounded-xl relative w-full lg:h-73 h-48  overflow-hidden", className)}>
                <div className="card  flex py-8">
                    <div className="left w-1/3 px-6">
                        <h3 className="font-primary font-bold text-2xl text-black">Casual</h3>
                    </div>
                    <div className="img w-2/3">
                        <img className="w-full h-auto object-contain scale-150"
                            src={ModelImg}
                            alt="Model image"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}