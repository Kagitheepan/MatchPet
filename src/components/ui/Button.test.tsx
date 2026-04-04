import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Composant Button', () => {
  it('affiche correctement le texte', () => {
    render(<Button>Cliquez ici</Button>)
    expect(screen.getByText('Cliquez ici')).toBeInTheDocument()
  })

  it('appelle onClick lors d\'un clic', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Bouton</Button>)
    fireEvent.click(screen.getByText('Bouton'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applique les classes de variante', () => {
    const { container } = render(<Button variant="primary">Primaire</Button>)
    expect(container.firstChild).toHaveClass('bg-secondary')
  })

  it('est désactivé quand la prop disabled est présente', () => {
    render(<Button disabled>Inactif</Button>)
    expect(screen.getByText('Inactif')).toBeDisabled()
  })
})
