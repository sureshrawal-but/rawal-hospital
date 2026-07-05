'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, Plus, Minus, Trash2, Printer, DollarSign, Pill, Receipt, UserRound } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import SearchInput from '@/components/ui/SearchInput';
import StatCard from '@/components/ui/StatCard';
import EmptyState from '@/components/ui/EmptyState';
import ErrorState from '@/components/ui/ErrorState';
import { PageLoader } from '@/components/ui/Loader';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const availableMeds = [
  { id: 'MED-001', name: 'Amlodipine 5mg', price: 5, stock: 2500 },
  { id: 'MED-002', name: 'Metformin 500mg', price: 6, stock: 45 },
  { id: 'MED-004', name: 'Paracetamol 500mg', price: 1, stock: 5000 },
  { id: 'MED-006', name: 'Insulin Glargine', price: 400, stock: 80 },
  { id: 'MED-007', name: 'Cetirizine 10mg', price: 2, stock: 3000 },
  { id: 'MED-008', name: 'Omeprazole 20mg', price: 4, stock: 2000 },
];

export default function PharmacySalesPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [patientName, setPatientName] = useState('');

  const filteredMeds = availableMeds.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (med: typeof availableMeds[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === med.id);
      if (existing) {
        return prev.map(item => item.id === med.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: med.id, name: med.name, price: med.price, quantity: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (error) return <ErrorState title="Failed to load sales" onRetry={() => setError(false)} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Counter</h1>
          <p className="text-gray-500 text-sm mt-1">Process medicine sales and generate bills</p>
        </div>
        <div className="flex items-center gap-2">
          <StatCard title="Today's Sales" value="₹12,450" icon={<DollarSign className="h-5 w-5" />} variant="primary" className="!p-3" />
          <Button variant="outline" size="sm" leftIcon={<Printer className="h-4 w-4" />}>Sales Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card padding="sm">
            <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search medicines..." className="mb-3" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {filteredMeds.map((med) => (
                <motion.button key={med.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(med)}
                  className="p-3 border border-gray-100 rounded-xl text-left hover:border-primary hover:bg-primary-50/50 transition-all">
                  <div className="flex items-center gap-2 mb-1">
                    <Pill className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium truncate">{med.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-primary">₹{med.price}</span>
                    <Badge variant={med.stock > 100 ? 'success' : 'warning'} size="sm">Stock: {med.stock}</Badge>
                  </div>
                </motion.button>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Cart ({cart.length})
              </h3>
            </div>
            <div className="mb-3">
              <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                placeholder="Patient name (optional)" />
            </div>
            {cart.length === 0 ? (
              <EmptyState title="Cart is empty" description="Select medicines from the left panel." />
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 border border-gray-100 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">₹{item.price} × {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQty(item.id, -1)}
                        className="p-1 rounded-lg hover:bg-gray-100 text-gray-500">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)}
                        className="p-1 rounded-lg hover:bg-gray-100 text-gray-500">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 pt-3 mt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">GST (12%)</span>
                  <span>₹{Math.round(total * 0.12)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-2">
                  <span>Total</span>
                  <span className="text-primary">₹{total + Math.round(total * 0.12)}</span>
                </div>
                <Button className="w-full" leftIcon={<Receipt className="h-4 w-4" />}>
                  Generate Bill
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
