'use client';

import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Conditions Générales d&apos;Utilisation</h1>
          </div>
          <p className="text-sm text-gray-500">Dernière mise à jour : 13 avril 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-gray prose-sm max-w-none space-y-8">

          <section>
            <h2 className="text-xl font-semibold text-gray-900">1. Objet</h2>
            <p className="text-gray-600 leading-relaxed">
              Les présentes conditions générales d&apos;utilisation (CGU) régissent l&apos;accès et l&apos;utilisation de la plateforme <strong>Cartelle</strong> (cartelle.io), éditée par la société <strong>Sowax</strong>. Cartelle est une solution SaaS de fidélisation client et de collecte d&apos;avis pour les commerces.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">2. Inscription et compte</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>L&apos;inscription est gratuite et donne accès à un essai de 14 jours</li>
              <li>Le marchand s&apos;engage à fournir des informations exactes et à jour</li>
              <li>Le mot de passe est personnel et confidentiel</li>
              <li>Le marchand est responsable de toute activité sur son compte</li>
              <li>Cartelle se réserve le droit de suspendre un compte en cas d&apos;utilisation abusive</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">3. Services proposés</h2>
            <p className="text-gray-600 leading-relaxed">Cartelle propose les services suivants :</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>Roue de la fortune</strong> : outil gamifié de collecte d&apos;avis clients</li>
              <li><strong>Programme de fidélité</strong> : carte de fidélité digitale avec points et récompenses</li>
              <li><strong>Redirection d&apos;avis</strong> : routage intelligent vers Google, TripAdvisor, Instagram, TikTok, WhatsApp</li>
              <li><strong>Campagnes WhatsApp</strong> : envoi de messages marketing via WhatsApp Business API</li>
              <li><strong>QR Codes</strong> : génération et commande de supports imprimés</li>
              <li><strong>Dashboard</strong> : statistiques et gestion centralisée</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">4. Abonnements et tarifs</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>Découverte</strong> : gratuit, 14 jours d&apos;essai, toutes fonctionnalités</li>
              <li><strong>Essentiel</strong> : 65 000 FCFA/mois — 1 établissement, 100 crédits WhatsApp/mois</li>
              <li><strong>Premium</strong> : 150 000 FCFA/mois — 3 établissements, 500 crédits WhatsApp/mois</li>
              <li><strong>Sur mesure</strong> : sur devis, établissements illimités</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-2">
              Le paiement s&apos;effectue par Mobile Money ou carte bancaire via E-Billing. L&apos;abonnement est mensuel et renouvelable. Le marchand sera notifié avant l&apos;échéance par WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">5. Crédits WhatsApp</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>1 crédit = 1 message WhatsApp envoyé dans le cadre d&apos;une campagne</li>
              <li>Les crédits mensuels sont inclus dans l&apos;abonnement et sont cumulables</li>
              <li>Les crédits non utilisés restent disponibles tant que l&apos;abonnement est actif</li>
              <li>Maximum 2 campagnes par semaine pour préserver la qualité de l&apos;engagement</li>
              <li>Les campagnes ne sont activées qu&apos;à partir de 100 clients fidèles</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">6. Obligations du marchand</h2>
            <p className="text-gray-600 leading-relaxed">Le marchand s&apos;engage à :</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Utiliser Cartelle conformément à la loi et aux présentes CGU</li>
              <li>Respecter la vie privée de ses clients et ne pas utiliser leurs données à d&apos;autres fins que celles autorisées</li>
              <li>Ne pas envoyer de messages non sollicités (spam) via les campagnes WhatsApp</li>
              <li>Informer ses clients de la collecte de données et de l&apos;existence du programme de fidélité</li>
              <li>Ne pas contourner les limitations de la plateforme (crédits, campagnes, établissements)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">7. Obligations de Cartelle</h2>
            <p className="text-gray-600 leading-relaxed">Cartelle s&apos;engage à :</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Assurer la disponibilité du service (hors maintenance planifiée)</li>
              <li>Protéger les données conformément à la loi gabonaise sur la protection des données</li>
              <li>Ne pas vendre ni transmettre les données à des tiers non autorisés</li>
              <li>Fournir un support réactif selon le plan souscrit</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">8. Propriété intellectuelle</h2>
            <p className="text-gray-600 leading-relaxed">
              La plateforme Cartelle, son code source, son design, ses logos et contenus sont la propriété exclusive de Sowax. Le marchand conserve la propriété de ses données, logos et contenus uploadés.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">9. Résiliation</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Le marchand peut résilier son abonnement à tout moment depuis son dashboard</li>
              <li>L&apos;accès reste actif jusqu&apos;à la fin de la période payée</li>
              <li>Les données sont conservées 12 mois après la résiliation, puis supprimées</li>
              <li>Le marchand peut demander l&apos;export de ses données avant suppression</li>
              <li>Cartelle peut résilier un compte en cas de violation des CGU, après notification</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">10. Limitation de responsabilité</h2>
            <p className="text-gray-600 leading-relaxed">
              Cartelle ne saurait être tenu responsable des dommages indirects résultant de l&apos;utilisation du service. La responsabilité de Cartelle est limitée au montant des sommes versées par le marchand au cours des 12 derniers mois. Cartelle ne garantit pas les résultats en termes de nombre d&apos;avis ou de fidélisation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">11. Droit applicable</h2>
            <p className="text-gray-600 leading-relaxed">
              Les présentes CGU sont régies par le droit gabonais. Tout litige sera soumis aux tribunaux compétents de Libreville, Gabon, après tentative de résolution amiable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">12. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Pour toute question relative aux présentes CGU :<br />
              Email : <a href="mailto:contact@cartelle.app" className="text-teal-600 hover:underline">contact@cartelle.app</a><br />
              Site : <a href="https://cartelle.io" className="text-teal-600 hover:underline">cartelle.io</a>
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex items-center justify-between text-sm text-gray-400">
          <span>Cartelle — Sowax</span>
          <Link href="/privacy" className="text-teal-600 hover:underline">Politique de confidentialité</Link>
        </div>
      </div>
    </div>
  );
}
