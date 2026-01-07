const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://apirace.eurekagroup.id/";

export interface StatusKendaraan {
  status: string;
  keterangan: string;
  date: string;
  foto: string;
  memo: string | null;
}

export interface PositionDriver {
  latitude: number;
  longitude: number;
  address: string;
  lastUpdate: string;
}

export interface AlamatLocation {
  alamat: string;
  lat: number;
  long: number;
  pic: string;
}

export interface TrackingData {
  idMsm: number;
  idMpd: number;
  msm: string;
  sp: string;
  jenis_kiriman: string;
  keterangan: string;
  sjErl: string;
  invErl: string;
  receiveDate: string;
  salesErl: string;
  cabang: string;
  sekolahTujuan: string;
  kecamatan: string;
  kota: string;
  jenisBarang: string;
  qty: number;
  ikat: number;
  berat: number;
  koli: number;
  customer: string;
  jenisKendaraan: string;
  nopol: string;
  driverId: number;
  driver: string;
  telp: string;
  statusKendaraan: StatusKendaraan[];
  positionDriverNow: PositionDriver;
  alamatMuat: AlamatLocation;
  alamatBongkar: AlamatLocation;
  detailFaktur: any[];
}

export interface TrackingResponse {
  status: {
    code: number;
    message: string;
  };
  data: TrackingData[];
}

export async function getTrackingDetails(
  msm: string,
  searchType: string = "msm"
): Promise<TrackingResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}sp/get-sm-detail?msm=${encodeURIComponent(msm)}&searchType=${searchType}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tracking details:", error);
    throw error;
  }
}
