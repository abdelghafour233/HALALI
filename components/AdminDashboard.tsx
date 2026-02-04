import React, { useState } from 'react';
import { Product, SiteSettings, CategoryId } from '../types';
import { CATEGORIES } from '../constants';
import { Plus, Trash2, Edit, Save, X, Image as ImageIcon, Settings, Package, LayoutDashboard } from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  settings: SiteSettings;
  onUpdateProducts: (products: Product[]) => void;
  onUpdateSettings: (settings: SiteSettings) => void;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  products, 
  settings, 
  onUpdateProducts, 
  onUpdateSettings,
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
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