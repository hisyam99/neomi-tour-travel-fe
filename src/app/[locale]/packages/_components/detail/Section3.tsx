import React from "react";

export default function Section3() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Detail */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="font-bold text-lg mb-2">Detail</h2>
              <p className="text-base-content/80 text-sm mb-2">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts...</p>
              <p className="text-base-content/80 text-sm">The Big Oxmox advised her not to do so, because there were thousands of bad Commas...</p>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Price Includes</h3>
              <ul className="list-disc ml-6 text-sm text-base-content/80">
                <li>Air fares</li>
                <li>3 Nights Hotel Accommodation</li>
                <li>On Trip Transport</li>
                <li>2 Meals / day</li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">What to Expect</h3>
              <ul className="list-disc ml-6 text-sm text-base-content/80">
                <li>View the City Walk</li>
                <li>Biking for the locals</li>
                <li>Discover famous new project &quot;The Lark&quot;</li>
                <li>Sunset on the cruise</li>
              </ul>
            </div>
          </div>
          {/* Right: Booking */}
          <div className="w-full md:w-80">
            <div className="bg-base-200 rounded-xl p-6 shadow flex flex-col gap-4">
              <div className="font-bold mb-2">BOOKING SEKARANG</div>
              <label className="form-control w-full">
                <span className="label-text mb-1">Tanggal</span>
                <input type="date" className="input input-bordered input-sm w-full" />
              </label>
              <button className="btn btn-neutral mt-2">Hubungi Kami</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 