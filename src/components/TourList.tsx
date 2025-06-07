import { useEffect } from 'react';
import { tourAndTravelService, TourAndTravel } from '../services/tourAndTravel';
import { useApi } from '../hooks/useApi';

export default function TourList() {
  const { data: tours, loading, error, execute } = useApi<TourAndTravel[]>(
    tourAndTravelService.getAll
  );

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tours?.map((tour) => (
        <div key={tour.id} className="border rounded-lg p-4 shadow-sm">
          {/* Add your tour card content here */}
          <h3 className="text-lg font-semibold">Tour {tour.id}</h3>
          {/* Add more tour details based on your TourAndTravel interface */}
        </div>
      ))}
    </div>
  );
} 