import Container from "@/components/layout/Container.tsx";
import {Button} from "@/components/ui/button.tsx";
import HeaderImg from "@/assets/headerModel.png";
import LogoBar from "@/components/header/LogoBar.tsx";

export default function Header() {
    return (
        <header className="bg-[#F2F0F1] py-10 lg:pt-14">
            <Container>
                <section className="lg:flex">
                    <div className="lg:w-2/3 lg:flex lg:flex-col lg:justify-center lg:items-start lg:gap-6 ">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-black font-bold text-wrap w-3/4 md:w-2/3 lg:text-6xl lg:leading-15 lg:w-3/4  text-4xl leading-10 font-primary ">
                                FIND CLOTHES THAT MATCHES YOUR STYLE
                            </h1>
                            <p className='font-normal leading-5 text-base lg:w-5/6 text-black/60'>
                                Browse through our diverse range of meticulously crafted garments, designed to bring out
                                your individuality and cater to your sense of style.
                            </p>
                            <Button className='w-full lg:w-fit py-6 rounded-full lg:px-10 hover:bg-background hover:text-black hover:cursor-pointer hover:border-black transition-all duration-300'> Shop
                                                                                                                                                                                                     Now </Button>
                        </div>
                        <div className="stats flex flex-wrap md:flex-nowrap self-center lg:self-start md:items-center py-6 gap-6 justify-center ">
                            <div className="brands w-1/3 md:w-full border-r-2 border-black/10">
                                <p className="font-primary font-bold text-black">200+</p>
                                <p className="font-primary font-normal text-xs text-black/60">International Brands</p>
                            </div>
                            <div className="products w-1/3 md:w-full border-r-2 border-black/10">
                                <p className="font-primary font-bold text-black">2,000+</p>
                                <p className="font-primary font-normal text-xs text-black/60">High Quality Products</p>
                            </div>
                            <div className="customers w-1/3 md:w-full">
                                <p className="font-primary font-bold text-black">30,000+</p>
                                <p className="font-primary font-normal text-xs text-black/60">Happy Customers</p>
                            </div>
                        </div>
                    </div>
                    <div className="img lg:w-1/3">
                        <img
                            className=""
                            src={HeaderImg}
                            alt="Header img"
                        />
                    </div>
                </section>
                <LogoBar />
            </Container>
        </header>
    )
}