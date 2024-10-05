import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Star, StarHalf } from 'lucide-react'

// Simulación de datos del catálogo
const catalogo = [
  { id: 1, nombre: 'Collar de perlas', tipo: 'collares', precio: 150, existencias: 5, calificacion: 4.5, imagen: '/placeholder.svg' },
  { id: 2, nombre: 'Anillo de diamantes', tipo: 'anillos', precio: 500, existencias: 3, calificacion: 5, imagen: '/placeholder.svg' },
  { id: 3, nombre: 'Pulsera de oro', tipo: 'pulseras', precio: 300, existencias: 7, calificacion: 4, imagen: '/placeholder.svg' },
  { id: 4, nombre: 'Aretes de plata', tipo: 'aretes', precio: 80, existencias: 10, calificacion: 3.5, imagen: '/placeholder.svg' },
  { id: 5, nombre: 'Reloj de lujo', tipo: 'relojes', precio: 1000, existencias: 2, calificacion: 5, imagen: '/placeholder.svg' },
]

const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <Star key={i + fullStars} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  )
}

export default function TiendaJoyeria() {
  const [filtroActivo, setFiltroActivo] = useState('todos')

  const categorias = ['todos', 'collares', 'anillos', 'pulseras', 'aretes', 'relojes']

  const productosFiltrados = filtroActivo === 'todos' 
    ? catalogo 
    : catalogo.filter(producto => producto.tipo === filtroActivo)

  return (
    <div className="container mx-auto px-4">
      {/* Logo */}
      <div className="text-center py-8 mb-4">
        <div className="relative w-full max-w-[300px] h-[100px] mx-auto">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-TdWJuFBLXCXc93Z1l7jfckGy5pgL0i.png"
            alt="Blizmar Joyas Logo"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>

      {/* Botones de filtro */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categorias.map(categoria => (
          <Button
            key={categoria}
            onClick={() => setFiltroActivo(categoria)}
            variant={filtroActivo === categoria ? "default" : "outline"}
          >
            {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
          </Button>
        ))}
      </div>

      {/* Catálogo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productosFiltrados.map(producto => (
          <div key={producto.id} className="border rounded-lg overflow-hidden flex flex-col">
            <div className="relative aspect-square">
              <Image
                src={producto.imagen}
                alt={producto.nombre}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between bg-white">
              <div>
                <h3 className="font-semibold text-lg">{producto.nombre}</h3>
                <p className="text-sm text-primary-600 font-medium mb-2">
                  {producto.tipo.charAt(0).toUpperCase() + producto.tipo.slice(1)}
                </p>
              </div>
              <div>
                <p className="text-xl font-bold mt-2">${producto.precio}</p>
                <p className="text-sm text-gray-500 mt-1">Existencias: {producto.existencias}</p>
                <div className="mt-2 flex justify-center">
                  <RatingStars rating={producto.calificacion} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}