'use client';

import { TrackingOrder } from '@/lib/api';
import { Clock, CheckCircle, Package, TruckIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DeliveryHistoryProps {
  order: TrackingOrder;
}

export default function DeliveryHistory({ order }: DeliveryHistoryProps) {
  const { t } = useTranslation();

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      time: date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  };

  // Create timeline based on order status
  const createTimeline = () => {
    const timeline = [];
    const { date, time } = formatDateTime(order.tglPickup);

    // Status berdasarkan data order
    if (order.status === 'Success') {
      timeline.push({
        status: t('tracking.delivered') || 'Barang Diterima',
        description: order.keterangan,
        date,
        time,
        icon: CheckCircle,
        color: 'green',
        completed: true,
      });
    }

    timeline.push({
      status: t('tracking.inTransit') || 'Dalam Pengiriman',
      description:
        order.kendaraan !== '-' && order.kendaraan
          ? `${t('tracking.vehicle') || 'Kendaraan'}: ${order.kendaraan}`
          : t('tracking.waitingVehicle') || 'Menunggu penugasan kendaraan',
      date,
      time,
      icon: TruckIcon,
      color: 'blue',
      completed: order.status === 'Success',
    });

    timeline.push({
      status: t('tracking.pickedUp') || 'Barang Dipickup',
      description: `${t('tracking.from') || 'Dari'}: ${order.muat}`,
      date,
      time,
      icon: Package,
      color: 'orange',
      completed: true,
    });

    timeline.push({
      status: t('tracking.orderReceived') || 'Pesanan Diterima',
      description: `${t('tracking.customer') || 'Pelanggan'}: ${order.customer}`,
      date,
      time,
      icon: Clock,
      color: 'gray',
      completed: true,
    });

    return timeline.reverse();
  };

  const timeline = createTimeline();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <Clock className="w-7 h-7" />
          {t('tracking.historyTitle') || 'Riwayat Pengiriman'}
        </h2>
        <p className="text-blue-100 mt-1">
          {t('tracking.trackingProgress') || 'Lacak perjalanan paket Anda'}
        </p>
      </div>

      {/* Timeline */}
      <div className="p-6">
        <div className="relative">
          {timeline.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === timeline.length - 1;

            return (
              <div key={index} className="relative pb-8 group">
                {/* Timeline Line */}
                {!isLast && (
                  <div
                    className={`absolute left-6 top-14 w-0.5 h-full -ml-px ${
                      item.completed ? 'bg-gradient-to-b from-green-400 to-gray-200' : 'bg-gray-200'
                    }`}
                  />
                )}

                {/* Timeline Item */}
                <div className="relative flex items-start gap-4">
                  {/* Icon Circle */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      item.completed
                        ? item.color === 'green'
                          ? 'bg-green-500 shadow-lg shadow-green-200'
                          : item.color === 'blue'
                          ? 'bg-blue-500 shadow-lg shadow-blue-200'
                          : item.color === 'orange'
                          ? 'bg-orange-500 shadow-lg shadow-orange-200'
                          : 'bg-gray-500 shadow-lg shadow-gray-200'
                        : 'bg-gray-200'
                    } group-hover:scale-110`}
                  >
                    <Icon
                      className={`w-6 h-6 ${item.completed ? 'text-white' : 'text-gray-400'}`}
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 bg-gray-50 rounded-xl p-5 border-2 transition-all duration-300 ${
                      item.completed
                        ? 'border-gray-100 group-hover:border-gray-300'
                        : 'border-gray-100'
                    }`}
                  >
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                      <h3
                        className={`font-bold text-lg ${
                          item.completed ? 'text-gray-800' : 'text-gray-400'
                        }`}
                      >
                        {item.status}
                      </h3>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-700">{item.time}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                    </div>
                    <p
                      className={`text-sm ${item.completed ? 'text-gray-600' : 'text-gray-400'}`}
                    >
                      {item.description}
                    </p>

                    {/* Status Badge */}
                    {item.completed && index === 0 && order.status === 'Success' && (
                      <div className="mt-3 inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                        <CheckCircle className="w-4 h-4" />
                        {t('tracking.completed') || 'Selesai'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        {order.memo && order.memo !== '-' && (
          <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="bg-yellow-500 p-2 rounded-lg">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-yellow-800 mb-1">
                  {t('tracking.additionalNote') || 'Catatan Tambahan'}
                </p>
                <p className="text-sm text-yellow-700">{order.memo}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
