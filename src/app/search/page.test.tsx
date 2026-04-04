import { render, screen, fireEvent } from '@testing-library/react'
import SearchPage from './page'

describe('Page Fonctionnelle : Recherche', () => {
  it('filtre les animaux par recherche textuelle (ordinateur)', () => {
    render(<SearchPage />)
    
    // On récupère l'input de recherche (sur desktop il y en a un dédié)
    const inputs = screen.getAllByPlaceholderText(/Rechercher/i)
    const desktopInput = inputs[1] // L'input desktop est le second dans le DOM
    
    fireEvent.change(desktopInput, { target: { value: 'Noisette' } })

    // On vérifie que Noisette est visible et Simba (autre espèce) a été filtré
    expect(screen.getByText('Noisette')).toBeInTheDocument()
    expect(screen.queryByText('Simba')).not.toBeInTheDocument()
  })

  it('affiche un message quand aucun animal ne correspond', () => {
    render(<SearchPage />)
    
    const inputs = screen.getAllByPlaceholderText(/Rechercher/i)
    fireEvent.change(inputs[1], { target: { value: 'Dinosaure' } })

    expect(screen.getByText('Aucun animal trouvé')).toBeInTheDocument()
  })
})
