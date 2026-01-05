import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchPage from './SearchPage';

describe('SearchPage Component Tests', () => {
  
  // render searchpage
  const renderSearchPage = () => {
    return render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );
  };

  // 1 Check if the search form renders
  test('renders search form with all elements', () => {
    renderSearchPage();
    
    // Check for main heading
    expect(screen.getByText(/Estate Agent Search/i)).toBeInTheDocument();
    
    // Check for search labels
    expect(screen.getByText(/Type:/i)).toBeInTheDocument();
    expect(screen.getByText(/Min Price:/i)).toBeInTheDocument();
    expect(screen.getByText(/Min Beds:/i)).toBeInTheDocument();
  });

  // 2 Filter properties by type (House)
  test('filters properties by type - shows only houses', () => {
    renderSearchPage();
    
    // Get the type dropdown and change to "House"
    const typeSelects = screen.getAllByRole('combobox');
    const typeSelect = typeSelects[0]; // First combobox is the Type selector
    
    fireEvent.change(typeSelect, { target: { value: 'House' } });
    
    // After filtering, should only see "House" text in property cards
    const houseTexts = screen.getAllByText(/House/i);
    
    // Should have multiple house cards displayed
    expect(houseTexts.length).toBeGreaterThan(0);
    
    // Should NOT see "Flat" in the results anymore
    const flatTexts = screen.queryAllByText(/Flat - /);
    expect(flatTexts.length).toBe(0);
  });

  // 3 Add property to favorites
  test('adds property to favorites when button is clicked', () => {
    renderSearchPage();
    
    // Initially, favorites should be empty
    expect(screen.getByText(/Your list is empty/i)).toBeInTheDocument();
    
    // Get first "Add to Favorites" button and click it
    const addButtons = screen.getAllByText(/Add to Favorites/i);
    fireEvent.click(addButtons[0]);
    
    // After adding, should see a Remove button (indicates item was added)
    const removeButton = screen.getByText(/Remove/i);
    expect(removeButton).toBeInTheDocument();
    
    // Empty message should be gone
    expect(screen.queryByText(/Your list is empty/i)).not.toBeInTheDocument();
  });

  // 4 Prevent duplicate favorites
  test('prevents adding the same property to favorites twice', () => {
    renderSearchPage();
    
    // Add the first property twice
    const addButtons = screen.getAllByText(/Add to Favorites/i);
    fireEvent.click(addButtons[0]); // First click
    fireEvent.click(addButtons[0]); // Second click (duplicate attempt)
    
    // Should only have ONE remove button (meaning only one item in favorites)
    const removeButtons = screen.getAllByText(/Remove/i);
    expect(removeButtons.length).toBe(1);
  });

  // 5 Clear all favorites
  test('clears all favorites when Clear All button is clicked', () => {
    renderSearchPage();
    
    // Add two different properties to favorites
    const addButtons = screen.getAllByText(/Add to Favorites/i);
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[1]);
    
    // Verify both were added (should have 2 remove buttons)
    let removeButtons = screen.getAllByText(/Remove/i);
    expect(removeButtons.length).toBe(2);
    
    // Now click the "Clear All" button
    const clearButton = screen.getByText(/Clear All/i);
    fireEvent.click(clearButton);
    
    // Favorites should now be empty
    expect(screen.getByText(/Your list is empty/i)).toBeInTheDocument();
    
    // No remove buttons should exist
    const noRemoveButtons = screen.queryAllByText(/Remove/i);
    expect(noRemoveButtons.length).toBe(0);
  });
})