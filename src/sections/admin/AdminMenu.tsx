import React, { useEffect, useRef, useState } from 'react';

interface MenuItemRow {
  id: string;
  name: string;
  desc: string;
  price: string; // decimal comes back as a string from the DB
  category: 'starters' | 'schnitzels' | 'grill' | 'more' | 'sides';
  image: string;
  dietary: string[];
}

const CATEGORIES: MenuItemRow['category'][] = ['starters', 'schnitzels', 'grill', 'more', 'sides'];

const EMPTY_FORM = {
  name: '',
  desc: '',
  price: '',
  category: 'starters' as MenuItemRow['category'],
  image: '',
  dietary: '',
};

export function AdminMenu() {
  const [items, setItems] = useState<MenuItemRow[] | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const res = await fetch('/api/admin/menu');
    setItems(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (item: MenuItemRow) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      desc: item.desc,
      price: item.price,
      category: item.category,
      image: item.image,
      dietary: item.dietary.join(', '),
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('/api/admin/menu/upload', { method: 'POST', body });
      if (!res.ok) throw new Error('Upload failed');
      const { path } = await res.json();
      setForm((f) => ({ ...f, image: path }));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const body = {
      name: form.name,
      desc: form.desc,
      price: Number(form.price),
      category: form.category,
      image: form.image,
      dietary: form.dietary
        .split(',')
        .map((d) => d.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch(editingId ? `/api/admin/menu/${editingId}` : '/api/admin/menu', {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Save failed');
      resetForm();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    setItems((prev) => prev?.filter((i) => i.id !== id) ?? prev);
    await fetch(`/api/admin/menu/${id}`, { method: 'DELETE' });
    if (editingId === id) resetForm();
  };

  const grouped = CATEGORIES.map((cat) => ({
    category: cat,
    items: (items ?? []).filter((i) => i.category === cat),
  }));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif font-bold text-2xl text-brand-espresso">Menu Items</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 flex flex-col gap-4"
      >
        <h2 className="font-serif font-bold text-lg text-brand-espresso">
          {editingId ? 'Edit Item' : 'Add New Item'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-sm font-semibold text-brand-espresso/70">
            Name
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="kp-input-block"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-semibold text-brand-espresso/70">
            Price ($)
            <input
              required
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              className="kp-input-block"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm font-semibold text-brand-espresso/70">
          Description
          <textarea
            required
            rows={2}
            value={form.desc}
            onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
            className="kp-input-block resize-none"
          />
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-sm font-semibold text-brand-espresso/70">
            Category
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as MenuItemRow['category'] }))}
              className="kp-input-block"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm font-semibold text-brand-espresso/70">
            Tags (comma separated)
            <input
              value={form.dietary}
              onChange={(e) => setForm((f) => ({ ...f, dietary: e.target.value }))}
              placeholder="Vegan, Gluten Free, COR Kosher"
              className="kp-input-block"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm font-semibold text-brand-espresso/70">
          Image
          <input
            ref={fileInputRef}
            type="file"
            accept="image/webp,image/jpeg,image/png"
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
            className="text-sm"
          />
        </label>
        {uploading && <p className="text-sm text-brand-espresso/60">Uploading…</p>}
        {form.image && (
          <img src={form.image} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-gray-100" />
        )}

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving || uploading}
            className="bg-brand-forest text-brand-cream text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-espresso transition-colors disabled:opacity-50 cursor-pointer"
          >
            {editingId ? 'Save Changes' : 'Add Item'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm font-semibold text-brand-espresso/60 hover:text-brand-espresso px-3 cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {!items && <p className="text-brand-espresso/60 text-sm">Loading…</p>}

      <div className="flex flex-col gap-6">
        {grouped.map(({ category, items: catItems }) => (
          <div key={category}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">{category}</h3>
            <div className="flex flex-col gap-2">
              {catItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-gray-100 shadow-2xs p-3 flex items-center gap-3"
                >
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-brand-espresso truncate">{item.name}</p>
                    <p className="text-sm text-brand-espresso/60 truncate">${Number(item.price).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => startEdit(item)}
                    className="text-xs font-semibold text-brand-espresso/70 hover:text-brand-espresso cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="text-xs font-semibold text-red-500/80 hover:text-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              ))}
              {catItems.length === 0 && <p className="text-sm text-brand-espresso/40">No items yet.</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
