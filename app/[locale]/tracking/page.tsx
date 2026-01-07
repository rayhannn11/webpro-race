"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { getTrackingDetails, TrackingData } from "@/lib/api";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Package, Search, Truck } from "lucide-react";

export default function TrackingPage() {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const debouncedSearch = useDebounce(searchValue, 800);

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setTrackingData(null);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await getTrackingDetails(searchValue, "msm");

      if (response.status.code === 200 && response.data.length > 0) {
        setTrackingData(response.data[0]);
      } else {
        setTrackingData(null);
        setError("Data tidak ditemukan");
      }
    } catch (err) {
      setError("Gagal memuat data tracking");
      setTrackingData(null);
    } finally {
      setLoading(false);
    }
  };

  // Trigger search when user clicks button
  const onSearchClick = () => {
    handleSearch();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Search Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Tracking Pengiriman
            </h1>
            <div className="flex gap-3">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && onSearchClick()}
                placeholder="Masukkan nomor resi / surat jalan / faktur..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={onSearchClick}
                disabled={loading || !searchValue.trim()}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat data tracking...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && hasSearched && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Empty State - Show when no search has been made */}
          {!hasSearched && !loading && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full flex items-center justify-center">
                      <Truck className="w-16 h-16 text-orange-500" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Search className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Lacak Pengiriman Anda
                </h3>
                <p className="text-gray-600">
                  Masukkan nomor resi, surat jalan, atau faktur untuk melacak
                  paket Anda
                </p>
              </div>
            </div>
          )}

          {/* Results */}
          {trackingData && !loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Side - Detail of delivery */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-orange-500 mb-6">
                  Detail of delivery
                </h2>

                <div className="space-y-6">
                  {/* Alamat Asal */}
                  <div>
                    <h3 className="text-xs uppercase font-bold text-gray-500 tracking-wide mb-2">
                      Alamat Asal
                    </h3>
                    <p className="text-gray-900 font-semibold text-base">
                      {trackingData.alamatMuat.pic}
                    </p>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                      {trackingData.alamatMuat.alamat || "-"}
                    </p>
                  </div>

                  {/* Alamat Tujuan */}
                  <div>
                    <h3 className="text-xs uppercase font-bold text-gray-500 tracking-wide mb-2">
                      Alamat Tujuan
                    </h3>
                    <p className="text-gray-900 font-semibold text-base">
                      {trackingData.alamatBongkar.pic}
                    </p>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                      {trackingData.alamatBongkar.alamat}
                    </p>
                  </div>

                  {/* Ikat/Koli/Qty/Berat */}
                  <div>
                    <h3 className="text-xs uppercase font-bold text-gray-500 tracking-wide mb-2">
                      Ikat/Koli/Qty/Berat
                    </h3>
                    <p className="text-gray-900 font-semibold text-base">
                      {trackingData.ikat}/{trackingData.koli}/{trackingData.qty}
                      /{trackingData.berat}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Map & Driver Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-gray-100 rounded-lg h-64 mb-4 flex items-center justify-center overflow-hidden">
                  {trackingData.positionDriverNow.latitude &&
                  trackingData.positionDriverNow.longitude ? (
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${trackingData.positionDriverNow.latitude},${trackingData.positionDriverNow.longitude}&zoom=15`}
                      allowFullScreen
                    />
                  ) : (
                    <p className="text-gray-500">Map tidak tersedia</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs uppercase font-bold text-gray-500 tracking-wide mb-1">
                      Nama Driver
                    </p>
                    <p className="text-gray-900 font-semibold text-base">
                      {trackingData.driver || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-gray-500 tracking-wide mb-1">
                      No Telp Driver
                    </p>
                    <p className="text-gray-900 font-semibold text-base">{trackingData.telp || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-gray-500 tracking-wide mb-1">
                      Jenis Kendaraan
                    </p>
                    <p className="text-gray-900 font-semibold text-base">
                      {trackingData.jenisKendaraan || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-gray-500 tracking-wide mb-1">Nopol</p>
                    <p className="text-gray-900 font-semibold text-base">{trackingData.nopol || "-"}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 ">
                  <p className="text-xs uppercase font-bold text-gray-500 tracking-wide mb-2">
                    Lokasi Driver Terkini
                  </p>
                  <p className="text-sm text-gray-900 font-medium leading-relaxed">
                    {trackingData.positionDriverNow.address ||
                      "Lokasi tidak tersedia"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Update terakhir:{" "}
                    {formatDate(trackingData.positionDriverNow.lastUpdate)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* History Pengiriman */}
          {trackingData &&
            !loading &&
            !error &&
            trackingData.statusKendaraan.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-2xl font-bold text-orange-500 mb-6">
                  History Pengiriman
                </h2>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-orange-500 bg-gray-50">
                        <th className="text-left py-4 px-6 text-xs uppercase font-bold text-gray-700 tracking-wider">
                          Update Date
                        </th>
                        <th className="text-left py-4 px-6 text-xs uppercase font-bold text-gray-700 tracking-wider">
                          Status
                        </th>
                        <th className="text-left py-4 px-6 text-xs uppercase font-bold text-gray-700 tracking-wider">
                          Memo
                        </th>
                        <th className="text-left py-4 px-6 text-xs uppercase font-bold text-gray-700 tracking-wider">
                          Foto
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {trackingData.statusKendaraan.map((status, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0 ? "bg-slate-50" : "bg-white"
                          } hover:bg-blue-50 transition-colors duration-150`}
                        >
                          <td className="py-4 px-6 text-sm">
                            <div className="text-gray-900 font-semibold">{formatDate(status.date)}</div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="font-bold text-gray-900 text-sm">{status.status}</div>
                            <div className="text-gray-600 text-xs mt-1 leading-relaxed">
                              {status.keterangan}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-700">
                            {status.memo || "No memo"}
                          </td>
                          <td className="py-4 px-4">
                            {status.foto &&
                            !status.foto.includes("no-pictures") ? (
                              <a
                                href={status.foto}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                              >
                                <Image
                                  src={status.foto}
                                  alt="Status foto"
                                  width={80}
                                  height={80}
                                  className="rounded object-cover cursor-pointer hover:opacity-80 transition"
                                />
                              </a>
                            ) : (
                              <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                                No Image
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
        </div>
      </div>
      <Footer />
    </>
  );
}
