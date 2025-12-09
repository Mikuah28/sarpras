export default function Footer() {
  return (
    <footer className="relative mt-20 bg-linear-to-r from-[#1A4B6C] to-[#4A92CD]">
      
      {/* BLUE MAIN FOOTER */}
      <div className="bg-linear-to-r from-[#1A4B6C] to-[#4A92CD] text-white py-16 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">

          {/* LOGO SECTION */}
          <div className="flex justify-center md:justify-start">
            <div className="bg-[#D9D9D9] rounded-full w-54 h-54 flex justify-center items-center">
              <img
                src="/logo-sarpras.png"
                alt="Sarpras Logo"
                className="w-40 h-40 rounded-full shadow-lg"
              />
            </div>
          </div>

          {/* MENU LEFT */}
          <div className="flex flex-col gap-3 text-center md:text-left text-white/90">
            <a href="#" className="hover:underline">About Us</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms & Conditions</a>
          </div>

          {/* MENU RIGHT */}
          <div className="flex flex-col gap-3 text-center md:text-left text-white/90">
            <a href="#" className="hover:underline">Contact Us</a>
            <a href="#" className="hover:underline">FAQ</a>
          </div>
        </div>
      </div>

      {/* CURVED LOWER SECTION */}
      <div className="w-full h-8 rounded-t-4xl bg-[#d9d9d9] bottom-0 overflow-hidden">
        
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-sm text-black pb-4 -mt-6">
        © Julius Caesar Sulistio 2025
      </div>

    </footer>
  );
}
