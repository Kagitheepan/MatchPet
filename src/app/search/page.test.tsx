import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchPage from './page'

const mockAnimals = [
  { id: '1', name: 'Noisette', species: 'Chat', breed: 'Européen', description: 'Chaton roux', refuge: { city: 'Paris' }, photos: ['/noisette.jpg'] },
  { id: '2', name: 'Simba', species: 'Chien', breed: 'Golden', description: 'Gros chien', refuge: { city: 'Lyon' }, photos: ['/simba.jpg'] },
];

describe('Page Fonctionnelle : Recherche', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockAnimals,
    });
  });

  it('filtre les animaux par recherche textuelle (ordinateur)', async () => {
    render(<SearchPage />)
    
    // Attendre le chargement
    await waitFor(() => {
      expect(screen.getByText('Noisette')).toBeInTheDocument()
    })

    // On récupère l'input de recherche (sur desktop il y en a un dédié)
    const inputs = screen.getAllByPlaceholderText(/Rechercher/i)
    const desktopInput = inputs[1] // L'input desktop est le second dans le DOM
    
    fireEvent.change(desktopInput, { target: { value: 'Noisette' } })

    // On vérifie que Noisette est visible et Simba (autre espèce) a été filtré
    expect(screen.getByText('Noisette')).toBeInTheDocument()
    expect(screen.queryByText('Simba')).not.toBeInTheDocument()
  })

  it('affiche un message quand aucun animal ne correspond', async () => {
    render(<SearchPage />)
    
    // Attendre le chargement
    await waitFor(() => {
      expect(screen.getByText('Noisette')).toBeInTheDocument()
    })

    const inputs = screen.getAllByPlaceholderText(/Rechercher/i)
    fireEvent.change(inputs[1], { target: { value: 'Dinosaure' } })

    expect(screen.getByText('Aucun animal trouvé')).toBeInTheDocument()
  })
})
