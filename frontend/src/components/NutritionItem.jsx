import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const NutritionItem = ({ 
  icon, 
  title, 
  description, 
  value, 
  unit, 
  safeMin = 0, 
  safeMax = 14, 
  safeValue = 6.8 
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-black p-4 rounded-md mb-4 text-white">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center space-x-4">
          <img src={icon} alt="icon" className="w-8 h-8" />
          <div>
            <h3 className="text-md font-semibold">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <p className="font-bold">{value}{unit}</p>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {expanded && (
        <div className="mt-4">
          <div className="relative h-2 bg-green-700 rounded-full">
            {/* Safe marker */}
            <div 
              className="absolute top-[-6px] left-1/2 transform -translate-x-1/2"
            >
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-green-400"></div>
            </div>
          </div>
          {/* Labels */}
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>{safeMin}</span>
            <span>{safeValue}</span>
            <span>{safeMax}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionItem;
