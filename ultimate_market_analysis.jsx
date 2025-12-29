import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Package, Search, ChevronDown, ChevronUp, Filter, SortAsc, Eye, Calculator } from 'lucide-react';

const UltimateMarketAnalysis = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDept, setSelectedDept] = useState('all');
  const [sortBy, setSortBy] = useState('marge_grossiste_pourcent');
  const [sortOrder, setSortOrder] = useState('desc');
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [viewMode, setViewMode] = useState('all'); // 'all', 'profitable', 'low-margin'
  const [currencyView, setCurrencyView] = useState('ILS'); // 'ILS' ou 'USD'

  // Taux de change USD/ILS (approximatif depuis les données)
  const USD_TO_ILS = 3.03; // Calculé depuis les données du fichier

  const catalogData = [
    {"modele":"262100A","couleur":"Blanc","type_article":"Été","categorie":"Shabbat","departement":"Filles","sous_departement":"Robes","description_hebreu":"שמלת מלחים","description_anglais":"sailor dress","description_detaillee":"שמלת מלח צוארון מרובע","prix_cout_usd_avec_transport":12.03,"prix_cout_ils_avec_transport":36.45,"prix_vente_grossiste_ht":80,"prix_club":179.9,"prix_consommateur":189.9,"tailles_disponibles":{"03":true,"04":true,"05":true,"06":true,"08":true,"10":true,"12":true,"14":true,"16":true},"marge_grossiste_ils":43.55,"marge_grossiste_pourcent":54.44,"marge_totale_ils":153.45,"marge_totale_pourcent":80.81},
    {"modele":"262100B","couleur":"Bleu Ciel","type_article":"Été","categorie":"Shabbat","departement":"Filles","sous_departement":"Robes","description_hebreu":"שמלת מלחים","description_anglais":"sailor dress","description_detaillee":"שמלת מלח צוארון מרובע","prix_cout_usd_avec_transport":12.03,"prix_cout_ils_avec_transport":36.45,"prix_vente_grossiste_ht":80,"prix_club":179.9,"prix_consommateur":189.9,"tailles_disponibles":{"03":true,"04":true,"05":true,"06":true,"08":true,"10":true,"12":true,"14":true,"16":true},"marge_grossiste_ils":43.55,"marge_grossiste_pourcent":54.44,"marge_totale_ils":153.45,"marge_totale_pourcent":80.81},
    {"modele":"262102A","couleur":"Blanc","type_article":"Été","categorie":"Shabbat","departement":"Garçons","sous_departement":"Chemises","description_hebreu":"חולצת מלחים ","description_anglais":"sailor shirt","description_detaillee":"חולצת מלח צוארון מרובע","prix_cout_usd_avec_transport":5.79,"prix_cout_ils_avec_transport":17.55,"prix_vente_grossiste_ht":42,"prix_club":89.9,"prix_consommateur":99.9,"tailles_disponibles":{"02":true,"03":true,"04":true,"05":true,"06":true,"07":true,"08":true},"marge_grossiste_ils":24.45,"marge_grossiste_pourcent":58.21,"marge_totale_ils":82.35,"marge_totale_pourcent":82.43},
    {"modele":"262102B","couleur":"Bleu Ciel","type_article":"Été","categorie":"Shabbat","departement":"Garçons","sous_departement":"Chemises","description_hebreu":"חולצת מלחים ","description_anglais":"sailor shirt","description_detaillee":"חולצת מלח צוארון מרובע","prix_cout_usd_avec_transport":5.79,"prix_cout_ils_avec_transport":17.55,"prix_vente_grossiste_ht":42,"prix_club":89.9,"prix_consommateur":99.9,"tailles_disponibles":{"02":true,"03":true,"04":true,"05":true,"06":true,"07":true,"08":true},"marge_grossiste_ils":24.45,"marge_grossiste_pourcent":58.21,"marge_totale_ils":82.35,"marge_totale_pourcent":82.43},
    {"modele":"262104A","couleur":"Blanc","type_article":"Été","categorie":"Shabbat","departement":"Bébé Filles","sous_departement":"Robes","description_hebreu":"שמלת מלחים ","description_anglais":"baby sailor dress","description_detaillee":"שמלת בייבי מלח","prix_cout_usd_avec_transport":7.57,"prix_cout_ils_avec_transport":22.95,"prix_vente_grossiste_ht":51,"prix_club":109.9,"prix_consommateur":119.9,"tailles_disponibles":{"12M":true,"18M":true,"24M":true,"2-3":true},"marge_grossiste_ils":28.05,"marge_grossiste_pourcent":55.0,"marge_totale_ils":96.95,"marge_totale_pourcent":80.85},
    {"modele":"262104B","couleur":"Bleu Ciel","type_article":"Été","categorie":"Shabbat","departement":"Bébé Filles","sous_departement":"Robes","description_hebreu":"שמלת מלחים ","description_anglais":"baby sailor dress","description_detaillee":"שמלת בייבי מלח","prix_cout_usd_avec_transport":7.57,"prix_cout_ils_avec_transport":22.95,"prix_vente_grossiste_ht":51,"prix_club":109.9,"prix_consommateur":119.9,"tailles_disponibles":{"12M":true,"18M":true,"24M":true,"2-3":true},"marge_grossiste_ils":28.05,"marge_grossiste_pourcent":55.0,"marge_totale_ils":96.95,"marge_totale_pourcent":80.85},
    {"modele":"262106A","couleur":"Blanc","type_article":"Été","categorie":"Shabbat","departement":"Bébé Garçons","sous_departement":"Chemises","description_hebreu":"חולצת מלחים","description_anglais":"baby sailor shirt","description_detaillee":"חולצת בייבי מלח","prix_cout_usd_avec_transport":5.28,"prix_cout_ils_avec_transport":16.0,"prix_vente_grossiste_ht":40,"prix_club":84.9,"prix_consommateur":89.9,"tailles_disponibles":{"12M":true,"18M":true,"24M":true,"2-3":true},"marge_grossiste_ils":24.0,"marge_grossiste_pourcent":60.0,"marge_totale_ils":73.9,"marge_totale_pourcent":82.2},
    {"modele":"262106B","couleur":"Bleu Ciel","type_article":"Été","categorie":"Shabbat","departement":"Bébé Garçons","sous_departement":"Chemises","description_hebreu":"חולצת מלחים","description_anglais":"baby sailor shirt","description_detaillee":"חולצת בייבי מלח","prix_cout_usd_avec_transport":5.28,"prix_cout_ils_avec_transport":16.0,"prix_vente_grossiste_ht":40,"prix_club":84.9,"prix_consommateur":89.9,"tailles_disponibles":{"12M":true,"18M":true,"24M":true,"2-3":true},"marge_grossiste_ils":24.0,"marge_grossiste_pourcent":60.0,"marge_totale_ils":73.9,"marge_totale_pourcent":82.2},
    {"modele":"262108A","couleur":"Blanc","type_article":"Été","categorie":"Shabbat","departement":"Filles","sous_departement":"Robes","description_hebreu":"שמלה עם שסע מעטפת","description_anglais":"dress with wrap slit","description_detaillee":"שמלה צבעונית שסע מעטפת","prix_cout_usd_avec_transport":11.88,"prix_cout_ils_avec_transport":36.0,"prix_vente_grossiste_ht":77,"prix_club":169.9,"prix_consommateur":179.9,"tailles_disponibles":{"03":true,"04":true,"05":true,"06":true,"08":true,"10":true,"12":true,"14":true,"16":true},"marge_grossiste_ils":41.0,"marge_grossiste_pourcent":53.25,"marge_totale_ils":143.9,"marge_totale_pourcent":79.99},
    {"modele":"262108B","couleur":"Rose","type_article":"Été","categorie":"Shabbat","departement":"Filles","sous_departement":"Robes","description_hebreu":"שמלה עם שסע מעטפת","description_anglais":"dress with wrap slit","description_detaillee":"שמלה צבעונית שסע מעטפת","prix_cout_usd_avec_transport":11.88,"prix_cout_ils_avec_transport":36.0,"prix_vente_grossiste_ht":77,"prix_club":169.9,"prix_consommateur":179.9,"tailles_disponibles":{"03":true,"04":true,"05":true,"06":true,"08":true,"10":true,"12":true,"14":true,"16":true},"marge_grossiste_ils":41.0,"marge_grossiste_pourcent":53.25,"marge_totale_ils":143.9,"marge_totale_pourcent":79.99},
    {"modele":"262110A","couleur":"Blanc écru","type_article":"Été","categorie":"Shabbat","departement":"Filles","sous_departement":"Robes","description_hebreu":"שמלה בסיסית צווארון עגול","description_anglais":"basic dress round neck","description_detaillee":"שמלה בסיסית שמנת צווארון עגול קצר","prix_cout_usd_avec_transport":10.23,"prix_cout_ils_avec_transport":31.0,"prix_vente_grossiste_ht":66,"prix_club":139.9,"prix_consommateur":149.9,"tailles_disponibles":{"03":true,"04":true,"05":true,"06":true,"08":true,"10":true,"12":true,"14":true,"16":true},"marge_grossiste_ils":35.0,"marge_grossiste_pourcent":53.03,"marge_totale_ils":118.9,"marge_totale_pourcent":79.32},
    {"modele":"262110B","couleur":"Marine","type_article":"Été","categorie":"Shabbat","departement":"Filles","sous_departement":"Robes","description_hebreu":"שמלה בסיסית צווארון עגול","description_anglais":"basic dress round neck","description_detaillee":"שמלה בסיסית כחולה ים צווארון עגול קצר","prix_cout_usd_avec_transport":10.23,"prix_cout_ils_avec_transport":31.0,"prix_vente_grossiste_ht":66,"prix_club":139.9,"prix_consommateur":149.9,"tailles_disponibles":{"03":true,"04":true,"05":true,"06":true,"08":true,"10":true,"12":true,"14":true,"16":true},"marge_grossiste_ils":35.0,"marge_grossiste_pourcent":53.03,"marge_totale_ils":118.9,"marge_totale_pourcent":79.32}
  ];

  // Statistiques globales
  const stats = useMemo(() => {
    const validProducts = catalogData.filter(p => p.prix_vente_grossiste_ht);
    return {
      totalProducts: catalogData.length,
      avgCostILS: (catalogData.reduce((sum, p) => sum + (p.prix_cout_ils_avec_transport || 0), 0) / validProducts.length).toFixed(2),
      avgCostUSD: (catalogData.reduce((sum, p) => sum + (p.prix_cout_usd_avec_transport || 0), 0) / validProducts.length).toFixed(2),
      avgWholesalePrice: (catalogData.reduce((sum, p) => sum + (p.prix_vente_grossiste_ht || 0), 0) / validProducts.length).toFixed(2),
      avgConsumerPrice: (catalogData.reduce((sum, p) => sum + (p.prix_consommateur || 0), 0) / validProducts.length).toFixed(2),
      avgMarginPercent: (catalogData.reduce((sum, p) => sum + (p.marge_grossiste_pourcent || 0), 0) / validProducts.length).toFixed(2),
      totalMarginPotential: catalogData.reduce((sum, p) => sum + (p.marge_grossiste_ils || 0), 0).toFixed(2)
    };
  }, []);

  // Filtrer et trier les produits
  const filteredProducts = useMemo(() => {
    let products = [...catalogData];
    
    if (searchTerm) {
      products = products.filter(p => 
        p.modele?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description_anglais?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description_hebreu?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.couleur?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      products = products.filter(p => p.type_article === selectedCategory);
    }
    
    if (selectedDept !== 'all') {
      products = products.filter(p => p.departement === selectedDept);
    }

    if (viewMode === 'profitable') {
      products = products.filter(p => p.marge_grossiste_pourcent >= 55);
    } else if (viewMode === 'low-margin') {
      products = products.filter(p => p.marge_grossiste_pourcent < 55);
    }
    
    products.sort((a, b) => {
      const aVal = a[sortBy] || 0;
      const bVal = b[sortBy] || 0;
      return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    });
    
    return products;
  }, [searchTerm, selectedCategory, selectedDept, sortBy, sortOrder, viewMode]);

  // Distribution des marges
  const marginDistribution = useMemo(() => {
    const ranges = [
      { name: '< 50%', min: 0, max: 50, count: 0, total: 0 },
      { name: '50-55%', min: 50, max: 55, count: 0, total: 0 },
      { name: '55-60%', min: 55, max: 60, count: 0, total: 0 },
      { name: '> 60%', min: 60, max: 100, count: 0, total: 0 }
    ];
    
    catalogData.forEach(p => {
      if (p.marge_grossiste_pourcent) {
        const range = ranges.find(r => p.marge_grossiste_pourcent >= r.min && p.marge_grossiste_pourcent < r.max);
        if (range) {
          range.count++;
          range.total += p.marge_grossiste_ils;
        }
      }
    });
    
    return ranges;
  }, []);

  // Analyse par département
  const deptAnalysis = useMemo(() => {
    const deptMap = new Map();
    catalogData.forEach(p => {
      const dept = p.departement || 'Non classé';
      if (!deptMap.has(dept)) {
        deptMap.set(dept, {
          name: dept,
          count: 0,
          avgCost: 0,
          avgPrice: 0,
          avgMargin: 0,
          totalMargin: 0
        });
      }
      const d = deptMap.get(dept);
      d.count++;
      d.avgCost += p.prix_cout_ils_avec_transport || 0;
      d.avgPrice += p.prix_vente_grossiste_ht || 0;
      d.avgMargin += p.marge_grossiste_pourcent || 0;
      d.totalMargin += p.marge_grossiste_ils || 0;
    });
    
    return Array.from(deptMap.values()).map(d => ({
      ...d,
      avgCost: (d.avgCost / d.count).toFixed(2),
      avgPrice: (d.avgPrice / d.count).toFixed(2),
      avgMargin: (d.avgMargin / d.count).toFixed(2)
    })).sort((a, b) => b.totalMargin - a.totalMargin);
  }, []);

  // Relation coût/prix
  const costPriceRelation = useMemo(() => {
    return catalogData.map(p => ({
      modele: p.modele,
      cout: p.prix_cout_ils_avec_transport,
      prix: p.prix_vente_grossiste_ht,
      marge: p.marge_grossiste_pourcent
    })).filter(p => p.cout && p.prix);
  }, []);

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête avec conversion de devises */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">💎 Analyse Complète - Collection Été 2026</h1>
              <p className="text-blue-100">Prix d'achat (USD/ILS) • Prix de vente • Marges • Transport inclus (8%)</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
              <p className="text-sm mb-1">Taux de change</p>
              <p className="text-2xl font-bold">1 USD = {USD_TO_ILS.toFixed(2)} ILS</p>
              <button
                onClick={() => setCurrencyView(currencyView === 'ILS' ? 'USD' : 'ILS')}
                className="mt-2 text-sm bg-white/30 hover:bg-white/40 px-3 py-1 rounded transition"
              >
                Voir en {currencyView === 'ILS' ? 'USD' : 'ILS'}
              </button>
            </div>
          </div>
        </div>

        {/* KPIs Principaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Produits au Catalogue</p>
              <Package className="w-8 h-8 text-blue-500 opacity-30" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.totalProducts}</p>
            <p className="text-xs text-slate-500 mt-1">Collection complète</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Coût Moyen d'Achat</p>
              <DollarSign className="w-8 h-8 text-red-500 opacity-30" />
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {currencyView === 'ILS' ? `${stats.avgCostILS} ₪` : `$${stats.avgCostUSD}`}
            </p>
            <p className="text-xs text-slate-500 mt-1">Transport inclus (+8%)</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Prix Vente Grossiste</p>
              <TrendingUp className="w-8 h-8 text-green-500 opacity-30" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.avgWholesalePrice} ₪</p>
            <p className="text-xs text-slate-500 mt-1">Hors TVA</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Marge Moyenne</p>
              <Calculator className="w-8 h-8 text-purple-500 opacity-30" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.avgMarginPercent}%</p>
            <p className="text-xs text-slate-500 mt-1">Grossiste HT</p>
          </div>
        </div>

        {/* Graphiques d'analyse */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">📊 Distribution des Marges</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marginDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  formatter={(value, name) => [name === 'count' ? `${value} produits` : `${value.toFixed(2)} ₪`, name === 'count' ? 'Nombre' : 'Marge totale']}
                />
                <Legend />
                <Bar dataKey="count" fill="#3b82f6" name="Produits" />
                <Bar dataKey="total" fill="#10b981" name="Marge (₪)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">🏢 Performance par Département</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deptAnalysis.slice(0, 6)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="name" type="category" stroke="#64748b" width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  formatter={(value) => `${parseFloat(value).toFixed(2)}%`}
                />
                <Bar dataKey="avgMargin" fill="#8b5cf6" name="Marge moyenne %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Relation Coût/Prix */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-4">💹 Relation Coût d'Achat / Prix de Vente</h3>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="cout" name="Coût" unit=" ₪" stroke="#64748b" />
              <YAxis dataKey="prix" name="Prix" unit=" ₪" stroke="#64748b" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                formatter={(value, name) => [`${value} ₪`, name === 'cout' ? 'Coût' : name === 'prix' ? 'Prix' : 'Marge']}
              />
              <Scatter name="Produits" data={costPriceRelation} fill="#3b82f6">
                {costPriceRelation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.marge > 55 ? '#10b981' : entry.marge > 50 ? '#f59e0b' : '#ef4444'} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Marge &gt; 55%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span>Marge 50-55%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Marge &lt; 50%</span>
            </div>
          </div>
        </div>

        {/* Filtres avancés */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous types</option>
              {Array.from(new Set(catalogData.map(p => p.type_article))).map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous départements</option>
              {Array.from(new Set(catalogData.map(p => p.departement))).map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les produits</option>
              <option value="profitable">Haute rentabilité (&gt;55%)</option>
              <option value="low-margin">Faible marge (&lt;55%)</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="marge_grossiste_pourcent">Marge %</option>
              <option value="marge_grossiste_ils">Marge ₪</option>
              <option value="prix_vente_grossiste_ht">Prix vente</option>
              <option value="prix_cout_ils_avec_transport">Coût</option>
            </select>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-slate-600">
              <strong>{filteredProducts.length}</strong> produits affichés
            </p>
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition text-sm"
            >
              <SortAsc className="w-4 h-4" />
              {sortOrder === 'desc' ? 'Décroissant' : 'Croissant'}
            </button>
          </div>
        </div>

        {/* Tableau détaillé */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="text-left py-4 px-4 font-semibold">Modèle</th>
                  <th className="text-left py-4 px-4 font-semibold">Description</th>
                  <th className="text-left py-4 px-4 font-semibold">Couleur</th>
                  <th className="text-left py-4 px-4 font-semibold">Département</th>
                  <th className="text-right py-4 px-4 font-semibold">Coût USD</th>
                  <th className="text-right py-4 px-4 font-semibold">Coût ILS</th>
                  <th className="text-right py-4 px-4 font-semibold">Prix Vente HT</th>
                  <th className="text-right py-4 px-4 font-semibold">Prix Club</th>
                  <th className="text-right py-4 px-4 font-semibold">Prix Final</th>
                  <th className="text-right py-4 px-4 font-semibold">Marge ₪</th>
                  <th className="text-right py-4 px-4 font-semibold">Marge %</th>
                  <th className="text-center py-4 px-4 font-semibold">Tailles</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <React.Fragment key={product.modele}>
                    <tr 
                      className={`border-b border-slate-200 hover:bg-blue-50 transition cursor-pointer ${
                        product.marge_grossiste_pourcent > 55 ? 'bg-green-50' : 
                        product.marge_grossiste_pourcent < 50 ? 'bg-red-50' : ''
                      }`}
                      onClick={() => setExpandedProduct(expandedProduct === product.modele ? null : product.modele)}
                    >
                      <td className="py-3 px-4 font-mono text-blue-600 font-bold">{product.modele}</td>
                      <td className="py-3 px-4 text-slate-900">{product.description_anglais}</td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                          {product.couleur}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{product.departement}</td>
                      <td className="py-3 px-4 text-right font-semibold text-red-600">
                        ${product.prix_cout_usd_avec_transport?.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-red-600">
                        {product.prix_cout_ils_avec_transport?.toFixed(2)} ₪
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-blue-600">
                        {product.prix_vente_grossiste_ht} ₪
                      </td>
                      <td className="py-3 px-4 text-right text-slate-600">
                        {product.prix_club} ₪
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-slate-900">
                        {product.prix_consommateur} ₪
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-green-600">
                        {product.marge_grossiste_ils?.toFixed(2)} ₪
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`inline-block px-3 py-1 rounded-full font-bold ${
                          product.marge_grossiste_pourcent > 55 ? 'bg-green-100 text-green-700' :
                          product.marge_grossiste_pourcent > 50 ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {product.marge_grossiste_pourcent?.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                    {expandedProduct === product.modele && (
                      <tr className="bg-slate-50 border-b-2 border-slate-300">
                        <td colSpan="12" className="py-4 px-6">
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-bold text-slate-900 mb-2">📋 Détails Produit</h4>
                              <p className="text-sm text-slate-600 mb-1">
                                <strong>Type:</strong> {product.type_article} - {product.categorie}
                              </p>
                              <p className="text-sm text-slate-600 mb-1">
                                <strong>Sous-catégorie:</strong> {product.sous_departement}
                              </p>
                              <p className="text-sm text-slate-600">
                                <strong>Description détaillée:</strong> {product.description_detaillee}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 mb-2">👕 Tailles Disponibles</h4>
                              <div className="flex flex-wrap gap-2">
                                {Object.entries(product.tailles_disponibles).map(([taille, dispo]) => (
                                  dispo && (
                                    <span key={taille} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                      {taille}
                                    </span>
                                  )
                                ))}
                              </div>
                              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                                <p className="text-sm font-semibold text-purple-900">💰 Analyse de Rentabilité</p>
                                <p className="text-xs text-purple-700 mt-1">
                                  Marge consommateur: <strong>{product.marge_totale_pourcent?.toFixed(1)}%</strong> 
                                  ({product.marge_totale_ils?.toFixed(2)} ₪)
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer avec insights */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">💡 Insights Clés</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-1">🎯 Meilleur Département</p>
              <p className="opacity-90">{deptAnalysis[0]?.name} - Marge {deptAnalysis[0]?.avgMargin}%</p>
            </div>
            <div>
              <p className="font-semibold mb-1">📊 Distribution Marges</p>
              <p className="opacity-90">
                {marginDistribution.filter(m => m.count > 0).length} catégories actives
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">💵 Potentiel de Profit</p>
              <p className="opacity-90">{stats.totalMarginPotential} ₪ total</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UltimateMarketAnalysis;