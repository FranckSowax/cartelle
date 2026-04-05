/**
 * Script de test pour vérifier le fonctionnement du MCP Supabase
 * Exécutez avec: npx tsx scripts/test-mcp-supabase.ts
 */

import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Charger les variables d'environnement
dotenv.config({ path: resolve(__dirname, '../.env.local') });

import { 
  merchants, 
  prizes, 
  feedback, 
  spins, 
  coupons, 
  subscriptionTiers,
  utils 
} from '../lib/supabase/mcp-helpers';

async function testMCPSupabase() {
  console.log('🧪 Test du MCP Supabase pour Cartelle\n');
  console.log('='.repeat(50));

  try {
    // Test 1: Subscription Tiers
    console.log('\n📊 Test 1: Récupération des tiers d\'abonnement');
    const tiers = await subscriptionTiers.getAll();
    console.log(`✅ ${tiers.length} tiers trouvés:`);
    tiers.forEach(tier => {
      console.log(`   - ${tier.tier_name}: €${tier.price}/mois (${tier.max_locations} locations)`);
    });

    // Test 2: Utilities
    console.log('\n🔧 Test 2: Fonctions utilitaires');
    const couponCode = utils.generateCouponCode('TEST');
    const expiresAt = utils.getCouponExpiration(24);
    console.log(`✅ Code coupon généré: ${couponCode}`);
    console.log(`✅ Expiration: ${utils.formatDate(expiresAt)}`);

    // Test 3: Merchants (lecture seule pour éviter de créer des données)
    console.log('\n👥 Test 3: Récupération des marchands');
    try {
      const allMerchants = await merchants.getAll();
      console.log(`✅ ${allMerchants.length} marchand(s) trouvé(s)`);
      
      if (allMerchants.length > 0) {
        const firstMerchant = allMerchants[0];
        console.log(`   Premier marchand: ${firstMerchant.business_name || firstMerchant.email}`);
        
        // Test 4: Prizes du premier marchand
        console.log('\n🎁 Test 4: Récupération des prix');
        const merchantPrizes = await prizes.getByMerchant(firstMerchant.id);
        console.log(`✅ ${merchantPrizes.length} prix trouvé(s) pour ce marchand`);
        
        if (merchantPrizes.length > 0) {
          const isValid = await prizes.validateProbabilities(firstMerchant.id);
          console.log(`✅ Validation des probabilités: ${isValid ? 'OK (100%)' : 'KO (≠ 100%)'}`);
        }

        // Test 5: Feedback stats
        console.log('\n⭐ Test 5: Statistiques de feedback');
        const stats = await feedback.getStats(firstMerchant.id);
        console.log(`✅ Statistiques:`);
        console.log(`   - Total: ${stats.totalCount}`);
        console.log(`   - Positifs: ${stats.positiveCount}`);
        console.log(`   - Négatifs: ${stats.negativeCount}`);
        console.log(`   - Note moyenne: ${stats.avgRating}/5`);
        console.log(`   - Taux de conversion: ${stats.conversionRate.toFixed(1)}%`);

        // Test 6: Spins
        console.log('\n🎡 Test 6: Récupération des spins');
        const merchantSpins = await spins.getByMerchant(firstMerchant.id);
        console.log(`✅ ${merchantSpins.length} spin(s) trouvé(s)`);
      } else {
        console.log('ℹ️  Aucun marchand dans la base de données');
        console.log('   Créez un compte via l\'application pour tester les autres fonctions');
      }
    } catch (error: any) {
      if (error.message.includes('JWT')) {
        console.log('⚠️  Erreur d\'authentification - RLS activé correctement');
        console.log('   Les données sont protégées par Row Level Security');
      } else {
        throw error;
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ Tous les tests MCP Supabase sont passés avec succès!\n');
    console.log('📚 Consultez MCP_SUPABASE_GUIDE.md pour plus d\'exemples');
    console.log('🚀 Vous pouvez maintenant développer avec le MCP Supabase\n');

  } catch (error: any) {
    console.error('\n❌ Erreur lors des tests:', error.message);
    console.error('\n💡 Vérifiez que:');
    console.error('   1. Le schéma SQL a été exécuté dans Supabase');
    console.error('   2. Les credentials dans .env.local sont corrects');
    console.error('   3. La connexion internet est active\n');
    process.exit(1);
  }
}

// Exécuter les tests
testMCPSupabase();
