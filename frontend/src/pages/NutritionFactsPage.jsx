import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import NutritionItem from '../components/NutritionItem'; // Import the reusable component

export default function NutritionFactsPage() {
  const [showSlider, setShowSlider] = useState(false);

  const positives = [
    { 
      icon: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png', 
      title: 'Protein', 
      description: 'Good for muscles.', 
      value: 15, 
      unit: 'g', 
      safeMin: 0, 
      safeMax: 20, 
      safeValue: 10 
    },
    { 
      icon: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png', 
      title: 'Sugar', 
      description: 'Low sugar!', 
      value: 4, 
      unit: 'g', 
      safeMin: 0, 
      safeMax: 14, 
      safeValue: 6.8 
    },
    { 
      icon: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png', 
      title: 'No Additives', 
      description: 'Completely natural.', 
      value: 100, 
      unit: '%', 
      safeMin: 0, 
      safeMax: 100, 
      safeValue: 100 
    },
    { 
      icon: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png', 
      title: 'Fiber', 
      description: 'Good fiber content.', 
      value: 5, 
      unit: 'g', 
      safeMin: 0, 
      safeMax: 10, 
      safeValue: 6 
    },
    { 
      icon: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png', 
      title: 'Salt', 
      description: 'Low salt.', 
      value: 0.3, 
      unit: 'g', 
      safeMin: 0, 
      safeMax: 1.5, 
      safeValue: 0.75 
    },
    { 
      icon: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png', 
      title: 'Sodium', 
      description: 'Within limits.', 
      value: 120, 
      unit: 'mg', 
      safeMin: 0, 
      safeMax: 2400, 
      safeValue: 1200 
    },
  ];

  const negatives = [
    { 
      icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828843.png', 
      title: 'Calories', 
      description: 'High calorie.', 
      value: 450, 
      unit: 'kcal', 
      safeMin: 0, 
      safeMax: 500, 
      safeValue: 300 
    },
    { 
      icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828843.png', 
      title: 'Saturated Fat', 
      description: 'Moderate saturated fat.', 
      value: 12, 
      unit: 'g', 
      safeMin: 0, 
      safeMax: 20, 
      safeValue: 10 
    },
  ];

  const handleDropdownClick = () => {
    setShowSlider(true); // Show slider after dropdown click
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4">
        <button className="p-2 bg-gray-200 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">NutriScan</h1>
      </div>

      {/* Product Info */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://via.placeholder.com/150"
          alt="Product"
          className="rounded-lg shadow-md w-40 h-40 object-cover"
        />
        <h2 className="text-xl font-semibold mt-4">Choco Delight</h2>
        <p className="text-gray-600 text-sm">Delicious chocolate snack</p>
        <div className="mt-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          Good (73/100)
        </div>
      </div>

      {/* Dropdown */}
      <div className="mb-8">
        <select
          onClick={handleDropdownClick}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Nutrition Detail</option>
          <option value="protein">Protein</option>
          <option value="sugar">Sugar</option>
          <option value="fiber">Fiber</option>
          <option value="salt">Salt</option>
          <option value="sodium">Sodium</option>
        </select>
      </div>

      {/* Show Slider After Dropdown Click */}
      {showSlider && (
        <div className="mb-8">
          <div className="relative w-full">
            {/* Triangle */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 -top-4"
              style={{ color: 'green' }}
            >
              ▼
            </div>
            {/* Slider Bar */}
            <div className="flex items-center">
              <span className="text-black text-sm mr-2">0</span>
              <div className="flex-1 h-1 bg-green-700 relative">
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 h-1 bg-green-400"
                  style={{ width: '50%' }}
                ></div>
              </div>
              <span className="text-black text-sm ml-2">14</span>
            </div>
            {/* Value below triangle */}
            <div className="text-center text-black text-sm mt-1">
              6.8
            </div>
          </div>
        </div>
      )}

      {/* Positives Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Positives</h3>
        <div className="space-y-4">
          {positives.map((item, index) => (
            <NutritionItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              value={item.value}
              unit={item.unit}
              safeMin={item.safeMin}
              safeMax={item.safeMax}
              safeValue={item.safeValue}
            />
          ))}
        </div>
      </div>

      {/* Negatives Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Negatives</h3>
        <div className="space-y-4">
          {negatives.map((item, index) => (
            <NutritionItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              value={item.value}
              unit={item.unit}
              safeMin={item.safeMin}
              safeMax={item.safeMax}
              safeValue={item.safeValue}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
