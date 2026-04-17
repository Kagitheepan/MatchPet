import { render, screen, fireEvent } from '@testing-library/react'
import Questionnaire from '@/components/onboarding/Questionnaire'

describe('Composant Questionnaire', () => {
  it('affiche la première question au démarrage', () => {
    render(<Questionnaire />)
    expect(screen.getByText('Avez-vous déjà des animaux à la maison ?')).toBeInTheDocument()
  })

  it('permet de sélectionner une réponse et de passer à la suite', async () => {
    render(<Questionnaire />)
    
    // Sélectionner 'Non'
    const option = screen.getByText('Non')
    fireEvent.click(option)
    
    // Cliquer sur 'Suivant'
    const nextBtn = screen.getByText('Suivant')
    fireEvent.click(nextBtn)
    
    // Vérifier qu'on est à la question suivante
    expect(screen.getByText('Avez-vous des enfants ou prévu d\'en avoir ?')).toBeInTheDocument()
  })

  it('termine le questionnaire à la fin', () => {
    render(<Questionnaire />)
    
    // Question 1: Animaux
    fireEvent.click(screen.getByText('Non'))
    fireEvent.click(screen.getByText('Suivant'))
    
    // Question 2: Enfants
    fireEvent.click(screen.getByText('Non'))
    fireEvent.click(screen.getByText('Suivant'))
    
    // Question 3: Quel animal (Multiple)
    fireEvent.click(screen.getByText('Chien'))
    fireEvent.click(screen.getByText('Suivant'))
    
    // Question 4: Quel âge (Multiple)
    fireEvent.click(screen.getByText('Pas d\'importance'))
    fireEvent.click(screen.getByText('Suivant'))
    
    // Question 5: Jardin (Single)
    fireEvent.click(screen.getByText('Non'))
    
    // Vérifier le bouton Terminer
    expect(screen.getByText('Terminer')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Terminer'))
  })
})
