import React from 'react'
import LogoName from '../auth/LogoName'
import CardSelector from '../auth/CardSelector'

const LoginPage = () => {
  return (
    <div className='w-full min-h-screen relative flex flex-col items-center justify-center p-6 md:p-10 overflow-hidden' 
         style={{background: "#05070a"}}>
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Mesh Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12 md:gap-20 w-full max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-10 scale-110 md:scale-125">
            <LogoName />
          </div>
          
          <div className='space-y-6'>
            <h1 className="text-white font-black text-5xl md:text-8xl tracking-tight leading-[0.9]">
              Local Trade <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-orange-400">
                Redefined.
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Bridging the gap between neighborhood shops and digital convenience. 
              Pick your portal to start your journey.
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <CardSelector />
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className='flex items-center gap-4'>
            <div className='h-[1px] w-12 bg-gray-800'></div>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Trusted local network</p>
            <div className='h-[1px] w-12 bg-gray-800'></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
             <div className="text-white font-black italic text-2xl tracking-tighter">LOCALPAY</div>
             <div className="text-white font-black italic text-2xl tracking-tighter">TRUSTSHIP</div>
             <div className="text-white font-black italic text-2xl tracking-tighter">FASTMOVE</div>
             <div className="text-white font-black italic text-2xl tracking-tighter">SHOPSYNC</div>
          </div>
        </div>
      </div>

      {/* Footer Minimal */}
      <div className="absolute bottom-8 left-0 w-full px-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 text-[9px] font-bold uppercase tracking-[0.3em]">© 2026 DUKAAN WALLAH PLATFORMS</p>
        <div className='flex gap-6'>
          <a href="#" className='text-gray-600 hover:text-white text-[9px] font-bold uppercase tracking-widest transition-colors'>Terms</a>
          <a href="#" className='text-gray-600 hover:text-white text-[9px] font-bold uppercase tracking-widest transition-colors'>Privacy</a>
          <a href="#" className='text-gray-600 hover:text-white text-[9px] font-bold uppercase tracking-widest transition-colors'>Support</a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage