import React, { useState } from 'react';
import { INITIAL_PROPERTIES, INITIAL_USERS, Property } from './data/mockData';
import { Header } from './components/Header';
import { Drawer } from './components/Drawer';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { MapScreen } from './components/MapScreen';
import { PropertyDetailScreen } from './components/PropertyDetailScreen';
import { AddPropertyScreen } from './components/AddPropertyScreen';
import { AdminDashboardScreen } from './components/AdminDashboardScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AboutScreen } from './components/AboutScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [users] = useState(INITIAL_USERS);
  const [selectedProperty, setSelectedProperty] = useState<Property>(INITIAL_PROPERTIES[0]);
  const [favorites, setFavorites] = useState<string[]>(['SL-2041', 'SL-2042']);
  const [currency, setCurrency] = useState<'SYP' | 'USD'>('SYP');
  const [lang, setLang] = useState<'AR' | 'EN'>('AR');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filterCity, setFilterCity] = useState<string>('الكل');
  const [filterType, setFilterType] = useState<string>('الكل');

  const handleNavigate = (screen: string) => {
    if (screen === 'favorites') {
      setCurrentScreen('explore');
      // trigger favorites view
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddProperty = (newProperty: Property) => {
    setProperties((prev) => [newProperty, ...prev]);
  };

  const handleUpdatePropertyStatus = (id: string, status: Property['status']) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  const handleUpdatePropertyPrice = (id: string, newPrice: number) => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              priceSYP: newPrice,
              priceUSD: Math.round(newPrice / 1500),
            }
          : p
      )
    );
  };

  const handleDeleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    setFavorites((prev) => prev.filter((item) => item !== id));
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] flex flex-col font-['IBM_Plex_Sans_Arabic']" dir="rtl">
      {/* Universal Sticky Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onToggleMenu={() => setIsDrawerOpen(true)}
        currency={currency}
        onToggleCurrency={() => setCurrency((c) => (c === 'SYP' ? 'USD' : 'SYP'))}
        lang={lang}
        onToggleLang={() => setLang((l) => (l === 'AR' ? 'EN' : 'AR'))}
      />

      {/* Side Navigation Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        favoritesCount={favorites.length}
      />

      {/* Screen Router */}
      <main className="flex-1">
        {currentScreen === 'home' && (
          <HomeScreen
            properties={properties}
            onNavigate={handleNavigate}
            onSelectProperty={setSelectedProperty}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            currency={currency}
            onFilterByCity={(city) => setFilterCity(city)}
            onFilterByType={(type) => setFilterType(type)}
          />
        )}

        {currentScreen === 'explore' && (
          <ExploreScreen
            properties={properties}
            onNavigate={handleNavigate}
            onSelectProperty={setSelectedProperty}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            currency={currency}
            initialCity={filterCity}
            initialType={filterType}
          />
        )}

        {currentScreen === 'map' && (
          <MapScreen
            properties={properties}
            onNavigate={handleNavigate}
            onSelectProperty={setSelectedProperty}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            currency={currency}
          />
        )}

        {currentScreen === 'property-detail' && (
          <PropertyDetailScreen
            property={selectedProperty}
            allProperties={properties}
            onNavigate={handleNavigate}
            onSelectProperty={setSelectedProperty}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            currency={currency}
            onToggleCurrency={() => setCurrency((c) => (c === 'SYP' ? 'USD' : 'SYP'))}
          />
        )}

        {currentScreen === 'add-property' && (
          <AddPropertyScreen
            onAddProperty={handleAddProperty}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'admin-dashboard' && (
          <AdminDashboardScreen
            properties={properties}
            onUpdatePropertyStatus={handleUpdatePropertyStatus}
            onUpdatePropertyPrice={handleUpdatePropertyPrice}
            onDeleteProperty={handleDeleteProperty}
            onSelectProperty={setSelectedProperty}
            onNavigate={handleNavigate}
            users={users}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            properties={properties}
            onNavigate={handleNavigate}
            onSelectProperty={setSelectedProperty}
            favorites={favorites}
            onDeleteProperty={handleDeleteProperty}
            currency={currency}
          />
        )}

        {currentScreen === 'about' && (
          <AboutScreen onNavigate={handleNavigate} />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav currentScreen={currentScreen} onNavigate={handleNavigate} />
    </div>
  );
}
