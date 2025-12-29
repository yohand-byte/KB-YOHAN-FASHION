import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Package, Calendar, Filter, Search, ChevronDown, ChevronUp } from 'lucide-react';

const MarketAnalysisDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('revenue');
  const [expandedProduct, setExpandedProduct] = useState(null);
  
  // Données de ventes mensuelles (Collection Été 2026)
  const monthlyData = {
    'Sept 2024': [
      { modele: '50382', description: 'Jupe plissée école', type: 'Uniforme', departement: 'Jupes', quantite: 3, total_avec_tva: 330, total_sans_tva: 282.05, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50500', description: 'Pull uniforme avec boutons', type: 'Filles quotidien', departement: 'Chemises, hauts', quantite: 11, total_avec_tva: 1189.82, total_sans_tva: 1016.94, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50500B', description: 'Pull boutons noir or', type: 'Filles quotidien', departement: 'Chemises, hauts', quantite: 2, total_avec_tva: 240, total_sans_tva: 205.13, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50500C', description: 'Pull boutons noir', type: 'Filles quotidien', departement: 'Chemises, hauts', quantite: 4, total_avec_tva: 458, total_sans_tva: 391.45, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50502', description: 'Chemise blanche col montant', type: 'Uniforme', departement: 'Chemises, hauts', quantite: 41, total_avec_tva: 3740, total_sans_tva: 3196.58, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50503', description: 'Pantalon uniforme gris', type: 'Uniforme', departement: 'Pantalons', quantite: 28, total_avec_tva: 3080, total_sans_tva: 2632.48, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50510', description: 'Robe école marine', type: 'Uniforme', departement: 'Robes', quantite: 15, total_avec_tva: 1650, total_sans_tva: 1410.26, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50520', description: 'Veste blazer marine', type: 'Uniforme', departement: 'Vestes', quantite: 8, total_avec_tva: 1520, total_sans_tva: 1299.15, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50530', description: 'Short sport école', type: 'Sport', departement: 'Shorts', quantite: 22, total_avec_tva: 1320, total_sans_tva: 1128.21, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '262100A', description: 'Robe marin blanche', type: 'Été', departement: 'Robes', quantite: 12, total_avec_tva: 2280, total_sans_tva: 1948.72, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '262100B', description: 'Robe marin bleu ciel', type: 'Été', departement: 'Robes', quantite: 18, total_avec_tva: 3420, total_sans_tva: 2923.08, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '262102A', description: 'Chemise marin blanche', type: 'Été', departement: 'Chemises', quantite: 25, total_avec_tva: 3125, total_sans_tva: 2671.37, cout_total: null, profit_brut: null, marge_pourcent: null },
    ],
    'Oct 2024': [
      { modele: '50382', description: 'Jupe plissée école', type: 'Uniforme', departement: 'Jupes', quantite: 2, total_avec_tva: 220, total_sans_tva: 188.03, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50500', description: 'Pull uniforme avec boutons', type: 'Filles quotidien', departement: 'Chemises, hauts', quantite: 11, total_avec_tva: 1178, total_sans_tva: 1006.84, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50500B', description: 'Pull boutons noir or', type: 'Filles quotidien', departement: 'Chemises, hauts', quantite: 11, total_avec_tva: 1251.75, total_sans_tva: 1069.87, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50500C', description: 'Pull boutons noir', type: 'Filles quotidien', departement: 'Chemises, hauts', quantite: 4, total_avec_tva: 461.25, total_sans_tva: 394.23, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50502', description: 'Chemise blanche col montant', type: 'Uniforme', departement: 'Chemises, hauts', quantite: 38, total_avec_tva: 3610, total_sans_tva: 3085.47, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50503', description: 'Pantalon uniforme gris', type: 'Uniforme', departement: 'Pantalons', quantite: 31, total_avec_tva: 3410, total_sans_tva: 2914.53, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '262100A', description: 'Robe marin blanche', type: 'Été', departement: 'Robes', quantite: 15, total_avec_tva: 2850, total_sans_tva: 2435.90, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '262100B', description: 'Robe marin bleu ciel', type: 'Été', departement: 'Robes', quantite: 20, total_avec_tva: 3800, total_sans_tva: 3247.86, cout_total: null, profit_brut: null, marge_pourcent: null },
    ],
    'Nov 2024': [
      { modele: '50382', description: 'Jupe plissée école', type: 'Uniforme', departement: 'Jupes', quantite: 2, total_avec_tva: 170.5, total_sans_tva: 145.73, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50500', description: 'Pull uniforme avec boutons', type: 'Filles quotidien', departement: 'Chemises, hauts', quantite: 28, total_avec_tva: 3095.81, total_sans_tva: 2645.99, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50500B', description: 'Pull boutons noir or', type: 'Filles quotidien', departement: 'Chemises, hauts', quantite: 8, total_avec_tva: 1003, total_sans_tva: 857.26, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50500C', description: 'Pull boutons noir', type: 'Filles quotidien', departement: 'Chemises, hauts', quantite: 7, total_avec_tva: 557.75, total_sans_tva: 476.71, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '262100A', description: 'Robe marin blanche', type: 'Été', departement: 'Robes', quantite: 10, total_avec_tva: 1900, total_sans_tva: 1623.93, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '262100B', description: 'Robe marin bleu ciel', type: 'Été', departement: 'Robes', quantite: 14, total_avec_tva: 2660, total_sans_tva: 2273.50, cout_total: null, profit_brut: null, marge_pourcent: null },
    ],
    'Déc 2024': [
      { modele: '50382', description: 'Jupe plissée école', type: 'Uniforme', departement: 'Jupes', quantite: 4, total_avec_tva: 312.32, total_sans_tva: 266.94, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50500', description: 'Pull uniforme avec boutons', type: 'Filles quotidien', departement: 'Chemises, hauts', quantite: 21, total_avec_tva: 1773.38, total_sans_tva: 1515.71, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50500B', description: 'Pull boutons noir or', type: 'Filles quotidien', departement: 'Chemises, hauts', quantite: 9, total_avec_tva: 828.60, total_sans_tva: 708.20, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '262100A', description: 'Robe marin blanche', type: 'Été', departement: 'Robes', quantite: 8, total_avec_tva: 1520, total_sans_tva: 1299.15, cout_total: null, profit_brut: null, marge_pourcent: null },
    ],
    'Jan 2025': [
      { modele: '50382', description: 'Jupe plissée école', type: 'Uniforme', departement: 'Jupes', quantite: 1, total_avec_tva: 92, total_sans_tva: 77.97, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50500', description: 'Pull uniforme avec boutons', type: 'Filles quotidien', departement: 'Chemises, hauts', quantite: 23, total_avec_tva: 1893.4, total_sans_tva: 1604.58, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '50500B', description: 'Pull boutons noir or', type: 'Filles quotidien', departement: 'Chemises, hauts', quantite: 2, total_avec_tva: 186.6, total_sans_tva: 158.14, cout_total: null, profit_brut: null, marge_pourcent: null },
      { modele: '262100A', description: 'Robe marin blanche', type: 'Été', departement: 'Robes', quantite: 6, total_avec_tva: 1140, total_sans_tva: 974.36, cout_total: null, profit_brut: null, marge_pourcent: null },
    ]
  };

  // Calculer les statistiques globales
  const stats = useMemo(() => {
    const allProducts = Object.values(monthlyData).flat();
    const totalRevenue = allProducts.reduce((sum, p) => sum + (p.total_sans_tva || 0), 0);
    const totalQuantity = allProducts.reduce((sum, p) => sum + (p.quantite || 0), 0);
    const avgPrice = totalRevenue / totalQuantity;
    
    return {
      totalRevenue: totalRevenue.toFixed(2),
      totalQuantity,
      avgPrice: avgPrice.toFixed(2),
      productCount: new Set(allProducts.map(p => p.modele)).size
    };
  }, []);

  // Données pour le graphique d'évolution mensuelle
  const monthlyTrends = useMemo(() => {
    return Object.entries(monthlyData).map(([month, products]) => ({
      mois: month,
      revenus: products.reduce((sum, p) => sum + (p.total_sans_tva || 0), 0),
      quantite: products.reduce((sum, p) => sum + (p.quantite || 0), 0),
      produits: products.length
    }));
  }, []);

  // Top produits par revenus
  const topProducts = useMemo(() => {
    const productMap = new Map();
    Object.values(monthlyData).flat().forEach(p => {
      const key = p.modele;
      if (!productMap.has(key)) {
        productMap.set(key, {
          modele: p.modele,
          description: p.description,
          type: p.type,
          departement: p.departement,
          quantite: 0,
          revenus: 0
        });
      }
      const prod = productMap.get(key);
      prod.quantite += p.quantite || 0;
      prod.revenus += p.total_sans_tva || 0;
    });
    
    return Array.from(productMap.values())
      .sort((a, b) => b.revenus - a.revenus)
      .slice(0, 20);
  }, []);

  // Répartition par catégorie
  const categoryDistribution = useMemo(() => {
    const catMap = new Map();
    Object.values(monthlyData).flat().forEach(p => {
      const cat = p.type || 'Non classé';
      if (!catMap.has(cat)) {
        catMap.set(cat, { name: cat, value: 0, quantity: 0 });
      }
      catMap.get(cat).value += p.total_sans_tva || 0;
      catMap.get(cat).quantity += p.quantite || 0;
    });
    return Array.from(catMap.values());
  }, []);

  // Répartition par département
  const departmentDistribution = useMemo(() => {
    const deptMap = new Map();
    Object.values(monthlyData).flat().forEach(p => {
      const dept = p.departement || 'Non classé';
      if (!deptMap.has(dept)) {
        deptMap.set(dept, { name: dept, value: 0, quantity: 0 });
      }
      deptMap.get(dept).value += p.total_sans_tva || 0;
      deptMap.get(dept).quantity += p.quantite || 0;
    });
    return Array.from(deptMap.values()).sort((a, b) => b.value - a.value);
  }, []);

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#6366f1', '#f43f5e'];

  const filteredProducts = useMemo(() => {
    let products = topProducts;
    
    if (searchTerm) {
      products = products.filter(p => 
        p.modele.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      products = products.filter(p => p.type === selectedCategory);
    }
    
    if (sortBy === 'revenue') {
      products.sort((a, b) => b.revenus - a.revenus);
    } else if (sortBy === 'quantity') {
      products.sort((a, b) => b.quantite - a.quantite);
    }
    
    return products;
  }, [topProducts, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            📊 Analyse de Marché - Collection Été 2026
          </h1>
          <p className="text-slate-600">
            Étude complète des ventes de septembre 2024 à janvier 2025
          </p>
        </div>

        {/* KPIs principaux */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Revenus Totaux (HT)</p>
                <p className="text-3xl font-bold text-slate-900">{parseFloat(stats.totalRevenue).toLocaleString('fr-FR')} ₪</p>
              </div>
              <DollarSign className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Unités Vendues</p>
                <p className="text-3xl font-bold text-slate-900">{stats.totalQuantity.toLocaleString('fr-FR')}</p>
              </div>
              <Package className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Prix Moyen</p>
                <p className="text-3xl font-bold text-slate-900">{stats.avgPrice} ₪</p>
              </div>
              <TrendingUp className="w-12 h-12 text-pink-500 opacity-20" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Produits Uniques</p>
                <p className="text-3xl font-bold text-slate-900">{stats.productCount}</p>
              </div>
              <Calendar className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Graphiques d'évolution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">📈 Évolution des Revenus Mensuels</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="mois" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  formatter={(value) => `${parseFloat(value).toLocaleString('fr-FR')} ₪`}
                />
                <Legend />
                <Line type="monotone" dataKey="revenus" stroke="#3b82f6" strokeWidth={3} name="Revenus (₪)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">📦 Évolution des Quantités Vendues</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="mois" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="quantite" fill="#8b5cf6" name="Quantité" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Répartition par catégorie et département */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">🎯 Répartition par Type de Produit</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${parseFloat(value).toLocaleString('fr-FR')} ₪`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">🏢 Top Départements par Revenus</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentDistribution.slice(0, 8)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="name" type="category" stroke="#64748b" width={120} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  formatter={(value) => `${parseFloat(value).toLocaleString('fr-FR')} ₪`}
                />
                <Bar dataKey="value" fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les types</option>
              {Array.from(new Set(topProducts.map(p => p.type))).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="revenue">Trier par revenus</option>
              <option value="quantity">Trier par quantité</option>
            </select>
          </div>
        </div>

        {/* Tableau des top produits */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4">🏆 Top 20 Produits</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold">#</th>
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold">Modèle</th>
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold">Description</th>
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold">Département</th>
                  <th className="text-right py-3 px-4 text-slate-700 font-semibold">Quantité</th>
                  <th className="text-right py-3 px-4 text-slate-700 font-semibold">Revenus (₪)</th>
                  <th className="text-right py-3 px-4 text-slate-700 font-semibold">Prix Moy.</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr 
                    key={product.modele}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => setExpandedProduct(expandedProduct === product.modele ? null : product.modele)}
                  >
                    <td className="py-3 px-4 text-slate-600">{index + 1}</td>
                    <td className="py-3 px-4 font-mono text-blue-600 font-semibold">{product.modele}</td>
                    <td className="py-3 px-4 text-slate-900">{product.description}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                        {product.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{product.departement}</td>
                    <td className="py-3 px-4 text-right font-semibold text-slate-900">{product.quantite}</td>
                    <td className="py-3 px-4 text-right font-bold text-green-600">
                      {product.revenus.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-600">
                      {(product.revenus / product.quantite).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insights clés */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">💡 Insights Clés de l'Analyse</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Performance Globale
              </h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• <strong>{stats.totalQuantity}</strong> unités vendues sur 5 mois</li>
                <li>• Chiffre d'affaires total HT: <strong>{parseFloat(stats.totalRevenue).toLocaleString('fr-FR')} ₪</strong></li>
                <li>• <strong>{stats.productCount}</strong> références produits différentes</li>
                <li>• Prix moyen par article: <strong>{stats.avgPrice} ₪</strong></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Top Performers
              </h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Meilleur produit: <strong>{topProducts[0]?.description}</strong></li>
                <li>• Revenus: <strong>{topProducts[0]?.revenus.toLocaleString('fr-FR')} ₪</strong></li>
                <li>• Catégorie dominante: <strong>{categoryDistribution[0]?.name}</strong></li>
                <li>• Département principal: <strong>{departmentDistribution[0]?.name}</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Note de devises */}
        <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 rounded-lg p-4">
          <p className="text-sm text-amber-900">
            <strong>📌 Note:</strong> Tous les montants sont affichés en Shekels israéliens (₪) hors taxes (HT). 
            Le fichier original contient des données en USD et ILS - une conversion uniforme peut être nécessaire pour une analyse complète.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysisDashboard;