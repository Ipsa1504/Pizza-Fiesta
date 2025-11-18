'use client';
import Loader from '@/components/common/Loader';
import CategoryTag from '@/components/features/categories/CategoryTag';
import MenuItemCard from '@/components/features/menuItems/MenuItemCard';
import SectionHeader from '@/components/layout/SectionHeader';
import Category from '@/types/Category';
import MenuItem from '@/types/MenuItem';
import React, { useEffect, useState } from 'react';

const MenuPage = () => {

  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(true)

  // Find the selected category by exact name match (trimmed to handle whitespace)
  const selectedCategory = categories.find(category => category.name.trim() === tag.trim());
  const filteredCategories = selectedCategory ? [selectedCategory] : [];

  useEffect(() => {
    Promise.all([
      fetch('/api/categories').then(res => res.json()),
      fetch('/api/menu-items').then(res => res.json())
    ]).then(([categoriesData, menuItemsData]: [Category[], MenuItem[]]) => {
      setCategories(categoriesData);
      setMenuItems(menuItemsData);
      // Only set tag if there are categories (trim to handle any whitespace)
      if (categoriesData && categoriesData.length > 0) {
        setTag(categoriesData[0].name.trim());
      }
      setLoading(false);
    }).catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, [])

  if (loading) {
    return <Loader className={''} />
  }

  return (
    <section className="py-12">
      {categories && menuItems &&
        <>
          <SectionHeader
            header={'Our Menu'}
            description={'From classic favorites to innovative creations, our hot pizza meals promise a delightful symphony of flavors that will leave you craving for more.'}
          />
          <div className='flex gap-3 justify-center mb-12'>
            {categories.map(category => (
              <CategoryTag
                key={category._id}
                name={category.name}
                onClick={(name: string) => setTag(name.trim())} isSelected={tag.trim() === category.name.trim()}
              />
            ))}
          </div>
          <div className='grid grid-cols-4 gap-6'>
            {(() => {
              // Collect all menu items from all filtered categories
              const allMenuItems: MenuItem[] = [];
              
              filteredCategories.forEach(category => {
                const categoryMenuItems = menuItems.filter(item => {
                  // Handle different category formats
                  let itemCategoryId: string;
                  
                  // If category is an object with _id property (populated)
                  if (item.category && typeof item.category === 'object' && '_id' in item.category) {
                    itemCategoryId = String((item.category as any)._id);
                  } 
                  // If category is already a string or can be converted
                  else {
                    itemCategoryId = String(item.category || '');
                  }
                  
                  const categoryId = String(category._id || '');
                  
                  return itemCategoryId === categoryId;
                });
                
                allMenuItems.push(...categoryMenuItems);
              });
              
              // Render all collected menu items
              if (allMenuItems.length > 0) {
                return allMenuItems.map((item) => (
                  <div className='p-4' key={item._id}>
                    <MenuItemCard menuItem={item} />
                  </div>
                ));
              } else if (filteredCategories.length > 0) {
                return (
                  <div className='col-span-4 text-center py-12'>
                    <p className='text-gray-400 text-lg'>No menu items found for the selected category.</p>
                    <p className='text-gray-500 text-sm mt-2'>Categories: {categories.length}, Menu Items: {menuItems.length}</p>
                  </div>
                );
              } else {
                return (
                  <div className='col-span-4 text-center py-12'>
                    <p className='text-gray-400 text-lg'>No menu items available. Please add menu items from the admin panel.</p>
                  </div>
                );
              }
            })()}
          </div>
        </>
      }
    </section>
  )
}

export default MenuPage