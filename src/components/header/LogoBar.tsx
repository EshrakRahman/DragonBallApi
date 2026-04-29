import Ck from '@/assets/ck.png';
import Prada from '@/assets/parada.png';
import Gucci from '@/assets/gucci.png';
import Zara from '@/assets/zara.png';
import Versace from '@/assets/ver.png';

export default function LogoBar() {
    return (
        <section className="logo-bar p-4 bg-black flex md:flex md:justify-between md:items-center flex-wrap md:flex-nowrap gap-4 md:px-6 md:py-6">

            <div className="w-1/5">
                <img
                    src={Gucci}
                    alt="brand logo"
                />
            </div>
            <div className="w-1/5">
                <img
                    src={Zara}
                    alt="brand logo"
                />
            </div>
            <div className="w-2/5 md:w-1/5">
                <img
                    src={Versace}
                    alt="brand logo"
                />
            </div>
            <div className="w-1/5">
                <img
                    src={Ck}
                    alt="brand logo"
                />
            </div>
            <div className="w-1/5">
                <img
                    src={Prada}
                    alt="brand logo"
                />
            </div>
        </section>
    )
}