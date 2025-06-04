// DOM selectors using more specific naming
const countriesContainer = document.querySelector(".countries-container");
const regionFilter = document.querySelector('.filter-by-resion');
const searchInput = document.querySelector('.search-container input'); // Fixed selector
const themeToggle = document.querySelector('.theme-changer');

// State management
let allCountriesData = [];
let currentFilters = {
  region: '',
  searchTerm: ''
};

// Constants
const API_BASE_URL = 'https://restcountries.com/v3.1';
const ENDPOINTS = {
  ALL: '/all',
  REGION: (region) => `/region/${region}`
};

// Initialize the app
async function initApp() {
  // Show loading state
  showLoadingState();
  
  try {
    // Fetch countries data
    const data = await fetchCountriesData(ENDPOINTS.ALL);
    allCountriesData = data;
    
    // Render countries
    renderCountries(data);
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize theme from user preference
    initializeTheme();
  } catch (error) {
    showErrorState(error.message);
    console.error('Failed to initialize app:', error);
  }
}

// Fetch countries data using async/await
async function fetchCountriesData(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch countries: ${error.message}`);
  }
}

// Render countries with animation
function renderCountries(countries) {
  // Clear existing countries
  countriesContainer.innerHTML = '';
  
  // Hide loading state if visible
  hideLoadingState();
  
  // Show message if no countries match filters
  if (countries.length === 0) {
    showNoResultsMessage();
    return;
  }
  
  // Render each country card with staggered animation
  countries.forEach((country, index) => {
    const countryCard = createCountryCard(country, index);
    countriesContainer.appendChild(countryCard);
  });
}

// Create country card with all required information
function createCountryCard(country, index) {
  const countryCard = document.createElement("a");
  countryCard.classList.add("country-card");
  countryCard.href = `/country.html?name=${encodeURIComponent(country.name.common)}`;
  countryCard.style.setProperty('--animation-order', index);
  
  const capital = country.capital?.length ? country.capital[0] : 'N/A';
  const population = country.population?.toLocaleString('en-IN') || 'N/A';
  
  countryCard.innerHTML = `
    <img src="${country.flags.svg}" alt="${country.name.common} flag" loading="lazy">
    <div class="card-text">
      <h3 class="card-title">${country.name.common}</h3>
      <p><strong>Population:</strong> ${population}</p>
      <p><strong>Region:</strong> ${country.region || 'N/A'}</p>
      <p><strong>Capital:</strong> ${capital}</p>
    </div>
  `;
  
  return countryCard;
}

// Filter countries based on search term and region
function filterCountries() {
  const { searchTerm, region } = currentFilters;
  
  return allCountriesData.filter(country => {
    // Match search term (case insensitive)
    const matchesSearch = searchTerm === '' || 
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Match region filter
    const matchesRegion = region === '' || country.region === region;
    
    return matchesSearch && matchesRegion;
  });
}

// Setup all event listeners
function setupEventListeners() {
  // Region filter change
  regionFilter.addEventListener('change', handleRegionChange);
  
  // Search input
  searchInput.addEventListener('input', debounce(handleSearch, 300));
  
  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);
}

// Handle region filter change
async function handleRegionChange(e) {
  const selectedRegion = e.target.value;
  currentFilters.region = selectedRegion;
  
  if (selectedRegion) {
    showLoadingState();
    
    try {
      // We could use the stored data, but this ensures we get fresh data for the region
      const regionalData = await fetchCountriesData(ENDPOINTS.REGION(selectedRegion));
      renderCountries(filterCountries());
    } catch (error) {
      showErrorState(error.message);
    }
  } else {
    // If no region is selected, reset to showing all countries
    renderCountries(filterCountries());
  }
}

// Handle search input
function handleSearch(e) {
  currentFilters.searchTerm = e.target.value;
  renderCountries(filterCountries());
}

// Theme management
function toggleTheme() {
  const isDarkMode = document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', isDarkMode);
  
  // Update theme toggle icon if necessary
  updateThemeToggleIcon(isDarkMode);
}

function initializeTheme() {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('darkMode');
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set theme based on saved preference or system preference
  if (savedTheme === 'true' || (savedTheme === null && prefersDarkMode)) {
    document.body.classList.add('dark');
    updateThemeToggleIcon(true);
  }
}

function updateThemeToggleIcon(isDarkMode) {
  // If you have theme icons, update them here
  // This is a placeholder for where you would update the icons
  // themeToggle.innerHTML = isDarkMode ? moonIcon : sunIcon;
}

// UI State Management
function showLoadingState() {
  // Create loading spinner if it doesn't exist
  if (!document.querySelector('.loading-container')) {
    const loadingContainer = document.createElement('div');
    loadingContainer.classList.add('loading-container');
    
    const spinner = document.createElement('div');
    spinner.classList.add('loading-spinner');
    
    loadingContainer.appendChild(spinner);
    countriesContainer.innerHTML = '';
    countriesContainer.appendChild(loadingContainer);
  }
}

function hideLoadingState() {
  const loadingContainer = document.querySelector('.loading-container');
  if (loadingContainer) {
    loadingContainer.remove();
  }
}

function showErrorState(message) {
  countriesContainer.innerHTML = `
    <div class="error-message">
      <h3>Something went wrong</h3>
      <p>${message}</p>
      <button class="retry-button">Try Again</button>
    </div>
  `;
  
  // Add retry functionality
  document.querySelector('.retry-button')?.addEventListener('click', initApp);
}

function showNoResultsMessage() {
  countriesContainer.innerHTML = `
    <div class="no-results">
      <h3>No countries found</h3>
      <p>Try adjusting your search or filter criteria</p>
    </div>
  `;
}

// Utility Functions
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);