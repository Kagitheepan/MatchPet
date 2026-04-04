import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import MatchPage from './page'

// useRouter est déjà mocké dans jest.setup.js
import { useRouter } from 'next/navigation'

describe('Page Fonctionnelle : Matching', () => {
  it('affiche le premier animal et permet de swiper', async () => {
    render(<MatchPage />)

    // Vérifier que le premier animal est présent (Neige)
    expect(screen.getByText('Neige')).toBeInTheDocument()

    // On récupère le bouton de validation (le deuxième bouton rond)
    const buttons = screen.getAllByRole('button')
    const checkButton = buttons[1] // Le bouton Check est le deuxième dans le layout
    
    fireEvent.click(checkButton)

    // Vérifier qu'on passe à l'animal suivant (Max) après le délai de l'animation
    await waitFor(() => {
      expect(screen.getByText('Max')).toBeInTheDocument()
    }, { timeout: 1000 })
  })
})
