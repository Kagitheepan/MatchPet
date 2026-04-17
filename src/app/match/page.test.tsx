import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import MatchPage from './page'

const mockAnimals = [
  { id: '1', name: 'Neige', species: 'Chat', description: 'Gentil chat', refuge: { city: 'Paris' }, photos: ['/neige.jpg'] },
  { id: '2', name: 'Max', species: 'Chien', description: 'Beau chien', refuge: { city: 'Lyon' }, photos: ['/max.jpg'] },
];

describe('Page Fonctionnelle : Matching', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockAnimals,
    });
    window.localStorage.clear();
  });

  it('affiche le premier animal et permet de swiper', async () => {
    render(<MatchPage />)

    // Attendre que le chargement soit fini et que l'animal s'affiche
    await waitFor(() => {
      expect(screen.getByText('Neige')).toBeInTheDocument()
    })

    // On récupère le bouton de validation (le deuxième bouton rond : Check)
    const buttons = screen.getAllByRole('button')
    const checkButton = buttons[1]
    
    fireEvent.click(checkButton)

    // Vérifier qu'on passe à l'animal suivant (Max) après le délai de l'animation
    await waitFor(() => {
      expect(screen.getByText('Max')).toBeInTheDocument()
    }, { timeout: 1000 })
  })
})
