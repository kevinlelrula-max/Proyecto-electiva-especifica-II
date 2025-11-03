import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // ✅ importante
import { CategoriaForm } from '../components/CategoriaForm';

describe('✅ Pruebas en <CategoriaForm />', () => {
  let mockOnAgregar;

  beforeEach(() => {
    mockOnAgregar = jest.fn();
    render(<CategoriaForm onAgregar={mockOnAgregar} />);
  });

  test('Debe mostrar el input con el placeholder correcto', () => {
    const input = screen.getByPlaceholderText('Nombre de la categoría');
    expect(input).toBeInTheDocument(); // ✅ ya funciona
  });

  test('Debe permitir escribir en el input', () => {
    const input = screen.getByPlaceholderText('Nombre de la categoría');
    fireEvent.change(input, { target: { value: 'Pescado' } });
    expect(input.value).toBe('Pescado');
  });

  test('Debe llamar a onAgregar al enviar el formulario con texto válido', () => {
    const input = screen.getByPlaceholderText('Nombre de la categoría');
    const button = screen.getByRole('button', { name: /agregar/i });

    fireEvent.change(input, { target: { value: 'Pescado fresco' } });
    fireEvent.click(button);

    expect(mockOnAgregar).toHaveBeenCalledWith('Pescado fresco');
  });

  test('No debe llamar a onAgregar si el input está vacío o con espacios', () => {
    const input = screen.getByPlaceholderText('Nombre de la categoría');
    const button = screen.getByRole('button', { name: /agregar/i });

    fireEvent.change(input, { target: { value: '   ' } }); // 👈 solo espacios
    fireEvent.click(button);

    expect(mockOnAgregar).not.toHaveBeenCalled();
  });
});
