import React from "react";

export default function Section2({ roomId }: { roomId: string }) {
  return (
    <div className="py-8">
      <div className="mb-4">
        <div className="text-2xl font-semibold">Rp.9000</div>
        <div className="text-xs text-base-content/60">Per Malam</div>
      </div>
      <div className="divider"></div>
      <div className="mb-4 text-sm text-base-content/80">
        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
      </div>
      <div className="mb-4 text-sm text-base-content/80">
        The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn't listen. She packed her seven versalia, put her initial into the belt and made herself on the way.
      </div>
    </div>
  );
} 