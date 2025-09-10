import React from 'react';
import { NSBM_DESIGN_SYSTEM, getBrandColor, getSpacing, getRadius, getShadow } from '../../styles/nsbm-design-system';

// NSBM Branded Button Component
export const NSBMButton = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  disabled = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'text-white shadow-sm hover:shadow-md',
    secondary: 'border-2 text-brandPrimary hover:bg-brandPrimary hover:text-white',
    tertiary: 'text-brandPrimary hover:bg-brandPrimary hover:bg-opacity-10',
    danger: 'text-white shadow-sm hover:shadow-md',
    success: 'text-white shadow-sm hover:shadow-md',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: getBrandColor('brandPrimary') };
      case 'secondary':
        return { 
          borderColor: getBrandColor('brandPrimary'),
          color: getBrandColor('brandPrimary')
        };
      case 'tertiary':
        return { color: getBrandColor('brandPrimary') };
      case 'danger':
        return { backgroundColor: getBrandColor('error') };
      case 'success':
        return { backgroundColor: getBrandColor('success') };
      default:
        return { backgroundColor: getBrandColor('brandPrimary') };
    }
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      style={getVariantStyles()}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// NSBM Branded Card Component
export const NSBMCard = ({ 
  variant = 'default', 
  children, 
  className = '', 
  elevated = true,
  ...props 
}) => {
  const baseClasses = 'rounded-xl border transition-all duration-200';
  
  const variants = {
    default: 'bg-white border-neutral200',
    primary: 'bg-white border-brandPrimary',
    secondary: 'bg-brandPrimary bg-opacity-5 border-brandPrimary border-opacity-20',
    elevated: 'bg-white border-neutral200 shadow-md hover:shadow-lg',
  };
  
  const getVariantStyles = () => {
    if (variant === 'primary') {
      return {
        borderTopWidth: '4px',
        borderTopColor: getBrandColor('brandPrimary'),
      };
    }
    return {};
  };
  
  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${elevated ? 'shadow-sm' : ''} ${className}`}
      style={getVariantStyles()}
      {...props}
    >
      {children}
    </div>
  );
};

// NSBM Branded Badge/Chip Component
export const NSBMBadge = ({ 
  variant = 'default', 
  size = 'md', 
  children, 
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variants = {
    default: 'bg-neutral100 text-neutral700',
    primary: 'text-white',
    secondary: 'text-brandPrimary',
    success: 'text-white',
    warning: 'text-white',
    error: 'text-white',
  };
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: getBrandColor('brandPrimary') };
      case 'secondary':
        return { 
          backgroundColor: getBrandColor('brandPrimary', 0.1),
          color: getBrandColor('brandPrimary')
        };
      case 'success':
        return { backgroundColor: getBrandColor('success') };
      case 'warning':
        return { backgroundColor: getBrandColor('warning') };
      case 'error':
        return { backgroundColor: getBrandColor('error') };
      default:
        return {};
    }
  };
  
  return (
    <span
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      style={getVariantStyles()}
    >
      {children}
    </span>
  );
};

// NSBM KPI Tile Component
export const NSBMKPITile = ({ 
  title, 
  value, 
  trend, 
  icon, 
  className = '' 
}) => {
  return (
    <NSBMCard className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon && (
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: getBrandColor('brandPrimary', 0.1) }}
            >
              {React.createElement(icon, { className: "w-5 h-5 text-brandPrimary" })}
            </div>
          )}
          <h3 className="text-sm font-medium text-neutral600">{title}</h3>
        </div>
        {trend && (
          <div className={`text-sm font-medium ${trend > 0 ? 'text-success' : 'text-error'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-neutral900">{value}</div>
    </NSBMCard>
  );
};

// NSBM Section Header Component
export const NSBMSectionHeader = ({ 
  title, 
  subtitle, 
  icon, 
  action, 
  className = '' 
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {icon && (
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: getBrandColor('brandPrimary', 0.1) }}
            >
              {React.createElement(icon, { className: "w-5 h-5 text-white" })}
            </div>
          )}
          <div>
            <h2 
              className="text-2xl font-bold"
              style={{ color: getBrandColor('brandPrimary') }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-neutral600 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {action && <div>{action}</div>}
      </div>
      {/* Cricket seam divider */}
      <div 
        className="mt-4 h-px"
        style={{ 
          background: NSBM_DESIGN_SYSTEM.cricket.seamPattern,
          backgroundSize: '8px 8px'
        }}
      />
    </div>
  );
};

// NSBM Table Component
export const NSBMTable = ({ 
  headers, 
  data, 
  className = '' 
}) => {
  return (
    <div className={`overflow-hidden rounded-xl border border-neutral200 ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral200">
          <thead 
            className="sticky top-0 z-10"
            style={{ backgroundColor: getBrandColor('neutral50') }}
          >
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-xs font-semibold text-neutral700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral200">
            {data.map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                className="hover:bg-neutral50 transition-colors duration-150"
              >
                {row.map((cell, cellIndex) => (
                  <td 
                    key={cellIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-neutral900"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// NSBM Progress Ring Component
export const NSBMProgressRing = ({ 
  value, 
  max = 100, 
  size = 120, 
  strokeWidth = 8,
  className = '' 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / max) * circumference;
  
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getBrandColor('neutral200')}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getBrandColor('brandPrimary')}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-neutral900">{value}%</div>
        </div>
      </div>
    </div>
  );
};

// NSBM Empty State Component
export const NSBMEmptyState = ({ 
  icon, 
  title, 
  description, 
  action, 
  className = '' 
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="mb-4">
        <div 
          className="mx-auto w-16 h-16 rounded-full flex items-center justify-center text-2xl"
          style={{ backgroundColor: getBrandColor('brandPrimary', 0.1) }}
        >
          {React.createElement(icon, { className: "w-8 h-8 text-brandPrimary" })}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-neutral900 mb-2">{title}</h3>
      <p className="text-neutral600 mb-6 max-w-sm mx-auto">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

// NSBM Filter Pills Component
export const NSBMFilterPills = ({ 
  filters, 
  activeFilter, 
  onFilterChange, 
  className = '' 
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeFilter === filter.value
              ? 'text-white shadow-sm'
              : 'text-neutral600 hover:text-neutral900 hover:bg-neutral100'
          }`}
          style={
            activeFilter === filter.value
              ? { backgroundColor: getBrandColor('brandPrimary') }
              : {}
          }
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default {
  NSBMButton,
  NSBMCard,
  NSBMBadge,
  NSBMKPITile,
  NSBMSectionHeader,
  NSBMTable,
  NSBMProgressRing,
  NSBMEmptyState,
  NSBMFilterPills,
};
