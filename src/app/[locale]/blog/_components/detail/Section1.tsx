import React from "react";

export default function Section1() {
  return (
    <div 
      className="relative min-h-[300px] md:min-h-[400px] flex items-center"
      style={{
        backgroundImage: "url(https://picsum.photos/1920/600?random=60)",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="hero-overlay absolute inset-0 bg-neutral/60"></div>
      <div className="container mx-auto relative z-10 px-4 py-12 flex items-center">
        <div className="max-w-xl text-left text-neutral-content">
          <h1 className="mb-4 text-5xl italic">Blog Detail</h1>
          <p className="mb-2">Nikmati pengalaman liburan tak terlupakan dengan kemampuan expert di ranah sendiri. Dari pengalaman hingga pandai, kami siap menemani setiap langkah perjalanan Anda.</p>
          <button className="btn btn-outline btn-neutral flex items-center gap-2 mt-4">
            <span className="w-3 h-3 rounded-full bg-neutral"></span>
            PLAY VIDEO
          </button>
        </div>
      </div>
    </div>
  );
} 