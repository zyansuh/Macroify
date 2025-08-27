// 대리운전 앱 타입 정의

export interface Driver {
  id: string;
  name: string;
  phone: string;
  rating: number;
  location: {
    latitude: number;
    longitude: number;
  };
  isAvailable: boolean;
  carInfo: {
    model: string;
    licensePlate: string;
    color: string;
  };
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  rating: number;
}

export interface RideRequest {
  id: string;
  customerId: string;
  pickupLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
  destination: {
    latitude: number;
    longitude: number;
    address: string;
  };
  requestTime: Date;
  estimatedFare: number;
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  driverId?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

export type UserMode = "driver" | "customer";
