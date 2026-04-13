'use client';

import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPage() {
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
              <Shield className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Politique de Confidentialité</h1>
          </div>
          <p className="text-sm text-gray-500">Dernière mise à jour : 13 avril 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-gray prose-sm max-w-none space-y-8">

          <section>
            <h2 className="text-xl font-semibold text-gray-900">1. Responsable du traitement</h2>
            <p className="text-gray-600 leading-relaxed">
              La société <strong>Sowax</strong>, opérant sous la marque <strong>Cartelle</strong>, est responsable du traitement des données personnelles collectées via la plateforme cartelle.io et ses services associés.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Contact : <a href="mailto:contact@cartelle.app" className="text-teal-600 hover:underline">contact@cartelle.app</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">2. Données collectées</h2>
            <p className="text-gray-600 leading-relaxed">Dans le cadre de nos services, nous collectons les données suivantes :</p>
            <h3 className="text-base font-semibold text-gray-800 mt-4">2.1 Marchands (utilisateurs professionnels)</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Nom, prénom, nom commercial</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Adresse de l&apos;établissement</li>
              <li>Logo et images de l&apos;entreprise</li>
              <li>Données de paiement (traitées par E-Billing, non stockées par Cartelle)</li>
            </ul>
            <h3 className="text-base font-semibold text-gray-800 mt-4">2.2 Clients des marchands (utilisateurs finaux)</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Numéro de téléphone WhatsApp (lorsque fourni volontairement)</li>
              <li>Adresse email (lorsque fournie volontairement)</li>
              <li>Nom (lorsque renseigné sur la carte de fidélité)</li>
              <li>Date de naissance (optionnelle, pour les offres anniversaire)</li>
              <li>Notes et commentaires laissés</li>
              <li>Historique de points de fidélité</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">3. Finalités du traitement</h2>
            <p className="text-gray-600 leading-relaxed">Vos données sont collectées et traitées pour les finalités suivantes :</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>Gestion des avis clients</strong> : collecte et affichage des avis pour améliorer le service du marchand</li>
              <li><strong>Programme de fidélité</strong> : gestion des cartes de fidélité, cumul de points, échange de récompenses</li>
              <li><strong>Communications WhatsApp</strong> : envoi de la roue des cadeaux, carte de fidélité, rappels automatiques (anniversaire, inactivité)</li>
              <li><strong>Campagnes marketing</strong> : envoi de campagnes WhatsApp par les marchands à leurs clients (avec consentement)</li>
              <li><strong>Gestion de l&apos;abonnement</strong> : facturation, paiement, renouvellement</li>
              <li><strong>Amélioration du service</strong> : statistiques anonymisées, analyse des performances</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">4. Base légale du traitement</h2>
            <p className="text-gray-600 leading-relaxed">
              Conformément à la loi gabonaise relative à la protection des données personnelles et de la vie privée, nos traitements reposent sur :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>Le consentement</strong> : le client fournit volontairement son numéro de téléphone ou email lors de la notation</li>
              <li><strong>L&apos;exécution d&apos;un contrat</strong> : gestion de l&apos;abonnement des marchands</li>
              <li><strong>L&apos;intérêt légitime</strong> : amélioration du service et statistiques anonymisées</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">5. Durée de conservation</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2 font-semibold text-gray-700">Données</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-700">Durée</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-2 text-gray-600">Compte marchand</td><td className="px-4 py-2 text-gray-600">Durée de l&apos;abonnement + 12 mois</td></tr>
                  <tr><td className="px-4 py-2 text-gray-600">Avis clients</td><td className="px-4 py-2 text-gray-600">24 mois après le dernier avis</td></tr>
                  <tr><td className="px-4 py-2 text-gray-600">Carte de fidélité</td><td className="px-4 py-2 text-gray-600">Durée de la relation commerciale + 12 mois d&apos;inactivité</td></tr>
                  <tr><td className="px-4 py-2 text-gray-600">Historique de points</td><td className="px-4 py-2 text-gray-600">Durée de la carte de fidélité</td></tr>
                  <tr><td className="px-4 py-2 text-gray-600">Messages WhatsApp</td><td className="px-4 py-2 text-gray-600">12 mois</td></tr>
                  <tr><td className="px-4 py-2 text-gray-600">Données de paiement</td><td className="px-4 py-2 text-gray-600">Traitées par E-Billing (non stockées)</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">6. Vos droits</h2>
            <p className="text-gray-600 leading-relaxed">
              Conformément à la loi gabonaise, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>Droit d&apos;accès</strong> : obtenir une copie de vos données personnelles</li>
              <li><strong>Droit de rectification</strong> : corriger vos données inexactes ou incomplètes</li>
              <li><strong>Droit à l&apos;effacement</strong> : demander la suppression de vos données</li>
              <li><strong>Droit d&apos;opposition</strong> : refuser le traitement de vos données à des fins marketing</li>
              <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format lisible</li>
              <li><strong>Droit de retrait du consentement</strong> : retirer votre consentement à tout moment</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Pour exercer vos droits, contactez-nous à <a href="mailto:contact@cartelle.app" className="text-teal-600 hover:underline">contact@cartelle.app</a> ou utilisez les fonctionnalités de suppression disponibles dans votre compte / carte de fidélité.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">7. Partage des données</h2>
            <p className="text-gray-600 leading-relaxed">Vos données personnelles peuvent être partagées avec :</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>Supabase</strong> (hébergement base de données) — serveurs sécurisés</li>
              <li><strong>Meta / WhatsApp Business API</strong> — pour l&apos;envoi de messages WhatsApp</li>
              <li><strong>Whapi</strong> — fournisseur alternatif de messagerie WhatsApp</li>
              <li><strong>E-Billing / Billing Easy</strong> — traitement des paiements (Mobile Money, carte bancaire)</li>
              <li><strong>Railway</strong> — hébergement de l&apos;application</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-2">
              Nous ne vendons jamais vos données à des tiers. Les données des clients ne sont accessibles qu&apos;au marchand auquel ils ont donné leur avis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">8. Sécurité</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données : chiffrement en transit (HTTPS/TLS), contrôle d&apos;accès par rôle (Row Level Security), authentification sécurisée, mots de passe hashés.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">9. Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              Cartelle utilise uniquement des cookies essentiels au fonctionnement du service (authentification, session). Nous n&apos;utilisons pas de cookies publicitaires ni de trackers tiers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">10. Autorité de contrôle</h2>
            <p className="text-gray-600 leading-relaxed">
              En cas de litige, vous pouvez adresser une réclamation à l&apos;Autorité de Protection des Données Personnelles et de la Vie Privée (APDPVP) du Gabon :
            </p>
            <p className="text-gray-600 mt-2">
              <strong>APDPVP</strong><br />
              Site web : <a href="https://www.apdpvp.ga" className="text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">www.apdpvp.ga</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">11. Modifications</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous nous réservons le droit de modifier cette politique. Toute modification sera publiée sur cette page avec la date de mise à jour. En cas de changement substantiel, les utilisateurs seront notifiés.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex items-center justify-between text-sm text-gray-400">
          <span>Cartelle — Sowax</span>
          <Link href="/terms" className="text-teal-600 hover:underline">Conditions d&apos;utilisation</Link>
        </div>
      </div>
    </div>
  );
}
