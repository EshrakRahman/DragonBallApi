import { Button } from "@/components/ui/button.tsx";

export default function CTA() {
  return (
    <section className="bg-black rounded-2xl mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14 -mb-20 relative z-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <h2 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl leading-tight lg:max-w-lg">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 lg:min-w-120">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-5 py-4 rounded-full bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/90"
          />
          <Button className="rounded-full px-8 py-4 bg-white h-full hover:text-white hover:bg-black/90 text-black hover:border-white/90 hover:cursor-pointer transition-all duration-300">
            Subscribe to Newsletter
          </Button>
        </div>
      </div>
    </section>
  );
}
