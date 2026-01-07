'use client';

import { TrackingOrder } from '@/lib/api';
import { MapPin, Package, Calendar, TruckIcon, User, Phone, Weight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TrackingDetailsProps {
  order: TrackingOrder;
}

export default function TrackingDetails({ order }: TrackingDetailsProps) {
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {t('tracking.detailTitle') || 'Detail Pengiriman'}
            </h2>
            <p className="text-orange-100 text-sm">
              {t('tracking.trackingNumber') || 'No. Resi'}: <span className="font-semibold">{order.sm}</span>
            </p>
            <p className="text-orange-100 text-sm">
              {t('tracking.orderNumber') || 'No. Order'}: <span className="font-semibold">{order.sp}</span>
            </p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-xl">
            <p className="text-xs text-orange-100 mb-1">{t('tracking.status') || 'Status'}</p>
            <p className="text-xl font-bold">{order.status}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Origin and Destination */}
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-100">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">
                    {t('tracking.customer') || 'Pelanggan'}
                  </p>
                  <p className="font-semibold text-gray-800">{order.customer}</p>
                </div>
              </div>
            </div>

            {/* Origin */}
            <div className="bg-green-50 rounded-xl p-5 border-2 border-green-100">
              <div className="flex items-start gap-3">
                <div className="bg-green-500 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-green-600 font-medium mb-1">
                    {t('tracking.origin') || 'Alamat Asal'}
                  </p>
                  <p className="font-semibold text-gray-800">{order.muat}</p>
                </div>
              </div>
            </div>

            {/* Destination */}
            <div className="bg-orange-50 rounded-xl p-5 border-2 border-orange-100">
              <div className="flex items-start gap-3">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-orange-600 font-medium mb-1">
                    {t('tracking.destination') || 'Alamat Tujuan'}
                  </p>
                  <p className="font-semibold text-gray-800">
                    {order.tujuan || t('tracking.notAvailable') || 'Tidak tersedia'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-6">
            {/* Pickup Date */}
            <div className="bg-purple-50 rounded-xl p-5 border-2 border-purple-100">
              <div className="flex items-start gap-3">
                <div className="bg-purple-500 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-purple-600 font-medium mb-1">
                    {t('tracking.pickupDate') || 'Tanggal Pickup'}
                  </p>
                  <p className="font-semibold text-gray-800">{formatDate(order.tglPickup)}</p>
                </div>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="bg-indigo-50 rounded-xl p-5 border-2 border-indigo-100">
              <div className="flex items-start gap-3">
                <div className="bg-indigo-500 p-2 rounded-lg">
                  <TruckIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-indigo-600 font-medium mb-1">
                    {t('tracking.vehicle') || 'Kendaraan'}
                  </p>
                  <p className="font-semibold text-gray-800">
                    {order.kendaraan !== '-' && order.kendaraan
                      ? order.kendaraan
                      : t('tracking.notAssigned') || 'Belum ditentukan'}
                  </p>
                </div>
              </div>
            </div>

            {/* Weight */}
            <div className="bg-amber-50 rounded-xl p-5 border-2 border-amber-100">
              <div className="flex items-start gap-3">
                <div className="bg-amber-500 p-2 rounded-lg">
                  <Weight className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-amber-600 font-medium mb-1">
                    {t('tracking.weight') || 'Tonase'}
                  </p>
                  <p className="font-semibold text-gray-800">
                    {order.tonase ? `${order.tonase} ton` : t('tracking.notSpecified') || '-'}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Info */}
            <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-100">
              <div className="flex items-start gap-3">
                <div className="bg-gray-500 p-2 rounded-lg">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    {t('tracking.notes') || 'Keterangan'}
                  </p>
                  <p className="font-semibold text-gray-800">{order.keterangan}</p>
                  {order.memo && order.memo !== '-' && (
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">{t('tracking.memo') || 'Memo'}:</span> {order.memo}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
