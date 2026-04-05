'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Star, CreditCard, Shield } from 'lucide-react';

export default function BillingPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [merchant, setMerchant] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/auth/login');
        return;
      }

      setUser(user);

      const { data: merchantData } = await supabase
        .from('merchants')
        .select('*')
        .eq('id', user.id)
        .single();

      setMerchant(merchantData);
    };

    checkAuth();
  }, [router]);

  if (!user || !merchant) {
    return (
      <DashboardLayout merchant={merchant}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-10 h-10 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-gray-500">Chargement...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout merchant={merchant}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            Facturation & Abonnement
          </h1>
          <p className="text-gray-500 mt-1 ml-[52px]">Gérez votre abonnement et vos informations de paiement</p>
        </div>

        {/* Current Plan */}
        <div className="group relative overflow-hidden rounded-xl border border-gray-200 transition-all duration-300 hover:border-gray-300 hover:shadow-md">
          <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-500 to-emerald-500" />
          <div className="bg-gradient-to-br from-teal-50/80 to-emerald-50/80 p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <Badge className="mb-3 bg-teal-600 hover:bg-teal-700 text-white">Plan actuel</Badge>
                <h2 className="text-2xl font-bold text-gray-900 capitalize">
                  {merchant.subscription_tier || 'Gratuit'}
                </h2>
                <p className="text-gray-500 mt-1 text-sm">Parfait pour démarrer</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { label: 'Avis mensuels', value: 'Illimité', icon: Star },
                { label: 'QR Codes', value: '1', icon: CreditCard },
                { label: 'Support', value: 'Email', icon: Shield },
              ].map((item, i) => (
                <div key={i} className="bg-white/70 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <item.icon className="w-4 h-4 text-teal-600" />
                    <p className="text-xs text-gray-500">{item.label}</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Money Placeholder */}
        <div className="group relative p-6 border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-md bg-white">
          <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-500 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Paiement Mobile Money</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Le paiement par Mobile Money sera bientôt disponible. Vous pourrez payer votre abonnement directement depuis votre téléphone en FCFA.
            </p>
            <Badge className="mt-4 bg-amber-100 text-amber-700 hover:bg-amber-100">
              Bientôt disponible
            </Badge>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
