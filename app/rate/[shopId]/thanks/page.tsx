'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Heart, CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';

export default function ThanksPage() {
  const params = useParams();
  const shopId = params.shopId as string;
  const [merchant, setMerchant] = useState<any>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchMerchant = async () => {
      try {
        const { data } = await supabase
          .from('merchants')
          .select('business_name, logo_url, background_url')
          .eq('id', shopId)
          .single();
        if (data) setMerchant(data);
      } finally {
        setFetching(false);
      }
    };
    if (shopId) fetchMerchant();
    else setFetching(false);
  }, [shopId]);

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-600 to-teal-700">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const hasBackground = merchant?.background_url;
  const businessName = merchant?.business_name || 'notre commerce';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      {hasBackground ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${merchant.background_url})` }}
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-700"></div>
      )}

      {/* Floating sparkles */}
      <div className="absolute top-10 left-10 animate-pulse">
        <Sparkles className="w-6 h-6 text-white/40" />
      </div>
      <div className="absolute top-20 right-16 animate-pulse" style={{ animationDelay: '0.5s' }}>
        <Sparkles className="w-4 h-4 text-white/40" />
      </div>
      <div className="absolute bottom-16 left-20 animate-pulse" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-5 h-5 text-white/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        {merchant?.logo_url && (
          <div className="flex justify-center mb-6">
            <img
              src={merchant.logo_url}
              alt={businessName}
              className="h-24 object-contain drop-shadow-lg"
            />
          </div>
        )}

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 text-center animate-in fade-in zoom-in-95 duration-500">
          {/* Success icon */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full bg-teal-100 animate-ping opacity-30"></div>
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Merci infiniment !
          </h1>

          {/* Message */}
          <div className="space-y-3 mb-6">
            <p className="text-gray-600 leading-relaxed">
              Votre commentaire a bien été pris en compte.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Chez <span className="font-semibold text-gray-900">{businessName}</span>, nous lisons
              attentivement chaque retour pour nous améliorer.
            </p>
          </div>

          {/* Bienveillance banner */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 mb-6 text-left">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Heart className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-amber-900 text-sm mb-1">
                  Votre avis compte
                </p>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Nous prendrons le temps d&apos;étudier votre retour avec soin.
                  Votre honnêteté nous aide à grandir et à offrir une meilleure expérience à tous nos clients.
                </p>
              </div>
            </div>
          </div>

          {/* Follow-up note */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Le responsable pourra vous recontacter si nécessaire</span>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-xs text-white/60">
          Propulsé par <span className="font-semibold">Cartelle</span>
        </p>
      </div>
    </div>
  );
}
