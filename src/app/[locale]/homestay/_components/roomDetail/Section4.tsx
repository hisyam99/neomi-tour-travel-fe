/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

export default function Section4({ roomId }: { roomId: string }) {
  return (
    <div className="py-8 w-full max-w-sm mx-auto lg:mx-0">
      <h2 className="text-xl font-semibold mb-6">BOOKING SEKARANG</h2>
      <form className="flex flex-col gap-4">
        <div className="form-control w-full">
          <label htmlFor="check-in" className="label">
            <span className="label-text">Check In</span>
          </label>
          <input id="check-in" type="date" className="input input-bordered w-full" />
        </div>
        <div className="form-control w-full">
          <label htmlFor="check-out" className="label">
            <span className="label-text">Check Out</span>
          </label>
          <input id="check-out" type="date" className="input input-bordered w-full" />
        </div>
        <button type="submit" className="btn btn-primary w-full mt-2">Booking Sekarang</button>
      </form>
    </div>
  );
} 