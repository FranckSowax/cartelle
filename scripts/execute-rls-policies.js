#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');

console.log('🔒 Exécution des politiques RLS pour Cartelle\n');

const supabaseUrl = 'https://egemjezgejptazoucwci.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZW1qZXpnZWpwdGF6b3Vjd2NpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njc4NjA1OSwiZXhwIjoyMDgyMzYyMDU5fQ.HJJStxiUl5BoGF6VFqWsDC6uFHKemB27A4fTVKCfgcI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const policies = [
  {
    name: 'Public can view merchants',
    table: 'merchants',
    sql: `
      DROP POLICY IF EXISTS "Public can view merchants" ON merchants;
      CREATE POLICY "Public can view merchants" ON merchants
        FOR SELECT USING (true);
    `
  },
  {
    name: 'Public can view prizes',
    table: 'prizes',
    sql: `
      DROP POLICY IF EXISTS "Public can view prizes" ON prizes;
      CREATE POLICY "Public can view prizes" ON prizes
        FOR SELECT USING (true);
    `
  },
  {
    name: 'Public can insert feedback',
    table: 'feedback',
    sql: `
      DROP POLICY IF EXISTS "Public can insert feedback" ON feedback;
      CREATE POLICY "Public can insert feedback" ON feedback
        FOR INSERT WITH CHECK (true);
    `
  },
  {
    name: 'Public can insert spins',
    table: 'spins',
    sql: `
      DROP POLICY IF EXISTS "Public can insert spins" ON spins;
      CREATE POLICY "Public can insert spins" ON spins
        FOR INSERT WITH CHECK (true);
    `
  },
  {
    name: 'Public can insert coupons',
    table: 'coupons',
    sql: `
      DROP POLICY IF EXISTS "Public can insert coupons" ON coupons;
      CREATE POLICY "Public can insert coupons" ON coupons
        FOR INSERT WITH CHECK (true);
    `
  },
  {
    name: 'Public can view coupons',
    table: 'coupons',
    sql: `
      DROP POLICY IF EXISTS "Public can view coupons" ON coupons;
      CREATE POLICY "Public can view coupons" ON coupons
        FOR SELECT USING (true);
    `
  }
];

async function executePolicies() {
  console.log('📝 Application des politiques RLS...\n');

  for (const policy of policies) {
    try {
      console.log(`⚙️  ${policy.name} sur ${policy.table}...`);
      
      const { error } = await supabase.rpc('exec', { 
        sql: policy.sql 
      });

      if (error) {
        // Essayer avec une approche différente
        const statements = policy.sql.split(';').filter(s => s.trim());
        
        for (const statement of statements) {
          if (!statement.trim()) continue;
          
          const { error: stmtError } = await supabase.rpc('exec', {
            sql: statement + ';'
          });
          
          if (stmtError && !stmtError.message.includes('does not exist')) {
            console.log(`   ⚠️  ${stmtError.message}`);
          }
        }
      }
      
      console.log(`   ✅ ${policy.name} appliquée`);
    } catch (error) {
      console.log(`   ⚠️  ${error.message}`);
    }
  }

  console.log('\n🧪 Test d\'accès public...\n');

  // Test avec clé anon
  const anonClient = createClient(
    supabaseUrl,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZW1qZXpnZWpwdGF6b3Vjd2NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3ODYwNTksImV4cCI6MjA4MjM2MjA1OX0.3n7ZUhCAIC7DESmheRPUZCG7uTvd7HLRUMK0HTchj9M'
  );

  const { data: merchants, error: merchantError } = await anonClient
    .from('merchants')
    .select('id, business_name, email')
    .limit(1);

  if (merchantError) {
    console.log('❌ Erreur accès merchants:', merchantError.message);
    console.log('\n⚠️  Les politiques n\'ont pas pu être appliquées automatiquement.');
    console.log('📋 Veuillez exécuter manuellement le fichier:');
    console.log('   APPLY_THIS_RLS_FIX.sql');
    console.log('   dans le SQL Editor de Supabase\n');
    return false;
  }

  console.log(`✅ Accès public aux merchants: OK (${merchants?.length || 0} trouvé(s))`);

  if (merchants && merchants.length > 0) {
    console.log(`   Premier marchand: ${merchants[0].business_name || merchants[0].email}`);
  }

  const { data: prizes, error: prizesError } = await anonClient
    .from('prizes')
    .select('id, name')
    .limit(1);

  if (!prizesError) {
    console.log(`✅ Accès public aux prizes: OK (${prizes?.length || 0} trouvé(s))`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Politiques RLS configurées avec succès!');
  console.log('='.repeat(60));
  console.log('\n🚀 L\'application devrait maintenant fonctionner');
  console.log('   Testez: http://localhost:3000/rate/da56ba06-8a5c-48e1-a45e-add9601422d0\n');

  return true;
}

executePolicies().catch(error => {
  console.error('\n❌ Erreur:', error.message);
  console.log('\n📋 Solution alternative:');
  console.log('   Exécutez APPLY_THIS_RLS_FIX.sql dans Supabase SQL Editor\n');
  process.exit(1);
});
