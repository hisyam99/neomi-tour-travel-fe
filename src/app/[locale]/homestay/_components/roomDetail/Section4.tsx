"use client";

import React, { useEffect, useCallback, useState } from "react";
import { homestaysService } from "@/services/homestays";
import { useApi } from "@/hooks/useApi";
import { Homestay, ApiResponse } from "@/types";

interface Props {
  roomId: number;
}

export default function Section4({ roomId }: Props) {
  const [bookingData, setBookingData] = useState({
    checkin: "",
    checkout: "",
    guests: "1"
  });

  const fetchHomestay = useCallback(() => homestaysService.getById(roomId), [roomId]);
  const { data, loading, error, execute } = useApi<ApiResponse<Homestay>, []>(fetchHomestay);

  useEffect(() => {
    execute();
  }, [execute]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const buildChatUrl = (baseUrl: string) => {
    const params = new URLSearchParams();
    if (bookingData.checkin) params.append('checkin', bookingData.checkin);
    if (bookingData.checkout) params.append('checkout', bookingData.checkout);
    if (bookingData.guests) params.append('guests', bookingData.guests);
    
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${params.toString()}`;
  };

  if (loading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-base-200 rounded w-1/2"></div>
            <div className="h-10 bg-base-200 rounded"></div>
            <div className="h-10 bg-base-200 rounded"></div>
            <div className="h-10 bg-base-200 rounded"></div>
            <div className="h-12 bg-base-200 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="text-error">Error loading homestay: {error.message}</div>;
  }

  if (!data?.data) {
    return <div className="text-center">Homestay not found</div>;
  }

  const homestay = data.data;
  const details = homestay.details;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-base-200 rounded-xl p-6 shadow">
          <h3 className="font-bold text-xl mb-4">Book Now</h3>
          <div className="space-y-4">
            {/* <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Your email"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label htmlFor="message" className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                id="message"
                className="textarea textarea-bordered h-24"
                placeholder="Your message"
              ></textarea>
            </div> */}
            <div className="form-control">
              <label htmlFor="checkin" className="label">
                <span className="label-text">Check-in Date</span>
              </label>
              <input 
                id="checkin"
                type="date" 
                className="input input-bordered w-full"
                value={bookingData.checkin}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="form-control">
              <label htmlFor="checkout" className="label">
                <span className="label-text">Check-out Date</span>
              </label>
              <input 
                id="checkout"
                type="date" 
                className="input input-bordered w-full"
                value={bookingData.checkout}
                onChange={handleInputChange}
                min={bookingData.checkin || new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="form-control">
              <label htmlFor="guests" className="label">
                <span className="label-text">Number of Guests</span>
              </label>
              <select 
                id="guests"
                className="select select-bordered w-full"
                value={bookingData.guests}
                onChange={handleInputChange}
              >
                {Array.from({ length: details.max_guest }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
            <div className="divider"></div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Price:</span>
              <span className="text-xl font-bold">Rp {parseInt(details.price).toLocaleString()}</span>
            </div>
            <a
              href={buildChatUrl(details.chat_url)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 