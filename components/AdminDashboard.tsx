import React, { useState } from 'react';
import { Product, SiteSettings, CategoryId, Order, OrderStatusType } from '../types';
import { CATEGORIES } from '../constants';
import { Plus, Trash2, Edit, Save, X, Image as ImageIcon, Settings, Package, LayoutDashboard, ShoppingCart, CheckCircle, Truck, XCircle, Clock } from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  settings: SiteSettings;
  orders: Order[];
  onUpdateProducts: (products: Product[]) => void;
  onUpdateSettings: (settings: SiteSettings) => void;
  onUpdateOrders: (orders: Order[]) => void;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  products, 
  settings, 
  orders,
  onUpdateProducts, 
  onUpdateSettings,
  onUpdateOrders,
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'settings' | 'orders'>('orders');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Product>({
    id: '',
    name: '',
    shortDescription: '',
    fullDescription: '',
    price: 0,
    oldPrice: 0,
    imageUrl: '',
    features: [],
    category: 'watches'
  });

  const handleEditClick = (product: Product) => {
    setFormData(product);
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleAddNewClick = () => {
    setFormData({
      id: Date.now().toString(),
      name: '',
      shortDescription: '',
      fullDescription: '',
      price: 0,
      oldPrice: 0,
      imageUrl: '',
      features: ['ميزة 1', 'ميزة 2'],
      category: 'watches'
    });
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      onUpdateProducts(products.filter(p => p.id !== id));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      // Update existing
      onUpdateProducts(products.map(p => p.id === editingProduct.id ? formData : p));
    } else {
      // Add new
      onUpdateProducts([...products, formData]);
    }
    setIsFormOpen(false);
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onUpdateSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeatureField = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  // Order Management
  const handleOrderStatusChange = (orderId: string, newStatus: OrderStatusType) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    onUpdateOrders(updatedOrders);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      onUpdateOrders(orders.filter(o => o.id !== orderId));
    }
  };

  const getStatusBadge = (status: OrderStatusType) => {
    switch (status) {
      case 'new': return <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 w-fit"><Clock className="w-3 h-3"/> جديد</span>;
      case 'confirmed': return <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 w-fit"><CheckCircle className="w-3 h-3"/> مؤكد</span>;
      case 'shipped': return <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 w-fit"><Truck className="w-3 h-3"/> تم الشحن</span>;
      case 'cancelled': return <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 w-fit"><XCircle className="w-3 h-3"/> ملغى</span>;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 dark:bg-zinc-950 z-50 overflow-y-auto">
      {/* Admin Header */}
      <div className="bg-gray-900 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-bold">لوحة تحكم المتجر</h2>
          </div>
          <button 
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
          >
            خروج من اللوحة
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg overflow-hidden sticky top-24">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 p-4 font-bold transition-colors ${
                activeTab === 'orders' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              الطلبيات
              <span className="mr-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {orders.filter(o => o.status === 'new').length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 p-4 font-bold transition-colors ${
                activeTab === 'products' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Package className="w-5 h-5" />
              المنتجات
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 p-4 font-bold transition-colors ${
                activeTab === 'settings' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Settings className="w-5 h-5" />
              الإعدادات والربط
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">إدارة الطلبيات</h3>
                <div className="text-sm text-gray-500">
                  مجموع الطلبات: {orders.length}
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-gray-200 dark:border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
                      <tr>
                        <th className="p-4 text-right text-sm font-bold text-gray-600 dark:text-gray-400">التاريخ</th>
                        <th className="p-4 text-right text-sm font-bold text-gray-600 dark:text-gray-400">العميل</th>
                        <th className="p-4 text-right text-sm font-bold text-gray-600 dark:text-gray-400">المنتج</th>
                        <th className="p-4 text-right text-sm font-bold text-gray-600 dark:text-gray-400">السعر</th>
                        <th className="p-4 text-right text-sm font-bold text-gray-600 dark:text-gray-400">الحالة</th>
                        <th className="p-4 text-center text-sm font-bold text-gray-600 dark:text-gray-400">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-gray-500">لا توجد طلبات حتى الآن</td>
                        </tr>
                      ) : (
                        orders.slice().reverse().map((order) => (
                          <tr key={order.id} className="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                            <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                              {order.date}
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-gray-800 dark:text-white">{order.customerName}</div>
                              <div className="text-xs text-gray-500 font-mono" dir="ltr">{order.phone}</div>
                              <div className="text-xs text-gray-500">{order.city}</div>
                            </td>
                            <td className="p-4 text-sm text-gray-800 dark:text-gray-200 max-w-[200px] truncate">
                               {order.productName}
                            </td>
                            <td className="p-4 font-bold text-green-600 whitespace-nowrap">{order.price} DH</td>
                            <td className="p-4">
                              {getStatusBadge(order.status)}
                            </td>
                            <td className="p-4 flex justify-center gap-2">
                              <select
                                value={order.status}
                                onChange={(e) => handleOrderStatusChange(order.id, e.target.value as OrderStatusType)}
                                className="text-sm border rounded p-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white outline-none focus:border-green-500"
                              >
                                <option value="new">جديد</option>
                                <option value="confirmed">مؤكد</option>
                                <option value="shipped">تم الشحن</option>
                                <option value="cancelled">ملغى</option>
                              </select>
                              <button 
                                onClick={() => handleDeleteOrder(order.id)}
                                className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                title="حذف الطلب"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">قائمة المنتجات</h3>
                <button 
                  onClick={handleAddNewClick}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold shadow-lg shadow-green-600/20"
                >
                  <Plus className="w-5 h-5" />
                  إضافة منتج جديد
                </button>
              </div>

              {isFormOpen ? (
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-zinc-800">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xl font-bold text-green-600">
                      {editingProduct ? 'تعديل منتج' : 'إضافة منتج جديد'}
                    </h4>
                    <button onClick={() => setIsFormOpen(false)} className="text-gray-500 hover:text-red-500">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">اسم المنتج</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">السعر (درهم)</label>
                      <input 
                        required 
                        type="number" 
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                        className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">السعر القديم (اختياري)</label>
                      <input 
                        type="number" 
                        value={formData.oldPrice || ''}
                        onChange={(e) => setFormData({...formData, oldPrice: Number(e.target.value)})}
                        className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">رابط الصورة (URL)</label>
                      <div className="flex gap-2">
                         <input 
                          required 
                          type="text" 
                          value={formData.imageUrl}
                          onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                          placeholder="https://example.com/image.jpg"
                          className="flex-grow p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-green-500 outline-none dir-ltr text-left"
                        />
                        <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-800 rounded flex items-center justify-center overflow-hidden border dark:border-zinc-700">
                           {formData.imageUrl ? (
                             <img src={formData.imageUrl} alt="preview" className="w-full h-full object-cover" />
                           ) : <ImageIcon className="text-gray-400" />}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">التصنيف</label>
                      <select 
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value as CategoryId})}
                        className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                      >
                        {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">الوصف المختصر</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.shortDescription}
                        onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                        className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">مميزات المنتج</label>
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                           <input 
                            type="text" 
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            className="flex-grow p-2 rounded border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white outline-none"
                           />
                           <button 
                            type="button" 
                            onClick={() => {
                               const newFeatures = formData.features.filter((_, i) => i !== index);
                               setFormData({...formData, features: newFeatures});
                            }}
                            className="text-red-500 hover:bg-red-50 p-2 rounded"
                           >
                             <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                      ))}
                      <button 
                        type="button" 
                        onClick={addFeatureField}
                        className="text-sm text-green-600 font-bold hover:underline"
                      >
                        + إضافة ميزة
                      </button>
                    </div>

                    <div className="col-span-2 flex justify-end gap-4 mt-4">
                      <button 
                        type="button" 
                        onClick={() => setIsFormOpen(false)}
                        className="px-6 py-3 rounded-lg font-bold text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800 transition-colors"
                      >
                        إلغاء
                      </button>
                      <button 
                        type="submit" 
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-colors flex items-center gap-2"
                      >
                        <Save className="w-5 h-5" />
                        حفظ التغييرات
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-gray-200 dark:border-zinc-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
                        <tr>
                          <th className="p-4 text-right text-sm font-bold text-gray-600 dark:text-gray-400">الصورة</th>
                          <th className="p-4 text-right text-sm font-bold text-gray-600 dark:text-gray-400">الاسم</th>
                          <th className="p-4 text-right text-sm font-bold text-gray-600 dark:text-gray-400">التصنيف</th>
                          <th className="p-4 text-right text-sm font-bold text-gray-600 dark:text-gray-400">السعر</th>
                          <th className="p-4 text-center text-sm font-bold text-gray-600 dark:text-gray-400">إجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id} className="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                            <td className="p-4">
                              <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded object-cover" />
                            </td>
                            <td className="p-4 font-bold text-gray-800 dark:text-white">{product.name}</td>
                            <td className="p-4 text-gray-600 dark:text-gray-400 text-sm">
                               {CATEGORIES.find(c => c.id === product.category)?.name}
                            </td>
                            <td className="p-4 font-bold text-green-600">{product.price} DH</td>
                            <td className="p-4 flex justify-center gap-2">
                              <button 
                                onClick={() => handleEditClick(product)}
                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteClick(product.id)}
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
             <div className="max-w-2xl bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-xl border border-gray-200 dark:border-zinc-800">
               <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white border-b pb-4 dark:border-zinc-800">إعدادات المتجر والتكامل</h3>
               
               <div className="space-y-6">
                 <div>
                   <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Facebook Pixel ID</label>
                   <input 
                      type="text" 
                      name="facebookPixelId"
                      value={settings.facebookPixelId}
                      onChange={handleSettingsChange}
                      placeholder="Ex: 1234567890"
                      className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none dir-ltr text-left font-mono"
                   />
                   <p className="text-xs text-gray-500 mt-1">يستخدم لتتبع الزوار والطلبات.</p>
                 </div>

                 <div>
                   <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">رابط Google Sheet (Webhook)</label>
                   <input 
                      type="text" 
                      name="googleSheetUrl"
                      value={settings.googleSheetUrl}
                      onChange={handleSettingsChange}
                      placeholder="https://script.google.com/macros/s/..."
                      className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-green-500 outline-none dir-ltr text-left font-mono"
                   />
                   <p className="text-xs text-gray-500 mt-1">رابط السكربت لتصدير الطلبات تلقائياً إلى Google Sheets.</p>
                 </div>

                 <div className="border-t border-gray-100 dark:border-zinc-800 pt-6">
                   <div className="flex items-center justify-between mb-4">
                     <label className="text-lg font-bold text-gray-800 dark:text-white">شريط الإشعارات العلوي</label>
                     <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                        <input 
                           type="checkbox" 
                           name="isBannerActive"
                           id="toggle-banner"
                           checked={settings.isBannerActive}
                           onChange={handleSettingsChange}
                           className="absolute w-6 h-6 rounded-full bg-white border-2 border-gray-300 appearance-none cursor-pointer checked:right-0 checked:bg-green-600 checked:border-green-600 transition-all z-10"
                        />
                        <label htmlFor="toggle-banner" className={`block overflow-hidden h-6 rounded-full cursor-pointer ${settings.isBannerActive ? 'bg-green-200' : 'bg-gray-200'}`}></label>
                     </div>
                   </div>
                   
                   <input 
                      type="text" 
                      name="eventBannerText"
                      value={settings.eventBannerText}
                      onChange={handleSettingsChange}
                      disabled={!settings.isBannerActive}
                      placeholder="مثال: توصيل مجاني لجميع الطلبات اليوم!"
                      className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-green-500 outline-none disabled:opacity-50"
                   />
                 </div>
               </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;